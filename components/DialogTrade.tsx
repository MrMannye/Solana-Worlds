import { Dialog, DialogContent, InputAdornment, TextField } from '@mui/material'

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Levels } from '@/utils/Levels';

import { PariConfig } from '@/utils/Config';
import {
    ParimutuelWeb3,
    MarketPairEnum,
    getMarketPubkeys,
    calculateNetOdd
} from "@hxronetwork/parimutuelsdk";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PlacePositionBox from './PlacePositionBox';

export default function DialogTrade({ open, setOpen, level, userLevel }: any) {

    const { config } = PariConfig;
    const { publicKey } = useWallet();
    const base58 = useMemo<string>(() => {return publicKey ? publicKey.toBase58() : ""}, [publicKey]);

    const { connection } = useConnection();
    const parimutuelWeb3 = new ParimutuelWeb3(config, connection);
    const [currentLevel, setCurrentLevel] = useState<Level>();
    const [pariObj, setPariObj] = useState<PariObj>();
    const [countDownTime, setCountDownTime] = useState<string>("");

    // To get only the BTC-USD Market Contests
    const marketPair = MarketPairEnum.BTCUSD;

    const markets = getMarketPubkeys(config, marketPair);
    const marketsByTime = markets.filter(
        (market) => market.duration === currentLevel?.time
    );

    useEffect(() => {
        const currentLevel: Level = Levels.filter((element: Level) => element.id === (level + 1))[0];
        setCurrentLevel(currentLevel);
    }, [level])


    useEffect(() => {
        const getPariData = async () => {
            try {
                // make sure that we don't exceed the localStorage 10MB capacity when 
                // calling our data
                localStorage.clear();
                const parimutuels = await parimutuelWeb3.getParimutuels(marketsByTime);
                const duration = marketsByTime[0].duration;

                // Fetch contest data and set it in the pariObj state
                const pari_markets = parimutuels.filter(
                    (account) =>
                        account.info.parimutuel.timeWindowStart.toNumber() > Date.now() &&
                        account.info.parimutuel.timeWindowStart.toNumber() <
                        Date.now() + duration * 1000
                );
                let longPool: any =
                    (pari_markets[0].info.parimutuel.activeLongPositions.toNumber() /
                        1_000_000_000);
                let shortPool: any =
                    (pari_markets[0].info.parimutuel.activeShortPositions.toNumber() /
                        1_000_000_000);
                const longOdds = calculateNetOdd(longPool, longPool + shortPool, 0.03);
                const shortOdds = calculateNetOdd(
                    shortPool,
                    longPool + shortPool,
                    0.03
                );
                const pubkey = pari_markets[0].pubkey.toString();
                const locksTime =
                    pari_markets[0].info.parimutuel.timeWindowStart.toNumber();

                var formattedTime = "00:00:00";
                if (locksTime) {
                    const currentTime = new Date().getTime();
                    const timeDiff = locksTime - currentTime;
                    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                    const minutes = Math.floor(
                        (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
                    );
                    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                    formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes
                        }:${seconds < 10 ? "0" + seconds : seconds}`;
                }
                setCountDownTime(formattedTime);

                longPool = longPool.toFixed(2)
                shortPool = shortPool.toFixed(2)
                setPariObj({ longPool, shortPool, longOdds, shortOdds, pubkey });
            } catch (error) {
                console.error(error);
            }
        };
        getPariData();
        // const intervalId = setInterval(() => getPariData(), 40000);
        // return () => clearInterval(intervalId);
    }, []);

    const closeDialog = () => {
        setOpen(false)
    };

    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogContent className='p-5 relative z-40'>
                {level >= userLevel &&
                    <div className='absolute flex items-center space-y-2 justify-center flex-col top-0 left-0 w-full h-full bg-black z-50 opacity-90'>
                        <QuestionMarkIcon className='text-white text-lg' />
                        <span className='text-white text-xs'>Debes ganar el nivel anterior</span>
                    </div>
                }
                <Image src={"/solana.png"} width={50} height={50} alt='Logo Image' className='hover:rotate-45 rounded-full absolute top-2 right-4 duration-200' />
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='font-bold text-2xl tracking-wide'>{currentLevel?.level}</h1>
                    <h2 className='font-semibold -mt-1 text-xs'>{currentLevel?.timeTitle}</h2>
                </div>
                <div className='flex flex-col text-xs w-full my-4 space-y-1'>
                    <span className='flex items-center justify-between'>
                        <h3>Long Pool</h3>
                        <span>{pariObj ? pariObj?.longPool : "87.95"}</span>
                    </span>
                    <span className='flex items-center justify-between'>
                        <h3>Short Pool</h3>
                        <span>{pariObj ? pariObj.shortPool : "87.95"}</span>
                    </span>
                    <span className='flex items-center justify-between'>
                        <h3>Long Odds</h3>
                        <span>{pariObj ? pariObj.longOdds : "87.95"}</span>
                    </span>
                    <span className='flex items-center justify-between'>
                        <h3>Short Odds</h3>
                        <span>{pariObj ? pariObj.shortOdds : "87.95"}</span>
                    </span>
                    <span className='flex items-center justify-between'>
                        <h3>Starts In</h3>
                        <span>{countDownTime === "" ? "00:00:00" : countDownTime}</span>
                    </span>
                </div>
                <PlacePositionBox pubkey={pariObj ? pariObj.pubkey : "Loading"} />
            </DialogContent>
        </Dialog>
    )
}