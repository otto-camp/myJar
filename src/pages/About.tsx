import React from 'react';
import ArticleSEO from '../utils/SEO/ArticleSEO';
import { Container, Space, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconBrandStorytel, IconCompass, IconMessageShare } from '@tabler/icons';

function About() {
  return (
    <>
      <ArticleSEO
        title="About Us | myJar"
        type="article"
        description="Here we will provide you only interesting content, which you will
      like very much. We're dedicated to providing you the best of Blog"
        url="https://myjar-8ff23.web.app/about"
        typeSection="About"
        typeTag={['About', 'Blog', 'Professional Blog', 'Enjoyment', 'myJar', 'Learn']}
      />
      <Container>
        <Title style={{ textAlign: 'center' }} my="xl" size="2.5rem">
          About myJar
        </Title>
        <Text style={{ textAlign: 'center' }}>
          Welcome to our blog! We are a team of writers who are passionate about sharing our thoughts, experiences, and
          expertise on a wide range of topics. Our goal is to provide valuable and informative content that will help
          our readers learn, grow, and enjoy life to the fullest.
        </Text>
        <Space h="xl" />
        <Stack spacing="xl">
          <Title order={2}>
            <ThemeIcon variant="light" size={50} mr="xl">
              <IconMessageShare size={36} stroke={2} />
            </ThemeIcon>
            Share your story
          </Title>
          <Text>
            Share with the world how you are living, what you are doing, what you care about. We give you a creative
            space to explore who you are and how the world sees you.
          </Text>
          <Space h="xl" />
          <Title order={2}>
            <ThemeIcon variant="light" size={50} mr="xl">
              <IconCompass size={36} stroke={2} />
            </ThemeIcon>
            Explore the blogosphere
          </Title>
          <Text>
            We have a variety of blog categories for every writer and reader. You will find something for everyone from
            fashion to lifestyle, from travel to technology - even fiction!
          </Text>
          <Space h="xl" />
          <Title order={2}>
            <ThemeIcon variant="light" size={50} mr="xl">
              <IconBrandStorytel size={36} stroke={2} />
            </ThemeIcon>
            Stories that matter
          </Title>
          <Text>
            Find like-minded people who share your passion and interests. Share your stories with them and get inspired
            by theirs. It is an endless conversation between all of us out there in the world - stories that matter.
          </Text>
        </Stack>
      </Container>
    </>
  );
}

export default About;
