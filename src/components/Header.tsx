'use client'

import styled from 'styled-components'

import Link from 'next/link'

import { Inter } from 'next/font/google'

import { usePathname } from 'next/navigation'

import {
  SettingsIcon,
  CurrentIcon,
  FinishedIcon,
  ScheduledIcon,
  NotesIcon
} from './icons'

import React from 'react'

const InterBold = Inter({ subsets: ['latin'], weight: '700' })

const HeaderContainer = styled.header`
  --separation: 0.5rem;
  min-height: 100dvh;
  padding: var(--separation) 0 var(--separation) var(--separation);

  font-size: 15px;
`

const Panel = styled.nav`
  font-family: 'Inter';
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: fit-content;
  background-color: black;
  height: 100%;
  padding: var(--separation);
  border-radius: 1rem;

  & a {
    text-decoration: none;
    user-select: contain;
  }
`

const ContainerCooking = styled.div`
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-self: center;
  justify-content: center;
`

const Icon = styled.div`
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }

  & > svg {
    width: 2rem;
    height: 2rem;
  }
`

const Box = styled.span`
text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  transition: background-color 150ms, scale 150ms;
  border-radius: 0.5rem;
  border: 2px solid white;
  background-clip: padding-box;
  &:hover {
    background-color: #333;
  }

  &:active {
    transform: scale(0.95);
  }

  text-decoration: none;
  justify-self: end;

  & > strong {
    color: #fff;
    margin-top: 0.35rem;
  }
`

export default function Header () {
  const pathname = usePathname()

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <HeaderContainer>
      <Panel>
        <Link href="/">
          <Box style={pathname === '/' ? { backgroundColor: '#E23274' } : {}}>
            <Icon title="Notas">
              <NotesIcon />
            </Icon>
            <strong className={InterBold.className}>Nuevo <br /> Pedido</strong>
          </Box>
        </Link>
        <ContainerCooking>
          <Link href="/pedidos">
            <Box
              style={
                pathname === '/pedidos' ? { backgroundColor: '#E23274' } : {}
              }>
              <Icon title="/pedidos">
                <CurrentIcon />
              </Icon>
              <strong className={InterBold.className}>Pedidos</strong>
            </Box>
          </Link>
          <Link href="/historial">
            <Box
              style={
                pathname === '/historial' ? { backgroundColor: '#E23274' } : {}
              }>
              <Icon title="Historial">
                <ScheduledIcon />
              </Icon>
              <strong className={InterBold.className}>Historial</strong>
            </Box>
          </Link>
          <Link href="/finalizado">
            <Box
              style={
                pathname === '/finalizado' ? { backgroundColor: '#E23274' } : {}
              }>
              <Icon title="Finalizado">
                <FinishedIcon />
              </Icon>
              <strong className={InterBold.className}>Finalizado</strong>
            </Box>
          </Link>
        </ContainerCooking>
        <Box>
          <Icon title="Configuración">
            <SettingsIcon />
          </Icon>
          <strong className={InterBold.className}>Ajustes</strong>
        </Box>
      </Panel>
    </HeaderContainer>
  )
}
