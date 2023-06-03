import React from 'react'

function PariBox() {
    return (
        <div className='bg-white text-black opacity-90 flex flex-col items-center rounded-lg p-5 shadow-lg'>
            <section className='flex flex-col items-center justify-center'>
                <h1 className='font-bold text-2xl tracking-wide'>Level 1</h1>
                <h2 className='font-semibold -mt-1 text-xs'>1 minute</h2>
            </section>
            <div className='flex flex-col text-xs w-full mt-4 space-y-1'>
                <span className='flex items-center justify-between'>
                    <h3>Long Pool</h3>
                    <span>87.50</span>
                </span>
                <span className='flex items-center justify-between'>
                    <h3>Short Pool</h3>
                    <span>87.50</span>
                </span>
                <span className='flex items-center justify-between'>
                    <h3>Long Odds</h3>
                    <span>87.50</span>
                </span>
                <span className='flex items-center justify-between'>
                    <h3>Short Odds</h3>
                    <span>87.50</span>
                </span>
                <span className='flex items-center justify-between'>
                    <h3>Starts In</h3>
                    <span>87.50</span>
                </span>
            </div>
            <input type="text" className='p-2 border border-1 m-4 text-sm rounded-lg' placeholder='Enter Amount' />
            <div className='flex items-center space-x-4 justify-center w-full'>
                <button className='hover:bg-green-400 w-full hover:text-white duration-300 px-4 py-2 rounded-lg shadow-md border-green-500 border text-green-500'>Long</button>
                <button className='hover:bg-red-500 hover:text-white duration-300 border-red-500 border text-red-500 px-4 py-2 w-full rounded-lg shadow-md'>Short</button>
            </div>
        </div>
    )
}

export default PariBox