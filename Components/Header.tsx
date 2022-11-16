import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
// interface FunctionProps{
//     bringTweet:void
// }


const Header:React.FC=({bringTweet}) =>{

  return (
    <div className="pt-20 px-4">
        <p className='font-extrabold text-xl sm:text-3xl md:font-semibold md:text-4xl lg:font-bold 
        lg:text-5xl fontInter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent text-center bg-clip-text'>Capture tweets in a beautiful frame</p>
        <div className='pt-14'>
            <form onSubmit={bringTweet} className='flex  justify-center w-2/3 mx-auto border-gray-400 border-2 rounded-md'>
                    <input type="text" name="tweetURL" placeholder='https://twitter.com/BenAffleck/status/1353782947254394880' 
                    className='outline-none flex-grow py-1 px-2'/>
                    <button type='submit'>
	                <MagnifyingGlassIcon className='h-5 text-blue-500 px-2' />
	                </button>
            </form>
        </div>
    </div>
  )
}
export default Header;