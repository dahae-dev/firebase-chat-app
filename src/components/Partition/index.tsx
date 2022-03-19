import { PropsWithChildren } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { px, mx } from 'styled-components-spacing';

interface PartitionProps {
  valign?: 'top' | 'bottom' | 'center' | 'stretch';
  halign?: 'left' | 'right' | 'center' | 'space-between' | 'space-around';
  spacing?: keyof DefaultTheme['spacing'];
}

// ====

const Root = styled.div<PartitionProps>`
  display: flex;
  ${({ valign }) => valign && ({
    top: 'align-items: flex-start;',
    bottom: 'align-items: flex-end;',
    center: 'align-items: center;',
    stretch: 'align-items: stretch;',
  }[valign])}
  ${({ halign }) => halign && ({
    left: 'justify-content: flex-start;',
    right: 'justify-content: flex-end;',
    center: 'justify-content: center;',
    'space-between': 'justify-content: space-between;',
    'space-around': 'justify-content: space-around;',
  }[halign])}
  & > * {
    ${({ spacing }) => (spacing ? px(spacing) : '')};
  }
  ${({ spacing }) => (spacing ? mx(-spacing) : '')};
`;

const Main = styled.div`
  flex-grow: 1;
  flex-basis: auto;
  width: auto;
  max-width: none;
`;

const Side = styled.div`
  flex-grow: 0;
  flex-basis: auto;
  width: auto;
  max-width: none;
`;

const Partition = ({
  valign = 'center',
  halign = 'left',
  spacing = 1,
  children,
}: PropsWithChildren<PartitionProps>) => (
  <Root
    valign={valign}
    halign={halign}
    spacing={spacing}
  >
    {children}
  </Root>
);

Partition.Main = Main;
Partition.Side = Side;

export default Partition;
export type {
  PartitionProps,
};
