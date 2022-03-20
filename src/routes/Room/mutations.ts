import {
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import { 
  arrayUnion,
  doc,
} from 'firebase/firestore';

import { firestore } from 'services/firebase';
import { IMessage } from 'types';

export const useRoomMutation = (
  roomId: string,
) => {
  const ref = doc(firestore, 'rooms', roomId);
  const mutation = useFirestoreDocumentMutation(ref, {
    merge: true,
  });

  const saveMessage = (message: IMessage) => {
    mutation.mutate({
      messages: arrayUnion(message),
    });
    return mutation;
  };

  const checkMessage = () => {
    mutation.mutate({
      unreadCount: 0,
    });
  };

  return {
    mutation,
    saveMessage,
    checkMessage,
  };
};
