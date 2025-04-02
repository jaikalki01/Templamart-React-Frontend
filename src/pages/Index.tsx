
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TemplateGrid from "@/components/templates/TemplateGrid";
import { TemplateProps } from "@/components/templates/TemplateCard";

// Mock data for the templates
const featuredTemplates: TemplateProps[] = [
  {
    id: "1",
    title: "Modern Dashboard UI Kit",
    description: "A modern dashboard UI kit with a clean design and customizable components.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    category: "UI Kits",
    author: {
      id: "a1",
      name: "John Designer"
    },
    rating: 4.8,
    sales: 245
  },
  {
    id: "2",
    title: "E-commerce Website Template",
    description: "A complete e-commerce website template with product pages, cart, and checkout.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    category: "Website Templates",
    author: {
      id: "a2",
      name: "WebCraft Studios"
    },
    rating: 4.9,
    sales: 189
  },
  {
    id: "3",
    title: "Business Presentation Template",
    description: "Professional presentation template for business proposals and pitches.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    category: "Presentations",
    author: {
      id: "a3",
      name: "PresentPro"
    },
    rating: 4.7,
    sales: 320
  },
  {
    id: "4",
    title: "Email Marketing Template",
    description: "Responsive email template for newsletters and marketing campaigns.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    category: "Email Templates",
    author: {
      id: "a4",
      name: "EmailMasters"
    },
    rating: 4.6,
    sales: 178
  }
];

const popularCategories = [
  { name: "Website Templates", count: 245, slug: "website-templates" },
  { name: "UI Kits", count: 189, slug: "ui-kits" },
  { name: "Graphics", count: 320, slug: "graphics" },
  { name: "Presentations", count: 178, slug: "presentations" },
  { name: "Email Templates", count: 156, slug: "email-templates" },
  { name: "Documents", count: 112, slug: "documents" },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newTemplates, setNewTemplates] = useState<TemplateProps[]>([]);
  
  useEffect(() => {
    // Mock API call to get new templates
    setNewTemplates(featuredTemplates.map(t => ({...t, id: `new-${t.id}`})));
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-700 to-primary py-16 text-white">
        <div className="container space-y-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Find the Perfect Template for Your Next Project
            </h1>
            <p className="text-lg text-white/80">
              Thousands of high-quality templates created by world-class designers
            </p>
          </div>
          <form 
            onSubmit={handleSearch}
            className="mx-auto flex max-w-lg flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <Input
              type="search"
              placeholder="Search for templates..."
              className="h-12 flex-1 border-transparent bg-white/20 text-white placeholder:text-white/70 backdrop-blur-sm focus:border-white/40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="h-12 bg-white text-primary hover:bg-white/90">
              Search Templates
            </Button>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">
              Find the perfect template for your specific needs
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {popularCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="flex flex-col items-center rounded-lg border p-4 text-center transition-colors hover:bg-accent"
              >
                <span className="text-lg font-medium">{category.name}</span>
                <span className="text-sm text-muted-foreground">
                  {category.count} templates
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="bg-accent py-16">
        <div className="container">
          <TemplateGrid
            templates={featuredTemplates}
            title="Featured Templates"
            description="Handpicked high-quality templates from our collection"
          />
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link to="/templates">View All Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Templates Section */}
      <section className="py-16">
        <div className="container">
          <TemplateGrid
            templates={newTemplates}
            title="New Arrivals"
            description="The latest templates added to our marketplace"
          />
        </div>
      </section>

      {/* Become a Seller Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Start Selling Your Templates</h2>
            <p className="mt-4 text-lg text-white/80">
              Join our growing community of designers and earn revenue from your creative work
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link to="/become-seller">Become a Seller</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
