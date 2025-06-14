import { 
  courses, 
  instructors, 
  categories, 
  testimonials, 
  enrollments,
  type Course, 
  type InsertCourse,
  type Instructor,
  type InsertInstructor,
  type Category,
  type InsertCategory,
  type Testimonial,
  type InsertTestimonial,
  type Enrollment,
  type InsertEnrollment,
  type CourseWithInstructor,
  type InstructorWithCourses
} from "@shared/schema";

export interface IStorage {
  // Courses
  getCourse(id: number): Promise<Course | undefined>;
  getCourseWithInstructor(id: number): Promise<CourseWithInstructor | undefined>;
  getAllCourses(): Promise<Course[]>;
  getCoursesWithInstructors(): Promise<CourseWithInstructor[]>;
  getFeaturedCourses(): Promise<CourseWithInstructor[]>;
  getCoursesByCategory(category: string): Promise<CourseWithInstructor[]>;
  getCoursesByInstructor(instructorId: number): Promise<Course[]>;
  searchCourses(query: string): Promise<CourseWithInstructor[]>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Instructors
  getInstructor(id: number): Promise<Instructor | undefined>;
  getInstructorWithCourses(id: number): Promise<InstructorWithCourses | undefined>;
  getAllInstructors(): Promise<Instructor[]>;
  createInstructor(instructor: InsertInstructor): Promise<Instructor>;

  // Categories
  getCategory(id: number): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Enrollments
  getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined>;
  getUserEnrollments(userId: number): Promise<Enrollment[]>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
}

export class MemStorage implements IStorage {
  private courses: Map<number, Course>;
  private instructors: Map<number, Instructor>;
  private categories: Map<number, Category>;
  private testimonials: Map<number, Testimonial>;
  private enrollments: Map<string, Enrollment>;
  private currentCourseId: number;
  private currentInstructorId: number;
  private currentCategoryId: number;
  private currentTestimonialId: number;
  private currentEnrollmentId: number;

  constructor() {
    this.courses = new Map();
    this.instructors = new Map();
    this.categories = new Map();
    this.testimonials = new Map();
    this.enrollments = new Map();
    this.currentCourseId = 1;
    this.currentInstructorId = 1;
    this.currentCategoryId = 1;
    this.currentTestimonialId = 1;
    this.currentEnrollmentId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create instructors
    const instructor1: Instructor = {
      id: this.currentInstructorId++,
      name: "Marcus Samuelsson",
      bio: "Award-winning chef and restaurateur known for his innovative approach to global cuisine.",
      specialty: "Culinary Arts",
      avatarUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      title: "Chef",
      yearsExperience: 25,
      studentsCount: 50000,
      coursesCount: 3
    };

    const instructor2: Instructor = {
      id: this.currentInstructorId++,
      name: "Sara Blakely",
      bio: "Billionaire entrepreneur and founder of Spanx, known for her innovative business strategies.",
      specialty: "Entrepreneurship",
      avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616c64e9a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      title: "CEO",
      yearsExperience: 20,
      studentsCount: 75000,
      coursesCount: 2
    };

    const instructor3: Instructor = {
      id: this.currentInstructorId++,
      name: "Annie Leibovitz",
      bio: "Legendary photographer known for her striking celebrity portraits and artistic vision.",
      specialty: "Photography",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      title: "Artist",
      yearsExperience: 30,
      studentsCount: 40000,
      coursesCount: 4
    };

    const instructor4: Instructor = {
      id: this.currentInstructorId++,
      name: "Herbie Hancock",
      bio: "Jazz legend and multiple Grammy winner, master of piano and musical innovation.",
      specialty: "Jazz Piano",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      title: "Musician",
      yearsExperience: 40,
      studentsCount: 30000,
      coursesCount: 2
    };

    [instructor1, instructor2, instructor3, instructor4].forEach(instructor => {
      this.instructors.set(instructor.id, instructor);
    });

    // Create categories
    const categoryData = [
      { name: "Culinary Arts", slug: "culinary", icon: "ChefHat", coursesCount: 12 },
      { name: "Business", slug: "business", icon: "Briefcase", coursesCount: 8 },
      { name: "Photography", slug: "photography", icon: "Camera", coursesCount: 6 },
      { name: "Music", slug: "music", icon: "Music", coursesCount: 5 },
      { name: "Arts & Crafts", slug: "arts", icon: "Palette", coursesCount: 7 },
      { name: "Sports", slug: "sports", icon: "Trophy", coursesCount: 4 }
    ];

    categoryData.forEach(cat => {
      const category: Category = {
        id: this.currentCategoryId++,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        coursesCount: cat.coursesCount
      };
      this.categories.set(category.id, category);
    });

    // Create courses
    const course1: Course = {
      id: this.currentCourseId++,
      title: "Advanced Culinary Techniques",
      description: "Master the art of fine dining with professional techniques used in world-class restaurants. Learn knife skills, sauce making, plating, and more from a renowned chef.",
      shortDescription: "Master the art of fine dining with professional techniques used in world-class restaurants.",
      instructorId: instructor1.id,
      category: "Culinary Arts",
      difficulty: "Advanced",
      duration: "3h 45m",
      lessonsCount: 15,
      thumbnailUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      videoPreviewUrl: "",
      price: 19900, // $199
      rating: 5,
      studentsCount: 15000,
      featured: true
    };

    const course2: Course = {
      id: this.currentCourseId++,
      title: "Strategic Leadership",
      description: "Learn how to build and lead successful teams with proven strategies from a billionaire entrepreneur. Discover the secrets of effective leadership and business growth.",
      shortDescription: "Learn how to build and lead successful teams with proven strategies from a billionaire entrepreneur.",
      instructorId: instructor2.id,
      category: "Business",
      difficulty: "Intermediate",
      duration: "2h 30m",
      lessonsCount: 12,
      thumbnailUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      videoPreviewUrl: "",
      price: 17900, // $179
      rating: 5,
      studentsCount: 22000,
      featured: true
    };

    const course3: Course = {
      id: this.currentCourseId++,
      title: "Portrait Photography",
      description: "Master the art of capturing compelling portraits with advanced lighting and composition techniques. Learn from one of the world's most celebrated photographers.",
      shortDescription: "Master the art of capturing compelling portraits with advanced lighting and composition techniques.",
      instructorId: instructor3.id,
      category: "Photography",
      difficulty: "Intermediate",
      duration: "4h 15m",
      lessonsCount: 18,
      thumbnailUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      videoPreviewUrl: "",
      price: 15900, // $159
      rating: 5,
      studentsCount: 18000,
      featured: true
    };

    const course4: Course = {
      id: this.currentCourseId++,
      title: "Jazz Piano Fundamentals",
      description: "Learn the fundamentals of jazz piano from a living legend. Discover chord progressions, improvisation techniques, and the history of jazz music.",
      shortDescription: "Learn the fundamentals of jazz piano from a living legend.",
      instructorId: instructor4.id,
      category: "Music",
      difficulty: "Beginner",
      duration: "3h 20m",
      lessonsCount: 14,
      thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      videoPreviewUrl: "",
      price: 13900, // $139
      rating: 5,
      studentsCount: 12000,
      featured: false
    };

    [course1, course2, course3, course4].forEach(course => {
      this.courses.set(course.id, course);
    });

    // Create testimonials
    const testimonialData = [
      {
        name: "Sarah Chen",
        title: "Marketing Manager",
        content: "The quality of instruction is incredible. I've learned more in 3 months than I did in years of self-teaching.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Michael Rodriguez",
        title: "Entrepreneur",
        content: "Learning from world-class experts has been a game-changer for my career. The content is practical and inspiring.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
      },
      {
        name: "Emily Johnson",
        title: "Creative Director",
        content: "The platform is beautifully designed and the lessons are structured perfectly. I love being able to learn at my own pace.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616c64e9a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
      }
    ];

    testimonialData.forEach(test => {
      const testimonial: Testimonial = {
        id: this.currentTestimonialId++,
        ...test
      };
      this.testimonials.set(testimonial.id, testimonial);
    });
  }

