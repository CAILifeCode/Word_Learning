import React from 'react'
import { marked } from 'marked'
import { mangle } from 'marked-mangle'
import { gfmHeadingId } from 'marked-gfm-heading-id'

type Props = {
    markdownText: string
}

const Markdown = ({ markdownText }: Props) => {
    const renderer = new marked.Renderer()
    const options = {
        prefix: 'word-learning-',
    }
    marked.setOptions({
        renderer,
    })
    marked.use(mangle())
    marked.use(gfmHeadingId(options))
    const html = marked(markdownText)

    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}

export default Markdown
