import React, { useEffect, useState } from 'react'
import { Card, Confirm, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'

function DeleteButton({ postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false)
    },
    variables: { postId }
  })

  return (
    <>
      <Button
        as='div'
        color='gray'
        floated='right'
        onClick={() => setConfirmOpen(true)}>
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}

      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId:ID!){
  deletePost(postId:$postId)
}
`

export default DeleteButton
