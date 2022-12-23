import React from 'react';
import { Container, Grid, Paper, Transition } from '@mantine/core';

import categories from '../../assets/categories.json';

function CategoryContainer() {
  console.log(categories.categories);

  const categoryCard = categories.categories.map((c) => {
    const columnWidth = Math.floor(Math.random() * 2) + 2;

    return (
      <Transition
        key={c.name}
        mounted={true}
        transition={columnWidth % 2 === 0 ? 'rotate-left' : 'rotate-right'}
        duration={400}
        timingFunction="linear">
        {(style) => (
          <Grid.Col style={style} sm={columnWidth}>
            <Paper sx={{ textAlign: 'center' }} withBorder>
              {c.name}
            </Paper>
          </Grid.Col>
        )}
      </Transition>
    );
  });

  return (
    <Container>
      <Grid justify="center" columns={6}>
        {categoryCard}
      </Grid>
    </Container>
  );
}

export default CategoryContainer;
