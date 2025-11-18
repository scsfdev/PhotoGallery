import { Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {  type ChangeEvent } from "react";

interface FileUploadButtonProps {
  onFileSelect: (file: File | null, url: string | null) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FileUploadButton({ onFileSelect }: FileUploadButtonProps) {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile) {
      // 1. Get the actual File object
      const fileObject = selectedFile;
      
      // 2. Generate the temporary URL for preview
      const previewUrl = URL.createObjectURL(fileObject);
      
      // 3. Pass both the File and the URL back to the parent
      onFileSelect(fileObject, previewUrl);
      
    } else {
      // 4. If selection is cleared, pass null for both
      onFileSelect(null, null);
    }
  };

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    </>
  );
}
