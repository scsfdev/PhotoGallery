import FileUploadButton from "@components/FileUploadButton";
import { useCategories } from "@hooks/useCategories";
import { usePhotos } from "@hooks/usePhotos";
import { useUploadPhoto } from "@hooks/useUploadPhoto";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import type { Category } from "@types";
import countries from "constants/countryData";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UploadedFileState {
  file: File | null;
  previewUrl: string | null;
}

const initialUploadedFileState: UploadedFileState = {
  file: null,
  previewUrl: null,
};

export default function PhotoFormPageNoRHF() {
  const { photoGuid } = useParams();
  const { photo, isLoadingPhoto } = usePhotos(photoGuid);
  const { categories, isPending } = useCategories();
  const { mutate, isPending: isUploading, isSuccess } = useUploadPhoto();

  // Api call to get country list but could not find a good complete Country List api, so create local list.
  //const { countries } = useCountries();

  const [selectedOptions, setSelectedOptions] = useState<Category[]>(
    photo?.photoCategories || []
  );

  const initialCountry = countries.find(
    (c) => c.label === photo?.country || c.code === photo?.country
  );
  const [selectedCountry, setSelectedCountry] = useState(
    initialCountry ?? null
  );

  const [uploadedFile, setUploadedFile] = useState<UploadedFileState>(
    initialUploadedFileState
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (photo?.url) {
      // if editing existing photo
      // Load the image.
      // Ensure we only set the preview if the user hasn't
      // already selected a new file. If the state is not the initial state (null),
      // it means the user has interacted with the file input, and we shouldn't overwrite it.
      if (uploadedFile.previewUrl === null) {
        // Set the state to display the existing photo URL.
        setUploadedFile({
          file: null, // The file field remains null as no new file has been selected yet.
          previewUrl: photo.url,
        });
      }
    }
  }, [photo, uploadedFile.previewUrl]);

  useEffect(() => {
    if (isSuccess) {
      if (uploadedFile.previewUrl) {
        URL.revokeObjectURL(uploadedFile.previewUrl);
      }
      setUploadedFile(initialUploadedFileState);
      setSelectedOptions([]);

      // Navigate back to PhotoDetail Page.
      if (photo?.photoGuid) {
        navigate(`/photos/${photo?.photoGuid}`);
      } else {
        navigate(`/`);
      }
    }
  }, [isSuccess, uploadedFile.previewUrl, navigate, photo?.photoGuid]);

  const handleFileChange = (file: File | null, url: string | null) => {
    // Revoke old URL if it exists to prevent memory leaks
    if (uploadedFile.previewUrl) {
      URL.revokeObjectURL(uploadedFile.previewUrl);
    }

    setUploadedFile({ file, previewUrl: url });
  };

  const handleCancel = () => {
    if (photo?.photoGuid) {
      navigate(`/photos/${photo.photoGuid}`);
    } else {
      navigate(`/`);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Append each selected category string to FormData under the name 'categories'
    selectedOptions.forEach((category) => {
      formData.append("categoryGuids", category.categoryGuid);
    });

    if (photo?.photoGuid) {
      formData.append("photoGuid", photo.photoGuid);
    }

    if (selectedCountry) {
      formData.append("country", selectedCountry.label);
    }

    // Check if a file is present in the state and append it.
    if (uploadedFile.file) {
      // Note: The name "image" or "file" must match what BFF expects
      formData.append("file", uploadedFile.file);
    }

    // CategoryGuids will be sent as multiple entries with the same key in FormData.
    // categoryGuids will be an array of strings in the backend.
    const data: { [key: string]: FormDataEntryValue | FormDataEntryValue[] } =
      {};

    for (const [key, value] of formData.entries()) {
      if (data[key]) {
        // If key already exists, convert to array or push to existing array
        if (Array.isArray(data[key])) {
          (data[key] as FormDataEntryValue[]).push(value);
        } else {
          data[key] = [data[key] as FormDataEntryValue, value];
        }
      } else {
        data[key] = value;
      }
    }

    console.log(data);

    mutate(formData);
  };

  if (isLoadingPhoto || isPending || isUploading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const options = categories ?? [];

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
            flexBasis: { md: "45%" }, // Takes ~65% of the row width on desktop
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

          {/* <TextField
            name="country"
            label="Country"
            defaultValue={photo?.country}
          /> */}

          <Autocomplete
            id="country-select"
            // sx={{ width: 300 }}
            options={countries}
            value={selectedCountry}
            autoHighlight
            getOptionLabel={(option) => option.label}
            onChange={(_, newValue) => {
              setSelectedCountry(newValue);
            }}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  {option.label}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                //name="country"
                slotProps={{
                  htmlInput: {
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  },
                }}
              />
            )}
          />

          {/* if this is new photo, allow user to select Date Taken At. If this is editing existing, not allow to change this date. */}
          {!photo?.photoGuid && (
            <TextField
              name="dateTaken"
              label="Date Taken At"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          )}

          <Autocomplete<Category, true>
            autoHighlight
            multiple
            id="auto-highlight"
            options={options}
            value={selectedOptions}
            getOptionLabel={(option) => option.title}
            onChange={(_, newValue) => {
              setSelectedOptions(newValue);
            }}
            isOptionEqualToValue={(option, value) =>
              option.categoryGuid === value.categoryGuid
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                name="categories"
                placeholder="Select categories"
              />
            )}
          />

          <FileUploadButton onFileSelect={handleFileChange} />
          <Box display={"flex"} justifyContent={"end"} gap={3}>
            <Button color="inherit" variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" color="success" variant="contained">
              {photo?.photoGuid ? "Update Photo" : "Upload Photo"}
            </Button>
          </Box>
        </Box>

        {/* Right Box - Image Preview */}
        <Box
          sx={{
            flexShrink: 0, // Prevent shrinking
            flexBasis: { xs: "100%", md: "55%" }, // Set a dedicated width for the preview
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
            <Typography
              color="text.secondary"
              fontStyle={"italic"}
              fontSize={15}
            >
              Image Preview
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
