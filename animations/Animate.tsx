import React, { useEffect } from 'react'
import { Variants, motion } from 'framer-motion'

export default function Animate({ children }: any) {
    
    const quote: Variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                delay: 0.2,
                ease: "easeInOut"
            },
        }
    }


    return (
        <motion.div
            className={`w-full h-full flex items-center justify-center`}
            variants={quote}
            initial="initial"
            animate="animate"
        >
            {children}
        </motion.div>
    )
}
