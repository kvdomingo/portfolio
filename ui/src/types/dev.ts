export enum DevProjectStatus {
  WORK_IN_PROGRESS = "WIP",
  LIVE = "LIV",
  ARCHIVED = "OFF",
}

export enum DevProjectStatusEnum {
  WIP = "In Progress",
  LIV = "Live",
  OFF = "Archived",
}

export interface DevProjectMetadata {
  id: number;
  order: number;
  title: string;
  slug: string;
  organization: string;
  organizationUrl: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  body: string;
  projectUrl: string;
  keywords: string;
  technologies: string;
  coverPhoto: string;
  status: DevProjectStatus;
}
