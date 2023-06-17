'use client'
import { Message } from '@/types'
import { getAPIKey, getModel, getProxyUrl } from '@/utils/settingStorage'
import { ALL_SETTINGS_EMPTY_ERROR, API_KEY_EMPTY_ERROR, PROXY_URL_EMPTY_ERROR } from '../constants'
import { Base64 } from 'js-base64'

type StreamParams = {
    prompt: string
    history?: Message[]
    options?: {
        temperature?: number
        max_tokens?: number
    }
}

type Actions = {
    onCompleting: (sug: string) => void
    onCompleted?: (sug: string) => void
}

class ChatService {
    private controller: AbortController
    private static instance: ChatService
    public actions?: Actions

    private constructor() {
        this.controller = new AbortController()
    }

    public static getInstance(): ChatService {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService()
        }

        return ChatService.instance
    }

    public async getStream(params: StreamParams) {
        const { prompt } = params
        const key = getAPIKey()
        const url = getProxyUrl()
        const model = getModel()
        let suggestion = ''

        if (key === '' && url === '') {
            throw new Error(ALL_SETTINGS_EMPTY_ERROR)
        }
        if (key === '') {
            throw new Error(API_KEY_EMPTY_ERROR)
        }
        if (url === '') {
            throw new Error(PROXY_URL_EMPTY_ERROR)
        }

        try {
            const response = await fetch('/api/word', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    prompt,
                    key: Base64.encode(key),
                    url: Base64.encode(url),
                    model,
                }),
                signal: this.controller.signal,
            })

            const data = response.body

            if (!data) {
                return
            }

            const reader = data.getReader()
            const decoder = new TextDecoder('utf-8')

            let done = false
            while (!done) {
                const { value, done: doneReadingStream } = await reader.read()
                done = doneReadingStream

                const chunkValue = decoder.decode(value)
                suggestion += chunkValue

                this.actions?.onCompleting(suggestion)
                await new Promise((resolve) => setTimeout(resolve, 100))
            }
        } catch (error) {
        } finally {
            this.actions?.onCompleted?.(suggestion)
            this.controller = new AbortController()
        }
    }

    public cancel() {
        this.controller.abort()
    }
}

const chatService = ChatService.getInstance()

export default chatService
