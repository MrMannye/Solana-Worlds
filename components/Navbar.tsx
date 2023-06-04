import React, { useEffect, useMemo } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/router';
import FoxProfile from './FoxProfile';
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';

export default function Navbar() {

    const { wallet, connected, publicKey } = useWallet();
    const footPrintImg = `/logo-dark.png`;
    const router = useRouter();

    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const content = useMemo(() => {
        if (!wallet || !base58) return null;
        return base58.slice(0, 6) + '..' + base58.slice(-6);
    }, [wallet, base58]);

    return (
        <header className='absolute top-2 p-2 px-10 flex items-center justify-between w-full '>
            <div className='flex items-center'>
                <FoxProfile model={"/models/floating_fox.glb"} size={1.2} />
                <Image src={footPrintImg} width={20} height={20} alt='Logo Image' className=' hover:rotate-45 duration-200' />
                <h1 className='font-bold tracking-wide text-lg ml-4'>Solana Worlds</h1>
            </div>
            <Link href={"/profile"} className='bg-gradient-to-br from-slate-200 to-black shadow-lg opacity-70 rounded-full p-2 flex items-center text-black text-xs'>
                <span className='px-2'>{content}</span>
                <img src={wallet?.adapter.icon} alt='Image Icon Wallet' className='w-9 h-9 p-2 rounded-full' />
            </Link>
        </header>
    )
}
