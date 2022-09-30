import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export const scrollToOptions = (field: string) => {
  let offset = 0;
  if (field.includes("workExperience")) {
    offset = -50;
  }
  return {
    duration: 500,
    delay: 100,
    smooth: true,
    offset: offset,
  };
};

export default responsiveFontSizes(theme);