import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getEnWordStore } from '@/utils/enWordStorage'
import { ENWord } from '@/types'
import { useToast } from '@/components/ui/use-toast'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import { useOnKeyboardEvent } from '@/hooks/useOnKeyboardEvent'

type Props = {
    wordNumber: string
    onReviewWord: () => void
}

const Review = (props: Props) => {
    const { wordNumber, onReviewWord } = props
    const { toast } = useToast()
    const [isStarted, setIsStarted] = useState(false)
    const [reviewList, setReviewList] = useState<ENWord[]>([])
    const [listIndex, setListIndex] = useState(0)
    const [inputWord, setInputWord] = useState('')
    const [isShowNextBtn, setIsShowNextBtn] = useState(false)
    const [errorCount, setErrorCount] = useState(0)
    const reviewInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        getReviewWordsList()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            reviewInput.current && reviewInput.current.focus()
        }, 10)
    }, [isStarted])

    function getReviewWordsList() {
        const list = getEnWordStore()
        const len = Number(wordNumber) > list.length ? list.length : Number(wordNumber)
        setReviewList(shuffleArray(list, len))
    }

    function shuffleArray(arr: ENWord[], len: number) {
        let shuffledArray = arr.slice()
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }

        return shuffledArray.slice(0, len)
    }

    function extractChineseDefinition(text: string): string {
        const startMarker = '中文释义'
        const endMarker = '英文释义'
        const startIndex = text.indexOf(startMarker) + startMarker.length
        const endIndex = text.indexOf(endMarker)

        if (startIndex > -1 && endIndex > -1) {
            return text
                .slice(startIndex, endIndex)
                .trim()
                .replace(/(:|[：\s/]|-)/g, ' ')
        } else {
            return '未找到匹配的文本'
        }
    }

    function getWordChineseDefinition() {
        return extractChineseDefinition(reviewList[listIndex].content)
    }

    function onStartReview() {
        onReviewWord()
        setIsStarted(true)
    }

    function handleChooseNextWord() {
        if (listIndex === reviewList.length - 1) {
            toast({
                description: '恭喜您,已经全部答对了',
                className: 'bg-green-500 text-white border-0',
            })
            setListIndex(0)
            setIsShowNextBtn(false)
            setInputWord('')
            setIsStarted(false)
            return
        }

        setListIndex(listIndex + 1)
        setIsShowNextBtn(false)
        setErrorCount(0)
        setInputWord('')
        reviewInput.current && reviewInput.current.focus()
    }

    function handleConfirmInputWord(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            if (inputWord.toLowerCase() === reviewList[listIndex].word.toLowerCase()) {
                if (isShowNextBtn) {
                    toast({
                        description: '这个单词你已经答对了',
                        className: 'bg-toast-warning text-white border-0',
                    })
                    return
                }
                toast({
                    description: '恭喜您，答对了',
                    className: 'bg-green-500 text-white border-0',
                })
                setIsShowNextBtn(true)
            } else {
                setErrorCount(errorCount + 1)
            }
        }
    }

    useEffect(() => {
        if (errorCount === 0) return
        if (isShowNextBtn) {
            toast({
                description: '这个单词你已经答对了',
                className: 'bg-toast-warning text-white border-0',
            })
            return
        }
        toast({
            description: errorCount === 1 ? '答错了喔' : '又答错了喔',
            className: 'bg-toast-error text-white border-0',
        })
    }, [errorCount])

    useOnKeyboardEvent(['ctrl', 'p'], () => {
        if (!isShowNextBtn) return
        handleChooseNextWord()
    })

    return (
        <>
            {isStarted ? (
                <div>
                    <div className='text-[16px] mb-2'>{getWordChineseDefinition()}</div>
                    <div className='flex items-center justify-center relative'>
                        <div className='review-input__wrapper'>
                            <Input
                                ref={reviewInput}
                                className='w-[400px] mr-2 border-none h-[40px] focus-visible:outline-none'
                                value={inputWord}
                                onChange={(e) => {
                                    setInputWord(e.target.value)
                                }}
                                onKeyDown={handleConfirmInputWord}
                            />
                        </div>
                        <AnimatePresence>
                            {isShowNextBtn && (
                                <motion.div
                                    className='absolute -right-[60px]'
                                    animate={{ x: 20, opacity: 1 }}
                                    exit={{ x: 0, opacity: 0 }}
                                    initial={{ x: 0, opacity: 0 }}
                                >
                                    <Button
                                        className='bg-button-primary hover:hover:bg-[#ffda3a] text-black'
                                        onClick={handleChooseNextWord}
                                    >
                                        下一个
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            ) : (
                <Button className='bg-[#fecb4d] hover:bg-[#ffda3a] text-black' onClick={onStartReview}>
                    开始
                </Button>
            )}
        </>
    )
}

export default Review
