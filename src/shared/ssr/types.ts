/* eslint-disable  @typescript-eslint/no-explicit-any */
import { RouteComponentProps } from 'react-router-dom'

export type InitData<D = Record<string, unknown>> = D | null | undefined

// HOC
export type StaticProps<P> = P &
  RouteComponentProps & {
    initDataHolder: () => InitData<P>
  }

export type StaticComponent<P> = React.ComponentType<StaticProps<P>> & {
  getInitialProps?: () => Promise<P>
}

export type PageComponent<P> = React.FC<StaticProps<P>> & {
  displayName: string
  getInitialProps: () => Promise<P>
}

// Router
export type RouteType = {
  path: string | string[]
  component: StaticComponent<any>
  exact?: boolean
}

export type RouterProps = {
  routes: RouteType[]
  initDataHolder: () => InitData
}

// App
export type AppProps = {
  initData: InitData
  routes: RouteType[]
}

// Middleware
export type AssetsType = string[] | undefined
