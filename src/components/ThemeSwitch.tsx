import React from 'react';
import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons';

function ThemeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Group position="center" my="xl">
      <ActionIcon
        aria-label={colorScheme === 'dark' ? 'Dark' : 'Light'}
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6]
        })}>
        {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
      </ActionIcon>
    </Group>
  );
}

export default ThemeSwitch;
