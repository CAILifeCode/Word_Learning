'use client'
import { useEffect } from 'react'

type Key = 'ctrl' | string

export function useOnKeyboardEvent(keys: Key[], callback: () => void) {
    function onKeydownEvent(e: KeyboardEvent) {
        if (keys.every((key) => (key === 'ctrl' && e.ctrlKey) || e.key.toLowerCase() === key)) {
            callback()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeydownEvent)

        return () => {
            window.removeEventListener('keydown', onKeydownEvent)
        }
    }, [keys, callback])
}
