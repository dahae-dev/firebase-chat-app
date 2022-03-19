import { PropsWithChildren } from 'react';
import styled, { DefaultTheme } from 'styled-components';

interface PageProps {
  className?: string;
  backgroundColor?: keyof DefaultTheme['colors'];
}

// ====

const Root = styled.div<Pick<PageProps, 'backgroundColor'>>`
  flex: 1;
  -ms-flex: 1 0 auto;
  max-width: 100%;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${({ backgroundColor, theme }) => (
    `background-color: ${backgroundColor ? theme.colors[backgroundColor] : 'inherit'};`
  )};
`;

const Page = ({
  className,
  backgroundColor,
  children,
}: PropsWithChildren<PageProps>) => (
  <Root
    className={`page${className ? ` ${className}` : ''}`}
    backgroundColor={backgroundColor}
  >
    {children}
  </Root>
);

export default Page;
