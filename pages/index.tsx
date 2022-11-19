import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { useRef, useState } from 'react'
import Header from '../Components/Header'
import Main from '../Components/Main'
import Settings from '../Components/Settings'
import styles from '../styles/Home.module.css'


export default function Home() {
  const [bg, setBg] = useState('linear-gradient(106.8deg, rgb(117, 255, 220) 6%, rgb(163, 216, 255) 47.6%, rgb(248, 215, 251) 87.8%)')

  const tweetRef = useRef<HTMLButtonElement |null>(null)

  const [tweetData, setTweetData] = useState(null)

  const [showTime, setShowTime] = useState(true)
  const [showMetrics, setShowMetrics] = useState(true)
  const [showSource, setShowSource] = useState(true)
  
  const [scale, setScale] = useState(0.9)

  const [hint, setHint] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const bringTweet= async(e:React.FormEventHandler<HTMLFormElement>)=>{
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

  const convert = async (format:any) => {

    const node = tweetRef.current
    const scale = 2

    let dataUrl

    const style = {
        transform: 'scale(2)',
        transformOrigin: 'top left',
    }

    const param = {
       height: node.offsetHeight * scale,
       width: node.offsetWidth * scale,
       quality: 1,
       style
    }

    switch (format) {
        case 'png':
            {
                dataUrl = await domtoimage.toPng(node, param)
                saveAs(dataUrl, `${new Date().toJSON()}.${format}`)
                return
            }

        case 'jpeg':
            {
                dataUrl = await domtoimage.toJpeg(node, param)
                saveAs(dataUrl, `${new Date().toJSON()}.${format}`)
                return
            }

        case 'svg':
            {
                dataUrl = await domtoimage.toSvg(node, param)
                saveAs(dataUrl, `${new Date().toJSON()}.${format}`)
                return
            }
    }
}
const propsForSettings = {
  showTime, setShowTime, showMetrics, setShowMetrics, showSource, setShowSource, scale, setScale, convert, bg, setBg
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
            {!hint && <Settings props={propsForSettings}/>}
            </div>
            <footer>
              <p className="fontInter">Check out the sourcecode of this project at my <Link href="https://github.com/AlAminKh03"><a className="text-green-500"> GitHub</a></Link></p>
            </footer>
    </>
  )
}
