
import React, { createContext, useContext, useState, useEffect } from "react";
import { TemplateProps } from "@/components/templates/TemplateCard";
import { toast } from "sonner";

export interface CartItem extends TemplateProps {
  quantity: number;
}

interface ShoppingContextType {
  cart: CartItem[];
  wishlist: TemplateProps[];
  addToCart: (template: TemplateProps) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (template: TemplateProps) => void;
  isInWishlist: (id: string) => boolean;
  cartCount: number;
  wishlistCount: number;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const ShoppingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<TemplateProps[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Update localStorage and counts whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlistCount(wishlist.length);
  }, [wishlist]);

  const addToCart = (template: TemplateProps) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === template.id);
      
      if (existingItem) {
        // Increase quantity if already in cart
        return prevCart.map(item => 
          item.id === template.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...template, quantity: 1 }];
      }
    });
    
    toast.success("Added to cart", {
      description: `${template.title} has been added to your cart.`,
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  const toggleWishlist = (template: TemplateProps) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === template.id);
      
      if (isInWishlist) {
        // Remove from wishlist
        toast.success("Removed from wishlist", {
          description: "Template removed from your wishlist"
        });
        return prevWishlist.filter(item => item.id !== template.id);
      } else {
        // Add to wishlist
        toast.success("Added to wishlist", {
          description: "Template added to your wishlist"
        });
        return [...prevWishlist, template];
      }
    });
  };

  const isInWishlist = (id: string) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <ShoppingContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isInWishlist,
      cartCount,
      wishlistCount
    }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShoppingContext must be used within ShoppingProvider");
  }
  return context;
};
