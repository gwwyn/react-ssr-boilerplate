import React from 'react'
import Router from './Router'
import { InitData, AppProps } from './types'

export const getInitialData = (initData: InitData): (() => InitData) => {
  let once = true
  return () => {
    if (once) {
      once = false
      return initData
    }
    return null
  }
}

function AppSSR({ initData, ...rest }: AppProps) {
  const dataHolder = getInitialData(initData)

  return <Router initDataHolder={dataHolder} {...rest} />
}

export default AppSSR
