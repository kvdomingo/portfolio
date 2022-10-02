export interface ImageMetadata {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

export interface ClientMetadata {
  id: number;
  name: string;
  slug: string;
  shootDate: string | null;
  coverImage: string;
  keywords: string;
}
