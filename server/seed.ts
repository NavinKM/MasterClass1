import { db } from "./db";
import { instructors, courses, categories, testimonials } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  try {
    // Insert instructors
    const instructorData = [
      {
        name: "Marcus Samuelsson",
        bio: "Award-winning chef and restaurateur known for his innovative approach to global cuisine.",
        specialty: "Culinary Arts",
        avatarUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        title: "Chef",
        yearsExperience: 25,
        studentsCount: 50000,
        coursesCount: 3
      },
      {
        name: "Sara Blakely",
        bio: "Billionaire entrepreneur and founder of Spanx, known for her innovative business strategies.",
        specialty: "Entrepreneurship",
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616c64e9a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        title: "CEO",
        yearsExperience: 20,
        studentsCount: 75000,
        coursesCount: 2
      },
      {
        name: "Annie Leibovitz",
        bio: "Legendary photographer known for her striking celebrity portraits and artistic vision.",
        specialty: "Photography",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        title: "Artist",
        yearsExperience: 30,
        studentsCount: 40000,
        coursesCount: 4
      },
      {
        name: "Herbie Hancock",
        bio: "Jazz legend and multiple Grammy winner, master of piano and musical innovation.",
        specialty: "Jazz Piano",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        title: "Musician",
        yearsExperience: 40,
        studentsCount: 30000,
        coursesCount: 2
      }
    ];

    const insertedInstructors = await db.insert(instructors).values(instructorData).returning();
    console.log(`✅ Inserted ${insertedInstructors.length} instructors`);

    // Insert categories
    const categoryData = [
      { name: "Culinary Arts", slug: "culinary", icon: "ChefHat", coursesCount: 12 },
      { name: "Business", slug: "business", icon: "Briefcase", coursesCount: 8 },
      { name: "Photography", slug: "photography", icon: "Camera", coursesCount: 6 },
      { name: "Music", slug: "music", icon: "Music", coursesCount: 5 },
      { name: "Arts & Crafts", slug: "arts", icon: "Palette", coursesCount: 7 },
      { name: "Sports", slug: "sports", icon: "Trophy", coursesCount: 4 }
    ];

    const insertedCategories = await db.insert(categories).values(categoryData).returning();
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Insert courses
    const courseData = [
      {
        title: "Advanced Culinary Techniques",
        description: "Master the art of fine dining with professional techniques used in world-class restaurants. Learn knife skills, sauce making, plating, and more from a renowned chef.",
        shortDescription: "Master the art of fine dining with professional techniques used in world-class restaurants.",
        instructorId: insertedInstructors[0].id,
        category: "Culinary Arts",
        difficulty: "Advanced",
        duration: "3h 45m",
        lessonsCount: 15,
        thumbnailUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        videoPreviewUrl: null,
        price: 19900,
        rating: 5,
        studentsCount: 15000,
        featured: true
      },
      {
        title: "Strategic Leadership",
        description: "Learn how to build and lead successful teams with proven strategies from a billionaire entrepreneur. Discover the secrets of effective leadership and business growth.",
        shortDescription: "Learn how to build and lead successful teams with proven strategies from a billionaire entrepreneur.",
        instructorId: insertedInstructors[1].id,
        category: "Business",
        difficulty: "Intermediate",
        duration: "2h 30m",
        lessonsCount: 12,
        thumbnailUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        videoPreviewUrl: null,
        price: 17900,
        rating: 5,
        studentsCount: 22000,
        featured: true
      },
      {
        title: "Portrait Photography",
        description: "Master the art of capturing compelling portraits with advanced lighting and composition techniques. Learn from one of the world's most celebrated photographers.",
        shortDescription: "Master the art of capturing compelling portraits with advanced lighting and composition techniques.",
        instructorId: insertedInstructors[2].id,
        category: "Photography",
        difficulty: "Intermediate",
        duration: "4h 15m",
        lessonsCount: 18,
        thumbnailUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        videoPreviewUrl: null,
        price: 15900,
        rating: 5,
        studentsCount: 18000,
        featured: true
      },
      {
        title: "Jazz Piano Fundamentals",
        description: "Learn the fundamentals of jazz piano from a living legend. Discover chord progressions, improvisation techniques, and the history of jazz music.",
        shortDescription: "Learn the fundamentals of jazz piano from a living legend.",
        instructorId: insertedInstructors[3].id,
        category: "Music",
        difficulty: "Beginner",
        duration: "3h 20m",
        lessonsCount: 14,
        thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        videoPreviewUrl: null,
        price: 13900,
        rating: 5,
        studentsCount: 12000,
        featured: false
      }
    ];

    const insertedCourses = await db.insert(courses).values(courseData).returning();
    console.log(`✅ Inserted ${insertedCourses.length} courses`);

    // Insert testimonials
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

    const insertedTestimonials = await db.insert(testimonials).values(testimonialData).returning();
    console.log(`✅ Inserted ${insertedTestimonials.length} testimonials`);

    console.log("🎉 Database seeding completed successfully!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seedDatabase };