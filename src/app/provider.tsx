'use client'

import { Provider } from 'jotai'
import * as React from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    return <Provider>{children}</Provider>
}
