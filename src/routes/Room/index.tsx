import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { p, py, px, mx, Padding } from 'styled-components-spacing';

import Align from 'components/Align';
import Button from 'components/Button';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import Link from 'components/Link';
import Page from 'components/Page';
import Spinner from 'components/Spinner';
import Stack from 'components/Stack';
import Text from 'components/Text';
import TextField from 'components/TextField';
import Thumbnail from 'components/Thumbnail';
import Topbar from 'components/Topbar';
import { IMessage } from 'types';

import { useRoomMutation } from './mutations';
import { useRoomQuery } from './queries';

interface IProcessedMessage extends Omit<IMessage, 'createdAt'> {
  createdAt: string;
  createdDate: string;
}

// ====

const Body = styled(Page.Body)<{ footerOffset?: number }>`
  margin-bottom: ${({ footerOffset }) => `${footerOffset}px` || 0};
  ${p(1.5)}
`;

const MessageWrapper = styled.div<{ reverse: boolean }>`
  display: flex;
  align-items: flex-end;
  -webkit-align-items: flex-end;
  ${({ reverse }) => reverse ? 'flex-direction: row-reverse;' : ''}
  ${py(0.5)}
  ${mx(-0.5)}
  > *:not(first-child) {
    ${mx(0.5)}
  }
`;

const MessageBox = styled.div<{ variation: 'purple' | 'white' }>`
  ${({ variation, theme }) => {
    if (variation === 'purple') {
      return `
        background-color: ${theme.colors.purple};
        color: ${theme.colors.white};
      `;
    } 
    if (variation === 'white') {
      return `
        background-color: ${theme.colors.white};
        color: ${theme.colors.charcoalGrey};
      `;
    }
  }}
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadows[0]};
`;

const Footer = styled(Page.Footer)`
  ${px(1.5)}
  ${py(2)}
`;

const Form = styled.form``;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${({ theme }) => theme.heights.inputField};
  min-height: ${({ theme }) => theme.heights.inputField};
  border: none;
`;

const ScrollRefContainer = styled.div``;

const Room = () => {
  const params = useParams<{ room_id: string }>();
  const { room_id: roomId } = params;
  const {
    isLoading,
    data,
  } = useRoomQuery({ id: roomId });
  const { participants = [], messages = [] } = data || {};
  const title = participants.map(({ name }) => name).join(', ');
  const processedMessages = messages.map((message) => {
    const createdAt = message.createdAt?.toDate();
    return {
      ...message,
      createdAt: createdAt ? format(createdAt, 'HH:mm') : '',
      createdDate: createdAt ? format(createdAt, 'yyyy년 M월 d일') : '',
    };
  });
  const groupedMessages = processedMessages.reduce((group, message) => {
    group[message.createdDate] = [
      ...(group[message.createdDate] || []),
      message,
    ];
    return group;
  }, {} as { [x: string]: IProcessedMessage[] });
  const dateGroups = Object.keys(groupedMessages);

  const footerRef = useRef<HTMLDivElement>(null);
  const [footerOffset, setFooterOffset] = useState(0);
  useEffect(() => {
    if (footerRef.current) {
      setFooterOffset(footerRef.current.clientHeight);
    }
  }, [footerRef.current]);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [scrollRef.current]);

  const { saveMessage } = useRoomMutation(roomId);
  const [formValue, setFormValue] = useState('');
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveMessage({
      type: 'text',
      content: formValue,
      createdAt: Timestamp.fromDate(new Date()),
      status: 'sent',
    });
    setFormValue('');
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
            {title}
          </Text>
        </Topbar.Section>
        <Topbar.Section size={1 / 4} align="right">
          <Stack spacing={1.5}>
            <Icon.Image size={20} />
            <Icon.Search size={20} />
          </Stack>
        </Topbar.Section>
      </Topbar>
      <Body footerOffset={footerOffset}>
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
              dateGroups.map((dateGroup) => (
                <React.Fragment key={dateGroup}>
                  <Padding vertical={1}>
                    <Divider>
                      {dateGroup}
                    </Divider>
                  </Padding>
                  {
                    groupedMessages[dateGroup].map((msg) => (
                      <MessageWrapper
                        key={msg.id}
                        reverse={msg.status === 'sent' ? true : false}
                      >
                        {
                          msg.type === 'text'
                            ? (
                              <MessageBox
                                variation={msg.status === 'sent' ? 'purple' : 'white'}
                              >
                                <Padding all={1.5}>
                                  <Text
                                    size="s"
                                  >
                                    {msg.content}
                                  </Text>
                                </Padding>
                              </MessageBox>
                            )
                            : (
                              <Thumbnail
                                src={msg.content}
                              />
                            )
                        }
                        <Text
                          color="coolGrey"
                          size="xs"
                        >
                          {msg.createdAt}
                        </Text>
                      </MessageWrapper>
                    ))
                  }
                </React.Fragment>
              ))
            )
        }
        <ScrollRefContainer
          ref={scrollRef}
        />
      </Body>
      <Footer ref={footerRef}>
        <Form onSubmit={handleSubmit}>
          <Stack>
            <TextField
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder='메시지를 입력하세요..'
            />
            <StyledButton
              type="submit"
              rounded
            >
              <Icon.Mail size={24} />
            </StyledButton>
          </Stack>
        </Form>
      </Footer>
    </Page>
  );
};

export default Room;
