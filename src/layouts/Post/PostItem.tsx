import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostType } from '../../global/types';
import loadable from '@loadable/component';
import { Image, Skeleton, Text, AspectRatio, Card, createStyles, Group, Badge, SimpleGrid, Box } from '@mantine/core';

const CategoryButton = loadable(() => import('../../components/Buttons/CategoryButton'));
const Moment = loadable.lib(() => import('moment'));

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md
    }
  },
  title: {
    fontSize: '1.5rem'
  },
  subtitle: {
    overflow: 'hidden',
    wordBreak: 'break-all',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : theme.colors.gray[7]
  }
}));

export default function PostItem({ post }: { post: PostType }) {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <>
      {post ? (
        <Card withBorder mb="xl" className={classes.card} onClick={() => navigate('/post/' + post.pid)}>
          <SimpleGrid cols={1} breakpoints={[{ minWidth: 768, cols: 2 }]}>
            <AspectRatio ratio={1000 / 500}>
              <Image
                src={post.postThumbnail || 'https://picsum.photos/1000/500'}
                alt={post.postTitle}
                width="100%"
                height="100%"
                radius="sm"
                withPlaceholder
                
              />
            </AspectRatio>
            <Box>
              <Text miw="100%" lineClamp={2} weight={500} className={classes.title}>
                {post.postTitle}
              </Text>
              <Group position="apart" mt="md" mb="xs">
                <Badge color="violet" variant="dot">
                  <Moment fallback={post.timestamp.seconds as any}>
                    {({ default: moment }) => moment.utc(post.timestamp.seconds, 'X').fromNow()}
                  </Moment>
                </Badge>
                <CategoryButton text={post.category} />
              </Group>
              <Text lineClamp={3} size="sm" color="dimmed" className={classes.subtitle}>
                {post.postSubTitle}
              </Text>
            </Box>
          </SimpleGrid>
        </Card>
      ) : (
        <Skeleton />
      )}
    </>
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
