import { useState } from 'react'
import { ethers } from 'ethers'
import Input from '../UI/Input'
import { TransferWrapper } from './styles'
import Button from '../UI/Button'

declare let window: {
    ethereum: ethers.providers.ExternalProvider
}

export function Transfer() {

    const [inputValue, setInputValue] = useState<string>("")
    const [inputAddress, setInputAddress] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);


    async function transfer(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);
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
            setInputAddress("");
            setInputValue("");
            return { hash: receipt.transactionHash };
        } catch (error) {
            return {
                error: (error as any).message,
            };
        } finally {
            setIsLoading(false);
        }
    }

    const isDisabled = (inputAddress.length===0 || inputValue.length===0) ? true : false

    return (
        <TransferWrapper onSubmit={transfer}>
            <Input label='To' onChange={(event) => setInputAddress(event.target.value)} value={inputAddress} />
            <Input label='Amount' type="number" onChange={(event) => setInputValue(event.target.value)} value={inputValue} />
            <Button title="Send" isLoading={isLoading} type="submit" disabled={isDisabled}/>
        </TransferWrapper>
    );
}

export default Transfer;