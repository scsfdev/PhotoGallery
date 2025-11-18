import FileUploadButton from "@components/FileUploadButton";
import { usePhotos } from "@hooks/usePhotos";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";

interface UploadedFileState {
  file: File | null;
  previewUrl: string | null;
}

export default function PhotoFormPage() {
  const { photoGuid } = useParams();
  const { photo, isLoadingPhoto } = usePhotos(photoGuid);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  console.log("Selected Options: ", selectedOptions);

  const [uploadedFile, setUploadedFile] = useState<UploadedFileState>({
    file: null,
    previewUrl: null,
  });

  const handleFileChange = (file: File | null, url: string | null) => {
    // Revoke old URL if it exists to prevent memory leaks
    if (uploadedFile.previewUrl) {
      URL.revokeObjectURL(uploadedFile.previewUrl);
    }

    setUploadedFile({ file, previewUrl: url });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data);
  };

  if (isLoadingPhoto) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ borderRadius: 2, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {photo?.photoGuid ? "Edit Photo" : "Upload New Photo"}
      </Typography>
      {/* Outer box for Form and Image Preview (side by side) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Left Box - Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            flexGrow: 1,
            flexBasis: { md: "65%" }, // Takes ~65% of the row width on desktop
          }}
        >
          <TextField name="title" label="Title" defaultValue={photo?.title} />
          <TextField
            name="description"
            label="Description"
            multiline
            rows={3}
            defaultValue={photo?.description}
          />
          <TextField
            name="location"
            label="Location"
            defaultValue={photo?.location}
          />
          <TextField
            name="country"
            label="Country"
            defaultValue={photo?.country}
          />

          {/* if this is new photo, allow user to select Date Taken At. If this is editing existing, not allow to change this date. */}
          {!photo?.photoGuid && (
            <TextField
              name="dateTakenAt"
              label="Date Taken At"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          )}

          {/* <TextField name="category" label="Category" /> */}
          <Autocomplete
            autoHighlight
            multiple
            id="auto-highlight"
            options={["Nature", "Urban", "People", "Animals", "Technology"]}
            getOptionLabel={(option) => option}
            onChange={(_, newValue) => {
              setSelectedOptions(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                placeholder="Select categories"
              />
            )}
          />

          <FileUploadButton onFileSelect={handleFileChange} />
          <Box display={"flex"} justifyContent={"end"} gap={3}>
            <Button color="inherit" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" color="success" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>

        {/* Right Box - Image Preview */}
        <Box
          sx={{
            flexShrink: 0, // Prevent shrinking
            flexBasis: { xs: "100%", md: "35%" }, // Set a dedicated width for the preview
            mt: { xs: 2, md: 0 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed #ccc",
            borderRadius: 2,
            minHeight: { xs: 200, md: 400 }, // Ensure it has visible space
            overflow: "hidden",
          }}
        >
          {uploadedFile.previewUrl ? (
            <img
              src={uploadedFile.previewUrl}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <Typography color="text.secondary">Image Preview Here</Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
