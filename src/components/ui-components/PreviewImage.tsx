import { useEffect, useState } from "react";

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
        setPreview(file);
      }
    }
  }, [file]);

  return (
    <>
      <Box
        component="img"
        src={preview ? preview : placeholderImage ? placeholderImage : null}
        sx={{
          ...sx,
        }}
        alt={label}
        onError={({ currentTarget }: { currentTarget: any }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = placeholderImage;
        }}
      />
    </>
  );
};

export default PreviewImage;
