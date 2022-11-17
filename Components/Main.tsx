import React from 'react'
import Tweet from './Tweet'

interface MainProps{

}

export default function Main({ tweetRef, bg, scale, hint,loading, error, tweetData, showTime, showMetrics, showSource}:any) {
  
    if(hint){
    	return (
    		<div  className='non-tweet mx-auto fontInter py-2 flex flex-col'>
    		    <div>
    		        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="8rem" height="8rem"><path fill="none" d="M0 0h24v24H0z"/><path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" fill="#1DA1F2"/></svg>
    		    </div>
    		    <p className='fontInter p-4 text-gray-700 text-center'>Welcome! To get started, paste the link of the tweet in the box above</p>
    		</div>
    	)
    }

    if(loading){
    	return <div className='non-tweet fontInter my-0 mx-auto  min-w-[90vw] md:min-w-[80vw] lg:min-w-[50vw]'> 
        <div role="status">
    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
    </div>
        </div>
    }

    if(tweetData){
        if(tweetData.message){
            return  <div className='non-tweet fontInter my-0 mx-auto  min-w-[90vw] md:min-w-[80vw] lg:min-w-[50vw]'><p className='p-4 font-semibold'>Something is wrong with the URL. Please double check.</p></div>
        }
    }

    if(error){
    	return ( 
            <div className='non-tweet fontInter my-0 mx-auto  min-w-[90vw] md:min-w-[80vw] lg:min-w-[50vw]'>
            <p className='p-4 font-semibold'>Oops! 😬 Something went wrong. Please try again.</p>
            </div>
            )
    }

    return (
        <div className='my-0 mx-auto'>
        <div className='con min-w-[90vw] md:min-w-[80vw] lg:min-w-[50vw] max-w-[90vw] md:max-w-[80vw] lg:max-w-[50vw] rounded-sm px-1 py-3 md:py-5' style={{background : bg}} ref={tweetRef}>
            <div className='container' style={{transform: `scale(${scale})`}} >
                { 
                    tweetData && <Tweet
                        tweet={tweetData}
                        showTime={showTime}
                        showMetrics={showMetrics}
                        showSource={showSource}
                     />
                }
            </div>
        </div>
    </div>
  )
}