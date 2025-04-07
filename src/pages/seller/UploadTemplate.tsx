
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { BASE_URL } from "@/config";
// Form validation schema
const templateFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  tags: z.string(),
  thumbnail: z.string().optional(),
  files: z.string().optional(),
  licenseType: z.string().min(1, "Please select a license type"),
});

type TemplateFormValues = z.infer<typeof templateFormSchema>;

const defaultValues: Partial<TemplateFormValues> = {
  title: "",
  description: "",
  category: "",
  price: 0,
  tags: "",
  licenseType: "standard",
};

const UploadTemplate = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Get token and role
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [templateZipFile, setTemplateZipFile] = useState<File | null>(null);

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: TemplateFormValues) => {
    if (!user?.token) {
      toast.error("You must be logged in to upload a product.");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", values.title);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("tags", values.tags);
    formData.append("licenseType", values.licenseType);
    formData.append("category_name", values.category);
    formData.append("product_price", values.price.toString());

    if (thumbnailFile) {
      formData.append("product_image", thumbnailFile);
    }

    if (templateZipFile) {
      formData.append("template_zip", templateZipFile);
    }

    try {
      const response = await fetch(`${BASE_URL}/prouct/create-product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Upload failed");
      }

      toast.success("Product uploaded successfully!");
      navigate("/seller/templates");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);

    const reader = new FileReader();
    reader.onload = () => setThumbnailPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTemplateZipFile(file);
  };  

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upload Template</h2>
        <p className="text-muted-foreground">
          Upload a new template to sell on TemplaMarT
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Form Fields */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Template Information</CardTitle>
                  <CardDescription>
                    Provide details about your template
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Template Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Modern Dashboard UI Kit" {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a clear, descriptive name for your template
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your template in detail" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include key features, use cases, and what makes your template unique
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="website-templates">Website Templates</SelectItem>
                              <SelectItem value="ui-kits">UI Kits</SelectItem>
                              <SelectItem value="graphics">Graphics</SelectItem>
                              <SelectItem value="presentations">Presentations</SelectItem>
                              <SelectItem value="email-templates">Email Templates</SelectItem>
                              <SelectItem value="documents">Documents</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.01" 
                              placeholder="e.g. 49.99" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Set to 0 for free templates
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. dashboard, admin, modern (comma separated)"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Add relevant tags to help users find your template
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="licenseType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a license type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard License</SelectItem>
                            <SelectItem value="extended">Extended License</SelectItem>
                            <SelectItem value="exclusive">Exclusive (70% Revenue)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Standard: Single end product, Extended: Multiple end products
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Template Files</CardTitle>
                  <CardDescription>
                    Upload your template files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md p-8">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">Drag and drop your files</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      Upload a ZIP file containing all template assets
                    </p>
                    <Button type="button" variant="outline" onClick={() => document.getElementById("files")?.click()}>
                      Browse Files
                    </Button>
                    <input
                      type="file"
                      id="files"
                      onChange={handleZipChange}
                      className="hidden"
                      accept=".zip,.rar,.7zip"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar - Thumbnail Upload & Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thumbnail Image</CardTitle>
                  <CardDescription>
                    Upload a thumbnail for your template
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div
                      className={`aspect-video border rounded-md overflow-hidden flex items-center justify-center bg-muted ${
                        !thumbnailPreview ? "border-dashed" : ""
                      }`}
                    >
                      {thumbnailPreview ? (
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No thumbnail uploaded
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="thumbnail">Upload Thumbnail</Label>
                      <Input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended size: 1280×720px, JPG or PNG
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Submission Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• All templates must be original work</li>
                    <li>• Include documentation with your template</li>
                    <li>• Ensure your code is clean and well-organized</li>
                    <li>• Templates are reviewed for quality and uniqueness</li>
                    <li>• Review process typically takes 2-5 business days</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>Pricing suggestions based on category:</p>
                    <ul>
                      <li>• UI Kits: $40-80</li>
                      <li>• Website Templates: $50-100</li>
                      <li>• Presentations: $20-50</li>
                      <li>• Email Templates: $15-40</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Competitive pricing can help increase sales volume.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate("/seller/templates")}>
              Cancel
            </Button>
            <Button type="submit">Submit for Review</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UploadTemplate;
