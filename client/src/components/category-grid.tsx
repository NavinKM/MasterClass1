import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Category } from "@shared/schema";
import { CATEGORY_ICONS } from "@/lib/constants";

export default function CategoryGrid() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"]
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="text-center animate-pulse">
            <div className="bg-masterclass-dark-gray w-20 h-20 rounded-full mx-auto mb-4"></div>
            <div className="bg-masterclass-dark-gray h-4 w-16 mx-auto rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div className="text-center masterclass-light-gray">
        No categories available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {categories.map((category) => {
        const IconComponent = CATEGORY_ICONS[category.icon as keyof typeof CATEGORY_ICONS];
        
        return (
          <Link key={category.id} href={`/courses?category=${category.slug}`}>
            <div className="text-center group cursor-pointer">
              <div className="masterclass-dark-gray-bg hover:masterclass-accent-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 group-hover:scale-110">
                {IconComponent && (
                  <IconComponent className="h-8 w-8 masterclass-accent group-hover:text-white transition-colors duration-200" />
                )}
              </div>
              <p className="font-medium group-hover:masterclass-accent transition-colors duration-200">
                {category.name}
              </p>
              <p className="text-xs masterclass-light-gray mt-1">
                {category.coursesCount} courses
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
