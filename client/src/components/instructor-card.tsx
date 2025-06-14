import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Instructor } from "@shared/schema";

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
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
    <Link href={`/instructors/${instructor.id}`}>
      <div className="text-center group cursor-pointer">
        <div className="relative mb-6">
          <img 
            src={instructor.avatarUrl} 
            alt={instructor.name}
            className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <Badge 
            className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${getBadgeColor(instructor.title)} text-white px-3 py-1 rounded-full text-xs font-medium`}
          >
            {instructor.title}
          </Badge>
        </div>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:masterclass-accent transition-colors">
          {instructor.name}
        </h3>
        <p className="masterclass-light-gray text-sm mb-2">
          {instructor.specialty}
        </p>
        <p className="masterclass-light-gray text-xs">
          {instructor.coursesCount} Classes
        </p>
      </div>
    </Link>
  );
}
