import Head from 'next/head'
import { useState } from 'react';
import { MdOutlineAddCircle, MdOutlineArrowDropDown } from 'react-icons/md'
import { HiOutlineStar, HiStar } from 'react-icons/hi'
import styles from '../styles/Home.module.css'

const outfits = () => {
    const [sort, setSort] = useState({
        state: false,
        type: 'recent'
    });
    const [filter, setFilter] = useState({
        state: false,
        type: 'both'
    });
    const [rankingType, setRankingType] = useState('basic');

    const [test, setTest] = useState(false)

  return (
    <>
        <Head>
            <title>rankmyOutfit - Outfits</title>
            <meta name="description" content="Make sure you look your Best" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="grid grid-cols-8 w-full">
            <div className="lg:col-start-2 col-span-8 lg:col-span-6 flex flex-col justify-center items-center">

                {/* Adding a new Outfit */}
                <div className="
                                flex justify-around items-center w-full h-32
                                border-2 border-black rounded-t-3xl"
                >
                    <div className="flex flex-col sm:flex-row justify-around sm:justify-evenly items-center w-full h-full">
                        <div className='flex flex-col justify-start items-center h-11 w-full' style={{maxWidth: '150px'}}>
                            <div 
                                className={`
                                            flex justify-around items-center w-10/12
                                            cursor-pointer drop-shadow-md rounded-t-3xl
                                            py-1 sm:px-3 z-40
                                            transition duration-300
                                            group hover:bg-my-pink1 `+ (sort.state && 'bg-my-pink1')}
                                onClick={()=>setSort({...sort, state: !sort.state})}
                            >
                                <p className={`
                                            text-xl sm:text-2xl mx-1 font-display 
                                            group-hover:text-white `+(sort.state ? 'text-white' : 'text-my-pink1')}
                                            >Sort</p>
                                <MdOutlineArrowDropDown 
                                className={`
                                            h-6 w-6
                                            group-hover:fill-white `+(sort.state ? 'fill-white' : 'fill-my-pink1')} 
                                            />
                            </div>
                            <div className={'flex flex-col justify-center items-center w-10/12 z-30 -mt-8 '+(sort.state ? 'transition duration-200 translate-y-8 opacity-100' : 'transition duration-200 opacity-0')}>
                                <div 
                                    className={`flex justify-start items-center w-full
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-pink1
                                                cursor-pointer transition duration-300 `+(sort.type==='recent' ? 'bg-my-pink1 text-white' : 'bg-white hover:bg-gray-100')}
                                    onClick={()=>setSort({...sort, type: 'recent'})}
                                >Recent</div>
                                <div className={`flex justify-start items-center w-full
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-pink1
                                                cursor-pointer transition duration-300 `+(sort.type==='rank' ? 'bg-my-pink1 text-white' : 'bg-white hover:bg-gray-100')}
                                    onClick={()=>setSort({...sort, type: 'rank'})}
                                >Rank</div>
                                <div className={`flex justify-start items-center w-full
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-pink1
                                                cursor-pointer transition duration-300 `+(sort.type==='popularity' ? 'bg-my-pink1 text-white' : 'bg-white hover:bg-gray-100')}
                                    onClick={()=>setSort({...sort, type: 'popularity'})}
                                >Popularity</div>
                            </div>
                        </div>
                        
                        <div className='flex flex-col justify-start items-center h-11 w-full' style={{maxWidth: '150px'}}>
                            <div 
                                className={`
                                            flex justify-around items-center w-10/12
                                            cursor-pointer drop-shadow-md rounded-t-3xl
                                            py-1 sm:px-3 z-20
                                            transition duration-300
                                            group hover:bg-my-purple `+ (filter.state && 'bg-my-purple')}
                                onClick={()=>setFilter({...filter, state: !filter.state})}
                            >
                                <p className={`
                                            text-xl sm:text-2xl mx-1 font-display 
                                            group-hover:text-white `+(filter.state ? 'text-white' : 'text-my-purple')}
                                        >Filter</p>
                                <MdOutlineArrowDropDown 
                                className={`
                                            h-6 w-6
                                            group-hover:fill-white `+(filter.state ? 'fill-white' : 'fill-my-purple')} 
                                        />
                            </div>
                            <div className={'flex flex-col justify-center items-center w-10/12 z-10 -mt-8 '+(filter.state ? 'transition duration-200 translate-y-8 opacity-100' : 'transition duration-200 opacity-0')}>
                                <div className={`flex justify-start items-center w-full
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-purple
                                                cursor-pointer transition duration-300 `+(filter.type==='both' ? 'bg-my-purple text-white' : 'bg-white hover:bg-gray-100')}
                                    onClick={()=>setFilter({...filter, type: 'both'})}
                                >Both</div>
                                <div className={`flex justify-start items-center w-full
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-purple
                                                cursor-pointer transition duration-300 `+(filter.type==='multi' ? 'bg-my-purple text-white' : 'bg-white hover:bg-gray-100')}
                                    onClick={()=>setFilter({...filter, type: 'multi'})}
                                >Multi</div>
                                <div className={`flex justify-start items-center w-full
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-purple
                                                cursor-pointer transition duration-300 `+(filter.type==='onesies' ? 'bg-my-purple text-white' : 'bg-white hover:bg-gray-100')}
                                    onClick={()=>setFilter({...filter, type: 'onesies'})}
                                >Onesies</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex sm:mx-8 md:mx-14 lg:mx-20 justify-center items-center">
                        <MdOutlineAddCircle className='fill-my-pink1 w-20 sm:w-24 h-20 sm:h-24 cursor-pointer' />
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-around items-center w-full h-full">
                        <button 
                            className="w-full py-1 sm:px-4 rounded-3xl bg-my-purple" 
                            style={{maxWidth: '150px'}}
                            onClick={()=>setRankingType(prev=>{
                                if (prev==='advanced') {
                                    return 'basic';
                                } else {
                                    return 'advanced';
                                }
                            })}
                        >
                            <p className="text-md md:text-xl font-display text-white text-center">{rankingType==='basic' ? 'Advanced' : 'Basic'}</p>
                        </button>
                        <button className="w-full py-1 sm:w-12 rounded-3xl bg-my-pink1" style={{maxWidth: '150px'}}>
                            <p className="text-md md:text-xl font-display text-white text-center">AI</p>
                        </button>
                    </div>
                </div>

                {/* List of Outfits  */}
                <div className="flex flex-col justify-center items-center rounded-b-3xl bg-soft-pink w-full z-50">
                    <div className={"flex flex-col justify-center items-center rounded px-4 my-4 " +styles.boxshadow}>
                        <h3 className="font-title font-bold text-4xl drop-shadow-lg text-black    my-4">Choose the best</h3>
                        <h3 className="font-title font-bold text-4xl drop-shadow-lg text-my-pink2 mb-4">Outfit</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-4">

                            <div onClick={()=>setTest(prev=>!prev)} className="relative rounded-3xl w-72 h-96 cursor-pointer">
                                <img className='block object-cover w-72 h-96 object-cover rounded-3xl' src="https://cdn.myanimelist.net/images/characters/9/66231.jpg" alt="" />
                                <HiOutlineStar color='white' className={'absolute h-8 w-8 transition duration-200 top-0 right-0 m-2 '+(test && 'animate-pingonce fill-white')} />
                            </div>
                            
                            <div onClick={()=>setTest(prev=>!prev)} className="relative rounded-3xl w-72 h-96 cursor-pointer">
                                <img className='block object-cover w-72 h-96 object-cover rounded-3xl' src="https://cdn.myanimelist.net/images/characters/6/241415.jpg" alt="" />
                                <HiOutlineStar color='white' className={'absolute h-8 w-8 transition duration-200 top-0 right-0 m-2 '+(test && 'animate-pingonce fill-white')} />
                            </div>
                            
                            <div onClick={()=>setTest(prev=>!prev)} className="relative rounded-3xl w-72 h-96 cursor-pointer">
                                <img className='block object-cover w-72 h-96 object-cover rounded-3xl' src="https://cdn.myanimelist.net/images/characters/16/288705.jpg" alt="" />
                                <HiOutlineStar color='white' className={'absolute h-8 w-8 transition duration-200 top-0 right-0 m-2 '+(test && 'animate-pingonce fill-white')} />
                            </div>
                            
                            <div onClick={()=>setTest(prev=>!prev)} className="relative rounded-3xl w-72 h-96 cursor-pointer">
                                <img className='block object-cover w-72 h-96 object-cover rounded-3xl' src="https://cdn.myanimelist.net/images/characters/11/290052.jpg" alt="" />
                                <HiOutlineStar color='white' className={'absolute h-8 w-8 transition duration-200 top-0 right-0 m-2 '+(test && 'animate-pingonce fill-white')} />
                            </div>
                            
                        </div>
                        <div className="flex justify-center items-center my-4">
                            <button className="h-12 w-44 text-center bg-my-purple rounded-3xl">
                                <p className="font-display text-white text-xl">Rate</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default outfits