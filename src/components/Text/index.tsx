import { PropsWithChildren } from 'react';
import styled, { CSSProperties, DefaultTheme } from 'styled-components';

interface TextProps {
  color?: keyof DefaultTheme['colors'];
  size?: keyof DefaultTheme['fontSizes'];
  weight?: keyof DefaultTheme['fontWeights'];
  align?: CSSProperties['textAlign'];
  block?: boolean;
  lineClamp?: boolean;
}

// ====

const Root = styled.span<TextProps>`
  color: ${({ color, theme }) => (
    color
      ? theme.colors[color] 
      : 'inherit'
  )};
  font-size: ${({ size, theme }) => (
    size
      ? theme.fontSizes[size] 
      : 'inherit'
  )};
  font-weight: ${({ weight, theme }) => (
    weight
      ? theme.fontWeights[weight] 
      : 'inherit'
  )};
  ${({ block }) => block ? 'display: block;' : ''}
  ${({ lineClamp }) => (
    lineClamp
      ? `
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      `
      : ''
  )}
`;

const Text = ({
  color,
  size,
  weight,
  block = false,
  lineClamp = false,
  children,
}: PropsWithChildren<TextProps>) => (
  <Root
    color={color}
    size={size}
    weight={weight}
    block={block}
    lineClamp={lineClamp}
  >
    {children}
  </Root>
);

export default Text;
