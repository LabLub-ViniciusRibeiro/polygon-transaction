import { InputHTMLAttributes } from "react"
import { InputWrapper } from "./styles"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    attributes?: InputHTMLAttributes<any>
}

function Input(props: Props) {
  return (
    <InputWrapper>
        <label htmlFor="input-box">{props.label}</label>
        <input {...props} id="input-box"/>
    </InputWrapper>
  )
}

export default Input