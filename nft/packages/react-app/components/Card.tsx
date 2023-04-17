import truncateAddress from 'truncate-eth-address'

type Props = {
    imageURL: string,
    price: string,
    title: string,
    owner: string
}


const NFTCard = (props: Props): JSX.Element => {
    return (
        <div className="flex items-center justify-center m-8">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-xs mx-auto">
                <img className="rounded-lg mb-4" src={props.imageURL} alt="NFT Image" />
                <h2 className="text-xl font-semibold mb-2">
                    {props.title}
                </h2>
                <p className="text-gray-700 mb-4">{truncateAddress(props.owner)}</p>
                <div className="flex items-center justify-between">
                    <span className="font-semibold">Price: {props.price} CELO</span>
                    <button className="bg-prosperity text-dark px-4 py-2 rounded-lg">Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default NFTCard