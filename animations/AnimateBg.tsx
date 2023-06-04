import React, { useEffect } from 'react'
import { Variants, motion } from 'framer-motion'

export default function AnimateBg({planetLevel}:any) {
    const colors = [
        "linear-gradient(to right, rgba(21, 128, 61, 0.5), rgba(0, 0, 0, 1))", 
        "linear-gradient(to right, rgba(126, 34, 206, 0.5),  rgba(0, 0, 0, 1))",
        "linear-gradient(to right, rgba(29, 78, 216, 0.5),  rgba(0, 0, 0, 1))",
        "linear-gradient(to right, rgba(217, 119, 6, 0.5),  rgba(0, 0, 0, 1))",
        "linear-gradient(to right, rgba(6, 182, 212, 0.5),  rgba(0, 0, 0, 1))",
        "linear-gradient(to right, rgba(0, 0, 0, 0.5),  rgba(0, 0, 0, 1))"
    ]
    useEffect(() => {
      
    }, [])
    const quote:Variants = {
        initial: {
            opacity: 0, 
        },
        animate: {
            opacity: 0.8,
            transition: {
                delay: 0.2,
                duration: 0.8,
                ease: "easeInOut"
            },
            backgroundImage: colors[planetLevel]
        }
    }
    
    
    return (
        <motion.div
            className={`absolute filter blur-xl w-screen h-screen top-0 left-0 -z-50 overflow-hidden`}
            variants={quote}
            initial="initial"
            animate="animate"

        />
    )
}
