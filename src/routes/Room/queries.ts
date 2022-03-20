import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { firestore } from 'services/firebase';
import { IRoom } from 'types';

export const useRoomQuery = ({ id }: { id: string }) => {
  const [room, setRoom] = useState<IRoom | null>(null);
  const ref = doc(firestore, 'rooms', id);

  useEffect(() => {
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      setRoom(snapshot.data() || null);
    });
    return unsubscribe;
  }, []);

  return {
    data: room,
  };
};