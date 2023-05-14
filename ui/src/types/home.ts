export interface HomeContent {
  id: number;
  order: number;
  sectionHeader: string;
  sectionBody: string;
  linkToPortfolio: string;
}

export enum TechnologyCategory {
  BACKEND = "BE",
  FRONTEND = "FE",
  DATABASE = "DB",
  DATAVIS = "DV",
  CICD = "CI",
}

export interface HomeTechnologies {
  id: number;
  order: number;
  category: TechnologyCategory;
  alt: string;
  url: string;
}
