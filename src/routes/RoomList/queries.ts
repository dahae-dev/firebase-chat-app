import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection } from 'firebase/firestore';

import { firestore } from 'services/firebase';
import { IRoom } from 'types';

export const useRoomsQuery = () => {
  const ref = collection(firestore, 'rooms');
  const query = useFirestoreQuery<IRoom>(['rooms'], ref, {
    subscribe: true,
  });
  const snapshot = query.data;
  const docs = snapshot ? snapshot.docs : [];
  const data = docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return {
    ...query,
    data,
  };
};