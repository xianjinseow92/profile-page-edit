// UI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { PuffLoader } from "react-spinners";

// States
import { userProfileInitialState } from "states/initialState";

// API call
import { doc, setDoc } from "firebase/firestore";
import { userProfilesCollectionRef } from "apis/fireBaseUserProfileData";
import Alert from "react-s-alert";
import FormHelperText from "@mui/material/FormHelperText";

export const ResetUserProfileButton = (props: any) => {
  const { isLoading, setIsLoading } = props;

  const onClearUserData = () => {
    try {
      const userProfileRef = doc(userProfilesCollectionRef, "69");
      setDoc(userProfileRef, userProfileInitialState);
      setIsLoading(false);
      Alert.success("Profile has been reset!");
      setTimeout(() => {
        window.location.reload(); // refresh page so it can pull latest data
      }, 1000);
      return false;
    } catch (error) {
      console.log("Error: ", error);
      setIsLoading(false);
      Alert.error("We're so sorry. Something went wrong. Please try again.");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        variant="contained"
        color="error"
        onClick={onClearUserData}
        sx={{ minHeight: "50px", margin: "30px" }}
        disabled={isLoading}
      >
        {isLoading ? <PuffLoader size={30} /> : "Reset Profile"}
      </Button>
      <FormHelperText>
        * DO NOT CLICK UNLESS YOU WANT TO RESET PROFILE
      </FormHelperText>
    </Box>
  );
};

export default ResetUserProfileButton;
