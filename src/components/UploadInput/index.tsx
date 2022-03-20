import { InputHTMLAttributes, useRef } from 'react';
import styled from 'styled-components';

import Button from 'components/Button';

interface UploadInputProps extends InputHTMLAttributes<HTMLInputElement> {
  renderButton?: ({ onClick }: { onClick: () => void }) => React.ReactNode;
}

// ====

const Root = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

const UploadInput = ({
  renderButton = ({ onClick }) => (
    <Button onClick={onClick}>Upload</Button>
  ),
  ...props
}: UploadInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Root>
      <Input
        type="file"
        ref={inputRef}
        {...props}
      />
      {
        renderButton({
          onClick: () => inputRef.current?.click(),
        })
      }
    </Root>
  );
};

export default UploadInput;
export type {
  UploadInputProps,
};
