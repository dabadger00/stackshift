import React, { useEffect, useState } from "react"
import Cards from "./../components/Cards"

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
        <Cards />
      </div>)

  return (<div className="min-h-screen flex items-center justify-center">
    <div className="shadow-md rounded-lg p-6">
      <p className="text-center text-xl font-semibold">You would need to connect your wallet to use this app.</p>
    </div>
  </div>)
}