import { format, isSameMinute } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { getDownloadURL, UploadTask } from 'firebase/storage';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { p, py, px, mx, Padding } from 'styled-components-spacing';

import Button from 'components/Button';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import Link from 'components/Link';
import Page from 'components/Page';
import ProgressBar from 'components/ProgressBar';
import Stack from 'components/Stack';
import Text from 'components/Text';
import TextField from 'components/TextField';
import Thumbnail from 'components/Thumbnail';
import Topbar from 'components/Topbar';
import UploadInput from 'components/UploadInput';
import useUpload from 'hooks/useUpload';
import { IMessage } from 'types';

import { useRoomMutation } from './mutations';
import { useRoomQuery } from './queries';

interface IProcessedMessage extends Omit<IMessage, 'createdAt'> {
  createdAt: string | null;
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

const SubmitButton = styled(Button)`
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  min-width: ${({ theme }) => theme.heights.inputField};
  min-height: ${({ theme }) => theme.heights.inputField};
  border: none;
`;

const ThumbnailWrapper = styled.div`
  width: 50%;
`;

const XButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.black70};
  width: 45px;
  height: 45px;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
`;

const ScrollRefContainer = styled.div``;

const Room = () => {
  const params = useParams<{ room_id: string }>();
  const { room_id: roomId } = params;
  const { data } = useRoomQuery({ id: roomId });
  const { displayName, unreadCount, messages = [] } = data || {};
  const processedMessages = messages.map((message, idx) => {
    const createdAt = message.createdAt?.toDate();
    const nextCreatedAt = messages[idx + 1]?.createdAt?.toDate();
    const isSentInSameMinute = (
      createdAt && nextCreatedAt && isSameMinute(createdAt, nextCreatedAt)
    );
    return {
      ...message,
      createdAt: (
        isSentInSameMinute
          ? null
          : (createdAt ? format(createdAt, 'HH:mm') : '')
      ),
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

  const { saveMessage, checkMessage } = useRoomMutation(roomId);
  const [formValue, setFormValue] = useState('');
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValue) {
      saveMessage({
        type: 'text',
        content: formValue,
        createdAt: Timestamp.fromDate(new Date()),
        status: 'sent',
      });
      setFormValue('');
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (unreadCount && unreadCount > 0) {
      checkMessage();
    }
  }, [unreadCount]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadTask, setUploadTask] = useState<UploadTask | null>(null);
  const [progressRate, setProgressRate] = useState(0);
  const { uploadFile } = useUpload();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget: { validity, files } } = e;
    if (validity.valid && files && files[0]) {
      setSelectedFile(files[0]);
      setUploadTask(uploadFile(files[0]));
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const cancelUpload = () => {
    setSelectedFile(null);
    if (uploadTask) {
      uploadTask.cancel();
    }
  };
  useEffect(() => {
    if (uploadTask) {
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
          setProgressRate(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            saveMessage({
              type: 'file',
              content: downloadUrl,
              createdAt: Timestamp.fromDate(new Date()),
              status: 'sent',
            });
            setSelectedFile(null);
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
          });
        },
      );
    }
  }, [uploadTask]);

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
            {displayName}
          </Text>
        </Topbar.Section>
        <Topbar.Section size={1 / 4} align="right">
          <Stack spacing={1.5}>
            <UploadInput
              accept='image/*'
              renderButton={({ onClick }) => (
                <Icon.Image
                  size={20}
                  onClick={onClick}
                />
              )}
              onChange={handleFileChange}
            />
            <Icon.Search size={20} />
          </Stack>
        </Topbar.Section>
      </Topbar>
      <Body footerOffset={footerOffset}>
        {
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
                      msg.type === 'file'
                        ? (
                          <ThumbnailWrapper>
                            <Thumbnail
                              src={msg.content}
                              size="100%"
                            />
                          </ThumbnailWrapper>
                          
                        )
                        : (
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
        }
        {
          selectedFile && (
            <MessageWrapper reverse>
              <ThumbnailWrapper>
                <Thumbnail
                  src={URL.createObjectURL(selectedFile)}
                  name={selectedFile.name}
                  size="100%"
                >
                  <XButton
                    onClick={cancelUpload}
                  >
                    <Icon.X size={20} />
                  </XButton>
                </Thumbnail>
                <ProgressBar value={progressRate} />
              </ThumbnailWrapper>
            </MessageWrapper>
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
            <SubmitButton
              type="submit"
              rounded
            >
              <Icon.Mail size={24} />
            </SubmitButton>
          </Stack>
        </Form>
      </Footer>
    </Page>
  );
};

export default Room;

