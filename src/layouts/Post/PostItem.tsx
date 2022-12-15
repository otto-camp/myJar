import React from 'react';
import { useNavigate } from 'react-router-dom';
import './post.css';
import { PostType } from '../../global/types';
import loadable from '@loadable/component';
import { Container, Flex, Image, Skeleton, Stack, Text, Title } from '@mantine/core';

const CategoryButton = loadable(() => import('../../components/Buttons/CategoryButton'));

const Moment = loadable.lib(() => import('moment'));

export default function PostItem({ post }: { post: PostType }) {
  const navigate = useNavigate();

  return (
    <Container>
      {post ? (
        <Flex direction={{ base: 'column', sm: 'row' }}>
          <Image
            src={post.postThumbnail || 'https://picsum.photos/1000/500'}
            alt={post.postTitle}
            width="100%"
            height="100%"
            radius="md"
            withPlaceholder
          />
          <Stack>
            <Title onClick={() => navigate('/post/' + post.pid)}>{post.postTitle}</Title>
            <CategoryButton text={post.category} />
            <Text onClick={() => navigate('profile/' + post.createrId)}>{post.createrName}</Text>
          </Stack>
        </Flex>
      ) : (
        <Skeleton />
      )}
    </Container>
    // <>
    //   <Card className="postitem-card bg-light">
    //     <Row className="g-0">
    //       <Col xs={12} lg={6} className="align-self-center">
    //         <Image
    //           src={posts.postThumbnail || 'https://picsum.photos/1000/500'}
    //           alt={posts.postTitle}
    //           loading="lazy"
    //           className="img-fluid postitem-image image-zoom"
    //           onClick={() => {
    //             navigate('/post/' + posts.pid);
    //           }}
    //           width="auto"
    //           height="100%"
    //         />
    //       </Col>
    //       <Col xs={12} lg={6}>
    //         <Card.Header className="border-0 bg-light px-0">
    //           <Card.Title>
    //             <Link to={'/post/' + posts.pid}>
    //               <h5 className="postitem-title">{posts.postTitle}</h5>
    //             </Link>
    //             <div className="ms-lg-3">
    //               <CategoryButton text={posts.category} />
    //             </div>
    //           </Card.Title>
    //           <div className="postitem-subheader">
    //             <Link to={'profile/' + posts.createrId}>
    //               <h4 className="postitem-creatername">{posts.createrName}</h4>
    //             </Link>
    //             <p className="postitem-date ">
    //               <Moment fallback={posts.timestamp.seconds as any}>
    //                 {({ default: moment }) => moment.utc(posts.timestamp?.seconds, 'X').fromNow()}
    //               </Moment>
    //             </p>
    //           </div>
    //         </Card.Header>
    //       </Col>
    //     </Row>
    //   </Card>
    // </>
  );
}
