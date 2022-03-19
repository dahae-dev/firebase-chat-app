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

const Body = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: inherit;
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

Page.Body = Body;
Page.Footer = Footer;

export {
  Body,
  Footer,
};
export default Page;
