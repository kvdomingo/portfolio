export interface CourseMetadata {
  id: number;
  name: string;
  number: number;
  slug: string;
  title: string;
  description: string;
  cover: string;
}

export interface CourseworkPostMetadata {
  id: number;
  subject: CourseMetadata;
  created: string;
  modified: string;
  title: string;
  slug: string;
  body: string;
  keywords: string;
  cover: string;
}
