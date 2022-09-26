import IconButton from "@mui/material/IconButton";
import Box from "@mui/system/Box";
import FormHelperText from "@mui/material/FormHelperText";
import PreviewImage from "./PreviewImage";

const ProfilePictureInput = (props: any) => {
  const {
    id,
    name,
    label,
    onChange,
    onBlur,
    error,
    helperText,
    touched,
    value,
    sx,
    placeholderImage,
  } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        disableRipple
      >
        <input
          hidden
          accept="image/*"
          type="file"
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
        <PreviewImage
          file={value}
          label={label}
          sx={{ ...sx, border: error ? "solid 1px red" : "" }}
          placeholderImage={placeholderImage}
        />
      </IconButton>
      {label && !error && !touched && <FormHelperText>{label}</FormHelperText>}
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </Box>
  );
};

export default ProfilePictureInput;
