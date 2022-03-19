import styled from 'styled-components';
import { p } from 'styled-components-spacing';

import Icon from 'components/Icon';
import Link from 'components/Link';
import Page from 'components/Page';
import Stack from 'components/Stack';
import Text from 'components/Text';
import Topbar from 'components/Topbar';

// ====

const Body = styled.div`
  ${p(1.5)}
`;

const ChatRoom = () => (
  <Page
    backgroundColor="paleLilac"
  >
     <Topbar>
      <Topbar.Section size={1 / 4} align="left">
        <Link to="/list">
          <Icon.ChevronLeft size={20} />
        </Link>
      </Topbar.Section>
      <Topbar.Section size="max" align="center">
        <Text>
          타이틀
        </Text>
      </Topbar.Section>
      <Topbar.Section size={1 / 4} align="right">
        <Stack spacing={1.5}>
          <Icon.Image size={20} />
          <Icon.Search size={20} />
        </Stack>
      </Topbar.Section>
    </Topbar>
    <Body>
      Chat Room
    </Body>
  </Page>
);

export default ChatRoom;
