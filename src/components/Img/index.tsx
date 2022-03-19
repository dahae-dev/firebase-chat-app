import { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

type ImgProps = ImgHTMLAttributes<HTMLImageElement>;

// ====

const Root = styled.img``;

const Img = ({
  className,
  src,
  alt = 'image',
  width,
  height,
  ...props
}: ImgProps) => (
  <Root
    className={className}
    src={src}
    alt={alt}
    width={width}
    height={height}
    {...props}
  />
);

export default Img;
export type {
  ImgProps,
};
