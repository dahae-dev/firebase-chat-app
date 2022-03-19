import { isToday, format } from 'date-fns';
import styled from 'styled-components';
import { p, px, py, Padding, Margin } from 'styled-components-spacing';

import Align from 'components/Align';
import Icon from 'components/Icon';
import Link from 'components/Link';
import Page from 'components/Page';
import Partition from 'components/Partition';
import Spinner from 'components/Spinner';
import Text from 'components/Text';
import Thumbnail from 'components/Thumbnail';
import Topbar from 'components/Topbar';

import { useRooms } from './queries';

// ====

const Body = styled.div`
  ${p(1.5)}
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;

const Badge = styled.div`
  display: inline-block;
  min-width: 10px;
  text-align: center;
  background-color: ${({ color, theme }) => color || theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  border-radius: 50%;
  ${px(0.5)}
  ${py(0.25)}
`;

const ChatRoomList = () => {
  const {
    isLoading,
    data,
  } = useRooms();

  const rooms = data.map(({
    id,
    unreadCount = 0,
    participants = [],
    messages = [],
  }) => {
    const thumbnail = (
      participants.length === 1
        ? participants[0].thumbnail
        : ''
    );
    const title = participants.map(({ name }) => name).join(', ');
    const last = messages[messages.length - 1];
    const lastMessage = (
      last.type === 'file'
        ? '사진'
        : last.content
    );
    const lastCreatedDateObj = last.createdAt?.toDate();
    const lastCreatedAt = (
      lastCreatedDateObj && (
        isToday(lastCreatedDateObj)
          ? format(lastCreatedDateObj, 'HH:mm')
          : format(lastCreatedDateObj, 'M월 d일')
      )
    );
    
    return {
      id,
      thumbnail,
      title,
      lastMessage,
      lastCreatedAt,
      unreadCount,
    };
  });

  return (
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
        {
          isLoading
            ? (
              <Align horizontal="center" vertical="center">
                <Spinner
                  loading={isLoading}
                  size={60}
                  css=""
                  speedMultiplier={1}
                />
              </Align>
            )
            : (
              rooms.map((room) => (
                <Link
                  key={room.id}
                  to={`/room/${room.id}`}
                >
                  <Padding all={1}>
                    <Partition spacing={1}>
                      <Partition.Side>
                        <Thumbnail
                          size="50px"
                          src={room.thumbnail}
                          name={room.thumbnail ? room.title : 'thumbnail'}
                          rounded
                        />
                      </Partition.Side>
                      <Partition.Main>
                        <Text
                          size="l"
                          weight="semiBold"
                          color="charcoalGrey"
                          lineClamp
                        >
                          {room.title}
                        </Text>
                        <Margin top={0.75}>
                          <Text
                            size="s"
                            color="coolGrey"
                            lineClamp
                          >
                            {room.lastMessage}
                          </Text>
                        </Margin>
                      </Partition.Main>
                      <Partition.Side>
                        <Text
                          size="xs"
                          color="coolGrey"
                        >
                          {room.lastCreatedAt}
                        </Text>
                        {
                          room.unreadCount > 0 && (
                            <Margin top={0.75}>
                              <Align horizontal="right">
                                <Badge>
                                  {room.unreadCount}
                                </Badge>
                              </Align>
                            </Margin>
                          )
                        }
                      </Partition.Side>
                    </Partition>
                  </Padding>
                </Link>
              ))
            )
        }
      </Body>
    </Page>
  );
};


export default ChatRoomList;
