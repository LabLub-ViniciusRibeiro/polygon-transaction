import { ethers } from "ethers";
import { TransactionResponse } from ".."
import { ItemWrapper } from "./styles"

interface Props {
    transaction: TransactionResponse
}

function Item({ transaction }: Props) {
    const createdAt = new Date(transaction.timestamp as number*1000);
    const formatedDate = `${createdAt.getMonth()+1}/${createdAt.getDate()}/${createdAt.getFullYear()}`
    return (
        <ItemWrapper>
            <header>
                <h2>{transaction.to}</h2>
                <h4>{formatedDate}</h4>
            </header>
            <h3>{ethers.utils.formatUnits(transaction.value, "18")} MATIC</h3>
        </ItemWrapper>
    )
}

export default Item