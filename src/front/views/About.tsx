import React from 'react'
import MainLayout from '../components/MainLayout'

type AboutProps = {
  title: string
}
function About({ title }: AboutProps) {
  return (
    <MainLayout>
      <div>Home page {title}</div>
    </MainLayout>
  )
}

export default About

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

About.getInitialProps = async (): Promise<AboutProps> => {
  await timeout(3000)
  return {
    title: 'about',
  }
}
