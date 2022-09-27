import * as yup from "yup";

export const validationSchema = yup.object({
  profileImage: yup.mixed().required("We're gonna need your picture, buddy."),
  name: yup
    .string()
    .required("A name is required!")
    .matches(
      /^[a-zA-Z]+$/g,
      "A name can't contain numbers/special characters. We're not progressive like that."
    ),
  age: yup
    .number()
    .required("Your age is required.")
    .positive("You aren't born yet.")
    .integer("Please enter a number!")
    .test("age", "You gotta be above 18 to apply mate.", function (value: any) {
      const isOfLegalAge: boolean = value > 18;
      return isOfLegalAge;
    })
    .typeError("Age has to be a number!"),
  workExperiences: yup
    .array()
    .of(
      yup.object({
        title: yup
          .string()
          .required("Gotta know your job title.")
          .matches(
            /^[a-zA-Z]+$/g,
            "Your job title can't contain special characters. That job can't really exist."
          ),
        company: yup.string().required("We need to know where you work at."),
        companyLogoImage: yup.mixed().required("Image required."),
        jobDescription: yup.string().required("Describe your job, baby."),
        startDate: yup.date().required("Please enter a valid date.").nullable(),
        endDate: yup // TODO: Need to check how required interacts with UI if TextField for end date is not present
          .date()
          .nullable()
          .when("isCurrentPosition", (isCurrentPosition: any) => {
            if (!isCurrentPosition) {
              return yup
                .date()
                .required("Please enter a valid date.")
                .nullable()
                .when("startDate", (startDate) =>
                  startDate
                    ? yup
                        .date()
                        .min(
                          startDate,
                          "End date can't be earlier than Start date!"
                        )
                        .nullable()
                    : yup
                        .date()
                        .nullable()
                        .required("Please enter a valid date.")
                );
            } else {
              return yup.date().nullable().notRequired();
            }
          }),
        isCurrentPosition: yup.boolean(),
      })
    ).required(),
});
