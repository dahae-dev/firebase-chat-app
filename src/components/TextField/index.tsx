import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { px } from 'styled-components-spacing';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

const Input = styled.input`
  width: 100%;
  min-height: ${({ theme }) => theme.heights.inputField};
  border: none;
  border-radius: 50px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.m};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.charcoalGreyTwo};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadows[0]};
  &::placeholder {
    color: ${({ theme }) => theme.colors.coolGrey};
  }
  ${px(2)}
`;

const TextField = ({
  ...props
}: TextFieldProps) => {
  return (
    <Input 
      type="text"
      {...props} 
    />
  );
};

export default TextField;
export type {
  TextFieldProps,
};
