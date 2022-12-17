import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

declare let window: {
    ethereum: ethers.providers.ExternalProvider
}

export function Transfer() {

    const [inputValue, setInputValue] = useState<string>("")
    const [inputAddress, setInputAddress] = useState<string>("")


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
        <form>
            <label>To</label>
            <input type="text" onChange={(event) => setInputAddress(event.target.value)} value={inputAddress} />
            <label>Amount</label>
            <input type="number" onChange={(event) => setInputValue(event.target.value)} value={inputValue} />
            <button onClick={transfer}>Send</button>
        </form>
    );
}

export default Transfer;