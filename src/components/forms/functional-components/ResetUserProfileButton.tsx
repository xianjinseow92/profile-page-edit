// UI Components
import Button from "@mui/material/Button";
import { PuffLoader } from "react-spinners";

// States
import { userProfileInitialState } from "states/initialState";

// API call
import { doc, setDoc } from "firebase/firestore";
import { userProfilesCollectionRef } from "apis/fireBaseUserProfileData";
import Alert from "react-s-alert";

export const ResetUserProfileButton = (props: any) => {
  const { isLoading, setIsLoading } = props;

  const onClearUserData = () => {
    try {
      const userProfileRef = doc(userProfilesCollectionRef, "69");
      setDoc(userProfileRef, userProfileInitialState);
      setIsLoading(false);
      Alert.success("Profile has been reset!");
      window.location.reload(); // refresh page so it can pull latest data
      return false;
    } catch (error) {
      console.log("Error: ", error);
      setIsLoading(false);
      Alert.error("We're so sorry. Something went wrong. Please try again.");
    }
  };
  return (
    <Button
      variant="contained"
      color="error"
      onClick={onClearUserData}
      sx={{ minHeight: "50px", margin: "30px" }}
      disabled={isLoading}
    >
      {isLoading ? <PuffLoader size={30} /> : "Reset Profile"}
    </Button>
  );
};

export default ResetUserProfileButton;
