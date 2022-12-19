import { ButtonHTMLAttributes } from "react"
import DotLoader from "react-spinners/DotLoader"
import { ButtonWrapper } from "./styles"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string,
  isLoading: boolean
}

function Button(props: Props) {
  return (
    <ButtonWrapper
      {...props}>{props.title}
      {props.isLoading &&
        <DotLoader color="white" size={16} style={{ position: "absolute", right: "30px" }} speedMultiplier={1.5} />}
    </ButtonWrapper>
  )
}

export default Button