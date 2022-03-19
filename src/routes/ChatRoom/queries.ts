import { useFirestoreDocument } from '@react-query-firebase/firestore';
import {  doc } from 'firebase/firestore';

import { firestore } from 'services/firebase';
import { IRoom } from 'types';

export const useRoom = ({ id }: { id: string }) => {
  const ref = doc(firestore, 'rooms', id);
  const room = useFirestoreDocument<IRoom>(['rooms', id], ref, {
    subscribe: true,
  });
  const snapshot = room.data;
  return {
    ...room,
    data: snapshot ? snapshot.data() : {},
  };
};