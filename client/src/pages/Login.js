
import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useNavigate } from 'react-router'

import { useForm } from '../util/hooks'

function Login() {

  let navigate = useNavigate();

  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '', password: ''
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      navigate('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })

  function loginUserCallback() {
    loginUser()
  }


  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""} >
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Passwod..."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login
        </Button>

      </Form>

      {Object.keys(errors).length > 0 && (
        <div>
          <ul className="list">
            {Object.values(errors).map(val => (
              <li key={val}>{val}</li>
            ))}
          </ul>
        </div>)}
    </div>
  )
}

const LOGIN_USER = gql`
mutation login(
  $username: String!
  $password: String!
){
  login(
      username: $username
      password: $password

  ){
    id email username createdAt token
  }
}`

export default Login
