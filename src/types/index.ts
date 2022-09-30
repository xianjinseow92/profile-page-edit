export interface IRoute {
  path: string;
  component: any;
}

export interface IWorkExperience {
    title: string,
    company: string,
    companyLogoImage: string | File,
    jobDescription: string,
    startDate: string | null,
    endDate?: string | null,
    isCurrentPosition: boolean
}
export interface IProfileFormPayload {
  name: string;
  age: number | undefined;
  id: number,
  profileImage: string | File;
  workExperiences: IWorkExperience[];
}
