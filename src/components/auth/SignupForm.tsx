
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import axios from "axios";
import { BASE_URL, DOMAIN } from "@/config";
const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone_number, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [becomeSeller, setBecomeSeller] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false); // Renamed
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await axios.post(`${BASE_URL}/users/signUp`, {
        username,
        email,
        full_name: name,
        phone_number, // If you don’t collect this, use a default or add a phone field
        password
      });
  
      //console.log('Signup successful:', response.data);
  
      //console.log('Signup successful:', response.data);

      alert("Signup successful! Redirecting to login...");
  
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Wait 2 seconds before navigating
  
    } catch (error: any) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data?.detail || error.message));
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your Username"
              value={username}
              
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone_number">Mobile No.</Label>
            <Input
              id="phone_number"
              placeholder="Enter your Mobile No."
              value={phone_number}
              
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a
                href="/terms"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full" disabled={isLoading || !agreedToTerms}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignupForm;
