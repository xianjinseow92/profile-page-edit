import { useEffect, useState } from "react";
import DefaultProfileImage from "assets/profilePic.jpeg";

import Box from "@mui/system/Box";

const PreviewImage = (props: any) => {
  const [preview, setPreview] = useState<string>();
  const { file, label, sx, placeholderImage } = props;

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      if (typeof file !== "string") {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          const result = fileReader.result as string;
          result ? setPreview(result) : setPreview("Error loading image.");
        };
      } else {
        // debugger;
        console.log(file);
        setPreview(file);
      }
    }
  }, [file]);

  return (
    <>
      <Box
        component="img"
        src={
          preview
            ? preview
            : placeholderImage
            ? placeholderImage
            : DefaultProfileImage
        }
        sx={{
          ...sx,
        }}
        alt={label}
      />
    </>
  );
};

export default PreviewImage;
