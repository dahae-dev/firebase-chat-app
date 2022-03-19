import styled from 'styled-components';

type AlignHorizontalTypes = 'left' | 'center' | 'right';
type AlignVerticalTypes = 'top' | 'center' | 'bottom';

interface AlignProps {
  horizontal?: AlignHorizontalTypes;
  vertical?: AlignVerticalTypes;
}


const Align = styled.div<AlignProps>`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: ${({ horizontal }) => horizontal && (
    {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    }[horizontal]
  )};
  align-items: ${({ vertical }) => vertical && (
    {
      top: 'flex-start',
      center: 'center',
      bottom: 'flex-end',
    }[vertical]
  )};
`;

export default Align;
