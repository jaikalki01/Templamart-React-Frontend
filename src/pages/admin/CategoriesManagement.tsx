import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Edit, Trash2, Plus, FileText } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useState, useEffect } from "react";
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  templateCount: number;
  featured: boolean;
}

const mockCategories: Category[] = [
  {
    id: "c1",
    name: "Website Templates",
    slug: "website-templates",
    description: "Professional website templates for all industries",
    templateCount: 124,
    featured: true
  },
  {
    id: "c2",
    name: "Email Templates",
    slug: "email-templates",
    description: "Responsive email templates for marketing campaigns",
    templateCount: 78,
    featured: true
  },
  {
    id: "c3",
    name: "Presentation Templates",
    slug: "presentation-templates",
    description: "Professional presentation templates for business and education",
    templateCount: 56,
    featured: false
  },
  {
    id: "c4",
    name: "Graphics",
    slug: "graphics",
    description: "High-quality graphics for social media and marketing",
    templateCount: 92,
    featured: true
  },
  {
    id: "c5",
    name: "UI Kits",
    slug: "ui-kits",
    description: "Complete UI kits for web and mobile design",
    templateCount: 45,
    featured: false
  }
];

const CategoriesManagement = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] = useState(false);
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/admin/categories`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCategories(res.data);
        
        
      } catch (err: any) {
        setError("Failed to load dashboard data.");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  // Form state for new category
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    featured: false
  });
  
  // Form state for editing category
  const [editCategory, setEditCategory] = useState({
    name: "",
    slug: "",
    description: "",
    featured: false
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handleNewCategoryNameChange = (value: string) => {
    setNewCategory({
      ...newCategory,
      name: value,
      slug: generateSlug(value)
    });
  };

  const handleEditCategoryNameChange = (value: string) => {
    setEditCategory({
      ...editCategory,
      name: value,
      // Only auto-generate slug if it hasn't been manually edited
      slug: editCategory.slug === generateSlug(selectedCategory?.name || "") 
        ? generateSlug(value) 
        : editCategory.slug
    });
  };

  const handleAddCategory = async () => {
    if (!newCategory.name) {
      toast.error("Category name is required");
      return;
    }
  
    const categoryToSend = {
      name: newCategory.name,
      slug: newCategory.slug || generateSlug(newCategory.name),
      description: newCategory.description,
      featured: newCategory.featured,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/admin/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(categoryToSend),
      });
  
      if (response.ok) {
        const savedCategory = await response.json(); // Assume API returns the new category
        
        setCategories([...categories, savedCategory]);
        toast.success("Category added", {
          description: `${savedCategory.name} has been added to categories`,
        });
  
        // Reset form
        setNewCategory({
          name: "",
          slug: "",
          description: "",
          featured: false,
        });
  
        setIsNewCategoryDialogOpen(false);
  
      } else {
        const errorData = await response.json();
        toast.error("Add category failed!", {
          description: errorData.detail || "Please check your input.",
        });
      }
  
    } catch (error) {
      console.error(error);
      toast.error("Network error!", {
        description: "Please try again later.",
      });
    }
  };
  

  const handleUpdateCategory = async () => {
    if (!selectedCategory || !editCategory.name) {
      toast.error("Category name is required");
      return;
    }
  
    const updatedData = {
      name: editCategory.name,
      slug: editCategory.slug || generateSlug(editCategory.name),
      description: editCategory.description,
      featured: editCategory.featured,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/admin/categories/${selectedCategory.id}`, {
        method: "PUT", // or "PATCH" based on your API
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        const updatedCategory = await response.json(); // Assuming the API returns the updated category
  
        setCategories(prevCategories =>
          prevCategories.map(category =>
            category.id === selectedCategory.id ? updatedCategory : category
          )
        );
  
        toast.success("Category updated", {
          description: `${updatedCategory.name} has been updated`,
        });
  
        setIsEditCategoryDialogOpen(false);
      } else {
        const errorData = await response.json();
        toast.error("Update failed", {
          description: errorData.detail || "Please check your input.",
        });
      }
  
    } catch (error) {
      console.error(error);
      toast.error("Network error", {
        description: "Please try again later.",
      });
    }
  };
  
  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
  
    try {
      const response = await fetch(`${BASE_URL}/admin/categories/${selectedCategory.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
  
      if (response.ok) {
        setCategories(prevCategories =>
          prevCategories.filter(category => category.id !== selectedCategory.id)
        );
  
        toast.success("Category deleted", {
          description: `${selectedCategory.name} has been deleted`,
        });
  
        setIsDeleteDialogOpen(false);
        setSelectedCategory(null);
      } else {
        const errorData = await response.json();
        toast.error("Delete failed", {
          description: errorData.detail || "Unable to delete category.",
        });
      }
  
    } catch (error) {
      console.error(error);
      toast.error("Network error", {
        description: "Please try again later.",
      });
    }
  };
  
  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditCategory({
      name: category.name,
      slug: category.slug,
      description: category.description,
      featured: category.featured
    });
    setIsEditCategoryDialogOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Category Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage template categories.
          </p>
        </div>
        <Dialog open={isNewCategoryDialogOpen} onOpenChange={setIsNewCategoryDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new template category for the marketplace.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Mobile App Templates"
                  value={newCategory.name}
                  onChange={(e) => handleNewCategoryNameChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="e.g., mobile-app-templates"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  This will be used in the URL for this category
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter category description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newCategory.featured}
                  onCheckedChange={(checked) => setNewCategory({ ...newCategory, featured: checked })}
                />
                <Label htmlFor="featured">Featured category</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewCategoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Manage and organize your template categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-12 py-2 font-medium border-b">
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Slug</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-1">Templates</div>
              <div className="col-span-1">Featured</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {categories.map((category) => (
              <div key={category.id} className="grid grid-cols-12 py-3 border-b last:border-0">
                <div className="col-span-3 font-medium">{category.name}</div>
                <div className="col-span-2 text-muted-foreground">{category.slug}</div>
                <div className="col-span-4 text-muted-foreground truncate">{category.description}</div>
                <div className="col-span-1">{category.templateCount}</div>
                <div className="col-span-1">
                  {category.featured ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </div>
                <div className="col-span-1 flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditClick(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(category)}
                    disabled={category.templateCount > 0}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {categories.length === 0 && (
              <div className="py-6 text-center text-muted-foreground">
                No categories found. Create your first category to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      {selectedCategory && (
        <Dialog open={isEditCategoryDialogOpen} onOpenChange={setIsEditCategoryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update the details for {selectedCategory.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={editCategory.name}
                  onChange={(e) => handleEditCategoryNameChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  value={editCategory.slug}
                  onChange={(e) => setEditCategory({ ...editCategory, slug: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  This will be used in the URL for this category
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editCategory.description}
                  onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-featured"
                  checked={editCategory.featured}
                  onCheckedChange={(checked) => setEditCategory({ ...editCategory, featured: checked })}
                />
                <Label htmlFor="edit-featured">Featured category</Label>
              </div>
              {selectedCategory.templateCount > 0 && (
                <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <FileText className="h-4 w-4 text-yellow-500 mr-2" />
                  <p className="text-sm text-yellow-700">
                    This category contains {selectedCategory.templateCount} templates. Changes will affect all templates in this category.
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditCategoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCategory}>
                Update Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Category Dialog */}
      {selectedCategory && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Category</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedCategory.name}?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedCategory.templateCount > 0 ? (
                <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-700">
                    This category contains {selectedCategory.templateCount} templates. You must move or delete these templates before deleting the category.
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  This action cannot be undone. This will permanently delete the category.
                </p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteCategory}
                disabled={selectedCategory.templateCount > 0}
              >
                Delete Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  ); 
};

export default CategoriesManagement;
