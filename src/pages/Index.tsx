
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TemplateGrid from "@/components/templates/TemplateGrid";
import { TemplateProps } from "@/components/templates/TemplateCard";
import axios from "axios";
import { BASE_URL } from "@/config";
// Mock data for the templates
//const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000/product";




const Index = () => {
  //const BASE_URL ="http://127.0.0.1:8000/product"
  const [searchQuery, setSearchQuery] = useState("");
  const [newTemplates, setNewTemplates] = useState<TemplateProps[]>([]);
  const [featuredTemplates, setfeaturedTemplates] = useState<TemplateProps[]>([]);
  const [popularCategories, setCategories] = useState([]);
 
  useEffect(() => {
    axios.get(`${BASE_URL}/templates`)
      .then(response => {
        // Update the templates with new IDs as in the mock function
        setNewTemplates(response.data.map(t => ({ ...t, id: `new-${t.id}` })));
        setfeaturedTemplates(response.data.map(t => ({ ...t, id: `new-${t.id}` })));
      })
      axios.get(`${BASE_URL}/popular-categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching templates:", error);
      });
  }, []); // Runs once on mount




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
