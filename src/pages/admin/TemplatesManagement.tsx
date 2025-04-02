
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Search, MoreHorizontal, Eye, FileX } from "lucide-react";

interface Template {
  id: string;
  name: string;
  sellerName: string;
  sellerId: string;
  category: string;
  price: number;
  featured: boolean;
  status: "active" | "pending" | "rejected";
  uploadDate: string;
  sales: number;
}

const mockTemplates: Template[] = [
  {
    id: "t1",
    name: "Modern Business Website",
    sellerName: "DesignPro Studios",
    sellerId: "s1",
    category: "Website Templates",
    price: 79.99,
    featured: true,
    status: "active",
    uploadDate: "2023-01-20",
    sales: 45
  },
  {
    id: "t2",
    name: "Email Marketing Campaign",
    sellerName: "Template Masters",
    sellerId: "s2",
    category: "Email Templates",
    price: 29.99,
    featured: false,
    status: "active",
    uploadDate: "2023-02-10",
    sales: 22
  },
  {
    id: "t3",
    name: "Corporate Presentation",
    sellerName: "Digital Designs Inc",
    sellerId: "s5",
    category: "Presentation Templates",
    price: 34.99,
    featured: false,
    status: "pending",
    uploadDate: "2023-04-15",
    sales: 0
  },
  {
    id: "t4",
    name: "Social Media Kit",
    sellerName: "Template Masters",
    sellerId: "s2",
    category: "Graphics",
    price: 49.99,
    featured: true,
    status: "active",
    uploadDate: "2023-03-05",
    sales: 37
  },
  {
    id: "t5",
    name: "E-commerce Product Page",
    sellerName: "DesignPro Studios",
    sellerId: "s1",
    category: "Website Templates",
    price: 59.99,
    featured: false,
    status: "rejected",
    uploadDate: "2023-02-18",
    sales: 0
  }
];

const TemplatesManagement = () => {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    template.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (templateId: string, newStatus: "active" | "pending" | "rejected") => {
    setTemplates(prevTemplates => 
      prevTemplates.map(template => 
        template.id === templateId ? { ...template, status: newStatus } : template
      )
    );
    
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast.success(`Template status updated`, {
        description: `"${template.name}" status has been set to ${newStatus}`
      });
    }
    
    setIsTemplateDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleFeaturedToggle = (templateId: string, featured: boolean) => {
    setTemplates(prevTemplates => 
      prevTemplates.map(template => 
        template.id === templateId ? { ...template, featured } : template
      )
    );
    
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast.success(
        featured ? "Template featured" : "Template unfeatured", 
        {
          description: `"${template.name}" has been ${featured ? 'added to' : 'removed from'} featured templates`
        }
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Templates Management</h2>
        <p className="text-muted-foreground">
          Review, approve, and manage templates across all categories.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Templates</CardTitle>
              <CardDescription>
                Manage and review all templates in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 py-2 font-medium border-b">
                  <div className="col-span-3">Template Name</div>
                  <div className="col-span-2">Seller</div>
                  <div className="col-span-1">Category</div>
                  <div className="col-span-1">Price</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Featured</div>
                  <div className="col-span-1">Sales</div>
                  <div className="col-span-1">Upload Date</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="grid grid-cols-12 py-3 border-b last:border-0">
                    <div className="col-span-3 font-medium truncate">{template.name}</div>
                    <div className="col-span-2 text-muted-foreground truncate">{template.sellerName}</div>
                    <div className="col-span-1 text-muted-foreground truncate">{template.category}</div>
                    <div className="col-span-1">${template.price.toFixed(2)}</div>
                    <div className="col-span-1">
                      <Badge
                        variant="outline"
                        className={
                          template.status === "active"
                            ? "bg-green-50 text-green-600 border-green-200"
                            : template.status === "pending"
                            ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                            : "bg-red-50 text-red-600 border-red-200"
                        }
                      >
                        {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="col-span-1">
                      <Switch
                        checked={template.featured}
                        onCheckedChange={(checked) => handleFeaturedToggle(template.id, checked)}
                        disabled={template.status !== "active"}
                      />
                    </div>
                    <div className="col-span-1">{template.sales}</div>
                    <div className="col-span-1 text-muted-foreground">
                      {new Date(template.uploadDate).toLocaleDateString()}
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setIsTemplateDialogOpen(true);
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredTemplates.length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No templates found matching your search
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Templates</CardTitle>
              <CardDescription>Currently live templates available for purchase.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for active templates */}
                {filteredTemplates.filter(template => template.status === "active").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No active templates found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Templates</CardTitle>
              <CardDescription>Templates awaiting review and approval.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for pending templates */}
                {filteredTemplates.filter(template => template.status === "pending").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No pending templates found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Templates</CardTitle>
              <CardDescription>Templates that have been rejected.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for rejected templates */}
                {filteredTemplates.filter(template => template.status === "rejected").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No rejected templates found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Template action dialog */}
      {selectedTemplate && (
        <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Template</DialogTitle>
              <DialogDescription>
                Review and take action on {selectedTemplate.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{selectedTemplate.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seller:</span>
                    <span className="font-medium">{selectedTemplate.sellerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{selectedTemplate.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">${selectedTemplate.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant="outline"
                      className={
                        selectedTemplate.status === "active"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : selectedTemplate.status === "pending"
                          ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }
                    >
                      {selectedTemplate.status.charAt(0).toUpperCase() + selectedTemplate.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Upload Date:</span>
                    <span className="font-medium">
                      {new Date(selectedTemplate.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sales:</span>
                    <span className="font-medium">{selectedTemplate.sales}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Featured:</span>
                    <Switch
                      checked={selectedTemplate.featured}
                      onCheckedChange={(checked) => handleFeaturedToggle(selectedTemplate.id, checked)}
                      disabled={selectedTemplate.status !== "active"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col space-y-2 sm:space-y-0">
              <div className="flex space-x-2 w-full">
                <Button 
                  variant="default" 
                  onClick={() => handleStatusChange(selectedTemplate.id, "active")}
                  disabled={selectedTemplate.status === "active"}
                  className="flex-1"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleStatusChange(selectedTemplate.id, "rejected")}
                  disabled={selectedTemplate.status === "rejected"}
                  className="flex-1"
                >
                  <FileX className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TemplatesManagement;
