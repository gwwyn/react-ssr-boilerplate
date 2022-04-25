import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render, waitFor } from '@testing-library/react'
import App from './App'

type HomeProps = {
  title: string
}
const HomeComp = ({ title }: HomeProps) => <div>You are on {title}</div>
const homeCallback = jest.fn()
HomeComp.getInitialProps = async () => {
  homeCallback()
  return {
    title: 'updated home',
  }
}

type LatestProps = {
  num: number
}
const LatestComp = ({ num }: LatestProps) => <div>Latest page {num}</div>
const latestCallback = jest.fn()
LatestComp.getInitialProps = async () => {
  function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  await timeout(300)
  latestCallback()
  return {
    num: 31,
  }
}

const AboutComp = jest.fn(() => null)
const PopularComp = jest.fn(() => null)

const routes = [
  {
    path: '/',
    component: HomeComp,
    exact: true,
  },
  {
    path: '/about',
    component: AboutComp,
    exact: true,
  },
  {
    path: '/latest',
    component: LatestComp,
    exact: true,
  },
  {
    path: '/popular',
    component: PopularComp,
    exact: true,
  },
]

describe('SSR App with router', () => {
  it('App should render a default page', () => {
    const history = createMemoryHistory()

    const { getByText } = render(
      <Router history={history}>
        <App initData={{ title: 'home' }} routes={routes} />
      </Router>
    )
    expect(getByText(/You are on home/)).toBeInTheDocument()
    expect(homeCallback.mock.calls.length).toBe(0)
  })
  it('App should use getInitialProps after initial render', async () => {
    const history = createMemoryHistory()
    const { getByText } = render(
      <Router history={history}>
        <App initData={{ title: 'home' }} routes={routes} />
      </Router>
    )

    history.push('/about')
    history.push('/')
    await waitFor(() =>
      expect(getByText(/You are on updated home/)).toBeInTheDocument()
    )
    expect(homeCallback.mock.calls.length).toBe(1)
  })
  it('Unmounted components throw no errors', async () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <App initData={{ title: 'home' }} routes={routes} />
      </Router>
    )
    history.push('/latest')
    history.push('/')
    await waitFor(() => expect(latestCallback).toBeCalled())
  })
})
