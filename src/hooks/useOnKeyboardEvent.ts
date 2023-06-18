'use client'
import { isEscapeKey } from '@/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

export default function useOnKeyboardEvent() {
    const isEscape = useAtomValue(isEscapeKey)
    const setIsEscape = useSetAtom(isEscapeKey)

    function onKeydownEvent(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            setIsEscape(true)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeydownEvent)

        return () => {
            window.removeEventListener('keydown', onKeydownEvent)
        }
    }, [isEscape])

    return { isEscape, setIsEscape }
}
