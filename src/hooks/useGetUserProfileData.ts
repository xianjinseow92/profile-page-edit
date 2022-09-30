import { useState, useEffect } from "react";
import { IWorkExperience, IProfileFormPayload } from "types";
import { userProfileInitialState } from "states/initialState";
import { userProfilesCollectionRef } from "apis/fireBaseUserProfileData";
import { DocumentData, onSnapshot } from "firebase/firestore";

/**
 * The purpose of this hook is to declutter ProfilePage component
 * And separate logic of retrieving user data.
 * @returns {userProfileData}
*/

const useGetUserProfileData = () => {
  const [userProfileData, setUserProfileData] = useState<
    IProfileFormPayload | Object | DocumentData
  >(userProfileInitialState);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const callFirebaseStore = () => {
    setIsLoading(true);
    return onSnapshot(userProfilesCollectionRef, (querySnapshot) => {
      const items: DocumentData[] = [];
      querySnapshot.forEach((item) => {
        items.push(item.data());
      });
      if (items[0]) {
        setUserProfileData(items[0]);
      } else { 
        setUserProfileData(userProfileInitialState);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    /**
     * Make API call to retrieve userProfileData
     * If userProfileData is empty (ie, API call returns nothing because it doesn't exist in DB)
     * Return a initialValue for userProfile.
     */
    const unsub = callFirebaseStore();

    return () => {
      unsub();
    }
  }, []);

  return { userProfileData, isLoading };
};

export default useGetUserProfileData;
