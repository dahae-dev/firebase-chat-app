import styled from 'styled-components';

const Root = styled.div`
  background-color: ${({ theme })=> theme.colors.paleLilac};
`;

const App = () => {
  return (
    <Root>Chat App</Root>
  );
};

export default App;
