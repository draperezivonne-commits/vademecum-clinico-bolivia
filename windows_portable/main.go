package main

import (
    "crypto/sha256"
    "embed"
    "encoding/hex"
    "encoding/json"
    "fmt"
    "io"
    "io/fs"
    "net"
    "net/http"
    "os"
    "os/exec"
    "path/filepath"
    "strings"
    "time"
)

const (
    appName            = "Vademécum Clínico Bolivia"
    appPort            = "17831"
    healthTag          = "VCB-PORTABLE"
    remoteDataBaseURL  = "https://vademecum.neurocapsulas.com/data/"
    desktopManifestURL = "https://vademecum.neurocapsulas.com/data/app-version.json"
)

//go:embed app
var embedded embed.FS

type updateManifest struct {
    LatestVersion      string `json:"latestVersion"`
    DesktopDownloadURL string `json:"desktopDownloadUrl"`
    DesktopSHA256      string `json:"desktopSha256"`
    Notes              string `json:"notes"`
}

func main() {
    appFS, err := fs.Sub(embedded, "app")
    if err != nil {
        showError(appName, "No se pudo cargar la aplicación interna.")
        return
    }

    localVersion := bundledVersion(appFS)
    if localVersion == "" {
        localVersion = "0.0.0"
    }

    ln, err := net.Listen("tcp", "127.0.0.1:"+appPort)
    if err != nil {
        if !serverIsOurs() {
            showError(appName, "La aplicación no pudo iniciar porque el puerto local necesario está ocupado. Reinicie Windows e inténtelo nuevamente.")
            return
        }
        launchAppWindow()
        return
    }

    mux := http.NewServeMux()
    mux.HandleFunc("/__vcb_health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "text/plain; charset=utf-8")
        w.Header().Set("Cache-Control", "no-store")
        _, _ = w.Write([]byte(healthTag))
    })
    mux.HandleFunc("/__vcb_remote/", proxyRemoteData)

    files := http.FileServer(http.FS(appFS))
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        if r.URL.Path == "/" {
            b, err := fs.ReadFile(appFS, "index.html")
            if err != nil {
                http.Error(w, "No se pudo abrir la aplicación", http.StatusInternalServerError)
                return
            }
            w.Header().Set("Content-Type", "text/html; charset=utf-8")
            w.Header().Set("Cache-Control", "no-cache")
            _, _ = w.Write(b)
            return
        }
        if strings.HasSuffix(r.URL.Path, ".webmanifest") {
            w.Header().Set("Content-Type", "application/manifest+json")
        }
        if strings.HasSuffix(r.URL.Path, ".html") || strings.HasSuffix(r.URL.Path, "sw.js") || strings.HasSuffix(r.URL.Path, "config.js") {
            w.Header().Set("Cache-Control", "no-cache")
        }
        files.ServeHTTP(w, r)
    })

    srv := &http.Server{Handler: mux, ReadHeaderTimeout: 5 * time.Second}
    go func() { _ = srv.Serve(ln) }()

    if checkForDesktopUpdate(localVersion) {
        _ = srv.Close()
        return
    }

    launchAppWindow()
    _ = srv.Close()
}

func bundledVersion(appFS fs.FS) string {
    b, err := fs.ReadFile(appFS, "data/app-version.json")
    if err != nil {
        return ""
    }
    var m updateManifest
    if json.Unmarshal(b, &m) != nil {
        return ""
    }
    return strings.TrimSpace(m.LatestVersion)
}

