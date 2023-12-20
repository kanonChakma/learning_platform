import { array, number, object, string, TypeOf } from "zod";

const validDaysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const scheduleSchema = object({
  startDate: string().refine((date: string) => dateRegex.test(date), {
    message: "Invalid date format for startDate",
  }),
  endDate: string().refine((date: string) => dateRegex.test(date), {
    message: "Invalid date format for endDate",
  }),
  classDays: array(
    string().refine((day) => validDaysOfWeek.includes(day), {
      message: "Invalid day of the week",
    })
  ),
  classTime: string(),
});

const payload = {
  body: object({
    name: string({ required_error: "courseName is required!" }),
    description: string({ required_error: "Description is Required!!" }).min(
      120,
      "Description should be at least 120 characters long"
    ),
    price: number({ required_error: "Price is Required!!" }).refine(
      (price) => price > 0,
      {
        message: "Price must be greater than 0",
      }
    ),
    duration: string({ required_error: "Course Duration is Required!!" }).min(
      1
    ),
    level: string({ required_error: "Level is Required!!" }).min(1),
    topics: array(string()),
    schedule: scheduleSchema,
  }),
};

export const createCourseSchema = object({
  ...payload,
});

export type CreateCourseInput = TypeOf<typeof createCourseSchema>;
