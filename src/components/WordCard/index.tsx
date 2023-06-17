import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, XCircle } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import WorkMarkdown from '@/components/WordMarkdown'
import './index.css'
import Loader from '@/components/Loader'

type Props = {
    onCloseWordCard: () => void
    isShowCollect: boolean
    isCollect: boolean
    isLoading: boolean
    onCollectWorld: () => void
    wordDefinition: string
}
const WordCard = (props: Props) => {
    const { onCloseWordCard, isShowCollect, isCollect, onCollectWorld, wordDefinition, isLoading } = props

    const collect_start_variants = {
        show: { opacity: 1 },
        hide: { opacity: 0 },
    }

    return (
        <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-[200]'>
            <motion.div
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1 }}
                onClick={onCloseWordCard}
                className='absolute left-5 top-5'
            >
                <XCircle size={36} color='#ffffff' />
            </motion.div>
            <AnimatePresence>
                <motion.div animate={{ y: 160 }} initial={{ y: 260 }} exit={{ y: 260 }}>
                    <Card className='card-container absolute left-1/2 -translate-x-1/2 w-[600px] h-[600px] overflow-y-auto no-scrollbar  p-[24px] z-[200]'>
                        <CardTitle>
                            <div className='text-white flex justify-end cursor-pointer h-5'>
                                <motion.div
                                    variants={collect_start_variants}
                                    animate={isShowCollect ? 'show' : 'hide'}
                                    initial={false}
                                >
                                    <Star
                                        size={24}
                                        color={isCollect ? 'yellow' : 'white'}
                                        fill={isCollect ? 'yellow' : 'transparent'}
                                        onClick={onCollectWorld}
                                    />
                                </motion.div>
                            </div>
                        </CardTitle>
                        {isLoading && (
                            <div className='w-[48px] h-[48px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <Loader></Loader>
                            </div>
                        )}
                        {!isLoading && (
                            <CardContent className='word-card__content'>
                                <WorkMarkdown>{wordDefinition}</WorkMarkdown>
                            </CardContent>
                        )}
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
export default WordCard
