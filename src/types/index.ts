export interface IRoute {
  path: string;
  component: any;
}

export interface IWorkExperience {
    title: string,
    company: string,
    image: File,
    jobDescription: string,
    startDate: string,
    endDate?: string, // if current position, user will not have end date
    isCurrentPosition: boolean
}
export interface IProfileFormPayload {
  name: string;
  age: number;
  workExperience: IWorkExperience[];
}
