import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import categories from '../../assets/categories.json';
import { query, where, getDocs, collection } from 'firebase/firestore/lite';
import { PostType } from '../../global/types';
import { db } from '../../services/firebase';
import SEO from '../../utils/SEO/SEO';
import { Badge, Box, Container, Group, Spoiler, Title } from '@mantine/core';

const CreatePostButton = React.lazy(() => import('../../components/Buttons/CreatePostButton'));
const PostItem = React.lazy(() => import('../../layouts/Post/PostItem'));

const Category: React.FC = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState<PostType | any>([]);

  const categoryIndex = categories.categories.findIndex((c) => c.name === category);
  const description = categories.categories[categoryIndex].description;
  const image = categories.categories[categoryIndex].image;

  useEffect(() => {
    const getPostByCategory = async () => {
      const q = query(collection(db, 'posts'), where('category', '==', category));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        setPosts((prevPosts: any) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
      });
    };
    getPostByCategory();
  }, [category]);

  return (
    <>
      <SEO
        title={category}
        description={description}
        type="article"
        url={'https://myjar-8ff23.web.app/category/' + category}
        image={image}
      />

      <Container>
        <Box
          mt="lg"
          mb="lg"
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            textAlign: 'center',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            cursor: 'pointer',

            '&:hover': {
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }
          })}
        >
          <Title mb="lg">{category}</Title>
          <Group position="apart">
            <Badge py="auto" size="lg">
              {posts.length} Posts
            </Badge>
            <CreatePostButton size="lg" />
          </Group>
          <Spoiler showLabel="Show more" hideLabel="Hide" maxHeight={120} style={{ textAlign: 'start' }}>
            {description}
          </Spoiler>
        </Box>

        <Box>
          {posts.map((post: PostType, index: React.Key) => (
            <PostItem key={index} post={post} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Category;
