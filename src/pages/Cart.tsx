
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useShoppingContext } from "@/context/ShoppingContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useShoppingContext();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "discount20") {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      toast.success("Coupon applied", {
        description: "10% discount has been applied to your order."
      });
    } else {
      toast.error("Invalid coupon code", {
        description: "The coupon code you entered is invalid or expired."
      });
    }
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout", {
      description: "Redirecting to secure payment page..."
    });
    // In a real app, this would navigate to the checkout page
  };

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      // First remove the item
      removeFromCart(item.id);
      // Then add it back with the new quantity
      for (let i = 0; i < newQuantity; i++) {
        addToCart(item);
      }
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <p className="text-muted-foreground">Review your items before checkout</p>

      {cart.length > 0 ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cart.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4">
                      <div className="h-20 w-20 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          <Link
                            to={`/template/${item.id}`}
                            className="hover:text-primary hover:underline"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground">
                          Single license
                        </p>
                        <div className="mt-2 flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="mx-2 min-w-[30px] text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
                <Button variant="outline" asChild>
                  <Link to="/templates">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Coupon Code</div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyCoupon}
                        disabled={!couponCode}
                      >
                        Apply
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Try "DISCOUNT20" for 20% off
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-4 rounded-lg border p-4">
              <h3 className="font-medium">Secure Checkout</h3>
              <p className="text-sm text-muted-foreground">
                We use secure payment processing to ensure your information is
                always protected.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
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
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9 9h6M9 15h6"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="max-w-md text-muted-foreground">
            Looks like you haven&apos;t added any templates to your cart yet.
            Find the perfect template for your project!
          </p>
          <Button asChild>
            <Link to="/templates">Browse Templates</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
