import React from 'react'
import MainLayout from '../components/MainLayout'
import style from './Home.module.scss'

function Home() {
  return (
    <MainLayout>
      <div className={style.homePage}>Home page</div>
    </MainLayout>
  )
}

export default Home
