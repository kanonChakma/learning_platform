import { FilterQuery, QueryOptions } from "mongoose";
import CourseModel, {
  CourseDocument,
  CourseInput,
} from "../models/course.model";

export const createCourse = async (input: Omit<CourseInput, "courseId">) => {
  try {
    const responseData = await CourseModel.create(input);
    return responseData;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllCourse = async () => {
  try {
    const courses = await CourseModel.find();
    return courses;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findCourseByCourseId = async (
  query: FilterQuery<CourseDocument>,
  options: QueryOptions = { lean: true }
) => {
  try {
    const course = await CourseModel.findOne(query, {}, options);
    return course;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteCourseByCourseId = async (
  query: FilterQuery<CourseDocument>
) => {
  try {
    return await CourseModel.deleteOne(query);
  } catch (error: any) {
    throw new Error(error);
  }
};
