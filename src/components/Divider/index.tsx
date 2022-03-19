import { CSSProperties, PropsWithChildren } from 'react';
import styled, { DefaultTheme } from 'styled-components';

import Text from 'components/Text';

interface DividerProps {
  height?: CSSProperties['height']; 
  color?: keyof DefaultTheme['colors'];
  fontSize?: keyof DefaultTheme['fontSizes'];
  fontWeight?: keyof DefaultTheme['fontWeights'];
}

// ====

const Root = styled.div<Pick<DividerProps, 'color'>>`
  display: flex;
  align-items: center;
  text-align: center;
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme, color }) => theme.colors[color || 'coolGrey']}; 
    opacity: 0.3;
  }
  &:not(:empty)::before {
    margin-right: ${({ theme }) => theme.spacing[1.5]};
  }
  &:not(:empty)::after {
    margin-left: ${({ theme }) => theme.spacing[1.5]};
  }
`;

const DividerText = styled(Text)``;

const Divider = ({
  color = 'coolGrey',
  fontSize = 'xs',
  fontWeight,
  children,
}: PropsWithChildren<DividerProps>) => (
  <Root
    color={color}
  >
    {
      children
        ? (
          <DividerText
            color={color}
            size={fontSize}
            weight={fontWeight}
          >
            {children}
          </DividerText>
        )
        : null
    }
  </Root>
);

export default Divider;
export type {
  DividerProps,
};
