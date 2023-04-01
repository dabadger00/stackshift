import { useContractWrite, usePrepareContractWrite } from "wagmi"
import GreenNFTArtifact from "./../../hardhat/artifacts/contracts/GreenNFT.sol/GreenNFT.json"
import { useState } from "react"
import { utils } from "ethers"

const useMintNFT = (address: string) => {
    const { config } = usePrepareContractWrite({
        address: '0x39b4D8dDD5b2611a4e668CB692B2212F03d5114f',
        abi: GreenNFTArtifact['abi'],
        functionName: 'safeMint',
        args: [address]
    })

    const { write, isSuccess, isError } = useContractWrite(config)


    return [write, isSuccess, isError]
}


const MintForm = (): JSX.Element => {

    const [address, setAddress] = useState<string>("")

    const [mintNFT, isSuccess, isError] = useMintNFT("0x39b4D8dDD5b2611a4e668CB692B2212F03d5114f")

    const [errorMessage, setErrorMessage] = useState("")

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h1 className="text-center text-2xl font-semibold mb-4">Mint NFT</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Address:</label>
                        <input onChange={(e: any) => setAddress(e.target.value)} type="text" id="address" name="address" placeholder="Enter Celo address" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-prosperity" />
                        {errorMessage && (<p className="text-sm text-red-500 mt-2">{errorMessage}</p>)}
                        {isError && (<p className="text-sm text-red-500 mt-2">Error While Minting</p>)}
                        {isSuccess && (<p className="text-sm text-red-500 mt-2">Minted Successfully</p>)}
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault()
                        if (!utils.isAddress(address)) {
                            setErrorMessage("invalid address")
                            return
                        }
                        setErrorMessage("")
                        console.log(address)
                        mintNFT?.()
                    }} type="submit" className="w-full bg-prosperity text-dark font-semibold py-2 rounded-md hover:bg-prosperity">Submit and Mint</button>
                </form>
            </div>
        </div>
    )
}

export default MintForm