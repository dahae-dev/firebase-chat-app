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

import { useRoomsQuery } from './queries';

// ====

const Body = styled(Page.Body)`
  ${p(1.5)}
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

const RoomList = () => {
  const {
    isLoading,
    data,
  } = useRoomsQuery();

  const sortedRooms = data
    .map((room) => {
      const { messages = [] } = room;
      const last = messages[messages.length - 1];
      const lastCreatedDateObj = +(last?.createdAt?.toDate() || new Date()); 
      return {
        ...room,
        lastCreatedDateObj,
      };
    })
    .sort((prevRoom, currRoom) => (
      currRoom.lastCreatedDateObj - prevRoom.lastCreatedDateObj
    ));
  
  const rooms = sortedRooms.map(({
    id,
    displayName,
    thumbnailUrl,
    unreadCount = 0,
    messages = [],
  }) => {
    const last = messages[messages.length - 1] || {};
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
      displayName,
      thumbnailUrl,
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
                          src={room.thumbnailUrl}
                          name={room.thumbnailUrl ? room.displayName : 'thumbnail'}
                          rounded
                        />
                      </Partition.Side>
                      <Partition.Main>
                        <Text
                          weight="semiBold"
                          color="charcoalGrey"
                          lineClamp
                        >
                          {room.displayName}
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
                      <Partition.Side
                        minWidth="40px"
                        textAlign="right"
                      >
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


export default RoomList;
