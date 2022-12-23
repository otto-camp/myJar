import React from 'react';
import { useParams } from 'react-router-dom';
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

  return (
    <>
      <ArticleSEO
        title={post?.postTitle}
        description={post?.postSubTitle}
        type="article"
        url={'https://myjar-8ff23.web.app/post/' + post?.pid}
        image={post?.postThumbnail}
        typeSection={post?.category}
        typeTag={['Story', 'Story with image', 'Post', 'myJar']}
      />
      <Container>
        {post && user ? (
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
                <Group>
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
                <Group mt="lg">{currentUser.uid !== user.id ? <FollowButton user={user} /> : ''}</Group>
              </Card>
            </Grid.Col>
          </Grid>
        ) : (
          <Skeleton />
        )}
      </Container>
      {/* <Row className="g-0 w-100 min-h">
        {post && user ? (
          <>
            <Col xs={12} lg={8}>
              <div className="post-container">
                <h1 className="post-title">{post.postTitle}</h1>
                <div className="d-flex justify-content-between">
                  <h3 className="post-subtitle">{post.postSubTitle}</h3>
                  <h6 className="fs-sm">
                    <Moment fallback={post.timestamp.seconds as any}>
                      {({ default: moment }) => moment.utc(post.timestamp.seconds, 'X').fromNow()}
                    </Moment>
                  </h6>
                </div>
                <Image
                  src={post.postThumbnail || 'https://picsum.photos/1500/500'}
                  className="post-thumbnail"
                  alt={post.postTitle}
                  width="1024"
                  height="1024"
                />
                <div className="py-2">
                  <div className="post-text">{HTMLReactParser(post.postText)}</div>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={4}>
              <div className="post-creater-card">
                <Image
                  src={user.photoURL}
                  alt={user.fname + ' ' + user.lname}
                  className="rounded-circle avatar-lg img-thumbnail me-5 ms-3"
                  width="64"
                  height="64"
                />
                <h5 className="d-inline-block ps-auto pe-3">
                  <Link to={'/profile/' + post.createrId}>{user.fname + ' ' + user.lname}</Link>
                </h5>
                <div className="mx-3 mt-3">
                  <div className="d-flex justify-content-between">
                    <p className="fs-5 fw-bold m-0 mb-2">{user?.followers.length} Followers</p>
                    {currentUser !== null && currentUser.uid !== user.id ? <FollowButton user={user} /> : ''}
                  </div>
                  <p className="m-0 mb-2">{user?.about}</p>
                  <CategoryButton text={post.category} />
                </div>
              </div>
            </Col>
          </>
        ) : (
          <div>Loading</div>
        )}
      </Row> */}
    </>
  );
};

export default Post;