export interface PhotoWriteForm {
  // 1. Photo GUID as string (Nullable/Optional for create/update context)
  // Used to determine Insert (null) or Update (string)
  photoGuid?: string | null;

  // 2. Strings
  title: string;
  description: string;
  location: string;
  country: string;

  // 3. Date/Time (C#) map to Date in JS
  dateTaken: Date | null;

  // 4. Form (File) handle separatly. Not included in this DTO.

  // 5. Array of Category Guid as strings
  categoryGuids: string[];
}
