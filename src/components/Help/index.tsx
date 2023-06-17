import React from 'react'
import { HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const Help = () => {
    return (
        <Link
            href='https://puzzled-archduke-ed0.notion.site/Word-Learning-211888d2bd1b4c2d9ae964e486691e33?pvs=4'
            target='_blank'
        >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            className='fixed right-[60px] top-5'
                            initial={{ scale: 0.95 }}
                            whileHover={{ scale: 1 }}
                        >
                            <HelpCircle size={24} color='#ffffff' />
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="z-[300]">
                        <p>前往帮助文档</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Link>
    )
}
export default Help
