import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

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
      </main>
    </>
  )
}


export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/hello")
  const data = res.json()
  return {
    props: {}, // will be passed to the page component as props
  }
}