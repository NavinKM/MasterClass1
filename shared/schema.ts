import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  instructorId: integer("instructor_id").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(), // Beginner, Intermediate, Advanced
  duration: text("duration").notNull(), // e.g., "3h 45m"
  lessonsCount: integer("lessons_count").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoPreviewUrl: text("video_preview_url"),
  price: integer("price").notNull(), // in cents
  rating: integer("rating").notNull(), // 1-5 scale
  studentsCount: integer("students_count").notNull(),
  featured: boolean("featured").default(false),
});

export const instructors = pgTable("instructors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  specialty: text("specialty").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  title: text("title").notNull(), // e.g., "Chef", "CEO", "Artist"
  yearsExperience: integer("years_experience").notNull(),
  studentsCount: integer("students_count").notNull(),
  coursesCount: integer("courses_count").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  icon: text("icon").notNull(), // Lucide icon name
  coursesCount: integer("courses_count").notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  avatarUrl: text("avatar_url").notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  progress: integer("progress").default(0), // 0-100
});

// Insert schemas
export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

export const insertInstructorSchema = createInsertSchema(instructors).omit({
  id: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  enrolledAt: true,
});

// Types
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Instructor = typeof instructors.$inferSelect;
export type InsertInstructor = z.infer<typeof insertInstructorSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;

// Extended types for API responses
export type CourseWithInstructor = Course & {
  instructor: Instructor;
};

export type InstructorWithCourses = Instructor & {
  courses: Course[];
};
