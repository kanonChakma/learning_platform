import mongoose, { Document } from "mongoose";

interface Schedule {
  startDate: Date;
  endDate: Date;
  classDays: string[];
  classTime: string;
}

export interface CourseInput {
  name: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  topics: string[];
  schedule: Schedule;
}

interface CourseDocument extends CourseInput, Document {
  createdAt: Date;
  updateAt: Date;
}

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    topics: { type: [String], required: true },
    schedule: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      classDays: { type: [String], required: true },
      classTime: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model<CourseDocument>("Course", CourseSchema);
export default CourseModel;
