import { Dialog, DialogContent, InputAdornment, TextField } from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Levels } from '@/utils/Levels';

import { PariConfig } from '@/utils/Config';
import {
    ParimutuelWeb3,
    MarketPairEnum,
    getMarketPubkeys,
    calculateNetOdd,
} from "@hxronetwork/parimutuelsdk";

export default function DialogTrade({ open, setOpen, level }: any) {

    const { config } = PariConfig;
    const { publicKey } = useWallet();
    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const [trade, setTrade] = useState<string>("")

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


    // useEffect(() => {
    //     const getPariData = async () => {
    //         try {
    //             // make sure that we don't exceed the localStorage 10MB capacity when 
    //             // calling our data
    //             localStorage.clear();
    //             const parimutuels = await parimutuelWeb3.getParimutuels(marketsByTime);
    //             const duration = marketsByTime[0].duration;

    //             // Fetch contest data and set it in the pariObj state
    //             const pari_markets = parimutuels.filter(
    //                 (account) =>
    //                     account.info.parimutuel.timeWindowStart.toNumber() > Date.now() &&
    //                     account.info.parimutuel.timeWindowStart.toNumber() <
    //                     Date.now() + duration * 1000
    //             );
    //             let longPool: any =
    //                 (pari_markets[0].info.parimutuel.activeLongPositions.toNumber() /
    //                     1_000_000_000);
    //             let shortPool: any =
    //                 (pari_markets[0].info.parimutuel.activeShortPositions.toNumber() /
    //                     1_000_000_000);
    //             const longOdds = calculateNetOdd(longPool, longPool + shortPool, 0.03);
    //             const shortOdds = calculateNetOdd(
    //                 shortPool,
    //                 longPool + shortPool,
    //                 0.03
    //             );
    //             const pubkey = pari_markets[0].pubkey.toString();
    //             const locksTime =
    //                 pari_markets[0].info.parimutuel.timeWindowStart.toNumber();

    //             var formattedTime = "00:00:00";
    //             if (locksTime) {
    //                 const currentTime = new Date().getTime();
    //                 const timeDiff = locksTime - currentTime;
    //                 const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    //                 const minutes = Math.floor(
    //                     (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
    //                 );
    //                 const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    //                 formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes
    //                     }:${seconds < 10 ? "0" + seconds : seconds}`;
    //             }
    //             setCountDownTime(formattedTime);

    //             longPool = longPool.toFixed(2)
    //             shortPool = shortPool.toFixed(2)

    //             setPariObj({ longPool, shortPool, longOdds, shortOdds, pubkey });
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     const intervalId = setInterval(() => getPariData(), 1000);
    //     return () => clearInterval(intervalId);
    // }, []);

    const closeDialog = () => {
        setOpen(false)
    };

    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogContent className='p-5 relative z-40'>
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
                        <span>{countDownTime === "" ? "00:00:00" : countDownTime }</span>
                    </span>
                </div>
                <TextField
                    id="outlined-password-input"
                    label="Amount"
                    type="text"
                    autoComplete="amount"
                    size='small'
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                    className='my-4'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CurrencyExchangeIcon className='text-purple-700 ' sx={{ width: 16 }} />
                            </InputAdornment>
                        )
                    }}
                />
                <div className='flex items-center space-x-4 justify-center w-full mt-4'>
                    <button disabled={!trade.length} className='hover:bg-green-400 w-full hover:text-white duration-300 px-4 py-2 rounded-lg shadow-md border-green-500 border text-green-500 disabled:opacity-40'>Long</button>
                    <button disabled={!trade.length} className='hover:bg-red-500 hover:text-white duration-300 border-red-500 border text-red-500 px-4 py-2 w-full rounded-lg shadow-md  disabled:opacity-40'>Short</button>
                </div>
            </DialogContent>
            {/* <DialogActions>
                <Button disabled={addDisabled} onClick={handleClose}>Agregar</Button>
            </DialogActions> */}
        </Dialog>
    )
}