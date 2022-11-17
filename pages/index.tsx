import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import Header from '../Components/Header'
import Main from '../Components/Main'
import styles from '../styles/Home.module.css'


export default function Home() {
  const [bg, setBg] = useState('linear-gradient(106.8deg, rgb(117, 255, 220) 6%, rgb(163, 216, 255) 47.6%, rgb(248, 215, 251) 87.8%)')

  const tweetRef = useRef(null)

  const [tweetData, setTweetData] = useState(null)

  const [showTime, setShowTime] = useState(true)
  const [showMetrics, setShowMetrics] = useState(true)
  const [showSource, setShowSource] = useState(true)
  
  const [scale, setScale] = useState(0.9)

  const [hint, setHint] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const bringTweet= async(e:React.SyntheticEvent)=>{
    try{
      e.preventDefault()
      setHint(false)
      setLoading(true)
      const url = e.target.elements.tweetURL.value 
      const id =url.split('/')[5]
      const {data,status}= await axios.get(`api/tweet/${id}`)
      if(data.message){
        setError(true)
        setLoading(true)
        setTweetData(null)
      }
      else{
        setLoading(false)
        setTweetData(data.data)
        setError(false)
      }
    }
    catch(e){
      setError(true)
      setLoading(false)
      setTweetData(null)
    }
  }
  return (
    <>
        <Head>
                <title>Twimage - Create beautiful tweets</title>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head >

            
<Header bringTweet={bringTweet}/>
            <div>
<Main  tweetRef={tweetRef} bg={bg} scale={scale} hint={hint} loading={loading} error={error} tweetData={tweetData} showTime={showTime} showMetrics={showMetrics} showSource={showSource} />
            </div>
            <footer>
              <p className="fontInter">Check out the sourcecode of this project at my <Link href="https://github.com/AlAminKh03"><a className="text-green-500"> GitHub</a></Link></p>
            </footer>
    </>
  )
}
