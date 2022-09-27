export interface IRoute {
  path: string;
  component: any;
}

export interface IWorkExperience {
    title: string,
    company: string,
    companyLogoImage: string | File, // TODO: This needs to be checked
    jobDescription: string,
    startDate: string | null,
    endDate?: string | null, // if current position, user will not have end date
    isCurrentPosition: boolean
}
export interface IProfileFormPayload {
  name: string;
  age: number | undefined;
  workExperiences: IWorkExperience[];
}
