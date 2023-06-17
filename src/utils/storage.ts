export function getLocal(key: string) {
    if (typeof window === 'undefined') return
    const item = window.localStorage.getItem(key)

    if (item) {
        return JSON.parse(item)
    }

    return null
}

export function setLocal(key: string, value: any): void {
    if (typeof window === 'undefined') return

    window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocal(key: string): void {
    if (typeof window === 'undefined') return

    window.localStorage.removeItem(key)
}

export function clearLocal(): void {
    if (typeof window === 'undefined') return

    window.localStorage.clear()
}
