import React, { useEffect, useCallback, useRef, useState } from 'react'
import { InitData, StaticComponent, StaticProps, PageComponent } from './types'

/*
  Checks if component is still mounted before applying fetchData results
  because we don't want to change a state of unmounted component
*/
const useMountedState = () => {
  const mountedRef = useRef<boolean>(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return useCallback(() => mountedRef.current, [])
}

function withSSR<P extends Record<string, unknown>>(
  WrappedComponent: StaticComponent<P>
): PageComponent<P> {
  const fetchData = async (): Promise<InitData<P>> => {
    if (WrappedComponent.getInitialProps) {
      return WrappedComponent.getInitialProps()
    }
  }

  const Page = ({ initDataHolder, ...rest }: StaticProps<P>) => {
    const [data, setData] = useState<InitData>(initDataHolder())
    const isMounted = useMountedState()

    useEffect(() => {
      if (data != null) {
        return
      }
      ;(async () => {
        const newData = await fetchData()
        if (isMounted() && newData) {
          setData(newData)
        }
      })()
    })

    return <WrappedComponent {...data} {...(rest as StaticProps<P>)} />
  }

  Page.getInitialProps = async () => {
    return fetchData()
  }

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'App'
  Page.displayName = `withSSR(${displayName})`

  return Page as PageComponent<P>
}

export default withSSR
