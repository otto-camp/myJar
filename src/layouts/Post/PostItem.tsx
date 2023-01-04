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
                src={post.postThumbnail}
                alt={post.postTitle}
                width="100%"
                height="100%"
                radius="sm"
                withPlaceholder
                data-cy="post-image"
              />
            </AspectRatio>
            <Box>
              <Text miw="100%" lineClamp={2} weight={500} className={classes.title} data-cy="post-title">
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
              <Text lineClamp={3} size="sm" color="dimmed" className={classes.subtitle} data-cy="post-subtitle">
                {post.postSubTitle}
              </Text>
            </Box>
          </SimpleGrid>
        </Card>
      ) : (
        <Skeleton />
      )}
    </>
  );
}
