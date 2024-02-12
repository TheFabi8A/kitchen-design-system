import React from 'react'

import styled from 'styled-components'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  max-width: 1fr;
  min-width: 300px;
  max-width: 450px;
`

const CardHeader = styled.header`
`
const CardBody = styled.div`
`

const CardFooter = styled.footer`
`
export default function OrderCard () {
  return (
    <Card>
information
    </Card>
  )
}
