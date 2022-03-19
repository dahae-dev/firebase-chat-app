import { PropsWithChildren } from 'react';
import styled  from 'styled-components';
import { px } from 'styled-components-spacing';

interface TopbarProps {}

// ====

const Root = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: ${({ theme })=> theme.heights.topbar};
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  z-index: ${({ theme }) => theme.zIndexes[1]};
  ${px(1.5)}
`;

const Section = styled.div <{
  size: 'min' | 'max' | number,
  align?: 'center' | 'left' | 'right'
}>`
  display: flex;
  justify-content: ${({ align }) => align || 'inherit'};
  ${({ size }) => {
    if (size === 'min') {
      return `
        flex-grow: 0;
        flex-basis: auto;
        width: auto;
        max-width: none;
      `;
    } else if (size === 'max') {
      return `
        flex-grow: 1;
        flex-basis: auto;
        width: auto;
        max-width: none;
      `;
    } else if (size) {
      const pct = Math.round((typeof size === 'number' ? size : 1) * 100 * 10000) / 10000;
      return `
        flex-basis: ${pct}%;
        max-width: ${pct}%;
      `;
    } else {
      return '';
    }
  }}
`;

const Topbar = ({
  children,
}: PropsWithChildren<TopbarProps>) => (
  <Root>
    {children}
  </Root>
);

Topbar.Section = Section;

export default Topbar;
