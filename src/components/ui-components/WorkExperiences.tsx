// Helpers
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import map from "lodash/map";
import get from "lodash/get";

// UI-Components
import CompanyInput from "./CompanyInput";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// Form Controls
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

// Assets
import DefaultCompanyLogo from "assets/companyLogo.jpeg";
import DeleteIcon from "@mui/icons-material/Delete";

// States
import { IWorkExperience } from "types";

// Constants
import { DATE_FORMAT } from "constants/index";

// Utils
import { Element } from "react-scroll";

const WorkExperiences = (props: any) => {
  const { formik, setIsLoading } = props;
  const workExperiences = formik.values.workExperiences; // array of work experiences
  
  const renderWorkExperience = (workExperience: any, index: number) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
        key={"box" + index}
      >
        <Element name={`workExperiences${index}`}/>
        <Stack spacing={2}>
          {index !== 0 && (
            <Divider sx={{ margin: "30px 0", borderBottomWidth: 5 }} />
          )}
          {/* Title */}
          
          <TextField
            key={`workExperiences[${index}].title`}
            fullWidth
            name={`workExperiences[${index}].title`}
            label="Title *"
            value={workExperience.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              get(formik.touched, `workExperiences[${index}].title`) &&
              Boolean(get(formik.errors, `workExperiences[${index}].title`))
            }
            helperText={
              get(formik.touched, `workExperiences[${index}].title`) &&
              get(formik.errors, `workExperiences[${index}].title`)
            }
          />
          {/* Company */}
          <CompanyInput
            formik={formik}
            workExperience={workExperience}
            index={index}
            placeholderImage={DefaultCompanyLogo}
            requiredText="Company Logo Image is required *"
            setIsLoading={setIsLoading}
          />

          {/* Job Description */}
          <TextField
            key={`workExperiences[${index}].jobDescription`}
            fullWidth
            name={`workExperiences[${index}].jobDescription`}
            label="Job Description *"
            value={workExperience.jobDescription}
            multiline
            minRows={4}
            maxRows={8}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              get(formik.touched, `workExperiences[${index}].jobDescription`) &&
              Boolean(
                get(formik.errors, `workExperiences[${index}].jobDescription`)
              )
            }
            helperText={
              get(formik.touched, `workExperiences[${index}].jobDescription`) &&
              get(formik.errors, `workExperiences[${index}].jobDescription`)
            }
          />

          {/* Current position */}
          {workExperiences.some(
            (workExp: IWorkExperience) => workExp.isCurrentPosition === true
          ) ? (
            workExperience.isCurrentPosition ? (
              <FormControlLabel
                control={<Checkbox />}
                label={"I currently work here"}
                checked={workExperience.isCurrentPosition}
                onChange={(e, checked) => {
                  formik.setFieldValue(
                    `workExperiences[${index}].isCurrentPosition`,
                    checked
                  );
                }}
              />
            ) : null
          ) : (
            <FormControlLabel
              control={<Checkbox />}
              label={"I currently work here"}
              checked={workExperience.isCurrentPosition}
              onChange={(e, checked) => {
                formik.setFieldValue(
                  `workExperiences[${index}].isCurrentPosition`,
                  checked
                );
              }}
            />
          )}

          {/* Date */}
          {/* Start Date */}
          <DatePicker
            key={"startDate" + index}
            label="Start Date *"
            inputFormat={DATE_FORMAT}
            value={workExperience.startDate}
            onChange={(date) => {
              // Check if date is available to prevent errors
              if (date) {
                const startDate = dayjs(date.$d).toISOString()
                formik.setFieldValue(
                  `workExperiences[${index}].startDate`,
                  startDate
                );
              }
            }}
            disableFuture
            renderInput={(params) => (
              <TextField
                {...params}
                onBlur={() => {
                  formik.setFieldTouched(
                    `workExperiences[${index}].startDate`,
                    true
                  );
                }}
                error={
                  get(formik.touched, `workExperiences[${index}].startDate`) &&
                  Boolean(
                    get(formik.errors, `workExperiences[${index}].startDate`)
                  )
                }
                helperText={
                  get(formik.touched, `workExperiences[${index}].startDate`) &&
                  get(formik.errors, `workExperiences[${index}].startDate`)
                }
                onKeyDown={(e) => e.preventDefault()}
              />
            )}
          />
          {/* End Date */}
          {!workExperience.isCurrentPosition && (
            <DatePicker
              key={"endDate" + index}
              label="End Date *"
              inputFormat={DATE_FORMAT}
              value={workExperience.endDate}
              onChange={(date) => {
                // Check if date is available to prevent errors
                if (date) {
                  const endDate = dayjs(date.$d).toISOString()
                  formik.setFieldValue(
                    `workExperiences[${index}].endDate`,
                    endDate
                  );
                }
              }}
              disableFuture
              renderInput={(params) => (
                <TextField
                  {...params}
                  onBlur={() => {
                    formik.setFieldTouched(
                      `workExperiences[${index}].endDate`,
                      true
                    );
                  }}
                  error={
                    get(formik.touched, `workExperiences[${index}].endDate`) &&
                    Boolean(
                      get(formik.errors, `workExperiences[${index}].endDate`)
                    )
                  }
                  helperText={
                    get(formik.touched, `workExperiences[${index}].endDate`) &&
                    get(formik.errors, `workExperiences[${index}].endDate`)
                  }
                  onKeyDown={(e) => e.preventDefault()}
                />
              )}
            />
          )}

          {/* Remove Experience */}
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
                const copiedWorkExperiences = [...workExperiences];
                formik.setFieldValue(
                  "workExperiences",
                  copiedWorkExperiences.filter(
                    (workExp) => workExp !== workExperience
                  )
                );
              }}
            >
              <DeleteIcon />
              <Typography variant="body1">Remove Experience</Typography>
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    );
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {workExperiences && map(workExperiences, renderWorkExperience)}
    </LocalizationProvider>
  );
};

export default WorkExperiences;
