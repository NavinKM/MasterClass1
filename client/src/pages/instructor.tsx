import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import Navigation from "@/components/navigation";
import CourseCard from "@/components/course-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, BookOpen, Award, Star } from "lucide-react";
import type { InstructorWithCourses } from "@shared/schema";

export default function InstructorProfile() {
  const [match, params] = useRoute("/instructors/:id");
  const instructorId = params?.id ? parseInt(params.id) : null;

  const { data: instructor, isLoading, error } = useQuery<InstructorWithCourses>({
    queryKey: [`/api/instructors/${instructorId}`],
    enabled: !!instructorId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-masterclass-primary text-white">
        <Navigation />
        <div className="pt-24 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-32 h-32 bg-masterclass-dark-gray rounded-full mx-auto mb-6"></div>
              <div className="h-8 bg-masterclass-dark-gray rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-masterclass-dark-gray rounded w-48 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-masterclass-dark-gray rounded-lg p-6 h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !instructor) {
    return (
      <div className="min-h-screen bg-masterclass-primary text-white">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold mb-4">Instructor Not Found</h1>
              <p className="masterclass-light-gray mb-6">
                The instructor you're looking for doesn't exist.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getBadgeColor = (title: string) => {
    switch (title.toLowerCase()) {
      case 'chef':
        return 'masterclass-accent-bg';
      case 'ceo':
        return 'bg-[hsl(214,71%,56%)]';
      case 'artist':
        return 'bg-purple-600';
      case 'musician':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-masterclass-primary text-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 masterclass-secondary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative inline-block mb-6">
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarImage src={instructor.avatarUrl} alt={instructor.name} className="object-cover" />
              <AvatarFallback className="text-2xl">{instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Badge 
              className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${getBadgeColor(instructor.title)} text-white px-4 py-1 rounded-full font-medium`}
            >
              {instructor.title}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{instructor.name}</h1>
          <p className="text-xl masterclass-light-gray mb-8">{instructor.specialty}</p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 masterclass-accent mr-2" />
                <span className="text-2xl font-bold">{instructor.studentsCount.toLocaleString()}</span>
              </div>
              <p className="text-sm masterclass-light-gray">Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-5 w-5 masterclass-accent mr-2" />
                <span className="text-2xl font-bold">{instructor.coursesCount}</span>
              </div>
              <p className="text-sm masterclass-light-gray">Courses</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-5 w-5 masterclass-accent mr-2" />
                <span className="text-2xl font-bold">{instructor.yearsExperience}</span>
              </div>
              <p className="text-sm masterclass-light-gray">Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="py-12 bg-masterclass-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray p-8">
            <h2 className="text-2xl font-bold mb-6">About {instructor.name}</h2>
            <p className="masterclass-light-gray leading-relaxed text-lg">
              {instructor.bio}
            </p>
          </Card>
        </div>
      </div>

      {/* Courses Section */}
      <div className="py-12 masterclass-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Courses by {instructor.name}
          </h2>
          
          {instructor.courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructor.courses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={{ ...course, instructor }} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray p-8 max-w-md mx-auto">
                <BookOpen className="h-12 w-12 masterclass-light-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
                <p className="masterclass-light-gray">
                  This instructor hasn't published any courses yet. Check back soon!
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Achievement/Highlights Section */}
      <div className="py-12 bg-masterclass-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Achievements & Recognition</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray p-6">
              <div className="flex items-center mb-4">
                <Star className="h-6 w-6 text-yellow-400 mr-3" />
                <h3 className="text-lg font-semibold">Top-Rated Instructor</h3>
              </div>
              <p className="masterclass-light-gray">
                Consistently receives 5-star ratings from students worldwide.
              </p>
            </Card>
            
            <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray p-6">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 masterclass-accent mr-3" />
                <h3 className="text-lg font-semibold">Industry Expert</h3>
              </div>
              <p className="masterclass-light-gray">
                {instructor.yearsExperience}+ years of professional experience in {instructor.specialty.toLowerCase()}.
              </p>
            </Card>
            
            <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 masterclass-accent mr-3" />
                <h3 className="text-lg font-semibold">Global Impact</h3>
              </div>
              <p className="masterclass-light-gray">
                Has taught over {instructor.studentsCount.toLocaleString()} students from around the world.
              </p>
            </Card>
            
            <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 masterclass-accent mr-3" />
                <h3 className="text-lg font-semibold">Course Creator</h3>
              </div>
              <p className="masterclass-light-gray">
                Created {instructor.coursesCount} comprehensive course{instructor.coursesCount !== 1 ? 's' : ''} covering essential skills.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
