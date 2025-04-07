
import { useState } from "react";
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
  const { addToCart, toggleWishlist, isInWishlist } = useShoppingContext();
  
  const handleLike = () => {
    toggleWishlist(templateCartData);
  };
  
  const handleAddToCart = () => {
    addToCart(templateCartData);
  };
  
  const handleBuyNow = () => {
    addToCart(templateCartData);
    window.location.href = "/cart";
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", {
      description: "Share this template with others!",
    });<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Left Column - Template Details */}
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Template Image */}
        <img 
          src={templateData.image} 
          alt={templateData.title} 
          className="w-full h-64 object-cover"
        />
        
        {/* Template Preview Tabs */}
        <Tabs defaultValue="preview" className="p-6">
          <TabsList className="mb-4">
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="focus:outline-none">
            <h2 className="text-lg font-semibold mb-4">Live Template Preview</h2>
            
            {previewLoading && (
              <div className="h-[400px] w-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-brand-blue border-r-transparent border-b-gray-200 border-l-gray-200 mb-2"></div>
                  <p>Loading preview...</p>
                </div>
              </div>
            )}
            
            <iframe 
              src="example.com"
              title={`${templateData.title} preview`}
              className={`iframe-preview ${previewLoading ? 'hidden' : 'block'}`}
              onLoad={handlePreviewLoad}
            />
            
            <div className="mt-4 flex justify-between">
              <Button variant="outline" size="sm" className="flex items-center" asChild>
                <a href="example.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-1" />
                  Open in New Window
                </a>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="focus:outline-none space-y-4">
            <h2 className="text-lg font-semibold mb-4">Key Features</h2>
            <ul className="space-y-2">
              {templateData.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="mr-2 text-green-500 mt-1 flex-shrink-0" size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="details" className="focus:outline-none">
            <h2 className="text-lg font-semibold mb-4">Template Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Description</h3>
                <p className="text-gray-600">{templateData.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Released</h3>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 text-gray-500" />
                  <span>21-2-2025</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {templateData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    
    {/* Right Column - Purchase Info */}
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
        <h1 className="text-2xl font-bold mb-2">{templateData.title}</h1>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-4">
            <Star className="text-yellow-500 mr-1" size={18} fill="currentColor" />
            <span className="font-medium">{templateData.rating}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Download className="mr-1" size={16} />
            <span>example.com downloads</span>
          </div>
        </div>
        
        <div className="mb-6">
          {templateData.price ? (
            <div className="flex items-center">
              <span className="text-3xl font-bold text-brand-blue">${templateData.price.toFixed(2)}</span>
              <span className="ml-2 text-gray-500 line-through">${templateData.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-brand-blue">${templateData.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  </div>
  };

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
              <span className="text-3xl font-bold">${templateData.price}</span>
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
                {templateData.fileFormat}
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
                {templateData.fileSize}
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
                <Button>Write a Review</Button>
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
