export interface AboutContent {
  id: number;
  picture: string;
  bio: string;
}

export interface CVContent {
  education: {
    id: number;
    university: string;
    department: string;
    departmentUrl: string;
    degree: string;
    thesis: string;
    startDate: string;
    endDate: string;
  }[];
  work: {
    id: number;
    position: string;
    startDate: string;
    endDate: string;
    institution: string;
    institutionUrl: string;
    description: string;
    relatedProject: string;
  }[];
  project: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    linkHeader: string;
    linkUrl: string;
    description: string;
  }[];
  certification: {
    id: number;
    name: string;
    dateGranted: string;
    dateExpired: string;
    institution: string;
    institutionUrl: string;
    description: string;
  }[];
  publication: {
    id: number;
    title: string;
    publicationDate: string;
    journal: string;
    volume: string;
    journalCode: string;
    url: string;
    description: string;
  }[];
  reference: {
    id: number;
    name: string;
    email: string;
    institution: string;
    position: string;
  }[];
}
