import { ref, uploadBytesResumable } from 'firebase/storage';

import { storage } from 'services/firebase';

const useUpload = () => {
  const uploadFile = (file: File) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return uploadTask;
  };
  return {
    uploadFile,
  };
};

export default useUpload;