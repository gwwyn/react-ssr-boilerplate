import React from 'react'
import { AppSSR, InitData } from '@/src/shared/ssr'
import routes from './routes'
import './App.scss'

type AppProps = {
  initData: InitData
}

function App({ initData }: AppProps) {
  return <AppSSR initData={initData} routes={routes} />
}
export default App
