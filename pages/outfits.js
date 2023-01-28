import Head from 'next/head'
import { useState } from 'react';
import { MdOutlineAddCircle, MdOutlineArrowDropDown } from 'react-icons/md'

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
                            <div className={'flex flex-col justify-center items-center w-10/12 z-30 -mt-12 '+(sort.state ? 'transition duration-200 translate-y-12 opacity-100' : 'transition duration-200 opacity-0')}>
                                <div className="
                                                flex justify-start items-center w-full
                                                bg-white hover:bg-gray-100 cursor-pointer transition duration-200
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-pink1"
                                >Recent</div>
                                <div className="
                                                flex justify-start items-center w-full
                                                bg-white hover:bg-gray-100 cursor-pointer transition duration-200
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-pink1"
                                >Rank</div>
                                <div className="
                                                flex justify-start items-center w-full
                                                bg-white hover:bg-gray-100 cursor-pointer transition duration-200
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-pink1"
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
                            <div className={'flex flex-col justify-center items-center w-10/12 z-10 -mt-12 '+(filter.state ? 'transition duration-200 translate-y-12 opacity-100' : 'transition duration-200 opacity-0')}>
                                <div className="
                                                flex justify-start items-center w-full
                                                bg-white hover:bg-gray-100 cursor-pointer transition duration-200
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-purple"
                                >Both</div>
                                <div className="
                                                flex justify-start items-center w-full
                                                bg-white hover:bg-gray-100 cursor-pointer transition duration-200
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-purple"
                                >Multi</div>
                                <div className="
                                                flex justify-start items-center w-full
                                                bg-white hover:bg-gray-100 cursor-pointer transition duration-200
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-purple"
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
            </div>
        </div>
    </>
  )
}

export default outfits