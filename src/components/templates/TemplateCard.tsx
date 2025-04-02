
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useShoppingContext } from "@/context/ShoppingContext";

export interface TemplateProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  author: {
    id: string;
    name: string;
  };
  rating: number;
  sales: number;
  liked?: boolean;
}

interface TemplateCardProps {
  template: TemplateProps;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShoppingContext();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(template);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(template);
  };

  return (
    <Card className="template-card group overflow-hidden">
      <Link to={`/template/${template.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={template.image}
            alt={template.title}
            className="template-card-image transition-transform duration-300 group-hover:scale-105"
          />
          <div className="template-card-actions">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 shadow-sm backdrop-blur-sm"
              onClick={handleLike}
            >
              <Heart
                className={`h-4 w-4 ${isInWishlist(template.id) ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 shadow-sm backdrop-blur-sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2">
            {template.category}
          </Badge>
          <h3 className="line-clamp-1 text-lg font-medium">{template.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {template.description}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              By {template.author.name}
            </span>
            <span className="text-sm text-muted-foreground">
              {template.sales} sales
            </span>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold">
              ${template.price.toFixed(2)}
            </span>
            <Button size="sm">View Details</Button>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default TemplateCard;
