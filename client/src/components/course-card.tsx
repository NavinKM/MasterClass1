import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, BookOpen, Star } from "lucide-react";
import { Link } from "wouter";
import type { CourseWithInstructor } from "@shared/schema";
import { CATEGORY_COLORS } from "@/lib/constants";

interface CourseCardProps {
  course: CourseWithInstructor;
  featured?: boolean;
}

export default function CourseCard({ course, featured = false }: CourseCardProps) {
  const categoryColor = CATEGORY_COLORS[course.category as keyof typeof CATEGORY_COLORS] || "bg-gray-600";
  
  return (
    <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray overflow-hidden hover-scale group cursor-pointer">
      <Link href={`/courses/${course.id}`}>
        <div className="relative">
          <img 
            src={course.thumbnailUrl} 
            alt={course.title}
            className="w-full h-56 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <Badge className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
              {course.category}
            </Badge>
          </div>
          
          {/* Play Button */}
          <Button
            size="icon"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-masterclass-primary w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <Play className="h-6 w-6 ml-1" />
          </Button>
          
          {/* Featured Badge */}
          {featured && (
            <Badge className="absolute top-4 right-4 masterclass-accent-bg text-white">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:masterclass-accent transition-colors">
            {course.title}
          </h3>
          <p className="masterclass-light-gray mb-4 text-sm">
            {course.instructor.name}
          </p>
          <p className="text-sm masterclass-light-gray mb-4 line-clamp-2">
            {course.shortDescription}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center masterclass-accent">
                <BookOpen className="h-4 w-4 mr-1" />
                <span className="font-medium">{course.lessonsCount} lessons</span>
              </div>
              <div className="flex items-center masterclass-light-gray">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="text-white font-medium">{course.rating}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-masterclass-medium-gray">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">
                ${(course.price / 100).toFixed(0)}
              </span>
              <span className="text-sm masterclass-light-gray">
                {course.studentsCount.toLocaleString()} students
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
