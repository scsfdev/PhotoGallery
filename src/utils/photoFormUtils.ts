import type { PhotoSchema } from '../schemas/photoSchema'; // Adjust path
import type { Photo } from '../types'; // Adjust path for your types

const buildFormData = (
  data: PhotoSchema,
  photo: Photo | undefined, // Need 'existing' photo data for the Guid
  fileToUpload: File | null
): FormData => {
  const formData = new FormData();

  // Append all text and data fields

  // a. PhotoGuid (Optional for Update)
  if (photo?.photoGuid) {
    formData.append("PhotoGuid", photo.photoGuid);
  }

  // b. String data fields
  formData.append("Title", data.title);
  formData.append("Description", data.description);
  formData.append("Location", data.location);
  formData.append("Country", data.country);

  // c. DateTime field
  // If new photo upload, dateTaken is required.
  // If editing existing photo, dateTaken is not changeable.
  if (data.dateTaken) {
    formData.append("DateTaken", data.dateTaken.toISOString());
  }

  // d. CategoryGuids (Collection<Guid>)
  // Note: Key 'CategoryGuids' must match the DTO property name in backend.
  if (data.category && data.category.length > 0) {
    data.category.forEach((categoryObject, index) => {
      formData.append(`CategoryGuids[${index}]`, categoryObject.categoryGuid);
    });
  }

  // e. Append the File (for IFormFile)
  // Note: Key 'File' must match the DTO property name in backend.
  if (fileToUpload) {
    formData.append("File", fileToUpload, fileToUpload.name);
  }

  return formData;
};

export default buildFormData;
