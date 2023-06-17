'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const WordMarkdown = ({ children }: { children: string }) => {
    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
}
export default WordMarkdown
