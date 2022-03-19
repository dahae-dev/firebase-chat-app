import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { p } from 'styled-components-spacing';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

const StyledInput = styled.input`
  width: 100%;
  min-height: ${({ theme }) => theme.heights.inputField};
  border: none;
  border-radius: 50px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.m};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.charcoalGreyTwo};
  background-color: ${({ theme }) => theme.colors.white};
  &::placeholder {
    color: ${({ theme }) => theme.colors.coolGrey};
  }: ${({ theme }) => theme.boxShadows[0]};
  ${p(2)}
`;

const TextField = ({
  ...props
}: TextFieldProps) => {
  return (
    <StyledInput 
      type="search"
      {...props} 
    />
  );
};

export default TextField;
export type {
  TextFieldProps,
};
