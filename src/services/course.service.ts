import CourseModel, { CourseInput } from "../models/course.model";

export const createCourse = async (input: Omit<CourseInput, "courseId">) => {
  try {
    const responseData = await CourseModel.create(input);
    return responseData;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCourse = async () => {
  try {
    const courses = await CourseModel.find();
    return courses;
  } catch (error: any) {
    throw new Error(error);
  }
};
