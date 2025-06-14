import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCoursesWithInstructors();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/featured", async (req, res) => {
    try {
      const courses = await storage.getFeaturedCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured courses" });
    }
  });

  app.get("/api/courses/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const courses = await storage.getCoursesByCategory(category);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses by category" });
    }
  });

  app.get("/api/courses/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      const courses = await storage.searchCourses(q);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to search courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      const course = await storage.getCourseWithInstructor(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // Instructors
  app.get("/api/instructors", async (req, res) => {
    try {
      const instructors = await storage.getAllInstructors();
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch instructors" });
    }
  });

  app.get("/api/instructors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid instructor ID" });
      }
      const instructor = await storage.getInstructorWithCourses(id);
      if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
      }
      res.json(instructor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch instructor" });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Enrollments
  app.post("/api/enrollments", async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      if (!userId || !courseId) {
        return res.status(400).json({ message: "User ID and Course ID are required" });
      }

      // Check if already enrolled
      const existingEnrollment = await storage.getEnrollment(userId, courseId);
      if (existingEnrollment) {
        return res.status(409).json({ message: "Already enrolled in this course" });
      }

      const enrollment = await storage.createEnrollment({ userId, courseId, progress: 0 });
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: "Failed to create enrollment" });
    }
  });

  app.get("/api/enrollments/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const enrollments = await storage.getUserEnrollments(userId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
