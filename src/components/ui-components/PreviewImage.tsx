import { useState } from "react";
import DefaultProfileImage from "assets/profilePic.jpeg";

import Box from "@mui/system/Box";

const PreviewImage = ({
  file,
  label,
  sx,
}: {
  file: File;
  label: string;
  sx: any;
}) => {
  const [preview, setPreview] = useState<string>();

  if (file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result as string;
      result ? setPreview(result) : setPreview("Error loading image.");
    };
  }

  return (
    <>
      <Box
        component="img"
        src={preview ? preview : DefaultProfileImage}
        sx={{
          ...sx,
        }}
        alt={label}
      />
    </>
  );
};

export default PreviewImage;
