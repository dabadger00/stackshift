import { readContract } from '@wagmi/core'
import GreenNFTArtifact from "./../../hardhat/artifacts/contracts/GreenNFT.sol/GreenNFT.json"
import Card from './Card'
import { useEffect, useState } from 'react'

const getTokenURI = (id: number) => {
    const data = readContract({
        address: '0x39b4D8dDD5b2611a4e668CB692B2212F03d5114f',
        abi: GreenNFTArtifact['abi'],
        functionName: 'tokenURI',
        args: [id.toString()]
    })

    return data
}

const getTotalSupply = () => {
    const data = readContract({
        address: '0x39b4D8dDD5b2611a4e668CB692B2212F03d5114f',
        abi: GreenNFTArtifact['abi'],
        functionName: 'totalSupply',
    })

    return data
}

const getOwner = (id: number) => {
    const data = readContract({
        address: '0x39b4D8dDD5b2611a4e668CB692B2212F03d5114f',
        abi: GreenNFTArtifact['abi'],
        functionName: 'ownerOf',
        args: [id.toString()]
    })

    return data
}

const Cards = (): JSX.Element => {

    const [cards, setCards] = useState<any[]>([])

    const renderCard = async () => {

        const _totalSupply: any = await getTotalSupply()

        const totalSupply: number = parseInt(_totalSupply.toString())

        const cards = []

        for (let i = 1; i <= totalSupply; i++) {

            const _owner: any = await getOwner(i);

            const _tokenURI: any = await getTokenURI(i)

            console.log(_tokenURI)

            const response = await fetch(_tokenURI, {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/plain'
                }
            })

            const tokenURI = await response.json()

            const _image = tokenURI.image

            const image = _image.replace("ipfs://", "https://ipfs.io/ipfs/")

            cards.push(< Card owner={_owner} key={i} imageURL={image} price='0' title={`NFT #${i}`} />)
        }

        setCards(cards)
    }

    useEffect(() => {
        renderCard()

    }, [

    ])


    return (<div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap -mx-4">
            {cards ? cards : ''}
        </div>
    </div>)
}
export default Cards