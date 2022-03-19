import { ButtonHTMLAttributes } from 'react';
import styled, { DefaultTheme } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: keyof DefaultTheme['colors'];
  color?: keyof DefaultTheme['colors'];
  rounded?: boolean;
}

// ====

const Root = styled.button<Pick<ButtonProps, 'backgroundColor' | 'color' | 'rounded'>>`
  background-color: ${({ theme, backgroundColor }) => (
    backgroundColor
      ? theme.colors[backgroundColor]
      : 'initial'
  )};
  border-color: ${({ theme, backgroundColor }) => (
    backgroundColor
      ? theme.colors[backgroundColor]
      : 'initial'
  )};
  color: ${({ theme, color }) => (
    color
      ? theme.colors[color]
      : 'initial'
  )};
  border-radius: ${({ rounded }) => rounded ? '50%' : '4px'};
`;

const Button = ({
  backgroundColor = 'purple',
  color = 'white',
  rounded = false,
  ...props
}: ButtonProps) => (
  <Root
    backgroundColor={backgroundColor}
    color={color}
    rounded={rounded}
    {...props}
  />
);

export default Button;
export type {
  ButtonProps,
};
