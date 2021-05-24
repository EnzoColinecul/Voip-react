import React from 'react'
import { Redirect, Route } from 'react-router'

declare interface Props {
islogged: React.ComponentState
component: React.Component
}

const PrivateRoute = ({
  isLogged,
  component: Component,
  ...rest
}) => {
  return (
    <Route {...rest}>
       component={(props) => (
        (isLogged)
          ? (<Component {...props} />)
          : (<Redirect to='/auth' />)
      )}
    </Route>
  )
}

export default PrivateRoute
