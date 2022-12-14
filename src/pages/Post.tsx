import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProfile from '../hooks/useProfile';
import usePost from '../hooks/usePost';
import loadable from '@loadable/component';
import ArticleSEO from '../utils/SEO/ArticleSEO';
import { useAuth } from '../services/AuthContext';
import {
  Avatar,
  Badge,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Skeleton,
  Text,
  Title,
  TypographyStylesProvider
} from '@mantine/core';

const FollowButton = loadable(() => import('../components/Buttons/FollowButton'));
const CategoryButton = loadable(() => import('../components/Buttons/CategoryButton'));
const Moment = loadable.lib(() => import('moment'));

const Post: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { currentUser } = useAuth();
  const { post } = usePost(id);
  const { user } = useProfile(post?.createrId);
  const navigate = useNavigate();

  return (
    <>
      {post && user ? (
        <>
          <ArticleSEO
            title={post.postTitle}
            description={post.postSubTitle}
            type="article"
            url={'https://myjar-8ff23.web.app/post/' + id}
            image={post.postThumbnail}
            typeSection={post.category}
            typeTag={['Story', 'Story with image', 'Post', 'myJar']}
          />
          <Container>
            <Grid columns={12}>
              <Grid.Col xs={12} sm={8}>
                <Paper>
                  <Image src={post.postThumbnail} alt={post.postTitle} withPlaceholder data-cy="post-image"/>
                  <Title data-cy="post-title">{post.postTitle}</Title>
                  <Title order={2} size="h5" data-cy="post-subtitle">
                    {post.postSubTitle}
                  </Title>
                  <TypographyStylesProvider>
                    <section dangerouslySetInnerHTML={{ __html: post.postText }} role="article" data-cy="post-text"/>
                  </TypographyStylesProvider>
                </Paper>
              </Grid.Col>
              <Grid.Col xs={12} sm={4}>
                <Card withBorder>
                  <Group sx={{ '&:hover': { cursor: 'pointer' } }} onClick={() => navigate('/profile/' + user.id)}>
                    <Avatar src={user.photoURL} alt={user.fname + ' ' + user.lname} size={50} data-cy="post-creater-image"/>
                    <Title order={3} data-cy="post-creater-name">{user.fname + ' ' + user.lname}</Title>
                  </Group>
                  <Text mt="lg">{user.about}</Text>
                  {currentUser && currentUser.uid !== user.id ? (
                    <Group mt="lg">
                      <FollowButton user={user} />
                    </Group>
                  ) : (
                    ''
                  )}
                  <Divider my="lg" size="md" />
                  <Group position="apart">
                    <CategoryButton text={post.category} data-cy="post-category"/>
                    <Badge data-cy="post-date">
                      {
                        <Moment fallback={post.timestamp.seconds as any}>
                          {({ default: moment }) => moment.utc(post.timestamp.seconds, 'X').fromNow()}
                        </Moment>
                      }
                    </Badge>
                  </Group>
                </Card>
              </Grid.Col>
            </Grid>
          </Container>
        </>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default Post;
