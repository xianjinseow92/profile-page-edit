import { useEffect } from "react";
// Form Control
import TextField from "@mui/material/TextField";

// UI Components
import PictureInput from "components/ui-components/PictureInput";
import WorkExperiences from "components/ui-components/WorkExperiences";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PuffLoader from "react-spinners/PuffLoader";

// Layout
import CardWithLabel from "components/layout/CardWithLabel";

// Assets
import AddIcon from "@mui/icons-material/Add";
import DefaultProfileImage from "assets/profilePic.jpeg";

// Helpers
import { userProfileInitialState } from "states/initialState";
import { uploadImageWithTypeAndReassign } from "utils/helpers";
import isEmpty from "lodash/isEmpty";
import head from "lodash/head";

// Animations
import { scroller, Element } from "react-scroll";
import { scrollToOptions } from "styles";

// Utils
import Alert from "react-s-alert";

const UserProfileForm = (props: any) => {
  const { formik, isLoading, setIsLoading } = props;
  useEffect(() => {
    // Scroll To First error element
    if (!formik.isSubmitting) return;
    if (!isEmpty(formik.errors)) {
      let errorName = head(Object.keys(formik.errors));
      if (errorName === "workExperiences") {
        const workExperiencesIndex = head(Object.keys(formik.errors.workExperiences));
        errorName = `workExperiences${workExperiencesIndex}`;
      }
      // @ts-ignore
      scroller.scrollTo(errorName, scrollToOptions(errorName));
      Alert.error("There is a field you have yet to fill up!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.isSubmitting]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        border: "solid 1px black",
        borderRadius: "20px",
        padding: "20px",
      }}
      id="profile-form"
      data-testid="profile-form"
    >
      {/* ProfilePicture */}
      <PictureInput
        sx={{
          borderRadius: "50%",
          width: "50%",
          minWidth: "100px",
        }}
        id="profileImage"
        name="profileImage"
        label="Upload Profile Image *"
        onChange={(event: any) => {
          const file = event.target.files[0];
          uploadImageWithTypeAndReassign(
            file,
            "profileImage",
            formik.setFieldValue,
            setIsLoading
          );
        }}
        onBlur={() => {
          formik.setFieldTouched("profileImage", true);
        }}
        value={formik.values.profileImage}
        error={
          formik.touched.profileImage && Boolean(formik.errors.profileImage)
        }
        helperText={formik.touched.profileImage && formik.errors.profileImage}
        touched={formik.touched.profileImage}
        placeholderImage={DefaultProfileImage}
      />

      {/* Basic Information */}
      <CardWithLabel title="Basic Information">
        <Stack spacing={2}>
          <Element name="name" />
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name *"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Element name="age" />
          <TextField
            fullWidth
            id="age"
            name="age"
            label="Age *"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
        </Stack>
      </CardWithLabel>

      {/* Working Experience */}
      <Element name="workExperiences" />
      <CardWithLabel title="Experience">
        <WorkExperiences formik={formik} setIsLoading={setIsLoading} />
        {/* Add new Experience */}
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{ marginTop: "20px" }}
        >
          <IconButton
            aria-label="add experience"
            component="label"
            sx={{
              display: "inline-flex",
              border: "solid 1px black",
              flexGrow: 0,
              borderRadius: "10px",
              width: "auto",
            }}
            onClick={() => {
              // Add new Experiences field
              formik.setFieldValue("workExperiences", [
                ...formik.values.workExperiences,
                { ...userProfileInitialState.workExperiences[0] },
              ]);
            }}
          >
            <AddIcon />
            <Typography variant="body1">Add Experience</Typography>
          </IconButton>
        </Stack>
      </CardWithLabel>

      {/* Submission */}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        sx={{ minHeight: "50px" }}
        disabled={!formik.dirty || isLoading}
      >
        {isLoading ? <PuffLoader size={30} /> : "Submit"}
      </Button>
    </form>
  );
};

export default UserProfileForm;
