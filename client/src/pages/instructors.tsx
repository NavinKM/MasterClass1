import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import InstructorCard from "@/components/instructor-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users } from "lucide-react";
import { useState } from "react";
import type { Instructor } from "@shared/schema";

export default function Instructors() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: instructors, isLoading } = useQuery<Instructor[]>({
    queryKey: ["/api/instructors"]
  });

  // Filter instructors based on search query
  const filteredInstructors = instructors?.filter(instructor => {
    if (!searchQuery) return true;
    return instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           instructor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
           instructor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-masterclass-primary text-white">
      <Navigation />
      
      {/* Header */}
      <div className="pt-24 pb-12 masterclass-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-12 w-12 masterclass-accent mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Expert Instructors</h1>
            </div>
            <p className="text-xl masterclass-light-gray max-w-2xl mx-auto">
              Learn from industry leaders and world-renowned experts who are masters of their craft
            </p>
          </div>

          {/* Search */}
          <div className="flex justify-center mb-8">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-masterclass-light-gray h-4 w-4" />
              <Input
                placeholder="Search instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-masterclass-dark-gray border-masterclass-medium-gray text-white placeholder:text-masterclass-light-gray"
              />
            </div>
          </div>

          {/* Results count */}
          <div className="text-center mb-8">
            <Badge variant="outline" className="masterclass-light-gray border-masterclass-medium-gray">
              {isLoading ? "Loading..." : `${filteredInstructors?.length || 0} instructors`}
            </Badge>
          </div>
        </div>
      </div>

      {/* Instructors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="masterclass-dark-gray-bg border-masterclass-medium-gray animate-pulse rounded-lg">
                  <div className="w-full h-64 bg-masterclass-medium-gray rounded-t-lg"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-masterclass-medium-gray rounded w-3/4"></div>
                    <div className="h-4 bg-masterclass-medium-gray rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-masterclass-medium-gray rounded"></div>
                      <div className="h-4 bg-masterclass-medium-gray rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredInstructors && filteredInstructors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInstructors.map((instructor) => (
                <div key={instructor.id} className="fade-in">
                  <InstructorCard instructor={instructor} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="h-16 w-16 masterclass-light-gray mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No instructors found</h3>
              <p className="masterclass-light-gray">
                {searchQuery ? "Try adjusting your search terms" : "No instructors available at the moment"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      {!searchQuery && instructors && instructors.length > 0 && (
        <section className="py-20 masterclass-secondary-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Learn from Our Instructors?</h2>
              <p className="text-xl masterclass-light-gray max-w-2xl mx-auto">
                Each instructor brings decades of real-world experience and expertise to help you master new skills
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 masterclass-accent-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Industry Leaders</h3>
                <p className="masterclass-light-gray">
                  Learn from professionals who have shaped their industries and achieved remarkable success
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 masterclass-accent-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="h-8 w-8 text-white bg-transparent border-0" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Expertise</h3>
                <p className="masterclass-light-gray">
                  Each instructor brings years of hands-on experience and proven track records of success
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 masterclass-accent-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
                <p className="masterclass-light-gray">
                  Get insights and techniques that you can only learn from true masters of their craft
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}