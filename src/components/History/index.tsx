import { ethers, Transaction } from "ethers";
import { useEffect, useState } from "react"
import Item from "./Item";
import { HistoryWrapper } from "./styles";

declare let window: {
    ethereum: ethers.providers.ExternalProvider
}

export interface TransactionResponse extends Transaction {
    timestamp?: number
}

function History() {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {

        loadHistory()

        async function loadHistory() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const address = await provider.getSigner().getAddress()
            const network = await provider.getNetwork()
            const etherScanProvider = new ethers.providers.EtherscanProvider(network.name)
            const history = await etherScanProvider.getHistory(address)
            console.log(history)
            setTransactions(history)
        }
    }, [])

    return (
        <HistoryWrapper>
            <h2>History</h2>
            {transactions.map(transaction => <Item key={transaction.hash} transaction={transaction}/>)}
        </HistoryWrapper>
    )
}

export default History