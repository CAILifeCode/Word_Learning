import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const Loader = () => {
    return (
        <motion.div
            initial={{ rotate: 0 }}
            animate={{
                rotate: 360,
            }}
            transition={{
                repeat: Infinity,
                duration: 1,
            }}
        >
            <Loader2 size={48} color='#ffffff' />
        </motion.div>
    )
}

export default Loader
