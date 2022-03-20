import React from 'react';
import styled, { CSSProperties } from 'styled-components';

interface ProgressBarProps {
  value: number;
  renderBar?: (width: CSSProperties['width']) => React.ReactNode;
  className?: string;
}

// ====

const Root = styled.div`
  height: 4px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.coolGrey};
  border-radius: 4px;
`;

const Bar = styled.div<{ width: CSSProperties['width'] }>`
  width: ${({ width }) => width};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.purple};
  border-radius: 4px;
`;

const ProgressBar = ({
  className,
  value = 0,
  renderBar = ((width) => <Bar width={width} />),
}: ProgressBarProps) => {
  if (value < 0) throw new Error('\'value\' should be positive number.');
  if (value > 1) throw new Error('\'value\' Should be less than 1.');

  return (
    <Root className={className}>
      {renderBar(`${value * 100}%`)}
    </Root>
  );
};

export default ProgressBar;
export type {
  ProgressBarProps,
};
