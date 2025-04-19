
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, ShoppingCart, Star, ExternalLink, Check, Calendar, Download } from "lucide-react";
import { useShoppingContext } from "@/context/ShoppingContext";
import { toast } from "sonner";
import { TemplateProps } from "@/components/templates/TemplateCard";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useAuth } from "@/context/auth-context";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Plus, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
// Modified template data to include the 'image' property required by TemplateProps
const templateData = {
  id: "1",
  title: "Modern Dashboard UI Kit",
  description: "A comprehensive UI kit for creating modern, responsive admin dashboards and control panels. Perfect for SaaS applications, analytics platforms, and admin interfaces.",
  longDescription: `
  <p>This premium dashboard UI kit includes everything you need to create a professional, modern admin interface:</p>
  <ul>
    <li>80+ fully responsive components</li>
    <li>Dark and light mode included</li>
    <li>Figma source files with organized layers</li>
    <li>Ready-to-use dashboard layouts</li>
    <li>Data visualization components</li>
    <li>Form elements and validation</li>
  </ul>
  <p>All components are built with attention to detail and follow the latest design trends. The clean, minimal aesthetic ensures your dashboard looks professional while remaining functional and user-friendly.</p>
  `,
  price: 49.99,
  discountPrice: 39.99,
  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80", // Added this to match TemplateProps
  images: [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
  ],
  category: "UI Kits",
  tags: ["dashboard", "admin", "ui kit", "figma", "dark mode"],
  author: {
    id: "a1",
    name: "John Designer",
    avatar: "/placeholder.svg",
    bio: "UI/UX designer specializing in dashboard and admin interfaces",
    templates: 24,
    sales: 1240
  },
  rating: 4.8,
  reviewCount: 128,
  sales: 245,
  published: "2023-05-15",
  lastUpdated: "2023-06-10",
  features: [
    "Lifetime updates",
    "6 months technical support",
    "Fully responsive design",
    "Commercial license",
    "Source files included"
  ],
  fileFormat: "Figma, Sketch, Adobe XD",
  fileSize: "24 MB"
};

// Create a TemplateProps compatible object for shopping cart and wishlist operations
const templateCartData: TemplateProps = {
  id: templateData.id,
  title: templateData.title,
  description: templateData.description,
  price: templateData.price,
  image: templateData.image,
  category: templateData.category,
  author: templateData.author,
  rating: templateData.rating,
  sales: templateData.sales
};

const reviews = [
  {
    id: "r1",
    user: { name: "Alex Johnson", avatar: "/placeholder.svg" },
    rating: 5,
    date: "2023-06-01",
    comment: "Absolutely amazing template! The components are well organized and the design is clean and modern. Saved me weeks of work."
  },
  {
    id: "r2",
    user: { name: "Sarah Miller", avatar: "/placeholder.svg" },
    rating: 4,
    date: "2023-05-28",
    comment: "Great UI kit with a ton of useful components. The dark mode looks particularly good. Only reason for 4 stars is that I had to adjust some spacing for my particular use case."
  },
  {
    id: "r3",
    user: { name: "David Chen", avatar: "/placeholder.svg" },
    rating: 5,
    date: "2023-05-20",
    comment: "This dashboard kit is perfect for my client project. The code is clean and well-organized, and the design is top-notch. Highly recommended!"
  }
];

const TemplateDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [templateData, setTemplateData] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState(true);
  const { addToCart, toggleWishlist, isInWishlist } = useShoppingContext();
  const [reviews, setReviews] = useState<any>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [newReview, setnewReview] = useState({
    rating: 0,
    comment: "",
    
  });
   const { user } = useAuth();
   
   const handleNewReviewNameChange = (value: string) => {
    setnewReview({
      ...newReview,
      rating: Number(value),
      //comment: String(value)
      
    });
  };
  const handleAddReview = async () => {
    if (!newReview.rating) {
      toast.error("Rating is required");
      return;
    }
  
    const categoryToSend = {
      rating: newReview.rating,
      comment_text: newReview.comment,
      product_token: id,
      //user_id: user.token,
      
    };
  
    try {
      const response = await fetch(`${BASE_URL}/product/product/${id}/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(categoryToSend),
      });
      
      const savedData = await response.json();

      if (savedData.status === "success") {
        const newReviewData = savedData.data;
        setReviews((prev: any) => [...(prev || []), newReviewData]);
      
        toast.success("Review added", {
          description: savedData.message || "Rating has been added to records",
        });
      
        setnewReview({ rating: 0, comment: "" });
        setIsReviewDialogOpen(false);
      } else {
        toast.error("Add Rating failed!", {
          description: savedData.message || "Unexpected error",
        });
      }
      
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error("Failed to save review", {
        description: "Please try again later",
      });
    }      
  };

  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/product/details/${id}`)
        .then(res => setTemplateData(res.data))
        .catch(() => toast.error("Failed to load template details"));
      axios.get(`${BASE_URL}/product/reviews/${id}`)
        .then(resp => setReviews(resp.data))
        .catch(() => toast.error("Failed to load reviews"));
       
    }
  }, [id]);

  if (!templateData) return <div className="text-center py-20">Loading...</div>;

  const handleLike = () => {
    toggleWishlist(templateData);
  };

  const handleAddToCart = () => {
    addToCart(templateData);
  };

  const handleBuyNow = () => {
    addToCart(templateData);
    window.location.href = "/cart";
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", {
      description: "Share this template with others!",
    });
  };

  const handlePreviewLoad = () => setPreviewLoading(false);


  return (
    <div className="container py-8">

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <img
              src={templateData.images[activeImage]}
              alt={templateData.title}
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-auto pb-2">
            {templateData.images.map((image, index) => (
              <button
                key={index}
                className={`relative min-w-[80px] overflow-hidden rounded-md ${
                  activeImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={image}
                  alt={`${templateData.title} preview ${index + 1}`}
                  className="aspect-[4/3] h-20 w-full object-cover"
                />
              </button>
            ))}
            
          </div>
          <div className="flex gap-3">
  <a href={templateData.preview_url} target="_blank" rel="noopener noreferrer" className="flex-1">
    <Button className="w-full">Preview</Button>
  </a>
  
  <a href={templateData.download_url} download className="flex-1">
    <Button className="w-full">Download</Button>
  </a>
</div>

        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="mb-2">
                {templateData.category}
              </Badge>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={handleLike}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isInWishlist(templateCartData.id) ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <h1 className="text-3xl font-bold">{templateData.title}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(templateData.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {templateData.rating} ({templateData.reviewCount} reviews)
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {templateData.sales} sales
              </span>
            </div>
          </div>

          <div className="flex items-end gap-2">
            {templateData.discountPrice ? (
              <>
                <span className="text-3xl font-bold">
                  ${templateData.discountPrice}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ${templateData.price}
                </span>
                <Badge className="bg-green-500 ml-2">
                  Save ${(templateData.price - templateData.discountPrice).toFixed(2)}
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">₹{templateData.price}</span>
            )}
          </div>

          <p className="text-muted-foreground">{templateData.description}</p>

          <div className="flex gap-3">
            <Button className="flex-1" onClick={handleBuyNow}>
              Buy Now
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
           
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">Template Features</h3>
            <ul className="ml-5 list-disc space-y-1">
              {templateData.features.map((feature, index) => (
                <li key={index} className="text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">File Format</p>
              <p className="text-sm text-muted-foreground">
                HTML, CSS, JavaScript, Bootstrap
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-sm text-muted-foreground">
                {new Date(templateData.lastUpdated).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Published</p>
              <p className="text-sm text-muted-foreground">
                {new Date(templateData.published).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">File Size</p>
              <p className="text-sm text-muted-foreground">
                5-10 MB (depending on the file format)
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={templateData.author.avatar} alt={templateData.author.name} />
              <AvatarFallback>{templateData.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{templateData.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {templateData.author.templates} templates · {templateData.author.sales} sales
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto" asChild>
              <Link to={`/seller/${templateData.author.id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({templateData.reviewCount})
            </TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
        
              <div dangerouslySetInnerHTML={{ __html: templateData.longDescription }} />
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Customer Reviews</h3>
                
                <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogTrigger asChild>
          <Button
      onClick={() => {
        if (!user) {
          toast.error("Please login to write a review");
          window.location.href = "/login"; // or use router.push("/login") if using Next.js
        } else {
          setIsReviewDialogOpen(true);
        }
      }}
    >
      <Plus className="mr-2 h-4 w-4" />
      Write a Review
    </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Review</DialogTitle>
              <DialogDescription>
                Create a new Review for the marketplace.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Select Rating</Label>
                <Input
                  id="rating"
                  placeholder="e.g., Mobile App Templates"
                  type="number"
                  min="1"
                  max="5"
                  value={newReview.rating}
                  onChange={(e) => handleNewReviewNameChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Please Type Your Comments"
                  value={newReview.comment}
                  onChange={(e) => setnewReview({ ...newReview, comment: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Your Comments Live Here
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddReview}>
                Add Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
              </div>
              <div className="grid gap-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.user.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="support" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Support Information</h3>
                  <p>
                    This template includes 6 months of support from the date of purchase.
                    Support includes:
                  </p>
                  <ul className="ml-5 list-disc space-y-1">
                    <li>Answering questions about template features</li>
                    <li>Assistance with template bugs and issues</li>
                    <li>Help with included third-party assets</li>
                  </ul>
                  <p>
                    Support does not include:
                  </p>
                  <ul className="ml-5 list-disc space-y-1">
                    <li>Customization beyond the template's existing features</li>
                    <li>Installation services</li>
                    <li>Support for code or assets not included with the template</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
      </div>
    </div>
  );
};

export default TemplateDetails;
