import logo from "../../img/templamart-logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, LogIn, Menu, Search, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useShoppingContext } from "@/context/ShoppingContext";

const categories = [
  { name: "Website Templates", href: "/category/website-templates" },
  { name: "UI Kits", href: "/category/ui-kits" },
  { name: "Graphics", href: "/category/graphics" },
  { name: "Presentation Templates", href: "/category/presentations" },
  { name: "Email Templates", href: "/category/email-templates" },
  { name: "Documents", href: "/category/documents" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cartCount, wishlistCount } = useShoppingContext();
  
  // Mock authentication state - to be replaced with real auth
  const isAuthenticated = false;
  const currentUser = null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/templates?search=${encodeURIComponent(searchQuery)}`);
    }
  };

 

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
           <Link to="/" className="flex items-center space-x-2"> 
          <img src={logo} alt="this is logo of company" width={50} />
       
            {/* <span className="text-xl font-bold text-primary">TemplaMarT</span> */}
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {category.name}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/templates" className="nav-link">
                  All Templates
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pricing" className="nav-link">
                  Pricing
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/become-seller" className="nav-link">
                  Sell Templates
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden w-full max-w-sm items-center space-x-2 md:flex"
        >
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

        {/* User Navigation */}
        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="hidden md:block relative">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/cart" className="hidden md:block relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {isAuthenticated && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={currentUser?.avatar || ""}
                      alt={currentUser?.name || "User"}
                    />
                    <AvatarFallback>
                      {currentUser?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => navigate("/account")}>
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/purchases")}>
                  My Purchases
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/seller/dashboard")}>
                  Seller Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {}}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:block">
              <Button variant="ghost" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden">
          <form
            onSubmit={handleSearch}
            className="flex w-full items-center space-x-2 py-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
          <nav className="flex flex-col space-y-2">
            <Link
              to="/categories"
              className="rounded-md px-3 py-2 text-sm font-medium"
            >
              Categories
            </Link>
            <Link
              to="/templates"
              className="rounded-md px-3 py-2 text-sm font-medium"
            >
              All Templates
            </Link>
            <Link
              to="/pricing"
              className="rounded-md px-3 py-2 text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/become-seller"
              className="rounded-md px-3 py-2 text-sm font-medium"
            >
              Sell Templates
            </Link>
            <div className="flex items-center justify-between py-2">
              <Link to="/wishlist" className="flex items-center px-3 py-2">
                <Heart className="mr-2 h-5 w-5" />
                <span className="text-sm font-medium">Wishlist</span>
                {wishlistCount > 0 && (
                  <Badge className="ml-2">{wishlistCount}</Badge>
                )}
              </Link>
              <Link to="/cart" className="flex items-center px-3 py-2">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span className="text-sm font-medium">Cart</span>
                {cartCount > 0 && (
                  <Badge className="ml-2">{cartCount}</Badge>
                )}
              </Link>
            </div>
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" asChild>
                  <Link to="/login" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/signup" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {}}
              >
                Logout
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
