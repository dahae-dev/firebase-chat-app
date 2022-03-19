import styled, { CSSProperties } from 'styled-components';

import Img, { ImgProps } from 'components/Img';

import thumbnailFallback from './thumbnailFallback.png';

interface ThumbnailProps extends Omit<ImgProps, 'width' | 'height' | 'alt'> {
  size?: CSSProperties['width'];
  name?: string;
  fallbackImgSrc?: string;
  rounded?: boolean;
}

// ====

const StyledImg = styled(Img)<Pick<ThumbnailProps, 'rounded'> & {
  fallback?: boolean
}>`
  ${({ rounded }) => rounded ? 'border-radius: 50%;' : ''}
  ${({ fallback, theme }) => fallback ? `background-color: ${theme.colors.paleLilac};` : ''}
`;

const Thumbnail = ({
  size = '40px',
  name = 'Thumbnail',
  src,
  fallbackImgSrc = thumbnailFallback,
  rounded = false,
  ...props
}: ThumbnailProps) => (
  <StyledImg
    {...props}
    width={size}
    height={size}
    rounded={rounded}
    fallback={!src}
    alt={name}
    src={src || fallbackImgSrc}
  />
);

export default Thumbnail;
export type {
  ThumbnailProps,
};
