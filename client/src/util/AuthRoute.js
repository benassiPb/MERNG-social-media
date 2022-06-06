import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { useNavigate } from 'react-router'

import { AuthContext } from '../context/auth'

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  let navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={props =>
        user ? navigate('/') : <Component {...props} />
      } />
  )
}

export default AuthRoute
