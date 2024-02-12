'use client'

import { ArrowCheck } from '@/components/icons'
import menu from '@/menu.json'
import { Inter, Patrick_Hand, Patrick_Hand_SC } from 'next/font/google'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import { store } from '@/redux/store'
import { Provider } from 'react-redux'

import db from '@/utils/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

const InterBlack = Inter({ subsets: ['latin'], weight: '900' })
const PatrickHand_SC = Patrick_Hand_SC({ subsets: ['latin'], weight: '400' })
const PatrickHand = Patrick_Hand({ subsets: ['latin'], weight: '400' })

const Form = styled.form`
  background-color: black;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  padding: 1rem;
  max-height: calc(100dvh - 1rem);
  overflow-y: scroll;
  scrollbar-color: white black;
`

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
  justify-content: center;
`

const Label = styled.label`
  max-width: 375px;
  width: 100%;
  margin-bottom: 1rem;
  border: 2px solid white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: block;
  cursor: pointer;

  & input[type="checkbox"] {
    display: none;

    &:checked {
      & ~ .checkbox {
        background-color: #e23274;
        transition: background-color 250ms;
      }

      & ~ .checkbox > svg {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }

    & ~ .checkbox > svg {
      transition: clip-path 250ms;
      clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    }
  }
`

const Message = styled.textarea`
  font-size: large;
  width: 70%;
  resize: vertical;
  min-height: 100px;
  max-height: 200px;
  background-color: black;
  border: 2px dashed white;
  border-radius: 0.5rem;
  color: white;
  padding: 0.5rem;

  &:focus {
    outline: none;
  }
`

const LabelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`

const LabelBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const Checkbox = styled.span`
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-radius: 0.25rem;
  display: inline-block;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    display: none;
  }
`

const Title = styled.h1`
  text-align: center;
  margin: 1rem 0;
`

const NameFood = styled.h3`
  display: inline;
  text-transform: uppercase;
  margin-left: 0.5rem;
  user-select: none;
`

const Price = styled.span`
  user-select: none;
`

const CategoryFood = styled.h2`
  margin-bottom: 1rem;
  text-transform: uppercase;
`

const Amount = styled.input`
  width: 20%;
  background-color: black;
  border: 2px solid white;
  border-radius: 0.5rem;
  color: white;
  padding: 0.5rem;
  margin-left: 0.5rem;

  &:focus {
    outline: none;
  }
`

export default function Home () {
  const [selectedProducts, setSelectedProducts] = React.useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'carta', 'entradas')
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data())
        } else {
          console.log('No such document!')
        }
      } catch (error) {
        console.log('Error al obtener la carta: ', error)
      }
    }

    fetchData()
  }, [])

  const handleProductSelect = (
    id: number,
    name: string,
    price: number,
    quantity: number
  ) => {
    const isSelected = selectedProducts.some((product) => product.id === id)
    console.log(isSelected)

    if (isSelected) {
      const updatedProducts = selectedProducts.filter(
        (product) => product.id !== id
      )
      setSelectedProducts(updatedProducts)
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          id,
          name,
          price,
          quantity
        }
      ])
    }
  }

  const handleQuantityChange = (id: number, event) => {
    const { value } = event.target
    const updatedProducts = selectedProducts.map((product) =>
      product.id === id ? { ...product, quantity: parseInt(value) } : product
    )
    setSelectedProducts(updatedProducts)
  }

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }

  console.log(calculateTotalPrice())

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Provider store={store}>
      <Form
        onSubmit={(e) => {
          console.log(e)
          e.preventDefault()
        }}>
        <Title className={InterBlack.className}>Nueva Orden</Title>
        <Box>
          {menu && (
            <>
              {Object.entries(menu).map(([category, foods]) => {
                return (
                  <div key={category}>
                    <CategoryFood className={PatrickHand_SC.className}>
                      {category.replace('_', ' ')}
                    </CategoryFood>
                    {foods.map((food) => {
                      const { id, name, price } = food
                      return (
                        <Label key={id}>
                          <LabelHeader>
                            <div>
                              <input
                                onClick={() =>
                                  handleProductSelect(id, name, price, 1)
                                }
                                type="checkbox"
                                onChange={() =>
                                  console.log(`ESCOJISTE: ${name}`)
                                }
                              />
                              <Checkbox className="checkbox">
                                <ArrowCheck />
                              </Checkbox>
                              <NameFood className={PatrickHand_SC.className}>
                                {name}
                              </NameFood>
                            </div>
                            <Price className={PatrickHand.className}>
                              ${price}
                            </Price>
                          </LabelHeader>
                          <LabelBody>
                            <Message
                              className={PatrickHand.className}
                              name="comentario"
                            />
                            <Amount
                              onChange={(e) => handleQuantityChange(id, e)}
                              defaultValue={1}
                              className={PatrickHand.className}
                              type="number"
                              min="0"
                              max="100"
                              onKeyDown={(e) => e.preventDefault()}
                            />
                          </LabelBody>
                        </Label>
                      )
                    })}
                  </div>
                )
              })}
            </>
          )}
        </Box>
        <button type="submit">Crear pedido</button>
      </Form>
    </Provider>
  )
}
