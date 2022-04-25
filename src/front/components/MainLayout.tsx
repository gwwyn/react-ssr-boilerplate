import React from 'react'
import { Link } from 'react-router-dom'

type MainLayoutProps = {
  children: JSX.Element
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='main'>
      <header>
        <nav>
          <Link to='/'>Main</Link>
          <Link to='/about'>Main</Link>
          <Link to='/portal'>Page with portal</Link>
        </nav>
      </header>
      {children}
    </div>
  )
}

export default MainLayout
