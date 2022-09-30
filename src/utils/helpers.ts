import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { FIREBASE_STORAGE_IMAGE_PATH } from "constants/index";
import { Dispatch } from "react";

export const createImageFileTypeListFromUserProfileData = (
  userProfileData: any
): { file: File; type: string }[] => {
  const companyLogoImageImageList = userProfileData.workExperiences.map(
    (workExp: any, index: number) => ({
      file: workExp.companyLogoImage,
      type: `companyLogoImage${index}`,
    })
  );
  return [
    {
      file: userProfileData.profileImage,
      type: "profileImage",
    },
    ...companyLogoImageImageList,
  ];
};

/**
 * Uploads image and reassigns file to userProfileData param
 * @param imageFile
 * @param type
 */
 export const uploadImageWithTypeAndReassign = (
  imageFile: File,
  field: string,
  callback: Function,
  setIsLoading: Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  const storage = getStorage();
  const imageRef = ref(
    storage,
    `${FIREBASE_STORAGE_IMAGE_PATH}${imageFile.name}${field}`
  );
  const uploadTask = uploadBytesResumable(imageRef, imageFile);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log("File Upload Progress: ", progress);
    },
    (error) => {
      console.log("Error: ", error);
      setIsLoading(false);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl: string) => {
        callback && callback(field, downloadUrl);
        setIsLoading(false);
      });
    }
  );
};