/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import withSSR from './withSSR'

const routePropsMock = {
  history: {} as any,
  location: {} as any,
  match: {} as any,
}

type TestProps = {
  a?: number
}
const TestComponent = ({ a }: TestProps) => <div>Test data {a}</div>
const dataCallback = jest.fn()
TestComponent.getInitialProps = async (): Promise<TestProps> => {
  dataCallback()
  return { a: 10 }
}

describe('SSR HOC wrapper', () => {
  it('should render', async () => {
    const mockComponent = jest.fn(() => null)
    const Component = withSSR(mockComponent)
    render(<Component {...routePropsMock} initDataHolder={() => null} />)

    await waitFor(() => expect(mockComponent).toBeCalled())
    expect(Component.displayName).toBe('withSSR(mockConstructor)')
  })

  it('should recieve initial props', async () => {
    const Component = withSSR(TestComponent)
    const { getByText } = render(
      <Component {...routePropsMock} initDataHolder={() => ({ a: 12 })} />
    )

    await waitFor(() => {
      expect(getByText(/Test data 12/)).toBeInTheDocument()
    })
    expect(dataCallback.mock.calls.length).toBe(0)
  })

  it('should call getInitProps', async () => {
    const Component = withSSR(TestComponent)
    const { getByText } = render(
      <Component {...routePropsMock} initDataHolder={() => null} />
    )

    await waitFor(() => {
      expect(getByText(/Test data 10/)).toBeInTheDocument()
    })
    expect(dataCallback.mock.calls.length).toBe(1)
    const initProps = await Component.getInitialProps()
    expect(initProps).toEqual({ a: 10 })
  })
})
