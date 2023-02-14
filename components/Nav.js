import Link from 'next/link'
import React from 'react'

const Nav = () => {
  return (
    <div className='grid grid-cols-8 w-full h-16'>
        <div className="grid grid-cols-8 justify-center items-center h-full col-start-0 col-span-8 lg:col-start-2 lg:col-span-6">
            <Link className='flex justify-center items-center | col-span-5 sm:col-span-4 md:col-span-2' href='/'>
                <img className='mx-2 xs:mx-4' src="/favicon.ico" alt="logo" width={30} />
                <h1 className='text-md xs:text-xl font-black font-display' style={{color: '#DB76DC'}}>rankmyOutfit</h1>
            </Link>
            <div className='hidden md:flex col-span-2'></div>
            <div className='flex justify-evenly items-center | invisible sm:visible  | hidden sm:flex col-span-2'>
                <h5 className='text-sm font-bold font-display' style={{color: '#DB76DC'}}>How it works</h5>
                <h5 className='text-sm font-bold font-display' style={{color: '#DB76DC'}}>Contact</h5>
            </div>
            <div className='flex justify-center items-center col-span-3 sm:col-span-2'>
                <div className='rounded-full w-24 sm:w-32 h-10 flex justify-center items-center' style={{backgroundColor: '#6F1AB6'}}>
                    <Link href='/signin'><h5 className='font-display font-bold text-white text-sm'>Sign in</h5></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Nav