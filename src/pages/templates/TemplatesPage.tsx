import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import TemplateGrid from "@/components/templates/TemplateGrid";
import { TemplateProps } from "@/components/templates/TemplateCard";
import axios from "axios";
import { BASE_URL } from "@/config";
// Mock template data - in a real app, this would come from an API
const allTemplates: TemplateProps[] = [
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
  },
  {
    id: "5",
    title: "Modern Blog Theme",
    description: "Clean and modern blog theme with multiple layout options.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    category: "Website Templates",
    author: {
      id: "a2",
      name: "WebCraft Studios"
    },
    rating: 4.5,
    sales: 145
  },
  {
    id: "6",
    title: "Mobile App UI Kit",
    description: "Comprehensive UI kit for mobile app design with over 100 components.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80",
    category: "UI Kits",
    author: {
      id: "a1",
      name: "John Designer"
    },
    rating: 4.9,
    sales: 210
  }
];

const categories = [
  { name: "All Categories", value: "all" },
  { name: "Website Templates", value: "website-templates" },
  { name: "UI Kits", value: "ui-kits" },
  { name: "Graphics", value: "graphics" },
  { name: "Presentations", value: "presentations" },
  { name: "Email Templates", value: "email-templates" },
  { name: "Documents", value: "documents" },
];

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
  { name: "Rating", value: "rating" },
  { name: "Popularity", value: "popularity" },
];

const TemplatesPage = () => {
  const [allTemplates, setallTemplates] = useState<TemplateProps[]>([]);
  //const [filteredTemplates, setFilteredTemplates] = useState(allTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState<TemplateProps[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  //const [category, setCategory] = useState("all");
  //const [sortBy, setSortBy] = useState("newest");
  const [category, setCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await axios.get(`${BASE_URL}/all-categories`);
        const categories = categoriesRes.data;
        setCategory(categories.length > 0 ? categories[0].value : "all"); // Set first category as default

        // Fetch sort options and set default
        const sortRes = await axios.get(`${BASE_URL}/sort-options`);
        const sortOptions = sortRes.data;
        setSortBy(sortOptions.length > 0 ? sortOptions[0].value : "newest"); // Set first sort option as default

        // Fetch templates
       //const templatesRes = await axios.get(`${BASE_URL}/all-templates`);
       //setallTemplates(templatesRes.data.map(t => ({ ...t, id: `new-${t.id}` })));
       const templatesRes = await axios.get(`${BASE_URL}/all-templates`);
       const templates = templatesRes.data.map(t => ({ ...t, id: `new-${t.id}` }));
       setallTemplates(templates);
       setFilteredTemplates(templates);
        // Fetch categories and set default
              } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  
  // Filter options
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [ratingAbove4, setRatingAbove4] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const applyFilters = () => {
    let filtered = allTemplates;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (category !== "all") {
      filtered = filtered.filter(template => 
        template.category.toLowerCase().replace(/\s+/g, '-') === category
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(template => 
      template.price >= priceRange[0] && template.price <= priceRange[1]
    );
    
    // Apply free only filter
    if (showFreeOnly) {
      filtered = filtered.filter(template => template.price === 0);
    }
    
    // Apply rating filter
    if (ratingAbove4) {
      filtered = filtered.filter(template => template.rating >= 4);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        filtered.sort((a, b) => b.sales - a.sales);
        break;
      default:
        // Keep the default sorting (newest)
        break;
    }
    
    setFilteredTemplates(filtered);
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Browse Templates</h1>
      <p className="text-muted-foreground">Find the perfect template for your project</p>
      
      <div className="mt-8 grid gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-lg border p-4">
            <h2 className="font-semibold mb-4">Filters</h2>
            
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={category} 
                  onValueChange={(value) => {
                    setCategory(value);
                    setTimeout(applyFilters, 0);
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <Label>Price Range (${priceRange[0]} - ${priceRange[1]})</Label>
                <Slider
                  value={priceRange}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    setPriceRange(value as [number, number]);
                    setTimeout(applyFilters, 0);
                  }}
                  className="mt-2"
                />
              </div>
              
              {/* Additional Filters */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="free-only" 
                    checked={showFreeOnly}
                    onCheckedChange={(checked) => {
                      setShowFreeOnly(checked as boolean);
                      setTimeout(applyFilters, 0);
                    }}
                  />
                  <Label htmlFor="free-only">Free Only</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rating-above-4" 
                    checked={ratingAbove4}
                    onCheckedChange={(checked) => {
                      setRatingAbove4(checked as boolean);
                      setTimeout(applyFilters, 0);
                    }}
                  />
                  <Label htmlFor="rating-above-4">Rating 4+ Stars</Label>
                </div>
              </div>
              
              {/* Reset Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchQuery("");
                  setCategory("all");
                  setSortBy("newest");
                  setPriceRange([0, 100]);
                  setShowFreeOnly(false);
                  setRatingAbove4(false);
                  setFilteredTemplates(allTemplates);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Templates Grid */}
        <div className="lg:col-span-3">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search templates..."
                className="max-w-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </form>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Sort by:</span>
              <Select 
                value={sortBy} 
                onValueChange={(value) => {
                  setSortBy(value);
                  setTimeout(applyFilters, 0);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredTemplates.length > 0 ? (
            <TemplateGrid 
              templates={filteredTemplates} 
              description={`Showing ${filteredTemplates.length} templates`}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5M19 20V10m0 0l-3-3m3 3l3-3"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-semibold">No templates found</h2>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
