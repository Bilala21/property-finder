import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [proData, serProData] = useState([])
  console.log(proData)
  useEffect(()=>{
    axios.get("https://property-finder-three.vercel.app/api/get-products").
    then(data=>serProData(data.data) )
  },[proData])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Hi Bilal</h1>
        {
          proData.length&& proData.map(el=>{
            return(
              <p>{el.name}</p>
            )
          })
        }
      </main>
    </>
  )
}


// export async function getServerSideProps(context) {
//   const res = await fetch("https://property-finder-three.vercel.app/api/hello")
//   const data = res.json()
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }