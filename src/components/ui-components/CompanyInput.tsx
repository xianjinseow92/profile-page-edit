import PictureInput from "./PictureInput";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import get from "lodash/get";
import FormHelperText from "@mui/material/FormHelperText";
import { uploadImageWithTypeAndReassign } from "utils/helpers";

const CompanyInput = (props: any) => {
  const {
    workExperience,
    formik,
    index,
    placeholderImage,
    requiredText,
    setIsLoading,
  } = props;
  const companyError =
    get(formik.touched, `workExperiences[${index}].company`) &&
    Boolean(get(formik.errors, `workExperiences[${index}].company`));

  const companyErrorHelperText =
    get(formik.touched, `workExperiences[${index}].company`) &&
    get(formik.errors, `workExperiences[${index}].company`);

  const companyLogoError =
    get(formik.touched, `workExperiences[${index}].companyLogoImage`) &&
    Boolean(get(formik.errors, `workExperiences[${index}].companyLogoImage`));

  const companyLogoErrorHelperText =
    get(formik.touched, `workExperiences[${index}].companyLogoImage`) &&
    get(formik.errors, `workExperiences[${index}].companyLogoImage`);

  const error = companyError || companyLogoError;
  const helperText = companyErrorHelperText || companyLogoErrorHelperText;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ flex: "1 1" }}>
          <PictureInput
            key={`workExperiences[${index}].companyLogoImage`}
            id={`workExperiences[${index}].companyLogoImage`}
            name={`workExperiences[${index}].companyLogoImage`}
            onChange={(event: any) => {
              const file = event.target.files[0];
              uploadImageWithTypeAndReassign(
                file,
                `workExperiences[${index}].companyLogoImage`,
                formik.setFieldValue,
                setIsLoading
              );
            }}
            onBlur={() => {
              formik.setFieldTouched(
                `workExperiences[${index}].companyLogoImage`,
                true
              );
            }}
            error={companyLogoError}
            touched={formik.touched.companyLogoImage}
            value={workExperience.companyLogoImage}
            placeholderImage={placeholderImage}
            sx={{
              borderRadius: "50%",
              width: "50px",
            }}
          />
        </Box>
        <Box
          sx={{
            flex: "3 1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            key={`workExperiences[${index}].company`}
            fullWidth
            name={`workExperiences[${index}].company`}
            label="Company *"
            value={workExperience.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={companyError}
          />
        </Box>
      </Box>
      <Box>
        {!error && requiredText && (
          <FormHelperText>{requiredText}</FormHelperText>
        )}
        {error && helperText && (
          <FormHelperText error>{helperText}</FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default CompanyInput;
