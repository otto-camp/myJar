import React from 'react';
import { Anchor, Container, Grid, Paper, createStyles } from '@mantine/core';
import categories from '../../assets/categories.json';

const useStyles = createStyles((theme) => ({
  grid: {
    [theme.fn.smallerThan('sm')]: {
      maxHeight: 400,
      overflowY: 'scroll'
    }
  }
}));

function CategoryContainer() {
  const { classes } = useStyles();

  const categoryCard = categories.categories.map((c) => {
    const columnWidth = Math.floor(Math.random() * 2) + 2;

    return (
      <Grid.Col key={c.name} sm={columnWidth}>
        <Paper radius="sm" sx={{ textAlign: 'center' }} withBorder>
          <Anchor
            href={'/category/' + c.name}
            sx={(theme) => ({
              color: theme.colorScheme === 'dark' ? theme.colors.blue[4] : theme.colors.grape[9]
            })}
            data-cy="home-category-link">
            {c.name}
          </Anchor>
        </Paper>
      </Grid.Col>
    );
  });

  return (
    <Container mb="xl">
      <Grid className={classes.grid} grow justify="center" columns={6} data-cy="home-category-grid">
        {categoryCard}
      </Grid>
    </Container>
  );
}

export default CategoryContainer;
