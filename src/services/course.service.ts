import CourseModel, { CourseInput } from "../models/course.model";

export const createCourse = async (input: CourseInput) => {
  try {
    const responseData = await CourseModel.create(input);
    return responseData.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
};
