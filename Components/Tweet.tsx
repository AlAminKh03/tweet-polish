import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react'

type Props = {}

const Tweet=({tweet,showTime,showMetrics,showSource}:any)=> {
    const urls = tweet.data?.entities?.urls

	const linkregex = /(https?:\/\/[^\s]+)/g;

	const dp = tweet.includes.users[0].profile_image_url
	const name = tweet.includes.users[0].name
	const username = tweet.includes.users[0].username
	const isVerified = tweet.includes.users[0].verified
	const image = tweet.includes?.media ? tweet.includes.media[0].url : null
	const source = tweet.data.source
	const likes = tweet.data.public_metrics.like_count
	const retweets = tweet.data.public_metrics.retweet_count
	const createdAt = tweet.data.created_at

	let text = tweet.data.text
	const link_occurs = text.match(linkregex)


	if(urls && tweet.includes.media) {
		text = text.replace(text.slice(urls[urls.length-1].start, urls[urls.length-1].end+1), '')
	}


	link_occurs?.forEach((link:any, i:any)  => {
		if(!tweet.includes.media){
			const corres_url = urls[i]
			text = text.replace(text.slice(corres_url.start, corres_url.end), corres_url.expanded_url)
		}
		else {
			if(i === link_occurs.length - 1) {
				return
			}
			else {
				const corres_url = urls[i]
				text = text.replace(text.slice(corres_url.start, corres_url.end), corres_url.expanded_url)
			}
		}
	})

	text = text.replace('&amp;', '&')


	const date = new Date(createdAt)

	const modLikes = likes >= 1000 ? `${(likes/1000).toPrecision(2)}k` : likes
	const modRetweets = retweets >= 1000 ? `${(retweets/1000).toPrecision(2)}k` : retweets
  return (
    <div className='p-1 md:p-1.5 lg:p-2 rounded-sm' >
			<div className='tweet'>
	            <div className="flex items-center">
	            	<Image src={dp} className="w-[55px] md:w-[58px] lg:w-[60px] rounded-full" />
	            	<div className="ml-4 flex-1">
	            		<p  className='flex text-base md:text-lg lg:text-xl'>
            				<span className="bold mr-2">{name}</span>
	            			{isVerified && <svg style={{color: '#1DA1F2'}} viewBox="0 0 24 24" aria-label="Verified account" fill="currentColor" focusable="false" width='16'><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>}
	            		</p>
	            		<p  className='text-gray-500 text-base md:text-lg lg:text-xl'>
	            		 	@{username}
	            		</p>
	            	</div>
	            </div>
	            <p className="text-base md:text-lg lg:text-xl mt-3">
	           		{text}
	            </p>
	            {image && <Image src={image} className="mt-2" objectFit='cover'/>}
	            <div className='flex items-center mt-1 text-gray-500'>
            		<p className='text-sm md:text-base lg:text-lg'>
            			<span>{showTime && date && format(date, 'h:mm a · LLL d, yyyy · ')}</span>
            			{showSource && <span>{source}</span>}
            		</p>
	            </div>
	            {showMetrics && <div className='flex mt-1'>
                	<p className='text-sm md:text-base lg:text-lg'>
                		<span className='bold'>{modLikes}</span> <span className='sec likes'> Likes</span>  <span className='bold'>{modRetweets}</span> <span className='sec'> Retweets</span>
                	</p>
	            </div>}
	        </div>
	  	</div>
  )
}
export default Tweet;