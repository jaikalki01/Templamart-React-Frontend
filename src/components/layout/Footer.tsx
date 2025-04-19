import logo from "../../img/templamart-logo.png";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            {/* <h3 className="text-lg font-medium">TemplaMarT</h3> */}
            <Link to="/" className="flex items-center space-x-2"> 
          <img src={logo} alt="this is logo of company" width={150} />
       
            {/* <span className="text-xl font-bold text-primary">TemplaMarT</span> */}
          </Link>
            <p className="text-sm text-muted-foreground">
              The marketplace for high-quality templates and digital assets for professionals.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground">
                  Browse Templates
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/become-seller" className="text-sm text-muted-foreground hover:text-foreground">
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/website-templates" className="text-sm text-muted-foreground hover:text-foreground">
                  Website Templates
                </Link>
              </li>
              <li>
                <Link to="/category/ui-kits" className="text-sm text-muted-foreground hover:text-foreground">
                  UI Kits
                </Link>
              </li>
              <li>
                <Link to="/category/graphics" className="text-sm text-muted-foreground hover:text-foreground">
                  Graphics
                </Link>
              </li>
              <li>
                <Link to="/category/presentations" className="text-sm text-muted-foreground hover:text-foreground">
                  Presentation Templates
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-sm text-muted-foreground hover:text-foreground">
                Refund Policy
                </Link>
              </li>

              <li>
                <Link to="/license" className="text-sm text-muted-foreground hover:text-foreground">
                  License Information
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Templamart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
