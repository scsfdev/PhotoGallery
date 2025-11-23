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


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { photoSchema, type PhotoSchema } from "schemas/photoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@components/TextInput";
import DateInput from "@components/DateInput";
import buildFormData from "@utils/photoFormUtils";

import { initialUploadedFileState } from "constants/initialUploadedFileState";
import countries from "constants/countryData";
import type { UploadedFileState } from "@types";





export default function PhotoFormPage() {
  const navigate = useNavigate();
  const { photoGuid } = useParams();
  const { photo, isLoadingPhoto } = usePhotos(photoGuid);
  const { categories, isPending } = useCategories();
  const { mutateAsync, isPending: isUploading, isSuccess } = useUploadPhoto();

  const { reset, control, handleSubmit } = useForm<PhotoSchema>({
    mode: "onTouched",
    resolver: zodResolver(photoSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      country: "",
      dateTaken: new Date(), // Default to a Date object
      category: [], // Default to empty array
    },
  });

  useEffect(() => {
    if (photo) {
      const defaultFormValues: PhotoSchema = {
        title: photo.title,
        description: photo.description,
        location: photo.location,
        country: photo.country,
        dateTaken: photo.dateTaken ? new Date(photo.dateTaken) : new Date(),
        category: photo.photoCategories ?? [],
      };
      reset(defaultFormValues);
    }
  }, [photo, reset]);

  const onSubmit = async (data: PhotoSchema) => {
    try {
      // Prepare FormData
      const formData = buildFormData(data, photo, uploadedFile.file);

      // Call the upload mutation
      const newPhoto = await mutateAsync(formData);

      // Clean up.
      if (uploadedFile.previewUrl) {
        URL.revokeObjectURL(uploadedFile.previewUrl);
      }
      setUploadedFile(initialUploadedFileState);

      // Navigate back to PhotoDetail Page if it is modification.
      const targetGuid = photo?.photoGuid || newPhoto.photoGuid;
      if (targetGuid) {
        navigate(`/photos/${targetGuid}`);
      } else {
        // If this is new upload, navigate to Home Page.
        // TODO: Once Authorization is in place, navigate to Admin Home Page.
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error preparing photo upload:", error);
    }
  };

  // Api call to get country list but could not find a good complete Country List api, so create local list.
  //const { countries } = useCountries();

  const [uploadedFile, setUploadedFile] = useState<UploadedFileState>(
    initialUploadedFileState
  );

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
      //setSelectedOptions([]);
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
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            flexGrow: 1,
            flexBasis: { md: "45%" }, // Takes ~45% of the row width on desktop
          }}
        >
          <TextInput label="Title" control={control} name="title" />

          <TextInput
            label="Description"
            control={control}
            name="description"
            multiline
            rows={3}
          />

          <TextInput label="Location" control={control} name="location" />

          <Controller
            name="country"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              const selectedCountryObject =
                countries.find((c) => c.label === value) ?? null;

              return (
                <Autocomplete
                  id="country-select"
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  value={selectedCountryObject}
                  onChange={(_, newValue) => {
                    onChange(newValue ? newValue.label : "");
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.code === value.code
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              );
            }}
          />

          {/* <Autocomplete
            id="country-select"
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
          /> */}

          {/* if this is new photo, allow user to select Date Taken At. If this is editing existing, not allow to change this date. */}
          {!photo?.photoGuid && (
            <DateInput
              label="Date Taken At"
              control={control}
              name="dateTaken"
              // defaultValue={new Date().toISOString().split("T")[0]}
            />
          )}

          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                autoHighlight
                multiple // Allow multiple selections
                id="category-select"
                options={options}
                value={value ?? []}
                getOptionLabel={(option) => option.title}
                onChange={(_, newValue) => {
                  onChange(newValue); // Update form value with selected categories
                }}
                isOptionEqualToValue={(option, selectedValue) =>
                  option.categoryGuid === selectedValue.categoryGuid
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categories"
                    error={!!error}
                    helperText={error ? error.message : null}
                    placeholder="Select categories"
                  />
                )}
              />
            )}
          />

          {/* <Autocomplete<Category, true>
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
          /> */}

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
