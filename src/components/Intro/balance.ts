import { ethers } from 'ethers'

declare let window: {
    ethereum: ethers.providers.ExternalProvider
}

export const getBalance = async (address: string) => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        return balance;
    } catch (error) {
        throw new Error("Problem getting balance")
    }
}