  // Course methods
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getCourseWithInstructor(id: number): Promise<CourseWithInstructor | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;
    
    const instructor = this.instructors.get(course.instructorId);
    if (!instructor) return undefined;

    return { ...course, instructor };
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCoursesWithInstructors(): Promise<CourseWithInstructor[]> {
    const courses = Array.from(this.courses.values());
    const coursesWithInstructors: CourseWithInstructor[] = [];

    for (const course of courses) {
      const instructor = this.instructors.get(course.instructorId);
      if (instructor) {
        coursesWithInstructors.push({ ...course, instructor });
      }
    }

    return coursesWithInstructors;
  }

  async getFeaturedCourses(): Promise<CourseWithInstructor[]> {
    const allCourses = await this.getCoursesWithInstructors();
    return allCourses.filter(course => course.featured);
  }

  async getCoursesByCategory(category: string): Promise<CourseWithInstructor[]> {
    const allCourses = await this.getCoursesWithInstructors();
    return allCourses.filter(course => course.category.toLowerCase() === category.toLowerCase());
  }

  async getCoursesByInstructor(instructorId: number): Promise<Course[]> {
    const allCourses = Array.from(this.courses.values());
    return allCourses.filter(course => course.instructorId === instructorId);
  }

  async searchCourses(query: string): Promise<CourseWithInstructor[]> {
    const allCourses = await this.getCoursesWithInstructors();
    const lowercaseQuery = query.toLowerCase();
    
    return allCourses.filter(course => 
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.category.toLowerCase().includes(lowercaseQuery) ||
      course.instructor.name.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const course: Course = {
      id: this.currentCourseId++,
      ...insertCourse
    };
    this.courses.set(course.id, course);
    return course;
  }

  // Instructor methods
  async getInstructor(id: number): Promise<Instructor | undefined> {
    return this.instructors.get(id);
  }

  async getInstructorWithCourses(id: number): Promise<InstructorWithCourses | undefined> {
    const instructor = this.instructors.get(id);
    if (!instructor) return undefined;

    const courses = Array.from(this.courses.values()).filter(course => course.instructorId === id);
    return { ...instructor, courses };
  }

  async getAllInstructors(): Promise<Instructor[]> {
    return Array.from(this.instructors.values());
  }

  async createInstructor(insertInstructor: InsertInstructor): Promise<Instructor> {
    const instructor: Instructor = {
      id: this.currentInstructorId++,
      ...insertInstructor
    };
    this.instructors.set(instructor.id, instructor);
    return instructor;
  }

  // Category methods
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const category: Category = {
      id: this.currentCategoryId++,
      ...insertCategory
    };
    this.categories.set(category.id, category);
    return category;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const testimonial: Testimonial = {
      id: this.currentTestimonialId++,
      ...insertTestimonial
    };
    this.testimonials.set(testimonial.id, testimonial);
    return testimonial;
  }

  // Enrollment methods
  async getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined> {
    return this.enrollments.get(`${userId}-${courseId}`);
  }

  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(enrollment => enrollment.userId === userId);
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const enrollment: Enrollment = {
      id: this.currentEnrollmentId++,
      enrolledAt: new Date(),
      ...insertEnrollment
    };
    this.enrollments.set(`${enrollment.userId}-${enrollment.courseId}`, enrollment);
    return enrollment;
  }
}

export const storage = new MemStorage();
