'use client'
import React, { useEffect, useRef, useState } from 'react'
import { generateENWordPrompt, handleCheckIsEnglishWord } from '@/utils'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import './index.css'
import chatService from '@/utils/chatService'
import { ALL_SETTINGS_EMPTY_ERROR, API_KEY_EMPTY_ERROR, PROXY_URL_EMPTY_ERROR } from '../../constants'
import { getEnWordStore } from '@/utils/enWordStorage'
import { getAPIKey, getProxyUrl } from '@/utils/settingStorage'
import { useOnKeyboardEvent } from '@/hooks/useOnKeyboardEvent'

type Props = {
    onShowWordCard: () => void
    onWordStream: (word: string) => void
    onWordCompleted: (isError: boolean) => void
    onGetWord: (word: string) => void
    onWordIsInLocalCompleted: (word: string) => void
}

const WordInput = (props: Props) => {
    const { onWordStream, onWordCompleted, onGetWord, onWordIsInLocalCompleted, onShowWordCard } = props
    const { toast } = useToast()
    const [searchWord, setSearchWord] = useState('')
    const [loading, setLoading] = useState(false)
    const wordInput = useRef<HTMLInputElement>(null)

    chatService.actions = {
        onCompleting: (sug) => {
            onWordStream(sug)
        },
        onCompleted: (sug: string) => {
            let isError = false

            if (sug.includes('invalid_api_key')) {
                toast({
                    description: '请配置正确的API_KEY',
                    className: 'bg-toast-error border-0 text-white',
                })
                isError = true
            }

            if (sug.includes('404 Not Found')) {
                toast({
                    description: '请配置正确的 PROXY_URL',
                    className: 'bg-toast-error border-0 text-white',
                })

                isError = true
            }

            onWordCompleted(isError)
            setLoading(false)
        },
    }

    useOnKeyboardEvent(['ctrl', 'f'], () => {
        if (!wordInput.current) return
        wordInput.current.focus()
    })

    useEffect(() => {
        if (!wordInput.current) return
        wordInput.current.focus()
    }, [])

    const onSubmitWord = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (!checkIsNotSetting()) return
            if (!checkIsEmptyInput()) return
            if (!handleCheckIsEnglishWord(searchWord)) {
                toast({
                    description: '请输入英文单词',
                    className: 'bg-[#ff4d4f] border-0 text-white',
                })
                return
            }
            onGetWord(searchWord.toLowerCase())
            if (checkIsExistInLocal(searchWord.toLowerCase())) return
            onShowWordCard()
            await requestWordLearning()
        }
    }

    async function requestWordLearning() {
        if (loading) return
        const prompt = generateENWordPrompt(searchWord.toLowerCase())

        setLoading(true)

        try {
            await chatService.getStream({
                prompt,
            })
        } catch (e) {
            const error = e as Error

            if (error.message === API_KEY_EMPTY_ERROR) {
                showErrorToastMessage('请去填写API KEY')
            }

            if (error.message === PROXY_URL_EMPTY_ERROR) {
                showErrorToastMessage('请去填写PROXY URL')
            }

            if (error.message === ALL_SETTINGS_EMPTY_ERROR) {
                showErrorToastMessage('您的配制项为空，请去填写')
            }
        } finally {
            setLoading(false)
            setSearchWord('')
        }
    }

    function checkIsEmptyInput(): boolean {
        if (searchWord === '') {
            toast({
                description: '请输入英文单词',
                className: 'bg-[#ff4d4f] border-0 text-white',
            })
            return false
        }
        return true
    }

    function checkIsExistInLocal(word: string): boolean {
        const wordList = getEnWordStore()
        const existWord = wordList.find((v) => v.word === word)

        if (existWord) {
            onWordIsInLocalCompleted(existWord.content)
            return true
        }
        return false
    }

    function checkIsNotSetting(): boolean {
        const key = getAPIKey()
        const url = getProxyUrl()
        if (key === '' || url === '') {
            showErrorToastMessage('配置项缺失，请先配置')
            return false
        }
        return true
    }

    function showErrorToastMessage(msg: string) {
        toast({
            description: msg,
            className: 'bg-[#ff4d4f] border-0 text-white',
        })
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center '>
            <div className='input-wrapper relative flex justify-center items-center'>
                <Input
                    placeholder='请输入英文单词'
                    value={searchWord}
                    ref={wordInput}
                    className='Input text-md'
                    onChange={(e) => setSearchWord(e.target.value)}
                    onKeyDown={(e) => onSubmitWord(e)}
                />
            </div>
        </div>
    )
}
export default WordInput
