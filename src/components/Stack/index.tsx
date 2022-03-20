import { PropsWithChildren } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { ml, mt } from 'styled-components-spacing';

type StackVAlignTypes = 'top' | 'bottom' | 'center' | 'stretch';
type StackHAlignTypes = 'left' | 'right' | 'center';

interface StackProps {
  spacing?: keyof DefaultTheme['spacing'];
  valign?: StackVAlignTypes;
  halign?: StackHAlignTypes;
  wrap?: boolean;
}

// ====

const Root = styled.div<Omit<StackProps, 'wrap'> & {
  $wrap: boolean
}>`
  display: flex;
  ${({ valign }) => (valign && ({
    top: 'align-items: flex-start;',
    bottom: 'align-items: flex-end;',
    center: 'align-items: center;',
    stretch: 'align-items: stretch;',
  }[valign]))}
  ${({ halign }) => (halign && ({
    left: 'justify-content: flex-start;',
    right: 'justify-content: flex-end;',
    center: 'justify-content: center;',
  }[halign]))}
  ${({ $wrap }) => (
    $wrap 
      ? 'flex-wrap: wrap;'
      : 'flex-wrap: nowrap;'
  )}
  ${({ spacing, $wrap }) => ((spacing && $wrap) ? mt(-spacing) : '')}
  & > *:not(:first-child) {
    ${({ spacing }) => ml(spacing)}
    ${({ spacing, $wrap }) => $wrap && mt(spacing)}
  }
`;

const Stack = ({
  spacing = 1,
  valign = 'stretch',
  halign = 'left',
  wrap = false,
  children,
}: PropsWithChildren<StackProps>) => (
  <Root
    spacing={spacing}
    valign={valign}
    halign={halign}
    $wrap={wrap}
  >
    {children}
  </Root>
);

export default Stack;
