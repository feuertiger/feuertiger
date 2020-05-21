import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '../src/providers/themeProvider';

addDecorator((storyFn) => <ThemeProvider>{storyFn()}</ThemeProvider>);
