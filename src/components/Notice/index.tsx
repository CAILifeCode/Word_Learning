import React from 'react'
import { Bell } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Notice = () => {
    return (
        <Link href='https://github.com/CAILifeCode/Word_Learning/blob/main/CHANGELOG.md'>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            className='fixed right-[100px] top-5'
                            initial={{ scale: 0.95 }}
                            whileHover={{ scale: 1 }}
                        >
                            <Bell color='#ffffff' size={24} />
                            <div className='absolute right-0 -top-1 w-2 h-2 bg-red-500 rounded-full'></div>
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className='z-[300]'>
                        <p>更新历史</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Link>
    )
}

export default Notice