func proxyRemoteData(w http.ResponseWriter, r *http.Request) {
    name := strings.TrimPrefix(r.URL.Path, "/__vcb_remote/")
    if name == "" || strings.Contains(name, "..") || strings.ContainsAny(name, "\\?") || strings.Contains(name, "/") {
        http.Error(w, "Recurso remoto no permitido", http.StatusBadRequest)
        return
    }
    client := &http.Client{Timeout: 12 * time.Second}
    req, err := http.NewRequestWithContext(r.Context(), http.MethodGet, remoteDataBaseURL+name, nil)
    if err != nil {
        http.Error(w, "No se pudo preparar la sincronización", http.StatusBadGateway)
        return
    }
    req.Header.Set("User-Agent", "VademecumClinicoBolivia/Desktop")
    resp, err := client.Do(req)
    if err != nil {
        http.Error(w, "Sin conexión para sincronizar", http.StatusBadGateway)
        return
    }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK {
        http.Error(w, "Actualización remota no disponible", resp.StatusCode)
        return
    }
    w.Header().Set("Cache-Control", "no-store")
    if ct := resp.Header.Get("Content-Type"); ct != "" {
        w.Header().Set("Content-Type", ct)
    }
    _, _ = io.Copy(w, io.LimitReader(resp.Body, 80<<20))
}

func checkForDesktopUpdate(localVersion string) bool {
    m, err := fetchUpdateManifest()
    if err != nil || !versionGreater(m.LatestVersion, localVersion) || m.DesktopDownloadURL == "" {
        return false
    }

    msg := fmt.Sprintf("Hay una nueva versión del Vademécum Clínico Bolivia (%s).\n\nSe necesita conexión a internet para sincronizar y descargar la actualización. Después podrá continuar usando el Vademécum sin conexión.\n\n¿Desea actualizar ahora?", m.LatestVersion)
    if !showQuestion(appName+" · Actualización", msg) {
        return false
    }

    downloaded, err := downloadUpdate(m)
    if err != nil {
        showError(appName+" · Actualización", "No se pudo descargar la actualización. Puede continuar usando la versión actual sin conexión.\n\n"+err.Error())
        return false
    }
    if err := scheduleSelfUpdate(downloaded); err != nil {
        showError(appName+" · Actualización", "La actualización fue descargada, pero Windows no pudo iniciar el reemplazo automático. La versión actual sigue siendo utilizable.\n\n"+err.Error())
        return false
    }
    return true
}

func fetchUpdateManifest() (updateManifest, error) {
    var m updateManifest
    client := &http.Client{Timeout: 3 * time.Second}
    req, _ := http.NewRequest(http.MethodGet, desktopManifestURL, nil)
    req.Header.Set("User-Agent", "VademecumClinicoBolivia/Desktop")
    resp, err := client.Do(req)
    if err != nil {
        return m, err
    }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK {
        return m, fmt.Errorf("servidor de actualización: HTTP %d", resp.StatusCode)
    }
    err = json.NewDecoder(io.LimitReader(resp.Body, 128<<10)).Decode(&m)
    return m, err
}

func versionGreater(a, b string) bool {
    parse := func(v string) []int {
        v = strings.TrimPrefix(strings.TrimSpace(v), "v")
        p := strings.Split(v, ".")
        out := make([]int, len(p))
        for i := range p {
            _, _ = fmt.Sscanf(p[i], "%d", &out[i])
        }
        return out
    }
    A, B := parse(a), parse(b)
    n := len(A)
    if len(B) > n {
        n = len(B)
    }
    for i := 0; i < n; i++ {
        x, y := 0, 0
        if i < len(A) { x = A[i] }
        if i < len(B) { y = B[i] }
        if x != y { return x > y }
    }
    return false
}

func downloadUpdate(m updateManifest) (string, error) {
    if !strings.HasPrefix(strings.ToLower(m.DesktopDownloadURL), "https://") {
        return "", fmt.Errorf("la descarga de actualización no usa HTTPS")
    }
    client := &http.Client{Timeout: 120 * time.Second}
    req, _ := http.NewRequest(http.MethodGet, m.DesktopDownloadURL, nil)
    req.Header.Set("User-Agent", "VademecumClinicoBolivia/Desktop")
    resp, err := client.Do(req)
    if err != nil { return "", err }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK {
        return "", fmt.Errorf("descarga: HTTP %d", resp.StatusCode)
    }

    target := filepath.Join(os.TempDir(), "Vademecum_Clinico_Bolivia_update_"+m.LatestVersion+".exe")
    f, err := os.Create(target)
    if err != nil { return "", err }
    h := sha256.New()
    _, copyErr := io.Copy(io.MultiWriter(f, h), io.LimitReader(resp.Body, 200<<20))
    closeErr := f.Close()
    if copyErr != nil { _ = os.Remove(target); return "", copyErr }
    if closeErr != nil { _ = os.Remove(target); return "", closeErr }

    expected := strings.ToLower(strings.TrimSpace(m.DesktopSHA256))
    if expected != "" {
        got := hex.EncodeToString(h.Sum(nil))
        if got != expected {
            _ = os.Remove(target)
            return "", fmt.Errorf("la verificación SHA-256 no coincide; se canceló la actualización")
        }
    }
    return target, nil
}

