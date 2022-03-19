import styled from 'styled-components';
import { p } from 'styled-components-spacing';

import Icon from 'components/Icon';
import Link from 'components/Link';
import Page from 'components/Page';
import Text from 'components/Text';
import Topbar from 'components/Topbar';

// ====

const Body = styled.div`
  ${p(1.5)}
`;

const ChatRoomList = () => (
  <Page>
    <Topbar>
      <Topbar.Section size={1 / 6} align="left">
        <Icon.Menu size={20} />
      </Topbar.Section>
      <Topbar.Section size="max" align="center">
        <Text>
          채팅
        </Text>
      </Topbar.Section>
      <Topbar.Section size={1 / 6} align="right">
        <Icon.User size={20} />
      </Topbar.Section>
    </Topbar>
    <Body>
      <Link to="/room/1">
        Link to dummy chatroom
      </Link>
    </Body>
  </Page>
);

export default ChatRoomList;
