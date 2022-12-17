import { ethers } from "ethers"

declare let window: {
    ethereum: ethers.providers.ExternalProvider
}

export const connect = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (provider) {
            provider.on("accountsChanged", () => {
                console.log("mudou")
            })
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            const address = await signer.getAddress()
            return address
        } else {
            throw new Error('Please install Metamask at https://metamask.io')
        }

    } catch (error) {
        throw new Error();
    }
}