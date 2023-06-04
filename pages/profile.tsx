import React, { useEffect, useMemo, useState } from "react";
import ProfileM from "../components/ProfileM";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import Animate from "@/animations/Animate";
import { useRouter } from "next/router";
import { PublicKey } from "@solana/web3.js";


export default function Profile() {
  const name = 'Miguel Aguilera';
  const age = 25;
  const email = 'miguel.aguilera.ipn@gmail.com';

  const { wallet, publicKey } = useWallet();
  const {connection} = useConnection();
  const { connected } = useWallet();

  const [balance, setBalance] = useState<string | null>(null);
  const router = useRouter();
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (!wallet || !base58) return null;
    return base58.slice(0, 6) + '..' + base58.slice(-6);
  }, [wallet, base58]);
  const fetchBalance = async (publicKey: PublicKey) => {
    const balance1 = await connection.getBalance(publicKey);
    console.log("balance == " + balance1);
    setBalance(balance1.toString().charAt(0));
  };

  useEffect(() => {
    fetchBalance(publicKey!);
  },[])

  useEffect(() => {
    if (!connected) router.push("/login");
  }, [connected])

  return (
    <div className='flex relative items-center'>
      {/* <Animate> */}
      <div className="absolute w-1/3 h-2/3 left-40 p-4">
        {/* <div className="absolute top-0 left-0 w-full h-full bg-slate-50 filter blur-xl opacity-20" /> */}
        <div className="flex flex-col items-center justify-center z-50">
          <div className="flex items-center justify-between space-x-2">
            <img src={wallet?.adapter.icon} alt='Image Icon Wallet' className=' w-16 h-16 p-2 rounded-full' />
            <span className="font-bold text-white">{content}</span>
          </div>
          <div className="text-white text-sm mt-5 flex items-center space-x-5 w-full">
            <span className="text-base">Usuario: </span>
            <span>{name} (Desarrollador)</span>
          </div>
          <div className="text-white text-sm mt-2 flex items-center space-x-5 w-full">
            <span className="text-base">Correo: </span>
            <span>{email}</span>
          </div>
          <div className="text-black text-sm mt-8 mb-10 flex items-center space-x-6 z-50">
            <div className="italic bg-white shadow-lg space-x-4 p-3 flex items-center rounded-md">
              <EmojiEventsIcon className="text-yellow-700" />
              <span><span className="font-bold text-lg">2</span> Awards</span>
            </div>
            <div className="italic bg-white shadow-lg space-x-4 p-3 flex items-center rounded-md">
              <CurrencyExchangeIcon className="text-yellow-700" />
              <span><span className="font-bold text-lg">SOL: </span> {balance} solana</span>
            </div>
          </div>
          <WalletDisconnectButton />
        </div>
      </div>
      {/* </Animate> */}
      <ProfileM model={"/models/profile.glb"} size={1.2} />
    </div>
  );
}


