import { PropsWithChildren } from 'react';
import styled, { CSSProperties } from 'styled-components';

import Img, { ImgProps } from 'components/Img';

import thumbnailFallback from './thumbnailFallback.png';

interface ThumbnailProps extends Omit<ImgProps, 'width' | 'height' | 'alt'> {
  className?: string;
  size?: CSSProperties['width'];
  name?: string;
  fallbackImgSrc?: string;
  rounded?: boolean;
}

// ====

const Root = styled.div<Pick<ThumbnailProps, 'size'>>`
  position: relative;
  width: ${({ size }) => typeof size === 'number' ? `${size}px` : size};
  height: ${({ size }) => typeof size === 'number' ? `${size}px` : size};
  overflow: hidden;
`;

const StyledImg = styled(Img)<Pick<ThumbnailProps, 'rounded'> & {
  fallback?: boolean
}>`
  object-fit: cover;
  object-position: center;
  border-radius: ${({ rounded }) => rounded ? '50%' : '8px'};
  ${({ fallback, theme }) => fallback ? `background-color: ${theme.colors.paleLilac};` : ''}
`;

const Thumbnail = ({
  className,
  size = 40,
  name = 'Thumbnail',
  src,
  fallbackImgSrc = thumbnailFallback,
  rounded = false,
  children,
  ...props
}: PropsWithChildren<ThumbnailProps>) => (
  <Root
    className={className}
    size={size}
  >
    <StyledImg
      {...props}
      width="100%"
      height="100%"
      rounded={rounded}
      fallback={!src}
      alt={name}
      src={src || fallbackImgSrc}
    />
    {children}
  </Root>
);

export default Thumbnail;
export type {
  ThumbnailProps,
};
