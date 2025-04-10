import { useState, useEffect } from "react";
//import { useState } from "react";
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
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import { BASE_URL } from "@/config";
// Mock template data


interface Template {
  id: string;
  title: string;
  category: string;
  price: number;
  sales: number;
  revenue: number;
  status: string;
  thumbnail: string;
  created: string;
}

const SellerTemplates = () => {
  const { user } = useAuth();
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalTemplates, setTotalTemplates] = useState(0);

  const fetchData = async () => {
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const res = await axios.get(`${BASE_URL}/seller/products`, {
        headers: { Authorization: `Bearer ${user.token}` },
        params: { limit: itemsPerPage, offset },
      });
      const mapped = res.data.map((t: Template) => ({ ...t, id: `new-${t.id}` }));
      setAllTemplates(mapped);
      setTemplates(mapped); // Initial unfiltered
      setTotalTemplates(res.data.length); // You can return count from backend for exact page handling
    } catch (err) {
      console.error("Error fetching templates:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    filterTemplates();
  }, [searchQuery, statusFilter, sortBy]);

  const filterTemplates = () => {
    let filtered = [...allTemplates];

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

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
        filtered.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        break;
    }

    setTemplates(filtered);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    toast.success("Template deleted successfully");
  };

  const totalPages = Math.ceil(totalTemplates / itemsPerPage);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Templates</h2>
        <p className="text-muted-foreground">
          Manage and track performance of your templates
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <form onSubmit={(e) => e.preventDefault()} className="flex space-x-2">
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </form>
        <Button asChild>
          <Link to="/seller/templates/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Template
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg bg-muted/30">
        <div className="space-y-1">
          <h3 className="font-medium">Template Filters</h3>
          <p className="text-sm text-muted-foreground">Filter and sort your templates</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Filter by status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Templates</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
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
                  <img src={template.thumbnail} alt={template.title} className="h-full w-full object-cover" />
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
                      <Badge className={
                        template.status === "active"
                          ? "bg-green-100 text-green-800"
                          : template.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }>
                        {template.status === "active" ? "Active" : template.status === "pending" ? "Pending Review" : "Rejected"}
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
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link to={`/seller/templates/analytics/${template.id}`}>View Analytics</Link>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={templates.length < itemsPerPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SellerTemplates;
