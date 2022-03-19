import { ComponentProps } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import { DefaultTheme } from 'styled-components';

import theme from 'styles/theme';

type MoonLoaderProps = ComponentProps<typeof MoonLoader>;

interface SpinnerProps extends Omit<MoonLoaderProps, 'color'>{
  color?: keyof DefaultTheme['colors'];
}

// ====

const Spinner = ({
  loading,
  color = 'purple',
  ...props
}: SpinnerProps) => (
  <MoonLoader
    loading={loading}
    color={theme.colors[color]}
    {...props}
  />
);

export default Spinner;
export type {
  SpinnerProps,
};
