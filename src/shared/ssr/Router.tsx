import React, { useMemo } from 'react'
import { Switch, Route } from 'react-router-dom'
import withSSR from './withSSR'
import { RouteType, RouterProps } from './types'

const useRoutes = (routes: RouteType[]) =>
  useMemo(
    () =>
      routes.map((route: RouteType) => {
        return { ...route, component: withSSR(route.component) }
      }),
    [routes]
  )

const Router = ({ routes, initDataHolder, ...rest }: RouterProps) => {
  const staticRoutes = useRoutes(routes)
  return (
    <Switch>
      {staticRoutes.map((route: RouteType, index: number) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={props =>
            React.createElement(route.component, {
              ...props,
              ...rest,
              initDataHolder,
            })
          }
        />
      ))}
    </Switch>
  )
}

export default Router
