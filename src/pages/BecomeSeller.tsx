
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle, DollarSign, FileCheck, FileText, Package, Users } from "lucide-react";

const BecomeSeller = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Application submitted successfully!", {
        description: "We'll review your application and get back to you soon.",
      });
      navigate("/seller/dashboard");
    }, 1500);
  };

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Become a Seller</h1>
        <p className="text-muted-foreground mb-8">
          Join our marketplace and start earning by selling your templates
        </p>

        <Tabs defaultValue="how-it-works" className="mb-8">
          <TabsList className="w-full">
            <TabsTrigger value="how-it-works" className="flex-1">How It Works</TabsTrigger>
            <TabsTrigger value="requirements" className="flex-1">Requirements</TabsTrigger>
            <TabsTrigger value="faq" className="flex-1">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="how-it-works" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-4">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">1. Create an Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Sign up and complete your seller profile with relevant information.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-4">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">2. Upload Templates</h3>
                      <p className="text-sm text-muted-foreground">
                        Create and upload high-quality templates to your store.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-4">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">3. Earn Money</h3>
                      <p className="text-sm text-muted-foreground">
                        Get paid when customers purchase your templates.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="rounded-lg border p-6 bg-accent/20">
                <h3 className="text-lg font-medium mb-2">Why sell on TemplaMarT?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Access to a global marketplace with thousands of potential customers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Competitive commission rates with up to 70% revenue share</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Promotion and marketing support for your templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Dedicated seller dashboard to track sales and analytics</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="requirements" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-medium">Seller Requirements</h3>
                <p>To become a seller on TemplaMarT, you need to meet the following requirements:</p>
                
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <FileCheck className="h-5 w-5 mr-2 text-primary" />
                      Quality Standards
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Your templates must be original, high-quality, and meet our technical requirements.
                      All templates undergo a review process before being listed.
                    </p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Seller Verification
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      You must complete the seller verification process, which includes providing
                      valid identification and payment information.
                    </p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-primary" />
                      Payout Information
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      You must provide valid payout information so we can send you your earnings.
                      We support various payout methods including bank transfers and PayPal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">How much can I earn?</h4>
                    <p className="text-sm text-muted-foreground">
                      Earnings vary based on the price and popularity of your templates.
                      Our commission structure allows you to keep 70% of the sale price for exclusive items.
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">How often do I get paid?</h4>
                    <p className="text-sm text-muted-foreground">
                      Payments are processed on a monthly basis, provided you've reached the minimum payout threshold.
                      You can request a payout at any time from your seller dashboard.
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">Can I sell my templates elsewhere?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, unless you choose the exclusive selling option. Non-exclusive templates
                      offer a lower commission rate but allow you to sell on multiple platforms.
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">How long does the review process take?</h4>
                    <p className="text-sm text-muted-foreground">
                      Template reviews typically take 2-5 business days. We review for quality,
                      originality, and compliance with our guidelines.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">What types of templates can I sell?</h4>
                    <p className="text-sm text-muted-foreground">
                      We accept a wide range of templates including website templates, UI kits,
                      graphics, presentations, email templates, and more.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-6">Seller Application</h2>
            
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter your full name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio URL (Optional)</Label>
                  <Input id="portfolio" placeholder="https://your-portfolio.com" />
                </div>
                
                <Button onClick={() => setStep(2)} className="w-full">
                  Continue
                </Button>
              </div>
            )}
            
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Tell us about yourself</Label>
                  <Textarea
                    id="bio"
                    placeholder="Share your experience, skills, and why you want to sell on TemplaMarT"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialization">What type of templates do you create?</Label>
                  <Textarea
                    id="specialization"
                    placeholder="Describe your specialization and the types of templates you plan to sell"
                    rows={4}
                  />
                </div>
                
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the seller terms and conditions
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      By checking this box, you agree to our{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Seller Guidelines
                      </a>
                      .
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={!acceptedTerms || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-muted-foreground">
            Already have a seller account?{" "}
            <Button variant="link" className="p-0" asChild>
              <a href="/seller/dashboard">Go to Seller Dashboard</a>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;
