import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import type { CourseWithInstructor, Category } from "@shared/schema";

export default function Courses() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Get category from URL params
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const categoryFromUrl = urlParams.get('category');

  const { data: courses, isLoading: coursesLoading } = useQuery<CourseWithInstructor[]>({
    queryKey: ["/api/courses"]
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"]
  });

  // Filter and sort courses
  const filteredCourses = courses?.filter(course => {
    const matchesSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = (!selectedCategory || selectedCategory === "all") && !categoryFromUrl ||
      (categoryFromUrl && course.category.toLowerCase() === categoryFromUrl.toLowerCase()) ||
      (selectedCategory && selectedCategory !== "all" && course.category === selectedCategory);

    const matchesDifficulty = !selectedDifficulty || selectedDifficulty === "all" || course.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  })?.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.studentsCount - a.studentsCount;
      case 'newest':
        return b.id - a.id;
      default: // featured
        return b.featured ? 1 : -1;
    }
  });

  const activeFiltersCount = [searchQuery, selectedCategory, selectedDifficulty].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedDifficulty("");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-masterclass-primary text-white">
      <Navigation />
      
      {/* Header */}
      <div className="pt-24 pb-12 masterclass-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {categoryFromUrl ? `${categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1)} Courses` : 'All Courses'}
            </h1>
            <p className="text-xl masterclass-light-gray max-w-2xl mx-auto">
              Discover world-class courses taught by industry experts
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-masterclass-light-gray h-4 w-4" />
              <Input
                placeholder="Search courses, instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-masterclass-dark-gray border-masterclass-medium-gray text-white placeholder:text-masterclass-light-gray"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] bg-masterclass-dark-gray border-masterclass-medium-gray text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-masterclass-dark-gray border-masterclass-medium-gray">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[150px] bg-masterclass-dark-gray border-masterclass-medium-gray text-white">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-masterclass-dark-gray border-masterclass-medium-gray">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px] bg-masterclass-dark-gray border-masterclass-medium-gray text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-masterclass-dark-gray border-masterclass-medium-gray">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="students">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="border-masterclass-medium-gray text-masterclass-light-gray hover:text-white hover:border-white"
                >
                  Clear Filters
                  <Badge className="ml-2 bg-masterclass-accent text-white">
                    {activeFiltersCount}
                  </Badge>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="py-12 bg-masterclass-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-masterclass-light-gray">
              {filteredCourses?.length || 0} courses found
            </p>
          </div>

          {coursesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="masterclass-dark-gray-bg rounded-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-masterclass-medium-gray"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-masterclass-medium-gray rounded"></div>
                    <div className="h-4 bg-masterclass-medium-gray rounded w-2/3"></div>
                    <div className="h-4 bg-masterclass-medium-gray rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="masterclass-dark-gray-bg rounded-lg p-8 max-w-md mx-auto">
                <Filter className="h-12 w-12 masterclass-light-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="masterclass-light-gray mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  onClick={clearFilters}
                  className="masterclass-accent-bg hover:bg-[hsl(16,100%,55%)] text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
