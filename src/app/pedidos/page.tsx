'use client'

import OrderCard from '@/components/ui/Card/OrderCard'
import styled from 'styled-components'

const Page = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: center;
align-items: start;
gap: 1rem;
background-color: green;
width: 100%;
overflow-y: auto;
height: 100%;

& div {
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    max-width: 1fr;
    min-width: 300px;
    max-width: 450px;
}
`

export default function page () {
  return (
    <Page>
      <OrderCard />
    </Page>
  )
}
