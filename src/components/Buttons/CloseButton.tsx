import styled from 'styled-components'

import { typeButton } from '@/@types/button'
import CloseIcon from '../icons/CloseIcon'

const Button = styled.button`
border: 1px solid black;
border-radius: 0.5rem;
display: grid;
place-items: center;
padding: 0.35rem;
cursor: pointer;
&:hover {
  background-color: #f0f0f0;
}
`

export default function CloseButton (props: typeButton) {
  return (
    <Button onClick={props.onClick}>
      <CloseIcon />
    </Button>
  )
}
