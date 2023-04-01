import React, { useEffect, useState } from "react"
import NFTCard from "./../components/Card"

import { useAccount } from 'wagmi'
import MintForm from "@/components/MintForm"


export default function Home(): JSX.Element {

  const { isConnected } = useAccount()

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  })

  if (!isReady) {
    return <></>
  }

  if (isConnected)

    return (
      <div>
        <MintForm />
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap -mx-4">
            <NFTCard price="1" title="lorem ipsum dolor" description="lorem ipsum dolor" imageURL="https://via.placeholder.com/250x250" />
            < NFTCard price="1" title="lorem ipsum dolor" description="lorem ipsum dolor" imageURL="https://via.placeholder.com/250x250" />
            <NFTCard price="1" title="lorem ipsum dolor" description="lorem ipsum dolor" imageURL="https://via.placeholder.com/250x250" />
          </div >
        </div >
      </div>)

  return (<div className="min-h-screen flex items-center justify-center">
    <div className="shadow-md rounded-lg p-6">
      <p className="text-center text-xl font-semibold">You would need to connect your wallet to use this app.</p>
    </div>
  </div>)
}