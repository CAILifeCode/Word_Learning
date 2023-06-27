import React, { useEffect, useState } from 'react'
import './index.css'
import { motion } from 'framer-motion'
import Collect from '@/components/Collect'
import { downloadCSV } from '@/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight, X } from 'lucide-react'
import { clsx } from 'clsx'
import { getEnWordStore, removeEnWordStore } from '@/utils/enWordStorage'
import WordCard from '@/components/WordCard'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useOnCollectList } from '@/hooks/useOnCollectList'
import voiceService from '@/utils/voiceService'
import SideMenuBar from '@/components/SideMenuBar'
import Review from '@/components/Review'
import { AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { reviewConfig } from '@/config'

const Sidebar = () => {
    const { wordNumber } = reviewConfig

    const [isWider, setIsWider] = useState(false)
    const [isShowWordCard, setIsShowWordCard] = useState(false)
    const [collectWord, setCollectWord] = useState('')
    const [isDisableDownload, setIsDisableDownload] = useState(false)
    const [isShowCollectWord, setIsShowCollectWord] = useState(true)
    const { collectList, setCollectList } = useOnCollectList()
    const [reviewWordNumber, setReviewWordNumber] = useState('10')

    const { toast } = useToast()
    const open_btn_variants = {
        open: { left: 'calc(100vw - 150px)' },
        close: { left: '90px' },
    }

    const download_btn_variants = {
        open: { opacity: 1, scale: 0.95 },
        close: { opacity: 0, scale: 0.95 },
    }

    useEffect(() => {
        if (collectList.length === 0) {
            setIsDisableDownload(true)
        } else {
            setIsDisableDownload(false)
        }
    }, [collectList])

    function onCancelCollect(word: string) {
        removeEnWordStore(word)
        toast({
            description: '取消收藏成功',
            className: 'bg-green-500 text-white border-0',
        })
        setCollectList(getEnWordStore())
    }

    function changeSidebarWidth() {
        if (isWider) {
            setIsShowCollectWord(true)
        }
        setIsWider(!isWider)
    }

    function handleDownloadCSV() {
        const data = getEnWordStore()

        data.forEach((v) => {
            v.content = extractContent(v.content)
        })

        downloadCSV(data, `en-word-${new Date().getTime()}.csv`)
    }

    function getCurrentWordContent(): string {
        const word = collectList.find((item) => item.word === collectWord)
        if (!word) return '暂未找到该单词'

        return word.content
    }

    function onCollectWord() {
        onCancelCollect(collectWord)
        setIsShowWordCard(false)
    }

    function extractContent(text: string): string {
        const content = text.trim()
        const lines = content.split('\n')
        const englishStoryIndex = lines.findIndex((line) => line.includes('### 场景例句'))

        if (englishStoryIndex === -1) {
            return ''
        }

        const extractedLines = lines.slice(0, englishStoryIndex)
        const cleanedLines = extractedLines.map((line) => line.replace(/^### /, ''))

        return cleanedLines.join('\n')
    }

    function handleSpeakWord() {
        const voiceWord = voiceService as SpeechSynthesisUtterance
        voiceWord.text = collectWord
        speechSynthesis.speak(voiceWord)
    }

    async function handleCopyWordContent() {
        await navigator.clipboard.writeText(getCurrentWordContent().replace(/###/g, ''))
        toast({
            description: '复制成功',
            className: 'bg-green-500 text-white border-0',
        })
    }

    function handleSwitchMenu(menu: string) {
        if (menu === 'review') {
            setIsShowCollectWord(false)
        }

        if (menu === 'word') {
            setIsShowCollectWord(true)
        }
    }

    function handleReviewWordNumber(wordNumber: string) {
        setReviewWordNumber(wordNumber)
    }

    return (
        <motion.div
            initial={{ width: '120px', position: 'fixed', left: 0, top: 0 }}
            animate={{ width: isWider ? 'calc(100vw - 120px)' : '120px' }}
            style={{ zIndex: isWider ? 100 : 10 }}
            className='backdrop-blur-sm'
        >
            <div className='side-bar h-screen text-white relative'>
                <div className='flex flex-col absolute left-[60px] top-5 -translate-x-1/2 justify-center items-center'>
                    <Link href='https://github.com/CAILifeCode/Word_Learning' target='_blank'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.svg
                                        height='48'
                                        aria-hidden='true'
                                        viewBox='0 0 16 16'
                                        version='1.1'
                                        width='48'
                                        data-view-component='true'
                                        className='octicon octicon-mark-github'
                                        initial={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z'></path>
                                    </motion.svg>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>前往仓库地址</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>

                    <motion.div
                        variants={download_btn_variants}
                        animate={isWider ? 'open' : 'close'}
                        initial={false}
                        whileHover={{ scale: 1 }}
                    >
                        <Button
                            onClick={handleDownloadCSV}
                            disabled={isDisableDownload}
                            className='w-[100px] download--btn mt-6'
                        >
                            下载CSV
                        </Button>
                    </motion.div>
                </div>

                <motion.div
                    variants={open_btn_variants}
                    style={{ position: 'absolute', top: '50%', translateY: '-50%', zIndex: 100 }}
                    animate={isWider ? 'open' : 'close'}
                    initial={false}
                >
                    <motion.div
                        onClick={changeSidebarWidth}
                        className={clsx([
                            'w-[60px]',
                            'h-[60px]',
                            'rounded-full',
                            'bg-second',
                            'flex',
                            'justify-center',
                            'items-center',
                            'cursor-pointer',
                            'side-btn',
                        ])}
                        initial={{ scale: 0.95 }}
                        whileHover={{ scale: 1 }}
                    >
                        {isWider ? <X size={24} color='#ffffff' /> : <ArrowRight size={24} color='#ffffff' />}
                    </motion.div>
                </motion.div>

                {isShowCollectWord && isWider && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                delay: 0.3,
                            },
                        }}
                        className='collect-container absolute top-[53px] right-0 w-[calc(100%-80px)] h-full flex flex-wrap gap-4 p-10 content-start overflow-y-auto'
                    >
                        <Collect
                            cardList={collectList}
                            onCancelCollect={onCancelCollect}
                            onSelectCollectWord={(word: string) => {
                                setIsShowWordCard(true)
                                setCollectWord(word)
                            }}
                        ></Collect>
                    </motion.div>
                )}

                {isWider && !isShowCollectWord && (
                    <div className='absolute top-0 right-0 w-[calc(100%-80px)] h-full flex items-center justify-center text-white'>
                        <Review wordNumber={reviewWordNumber} />
                    </div>
                )}

                {isWider && (
                    <div className='w-[calc(100%-80px)]  absolute top-[24px] right-0 flex items-center justify-center'>
                        <SideMenuBar switchMenu={handleSwitchMenu} />
                    </div>
                )}

                {isWider && !isShowCollectWord && (
                    <div className='absolute top-[28px] right-[12px] flex items-center justify-center'>
                        <Select defaultValue='10' onValueChange={handleReviewWordNumber}>
                            <SelectTrigger className='w-[60px] focus:ring-0 focus:ring-offset-0 p-2 h-[30px] border-none bg-button-primary text-black'>
                                <SelectValue placeholder='选择复习单词数量' />
                            </SelectTrigger>
                            <SelectContent className='z-[300]'>
                                {wordNumber.map((number) => (
                                    <SelectItem value={number} key={number}>
                                        {number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                <AnimatePresence>
                    {isShowWordCard && (
                        <WordCard
                            onCloseWordCard={() => {
                                setIsShowWordCard(false)
                            }}
                            isLoading={false}
                            isShowCollect={true}
                            isCollect={true}
                            onCollectWorld={onCollectWord}
                            onSpeakWord={handleSpeakWord}
                            onCopyWordContent={handleCopyWordContent}
                            wordDefinition={getCurrentWordContent()}
                        />
                    )}
                </AnimatePresence>

                <motion.div
                    className='logo-text absolute font-bold bottom-[20px] left-[10px]'
                    initial={false}
                    animate={{
                        fontSize: isWider ? '24px' : '80px',
                    }}
                >
                    WORDS
                </motion.div>
                <motion.div
                    className='logo-text absolute font-bold bottom-[120px] left-[80px]'
                    initial={false}
                    animate={{
                        fontSize: isWider ? '16px' : '48px',
                        left: isWider ? '40px' : '80px',
                        bottom: isWider ? '50px' : '120px',
                    }}
                >
                    LEARNING
                </motion.div>
            </div>
        </motion.div>
    )
}
export default Sidebar
