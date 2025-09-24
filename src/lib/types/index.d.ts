type Photo = {
  photoGuid: string
  fileName: string
  filePath: string
  mimeType: string
  title: string
  description: string
  location: string
  country: string
  dateTaken: string
  uploadedAt: string
  likesCount: number
  photoLikes: PhotoLike[]
  photoCategories: PhotoCategory[]
}

type PhotoCategory = {
  photoGuid: string
  categoryGuid: string
}
