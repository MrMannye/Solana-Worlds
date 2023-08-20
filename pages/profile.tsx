import React, { useEffect, useMemo, useState } from "react";
import ProfileM from "../components/ProfileM";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import { PublicKey } from "@solana/web3.js";
import { TextField } from "@mui/material";


export default function Profile() {

  const [user, setUser] = useState<User>({ name: "User", email: "example@gmail.com" })

  const { wallet, publicKey } = useWallet();
  const { connection } = useConnection();
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
  }, [])

  useEffect(() => {
    if (!connected) router.push("/login");
  }, [connected])

  return (
    <div className='flex relative items-center'>
      <div className="absolute w-1/3 h-2/3 left-40 p-4">
        <div className="flex flex-col items-center justify-center z-50">
          <div className="flex items-center justify-between space-x-2">
            <img src={wallet?.adapter.icon} alt='Image Icon Wallet' className=' w-16 h-16 p-2 rounded-full' />
            <span className="font-bold text-white">{content}</span>
          </div>
          <div className="text-white text-sm mt-5 flex items-center space-x-5 w-full">
            <span className="text-base w-12">Usuario: </span>
            <TextField
              label="Name"
              type="text"
              autoComplete="amount"
              size='small'
              value={user.name}
              onChange={(e) => setUser(prevUser => ({ ...prevUser, name: e.target.value }))}
            />
          </div>
          <div className="text-white text-sm mt-2 flex items-center space-x-5 w-full">
            <span className="text-base w-12">Correo: </span>
            <TextField
              label="Email"
              type="text"
              placeholder="Name"
              autoComplete="amount"
              size='small'
              value={user.email}
              onChange={(e) => setUser(prevUser => ({ ...prevUser, email: e.target.value }))}
            />
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
          <div className="flex items-center justify-evenly w-full">
            <WalletDisconnectButton />
            <button
              className="wallet-adapter-button wallet-adapter-button-trigger"
              type="button"
              onClick={() => console.log("Save Data")}
            >
              <i className="wallet-adapter-button-start-icon">
                <PersonIcon className="" />
              </i>
              Save User
            </button>
          </div>
        </div>
      </div>
      <ProfileM model={"/models/profile.glb"} size={1.2} />
    </div>
  );
}


