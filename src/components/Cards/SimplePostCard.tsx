import React from 'react';
import { PostType } from '../../global/types';
import { AspectRatio, Badge, Box, Group, Image, Text, createStyles } from '@mantine/core';
import loadable from '@loadable/component';
import { useNavigate } from 'react-router-dom';

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
  }
}));

function SimplePostCard({ post }: { post: PostType }) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/post/' + post.pid)} className={classes.card}>
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
        <Text miw="100%" lineClamp={2} weight={500}>
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
        <Text lineClamp={2} size="sm" color="dimmed">
          {post.postSubTitle}
        </Text>
      </Box>
    </div>
  );
}

export default SimplePostCard;
