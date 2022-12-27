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
                  <Image src={post.postThumbnail} alt={post.postTitle} withPlaceholder />
                  <Title>{post.postTitle}</Title>
                  <Title order={2} size="h5">
                    {post.postSubTitle}
                  </Title>
                  <TypographyStylesProvider>
                    <div dangerouslySetInnerHTML={{ __html: post.postText }} />
                  </TypographyStylesProvider>
                </Paper>
              </Grid.Col>
              <Grid.Col xs={12} sm={4}>
                <Card withBorder>
                  <Group sx={{ '&:hover': { cursor: 'pointer' } }} onClick={() => navigate('/profile/' + user.id)}>
                    <Avatar src={user.photoURL} alt={user.fname + ' ' + user.lname} size={50} />
                    <Title order={3}>{user.fname + ' ' + user.lname}</Title>
                  </Group>
                  <Text mt="lg">{user.about}</Text>
                  <Divider my="lg" size="md" />
                  <Group position="apart">
                    <CategoryButton text={post.category} />
                    <Badge>
                      {
                        <Moment fallback={post.timestamp.seconds as any}>
                          {({ default: moment }) => moment.utc(post.timestamp.seconds, 'X').fromNow()}
                        </Moment>
                      }
                    </Badge>
                  </Group>
                  <Group mt="lg">
                    {currentUser && currentUser.uid !== user.id ? <FollowButton user={user} /> : ''}
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
