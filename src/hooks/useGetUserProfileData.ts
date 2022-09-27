import { useState, useEffect } from "react";
import { IWorkExperience, IProfileFormPayload } from "types";
import { userProfileInitialState } from "states/initialState";

/**
 * The purpose of this hook is to declutter ProfilePage component
 * And separate logic of retrieving user data.
 * @returns {userProfileData}
 */

const mockSuccessRes = {
  success: true,
  result: {
    profileImage: "",
    name: "XJ",
    age: 30,
    workExperiences: [
      {
        title: "SWE",
        company: "CirclesLife",
        companyLogoImage: "",
        jobDescription: "Worked on a few projects here and there",
        startDate: null,
        endDate: null,
        isCurrentPosition: true,
      },
    ],
  },
};

const mockFailureRes = {
  success: false,
  result: {},
};

const useGetUserProfileData = () => {
  const [userProfileData, setUserProfileData] = useState<IProfileFormPayload>(
    userProfileInitialState
  );
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const secondsToCompleteCall = 1000;

  const mockAPICall = () => {
    setIsLoading(true);
    setTimeout(() => {
      const { success, result } = mockSuccessRes;
      if (success) {
        setUserProfileData(result);
      }
      setIsLoading(false);
    }, secondsToCompleteCall);
  };

  useEffect(() => {
    /**
     * Make API call to retrieve userProfileData
     * If userProfileData is empty (ie, API call returns nothing because it doesn't exist in DB)
     * Return a initialValue for userProfile.
     */
    mockAPICall();
  }, []);

  return { userProfileData, isLoading };
};

export default useGetUserProfileData;
