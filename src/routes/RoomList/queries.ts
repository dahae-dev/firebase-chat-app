import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { firestore } from 'services/firebase';
import { IRoom } from 'types';

export const useRoomsQuery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const ref = collection(firestore, 'rooms');
  
  useEffect(() => {
    const getRooms = async () => {
      setIsLoading(true);
      try {
        const data = await getDocs(ref);
        setRooms(data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      }
    };

    getRooms();
  }, []);

  return {
    isLoading,
    isError,
    data: rooms,
  };
};