import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Grid, Image, Card, Icon, Label } from 'semantic-ui-react'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'
import { useNavigate } from 'react-router'
import { useForm } from '../util/hooks'
import moment from 'moment'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'

function SinglePost(props) {
  console.log(props)

  const { postId } = useParams();
  const { user } = useContext(AuthContext)

  const { data: { getPost } = {}
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  let postMarkup
  if (!getPost) {
    postMarkup = <p>Loading...</p>
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount
    } = getPost

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' size='small' float='right' />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button as='div' labelPosition="right" onClick={() => console.log('comment')}>
                  <Button basic color='blue'>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color='blue' pointing='left'>{commentCount}</Label>
                </Button>
                {user && user.username === username && (<DeleteButton postId={id} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  return postMarkup
}


const FETCH_POST_QUERY = gql`
query($postId: ID!){
  getPost(postId: $postId){
    id body createdAt username likeCount
    likes{username}
    commentCount
    comments{id username createdAt body}
  }
}
`

export default SinglePost
