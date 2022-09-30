import { useState } from "react";
import { useFormik } from "formik";

// UI Components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Form Validations
import { validationSchema } from "utils/validations";

// Hooks
import useGetUserProfileData from "hooks/useGetUserProfileData";

// Forms
import UserProfileForm from "components/forms/UserProfileForm";

// Misc
import PuffLoader from "react-spinners/PuffLoader";

// API call
import { doc, setDoc } from "firebase/firestore";
import { userProfilesCollectionRef } from "apis/fireBaseUserProfileData";

// Utils
import Alert from "react-s-alert";

const Profile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userProfileData, isLoading } = useGetUserProfileData();

  const updateUserProfile = (userProfileData: any) => {
    setIsSubmitting(true);
    // Submit payload to firebase database
    try {
      const userProfileRef = doc(userProfilesCollectionRef, `${userProfileData.id}`);
      setDoc(userProfileRef, userProfileData);
      setIsSubmitting(false);
      Alert.success("Your profile has been updated!");
    } catch (error) {
      console.log("Error: ", error);
      setIsSubmitting(false);
      Alert.error("We're so sorry. Something went wrong. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: userProfileData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateUserProfile(values);
    },
    enableReinitialize: true, // changes if initialValues changes
  });

  return (
    <Container
      sx={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <PuffLoader size={200} />
        </Box>
      ) : (
        <UserProfileForm formik={formik} isLoading={isSubmitting} setIsLoading={setIsSubmitting} />
      )}
    </Container>
  );
};

export default Profile;
