'use client'
import React, { useState } from 'react'
import WordInput from '@/components/WordInput'
import { Toaster } from '@/components/ui/toaster'
import './page.css'
import Sidebar from '@/components/Sidebar'
import { addEnWordStore, getEnWordStore, removeEnWordStore } from '@/utils/enWordStorage'
import { useSetAtom } from 'jotai'
import { collectWordCardList } from '@/store'
import chatService from '@/utils/chatService'
import WordCard from '@/components/WordCard'
import Setting from '@/components/Setting'
import { useToast } from '@/components/ui/use-toast'
import Help from '@/components/Help'

const Home = () => {
    const [searchWord, setSearchWord] = useState('')
    const [wordDefinition, setWordDefinition] = useState('')
    const [isShowCard, setIsShowCard] = useState(false)
    const [isCollect, setIsCollect] = useState(false)
    const [isShowCollect, setIsShowCollect] = useState(false)
    const [isAborted, setIsAborted] = useState(false)
    const setCollectList = useSetAtom(collectWordCardList)
    const [isLoading, setIsLoading] = useState(false)
    const [isWordStreaming, setIsWordStreaming] = useState(false)
    const { toast } = useToast()

    function onWordStream(word: string) {
        setIsLoading(false)
        setIsWordStreaming(true)
        setWordDefinition(word)
    }

    function onWordCompleted(isError: boolean) {
        if (isAborted || isError) {
            setIsShowCollect(false)
            setIsAborted(false)
        } else {
            setIsShowCollect(true)
        }
        setIsWordStreaming(false)
    }

    function onWordIsInLocalCompleted(word: string) {
        setIsShowCard(true)
        setIsCollect(true)
        setIsShowCollect(true)
        setWordDefinition(word)
    }

    function onGetWord(word: string) {
        setSearchWord(word)
    }

    function onShowWordCard() {
        setIsLoading(true)
        setIsShowCard(true)
    }

    function handleCollectWord() {
        if (!isShowCollect) return
        setIsCollect(!isCollect)

        if (!isCollect) {
            addEnWordStore({
                word: searchWord,
                content: wordDefinition,
            })
            toast({
                description: '收藏成功',
                className: 'bg-green-500 text-white border-0',
            })
        } else {
            removeEnWordStore(searchWord)
            toast({
                description: '取消收藏成功',
                className: 'bg-green-500 text-white border-0',
            })
        }

        setCollectList(getEnWordStore())
    }

    function handleCloseWordCard() {
        if (isWordStreaming) {
            setIsAborted(true)
            chatService.cancel()
        }

        setIsShowCollect(false)
        setIsCollect(false)
        setWordDefinition('')
        setIsShowCard(false)
    }

    return (
        <div className='container h-screen w-screen flex flex-col items-center justify-center'>
            <Sidebar />
            <WordInput
                onWordStream={onWordStream}
                onWordCompleted={onWordCompleted}
                onGetWord={onGetWord}
                onShowWordCard={onShowWordCard}
                onWordIsInLocalCompleted={onWordIsInLocalCompleted}
            />
            {isShowCard && (
                <WordCard
                    isLoading={isLoading}
                    isCollect={isCollect}
                    isShowCollect={isShowCollect}
                    wordDefinition={wordDefinition}
                    onCloseWordCard={handleCloseWordCard}
                    onCollectWorld={handleCollectWord}
                ></WordCard>
            )}

            <Setting />
            <Help />
            <Toaster></Toaster>
        </div>
    )
}
export default Home
