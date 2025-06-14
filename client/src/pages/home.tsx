import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import CourseCard from "@/components/course-card";
import InstructorCard from "@/components/instructor-card";
import CategoryGrid from "@/components/category-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Check } from "lucide-react";
import { Link } from "wouter";
import type { CourseWithInstructor, Instructor, Testimonial } from "@shared/schema";

export default function Home() {
  const { data: featuredCourses, isLoading: coursesLoading } = useQuery<CourseWithInstructor[]>({
    queryKey: ["/api/courses/featured"]
  });

  const { data: instructors, isLoading: instructorsLoading } = useQuery<Instructor[]>({
    queryKey: ["/api/instructors"]
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"]
  });

  return (
    <div className="min-h-screen bg-masterclass-primary text-white">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Courses Section */}
      <section className="py-20 masterclass-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Classes</h2>
            <p className="text-xl masterclass-light-gray max-w-2xl mx-auto">
              Learn from the world's best instructors in these popular courses
            </p>
          </div>
          
          {coursesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="masterclass-dark-gray-bg border-masterclass-medium-gray animate-pulse">
                  <div className="w-full h-56 bg-masterclass-medium-gray"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-masterclass-medium-gray rounded"></div>
                    <div className="h-4 bg-masterclass-medium-gray rounded w-2/3"></div>
                    <div className="h-4 bg-masterclass-medium-gray rounded"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : featuredCourses?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} featured />
              ))}
            </div>
          ) : (
            <div className="text-center masterclass-light-gray">
              No featured courses available
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button className="masterclass-accent-bg hover:bg-[hsl(16,100%,55%)] text-white px-8 py-3 rounded-full font-semibold transition-all duration-200">
                View All Classes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="py-20 bg-masterclass-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore by Category</h2>
            <p className="text-xl masterclass-light-gray max-w-2xl mx-auto">
              Discover classes across different fields and interests
            </p>
          </div>
          
          <CategoryGrid />
        </div>
      </section>

      {/* Instructor Spotlight Section */}
      <section className="py-20 masterclass-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Your Instructors</h2>
            <p className="text-xl masterclass-light-gray max-w-2xl mx-auto">
              Learn from industry leaders who are masters of their craft
            </p>
          </div>
          
          {instructorsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="w-32 h-32 bg-masterclass-medium-gray rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-masterclass-medium-gray rounded mb-2"></div>
                  <div className="h-4 bg-masterclass-medium-gray rounded w-2/3 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : instructors?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 fade-in">
              {instructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>
          ) : (
            <div className="text-center masterclass-light-gray">
              No instructors available
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-masterclass-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Students Say</h2>
            <p className="text-xl masterclass-light-gray max-w-2xl mx-auto">
              Join millions of learners who have transformed their skills
            </p>
          </div>
          
          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="masterclass-dark-gray-bg p-8 animate-pulse">
                  <div className="w-16 h-16 bg-masterclass-medium-gray rounded-full mx-auto mb-6"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-masterclass-medium-gray rounded"></div>
                    <div className="h-4 bg-masterclass-medium-gray rounded"></div>
                    <div className="h-4 bg-masterclass-medium-gray rounded w-2/3"></div>
                  </div>
                  <div className="h-6 bg-masterclass-medium-gray rounded w-1/2 mx-auto"></div>
                </Card>
              ))}
            </div>
          ) : testimonials?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="masterclass-dark-gray-bg border-masterclass-medium-gray p-8 text-center">
                  <div className="mb-6">
                    <img 
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <p className="masterclass-light-gray mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="flex text-yellow-400">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="masterclass-light-gray text-sm">{testimonial.title}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center masterclass-light-gray">
              No testimonials available
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 masterclass-secondary-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl masterclass-light-gray max-w-2xl mx-auto">
              Get unlimited access to all classes with our flexible pricing options
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in">
            {/* Monthly Plan */}
            <Card className="masterclass-dark-gray-bg border-masterclass-medium-gray p-8 hover:border-masterclass-accent transition-all duration-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Monthly</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold masterclass-accent">$15</span>
                  <span className="masterclass-light-gray">/month</span>
                </div>
                <ul className="text-left space-y-3 mb-8">
                  {[
                    "Unlimited access to all classes",
                    "Download lessons for offline viewing",
                    "Student workbooks and materials",
                    "Cancel anytime"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="text-green-500 mr-3 h-5 w-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full masterclass-accent-bg hover:bg-[hsl(16,100%,55%)] text-white py-3 rounded-full font-semibold transition-all duration-200">
                  Start Monthly Plan
                </Button>
              </div>
            </Card>
            
            {/* Annual Plan */}
            <Card className="masterclass-dark-gray-bg border-masterclass-accent relative p-8">
              <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 masterclass-accent-bg text-white px-4 py-2 rounded-full text-sm font-medium">
                Most Popular
              </Badge>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Annual</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold masterclass-accent">$180</span>
                  <span className="masterclass-light-gray">/year</span>
                </div>
                <p className="text-green-500 text-sm mb-6">Save $48 per year</p>
                <ul className="text-left space-y-3 mb-8">
                  {[
                    "Unlimited access to all classes",
                    "Download lessons for offline viewing",
                    "Student workbooks and materials",
                    "Priority customer support",
                    "Early access to new classes"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="text-green-500 mr-3 h-5 w-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full masterclass-accent-bg hover:bg-[hsl(16,100%,55%)] text-white py-3 rounded-full font-semibold transition-all duration-200">
                  Start Annual Plan
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-masterclass-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl masterclass-light-gray mb-8 max-w-2xl mx-auto">
            Join millions of students and start your journey with the world's best instructors today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="masterclass-accent-bg hover:bg-[hsl(16,100%,55%)] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Get Started Now
            </Button>
            <Link href="/courses">
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-masterclass-light-gray text-masterclass-light-gray hover:border-white hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200"
              >
                Browse Free Previews
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="masterclass-secondary-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-bold masterclass-accent mb-4">MasterLearn</div>
              <p className="masterclass-light-gray mb-6 max-w-md">
                Learn from the world's best instructors in every field. Transform your skills and unlock your potential with unlimited access to premium classes.
              </p>
              <div className="flex space-x-4">
                {['facebook-f', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="masterclass-light-gray hover:masterclass-accent transition-colors duration-200"
                  >
                    <i className={`fab fa-${social} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 masterclass-light-gray">
                {['About Us', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 masterclass-light-gray">
                {['Help Center', 'Community', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-masterclass-dark-gray mt-12 pt-8 text-center masterclass-light-gray">
            <p>&copy; 2024 MasterLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