func scheduleSelfUpdate(downloaded string) error {
    current, err := os.Executable()
    if err != nil { return err }
    current, _ = filepath.Abs(current)
    pid := os.Getpid()
    script := filepath.Join(os.TempDir(), fmt.Sprintf("vcb_update_%d.cmd", pid))
    content := fmt.Sprintf(`@echo off
setlocal
:waitloop
tasklist /FI "PID eq %d" 2>NUL | find "%d" >NUL
if not errorlevel 1 (
  timeout /t 1 /nobreak >NUL
  goto waitloop
)
copy /Y "%s" "%s" >NUL
if errorlevel 1 (
  start "" "%s"
  exit /b 1
)
del /Q "%s" >NUL 2>&1
start "" "%s"
del "%%~f0"
`, pid, pid, downloaded, current, downloaded, downloaded, current)
    if err := os.WriteFile(script, []byte(content), 0700); err != nil { return err }
    cmd := exec.Command("cmd.exe", "/C", script)
    return cmd.Start()
}

func serverIsOurs() bool {
    c := &http.Client{Timeout: 700 * time.Millisecond}
    resp, err := c.Get("http://127.0.0.1:" + appPort + "/__vcb_health")
    if err != nil { return false }
    defer resp.Body.Close()
    buf := make([]byte, len(healthTag))
    n, _ := resp.Body.Read(buf)
    return string(buf[:n]) == healthTag
}

func launchAppWindow() {
    browser := findBrowser()
    if browser == "" {
        showError(appName, "No se encontró Microsoft Edge o Google Chrome. Windows 10/11 normalmente incluye Microsoft Edge.")
        return
    }
    local := os.Getenv("LOCALAPPDATA")
    if local == "" { local = os.TempDir() }
    profile := filepath.Join(local, "Neurocapsulas", "VademecumClinicoBolivia", "browser-profile")
    _ = os.MkdirAll(profile, 0755)
    url := "http://127.0.0.1:" + appPort + "/"
    args := []string{"--app=" + url, "--user-data-dir=" + profile, "--no-first-run", "--disable-background-mode", "--disable-default-apps"}
    cmd := exec.Command(browser, args...)
    if err := cmd.Start(); err != nil {
        showError(appName, "No se pudo abrir la ventana de la aplicación.")
        return
    }
    _ = cmd.Wait()
}

func findBrowser() string {
    candidates := []string{}
    if p := os.Getenv("ProgramFiles(x86)"); p != "" {
        candidates = append(candidates, filepath.Join(p, "Microsoft", "Edge", "Application", "msedge.exe"), filepath.Join(p, "Google", "Chrome", "Application", "chrome.exe"))
    }
    if p := os.Getenv("ProgramFiles"); p != "" {
        candidates = append(candidates, filepath.Join(p, "Microsoft", "Edge", "Application", "msedge.exe"), filepath.Join(p, "Google", "Chrome", "Application", "chrome.exe"))
    }
    if p := os.Getenv("LOCALAPPDATA"); p != "" {
        candidates = append(candidates, filepath.Join(p, "Microsoft", "Edge", "Application", "msedge.exe"), filepath.Join(p, "Google", "Chrome", "Application", "chrome.exe"))
    }
    for _, c := range candidates {
        if st, err := os.Stat(c); err == nil && !st.IsDir() { return c }
    }
    return ""
}
