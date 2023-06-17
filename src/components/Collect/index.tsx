import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { clsx } from 'clsx'
import { Star } from 'lucide-react'
import { ENWord } from '@/types'
import './index.css'

type Props = {
    cardList: ENWord[]
    onCancelCollect: (word: string) => void
    onSelectCollectWord: (word: string) => void
}

const Collect = ({ cardList, onCancelCollect, onSelectCollectWord }: Props) => {
    return cardList.map((item) => (
        <Card
            key={item.word}
            className={clsx([
                'collect-word-card',
                'px-2',
                'h-10',
                'min-w-[100px]',
                'items-center',
                'flex',
                'justify-center',
                'bg-second',
                'border-0',
                'hover:bg-second',
                'transition',
                'duration-300',
            ])}
        >
            <CardContent className={clsx(['p-0', 'text-second-text'])}>
                <div className='flex justify-center items-center' onClick={() => onSelectCollectWord(item.word)}>
                    <span className='pr-2 cursor-default'>{item.word}</span>
                    <Star
                        size={16}
                        fill='yellow'
                        color='yellow'
                        className='cursor-pointer'
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onCancelCollect(item.word)
                        }}
                    ></Star>
                </div>
            </CardContent>
        </Card>
    ))
}
export default Collect
