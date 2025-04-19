import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Map from URL slugs to actual category names
const categoryMap: Record<string, string> = {
  "website-templates": "Website Templates",
  "ui-kits": "UI Kits", 
  "graphics": "Graphics",
  "presentations": "Presentations",
  "email-templates": "Email Templates",
  "documents": "Documents",
};

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
  { name: "Rating", value: "rating" },
  { name: "Popularity", value: "popularity" },
];

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  //const [searchQuery, setSearchQuery] = useState("");
  //const [sortBy, setSortBy] = useState("newest");
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryMap, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [limit, setLimit] = useState(48);
  const [offset, setOffset] = useState(0);
  const [totalTemplates, setTotalTemplates] = useState(0);
  const [sortOptions, setSortOptions] = useState([]);
  //const categoryName = slug ? categoryMap[slug] : "";
  const [categories, setCategories] = useState<{ name: string; value: string }[]>([]);
  const categoryName = categories.find((cat) => cat.value === slug)?.name || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ cats, sortRes, templatesRes] = await Promise.all([
         axios.get(`${BASE_URL}/product/categories`),
          axios.get(`${BASE_URL}/product/sort-options`),
          axios.get(`${BASE_URL}/product/templates/by-category`, {
            params: {
              search: searchQuery || undefined,
              category: slug,
              sort_by: sortBy,
              limit,
              offset,
            },
          }),
        ]);
        setCategories(cats.data);
        setCategory(cats.data);
        setSortOptions(sortRes.data);
        setAllTemplates(templatesRes.data.products);
        setTemplates(templatesRes.data.products);  // Initially display all fetched
        setTotalTemplates(templatesRes.data.total);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };
  
    // only run when slug and categoryMap[slug] are available
    if (slug) {
      fetchData();
    }
  }, [slug, categoryMap, offset, limit, searchQuery, sortBy]);
  
  

  const applyFilters = () => {
    const filteredTemplates = allTemplates.filter((template: TemplateProps) => {
      const matchesCategory = slug === "all" || template.category === slug;
      const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setTemplates(filteredTemplates);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleNext = () => {
    if (offset + limit < totalTemplates) {
      setOffset(offset + limit);
    }
  };

  const handlePrev = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">{categoryName || "Category"}</h1>
      <p className="text-muted-foreground mb-6">
        Browse {templates.length} templates in this category
      </p>
      
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex space-x-2">
          <Input
            type="search"
            placeholder="Search in this category..."
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
            onValueChange={(value) => setSortBy(value)}
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
      
      {templates.length > 0 ? (
         <>
        <TemplateGrid 
          templates={templates}
          description={`Showing ${templates.length} templates in ${categoryName}`}
        />
        <div className="flex justify-between items-center mt-6">
        <Button 
          variant="outline" 
          onClick={handlePrev}
          disabled={offset === 0}
        >
          Previous
        </Button>
  
        <span className="text-sm text-muted-foreground">
        Page {Math.floor(offset / limit) + 1} of {Math.ceil(totalTemplates / limit)}
        </span>
  
        <Button 
          variant="outline" 
          onClick={handleNext}
          disabled={offset + limit >= totalTemplates}
        >
          Next
        </Button>
      </div>
      </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-xl font-semibold">No templates found</h2>
          <p className="mt-2 text-muted-foreground">
            {slug && categoryMap[slug]
              ? `There are no templates in the ${categoryMap[slug]} category matching your criteria.`
              : "This category doesn't exist or has no templates."}
          </p>
          <Button asChild className="mt-6">
            <a href="/templates">Browse All Templates</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
