import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import Navigation from "@/components/navigation";
import VideoPlayer from "@/components/video-player";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  Play, 
  CheckCircle,
  Award,
  Download
} from "lucide-react";
import type { CourseWithInstructor } from "@shared/schema";
import { CATEGORY_COLORS, DIFFICULTY_COLORS } from "@/lib/constants";

export default function CourseDetail() {
  const [match, params] = useRoute("/courses/:id");
  const courseId = params?.id ? parseInt(params.id) : null;

  const { data: course, isLoading, error } = useQuery<CourseWithInstructor>({
    queryKey: [`/api/courses/${courseId}`],
    enabled: !!courseId
  });

  const { data: relatedCourses } = useQuery<CourseWithInstructor[]>({
    queryKey: [`/api/courses/category/${course?.category}`],
    enabled: !!course?.category
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-masterclass-primary text-white">
        <Navigation />
        <div className="pt-24 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="aspect-video bg-masterclass-dark-gray rounded-lg mb-6"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-masterclass-dark-gray rounded"></div>
                  <div className="h-6 bg-masterclass-dark-gray rounded w-2/3"></div>
                  <div className="h-4 bg-masterclass-dark-gray rounded"></div>
                </div>
              </div>
              <div className="bg-masterclass-dark-gray rounded-lg p-6 h-fit">
                <div className="space-y-4">
                  <div className="h-12 bg-masterclass-medium-gray rounded"></div>
                  <div className="h-6 bg-masterclass-medium-gray rounded"></div>
                  <div className="h-4 bg-masterclass-medium-gray rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-masterclass-primary text-white">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
              <p className="masterclass-light-gray mb-6">
                The course you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/courses">
                <Button className="masterclass-accent-bg hover:bg-[hsl(16,100%,55%)] text-white">
                  Browse All Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const categoryColor = CATEGORY_COLORS[course.category as keyof typeof CATEGORY_COLORS] || "bg-gray-600";
  const difficultyColor = DIFFICULTY_COLORS[course.difficulty as keyof typeof DIFFICULTY_COLORS] || "bg-gray-600";
  
  const lessons = [
    { id: 1, title: "Introduction and Overview", duration: "12:34", isPreview: true },
    { id: 2, title: "Getting Started", duration: "18:45", isPreview: false },
    { id: 3, title: "Core Concepts", duration: "25:12", isPreview: false },
    { id: 4, title: "Advanced Techniques", duration: "32:18", isPreview: false },
    { id: 5, title: "Practice Session", duration: "28:45", isPreview: false },
  ];

  return (
    <div className="min-h-screen bg-masterclass-primary text-white">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <VideoPlayer 
                thumbnailUrl={course.thumbnailUrl}
                videoUrl={course.videoPreviewUrl}
                title={course.title}
              />

              {/* Course Info */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className={`${categoryColor} text-white`}>
                    {course.category}
                  </Badge>
                  <Badge className={`${difficultyColor} text-white`}>
                    {course.difficulty}
                  </Badge>
                  {course.featured && (
                    <Badge className="masterclass-accent-bg text-white">
                      Featured
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                
                <div className="flex items-center space-x-6 mb-6 text-masterclass-light-gray">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{course.studentsCount.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400 fill-current" />
                    <span>{course.rating}/5</span>
                  </div>
                </div>

                {/* Instructor */}
                <Link href={`/instructors/${course.instructor.id}`}>
                  <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray p-4 mb-6 hover:border-masterclass-accent transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={course.instructor.avatarUrl} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{course.instructor.name}</h3>
                        <p className="masterclass-light-gray">{course.instructor.specialty}</p>
                        <p className="text-sm masterclass-light-gray">
                          {course.instructor.studentsCount.toLocaleString()} students • {course.instructor.coursesCount} courses
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="mt-8">
                  <TabsList className="grid w-full grid-cols-3 masterclass-dark-gray-bg">
                    <TabsTrigger value="overview" className="data-[state=active]:masterclass-accent-bg data-[state=active]:text-white">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="lessons" className="data-[state=active]:masterclass-accent-bg data-[state=active]:text-white">
                      Lessons
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="data-[state=active]:masterclass-accent-bg data-[state=active]:text-white">
                      Reviews
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-xl font-semibold mb-4">About This Course</h3>
                      <p className="masterclass-light-gray leading-relaxed mb-6">
                        {course.description}
                      </p>
                      
                      <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                      <ul className="space-y-2 masterclass-light-gray">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                          Master fundamental techniques and concepts
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                          Learn from real-world examples and case studies
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                          Develop practical skills you can apply immediately
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                          Gain insights from industry best practices
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="lessons" className="mt-6">
                    <div className="space-y-3">
                      {lessons.map((lesson, index) => (
                        <Card key={lesson.id} className="masterclass-dark-gray-bg border-masterclass-medium-gray">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 rounded-full masterclass-secondary-bg flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="font-medium text-white">{lesson.title}</h4>
                                  <p className="text-sm masterclass-light-gray">{lesson.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {lesson.isPreview && (
                                  <Badge variant="outline" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Play className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="mt-6">
                    <div className="text-center py-8 masterclass-light-gray">
                      <Star className="h-8 w-8 mx-auto mb-4" />
                      <p>Reviews coming soon</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    ${(course.price / 100).toFixed(0)}
                  </div>
                  <p className="text-sm masterclass-light-gray">One-time purchase</p>
                </div>

                <Button className="w-full masterclass-accent-bg hover:bg-[hsl(16,100%,55%)] text-white font-semibold py-3 mb-4">
                  Enroll Now
                </Button>

                <Button variant="outline" className="w-full border-masterclass-medium-gray text-masterclass-light-gray hover:text-white hover:border-white mb-6">
                  Add to Wishlist
                </Button>

                <div className="space-y-4 border-t border-masterclass-medium-gray pt-6">
                  <div className="flex items-center justify-between">
                    <span className="masterclass-light-gray">Duration</span>
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="masterclass-light-gray">Lessons</span>
                    <span className="text-white">{course.lessonsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="masterclass-light-gray">Level</span>
                    <span className="text-white">{course.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="masterclass-light-gray">Students</span>
                    <span className="text-white">{course.studentsCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-masterclass-medium-gray">
                  <h4 className="font-semibold mb-3">This course includes:</h4>
                  <ul className="space-y-2 text-sm masterclass-light-gray">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      Lifetime access
                    </li>
                    <li className="flex items-center">
                      <Download className="h-4 w-4 text-green-500 mr-3" />
                      Downloadable resources
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-green-500 mr-3" />
                      Certificate of completion
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>

          {/* Related Courses */}
          {relatedCourses && relatedCourses.length > 1 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8">More in {course.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCourses
                  .filter(relatedCourse => relatedCourse.id !== course.id)
                  .slice(0, 3)
                  .map((relatedCourse) => (
                    <CourseCard key={relatedCourse.id} course={relatedCourse} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
