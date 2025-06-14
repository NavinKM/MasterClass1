import { 
  ChefHat, 
  Briefcase, 
  Camera, 
  Music, 
  Palette, 
  Trophy,
  BookOpen,
  Users,
  Award,
  Clock
} from "lucide-react";

export const CATEGORY_ICONS = {
  ChefHat,
  Briefcase,
  Camera,
  Music,
  Palette,
  Trophy,
  BookOpen,
  Users,
  Award,
  Clock
} as const;

export const DIFFICULTY_COLORS = {
  Beginner: "bg-green-600",
  Intermediate: "bg-yellow-600", 
  Advanced: "bg-red-600"
} as const;

export const CATEGORY_COLORS = {
  "Culinary Arts": "bg-[hsl(16,100%,60%)]",
  "Business": "bg-[hsl(214,71%,56%)]",
  "Photography": "bg-purple-600",
  "Music": "bg-green-600",
  "Arts & Crafts": "bg-pink-600",
  "Sports": "bg-orange-600"
} as const;
