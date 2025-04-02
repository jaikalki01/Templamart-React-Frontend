
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Mock template data
const mockTemplates = [
  {
    id: "1",
    title: "Modern Dashboard UI Kit",
    category: "UI Kits",
    price: 49.99,
    sales: 245,
    revenue: 12247.55,
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    created: "2023-01-15",
  },
  {
    id: "2",
    title: "E-commerce Website Template",
    category: "Website Templates",
    price: 69.99,
    sales: 189,
    revenue: 13228.11,
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    created: "2023-02-10",
  },
  {
    id: "3",
    title: "Business Presentation Template",
    category: "Presentations",
    price: 29.99,
    sales: 320,
    revenue: 9596.80,
    status: "pending",
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    created: "2023-03-05",
  },
  {
    id: "4",
    title: "Email Marketing Template",
    category: "Email Templates",
    price: 19.99,
    sales: 178,
    revenue: 3558.22,
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    created: "2023-04-20",
  },
];

const SellerTemplates = () => {
  const [templates, setTemplates] = useState(mockTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter templates based on search query
    filterTemplates();
  };

  const filterTemplates = () => {
    let filtered = [...mockTemplates];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (template) =>
          template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((template) => template.status === statusFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "sales":
        filtered.sort((a, b) => b.sales - a.sales);
        break;
      case "revenue":
        filtered.sort((a, b) => b.revenue - a.revenue);
        break;
      case "oldest":
        filtered.sort(
          (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
        );
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
        );
        break;
    }

    setTemplates(filtered);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setTimeout(filterTemplates, 0);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setTimeout(filterTemplates, 0);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id));
    toast.success("Template deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Templates</h2>
        <p className="text-muted-foreground">
          Manage and track performance of your templates
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Button type="submit">Search</Button>
        </form>

        <div className="flex gap-2">
          <Button asChild>
            <Link to="/seller/templates/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Template
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg bg-muted/30">
        <div className="space-y-1">
          <h3 className="font-medium">Template Filters</h3>
          <p className="text-sm text-muted-foreground">
            Filter and sort your templates
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Templates</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="sales">Most Sales</SelectItem>
              <SelectItem value="revenue">Highest Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {templates.length > 0 ? (
          templates.map((template) => (
            <Card key={template.id}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                  <img
                    src={template.thumbnail}
                    alt={template.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{template.title}</CardTitle>
                        <CardDescription>
                          {template.category} • Created on {template.created}
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${
                          template.status === "active"
                            ? "bg-green-100 text-green-800"
                            : template.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {template.status === "active"
                          ? "Active"
                          : template.status === "pending"
                          ? "Pending Review"
                          : "Rejected"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-medium">${template.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sales</p>
                        <p className="font-medium">{template.sales}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="font-medium">${template.revenue.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversion</p>
                        <p className="font-medium">3.2%</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/template/${template.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/seller/templates/edit/${template.id}`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link to={`/seller/templates/analytics/${template.id}`}>
                            View Analytics
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          Delete Template
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold">No templates found</h2>
            <p className="mt-2 text-muted-foreground">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first template"}
            </p>
            <Button asChild className="mt-6">
              <Link to="/seller/templates/new">Create Template</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerTemplates;
