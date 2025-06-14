import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 gradient-overlay z-10"></div>
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Professional instructor teaching" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Learn from the{" "}
          <span className="masterclass-accent">world's best</span>
        </h1>
        <p className="text-xl md:text-2xl masterclass-light-gray mb-8 max-w-2xl mx-auto leading-relaxed">
          Get unlimited access to every class. Taught by icons, designed for real life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="masterclass-accent-bg hover:bg-[hsl(16,100%,55%)] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Start Learning Today
          </Button>
          <Link href="/courses">
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-masterclass-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200"
            >
              Browse Classes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
