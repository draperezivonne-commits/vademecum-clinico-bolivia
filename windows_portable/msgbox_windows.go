//go:build windows

package main

import (
    "syscall"
    "unsafe"
)

func messageBox(title, message string, flags uintptr) uintptr {
    user32 := syscall.NewLazyDLL("user32.dll")
    proc := user32.NewProc("MessageBoxW")
    t, _ := syscall.UTF16PtrFromString(title)
    m, _ := syscall.UTF16PtrFromString(message)
    ret, _, _ := proc.Call(0, uintptr(unsafe.Pointer(m)), uintptr(unsafe.Pointer(t)), flags)
    return ret
}

func showError(title, message string) { messageBox(title, message, 0x10) }
func showQuestion(title, message string) bool { return messageBox(title, message, 0x04|0x40) == 6 }
