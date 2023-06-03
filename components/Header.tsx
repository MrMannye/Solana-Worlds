"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion';
import { Avatar } from '@mui/material';

const quote = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.8
        }
    }
}

export default function Header() {
    const footPrintImg = `/logo.png`;
    return (
        <motion.header
            variants={quote}
            initial="initial"
            animate="animate"
            className='flex items-center justify-between p-4 px-6'>
            <div className='flex items-center space-x-4'>
                <Image src={footPrintImg} width={20} height={20} alt='Logo Image' className=' hover:rotate-45 duration-200' />
                <span className='font-bold text-lg tracking-wider'>World Solana</span>
            </div>
            <div className='inline-flex'>
                <Avatar sx={{ width: 25, height: 25, padding: 2 }} className=' bg-blue-900'>M</Avatar>
            </div>
        </motion.header>
    )
}
