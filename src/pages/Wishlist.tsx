
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useShoppingContext } from "@/context/ShoppingContext";
import { TemplateProps } from "@/components/templates/TemplateCard";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useShoppingContext();

  const removeFromWishlist = (id: string) => {
    const template = wishlist.find(item => item.id === id);
    if (template) {
      toggleWishlist(template);
    }
  };

  const handleAddToCart = (template: TemplateProps) => {
    addToCart(template);
  };

  const clearWishlist = () => {
    // Remove all items from wishlist
    [...wishlist].forEach(item => toggleWishlist(item));
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length} items in your wishlist
          </p>
        </div>
        {wishlist.length > 0 && (
          <Button variant="outline" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        )}
      </div>

      {wishlist.length > 0 ? (
        <div className="grid gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="w-full md:w-40 h-40 overflow-hidden rounded-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg">
                      <Link
                        to={`/template/${item.id}`}
                        className="hover:text-primary hover:underline"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                </div>
                <p className="text-sm">{item.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-4">By {item.author.name}</span>
                  <span className="mr-4">Rating: {item.rating}/5</span>
                  <span>{item.sales} sales</span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Button onClick={() => handleAddToCart(item)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-6">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Browse our templates and add your favorites to your wishlist
          </p>
          <Button asChild className="mt-6">
            <Link to="/templates">Browse Templates</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
