export interface AboutContent {
  id: number;
  picture: string;
  bio: string;
}

export interface CVContent {
  education: {
    university: string;
    department: string;
    departmentUrl: string;
    degree: string;
    thesis: string;
    startDate: string;
    endDate: string;
  }[];
  work: {
    position: string;
    startDate: string;
    endDate: string;
    institution: string;
    institutionUrl: string;
    description: string;
    relatedProject: string;
  }[];
  project: {
    name: string;
    startDate: string;
    endDate: string;
    linkHeader: string;
    linkUrl: string;
    description: string;
  }[];
  certification: {
    name: string;
    dateGranted: string;
    dateExpired: string;
    institution: string;
    institutionUrl: string;
    description: string;
  }[];
  publication: {
    title: string;
    publicationDate: string;
    journal: string;
    volume: string;
    journalCode: string;
    url: string;
    description: string;
  }[];
  reference: {
    name: string;
    email: string;
    institution: string;
    position: string;
  }[];
}
