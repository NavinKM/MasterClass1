import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/courses", label: "Browse" },
    { href: "/instructors", label: "Instructors" },
    { href: "/pricing", label: "Pricing" },
    { href: "/gift", label: "Gift" }
  ];

  return (
    <nav className="fixed w-full z-50 bg-masterclass-primary/90 backdrop-blur-md border-b border-masterclass-dark-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="text-2xl font-bold masterclass-accent cursor-pointer">
                MasterLearn
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`transition-colors duration-200 ${
                      location === link.href
                        ? "text-white masterclass-accent"
                        : "masterclass-light-gray hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex masterclass-light-gray hover:text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button
              variant="ghost"
              className="masterclass-light-gray hover:text-white transition-colors duration-200"
            >
              Sign In
            </Button>
            <Button className="masterclass-accent-bg hover:bg-[hsl(16,100%,55%)] text-white px-6 py-2 rounded-full transition-all duration-200 font-medium">
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] masterclass-secondary-bg border-masterclass-dark-gray">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a
                        className={`block py-2 text-lg transition-colors duration-200 ${
                          location === link.href
                            ? "masterclass-accent"
                            : "masterclass-light-gray hover:text-white"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </a>
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-masterclass-dark-gray">
                    <Button
                      variant="ghost"
                      className="w-full justify-start masterclass-light-gray hover:text-white mb-2"
                    >
                      Sign In
                    </Button>
                    <Button className="w-full masterclass-accent-bg hover:bg-[hsl(16,100%,55%)] text-white">
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
