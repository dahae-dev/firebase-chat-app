import { 
  arrayUnion,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { firestore } from 'services/firebase';
import { IMessage } from 'types';

export const useRoomMutation = (
  roomId: string,
) => {
  const ref = doc(firestore, 'rooms', roomId);

  const saveMessage = async (message: IMessage) => {
    await updateDoc(ref, {
      messages: arrayUnion(message),
    });
  };

  const checkMessage = async () => {
    await updateDoc(ref, {
      unreadCount: 0,
    });
  };

  return {
    saveMessage,
    checkMessage,
  };
};
