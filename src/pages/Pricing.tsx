
import { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const handlePurchase = (plan: string) => {
    toast.success(`Selected the ${plan} plan`, {
      description: "You'll be redirected to complete your purchase.",
    });
  };

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Choose the perfect plan for your needs. Save with annual billing.
        </p>

        <Tabs
          defaultValue="monthly"
          className="mt-8"
          value={billingCycle}
          onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}
        >
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="mt-8">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Basic Plan */}
              <PricingCard
                title="Basic"
                description="Perfect for individuals and small projects"
                price={billingCycle === "monthly" ? 2500 : 23.2}
                features={[
                  "5 template downloads per month",
                  "Basic support",
                  "License for 1 project",
                  "7-day money-back guarantee",
                ]}
                onPurchase={() => handlePurchase("Basic")}
              />

              {/* Professional Plan */}
              <PricingCard
                title="Professional"
                description="Ideal for professionals and growing businesses"
                price={billingCycle === "monthly" ? 5500 : 47.2}
                featured={true}
                features={[
                  "20 template downloads per month",
                  "Priority support",
                  "License for 5 projects",
                  "Access to premium templates",
                  "Template customization",
                  "30-day money-back guarantee",
                ]}
                onPurchase={() => handlePurchase("Professional")}
              />

              {/* Enterprise Plan */}
              <PricingCard
                title="Enterprise"
                description="For teams and large organizations"
                price={billingCycle === "monthly" ? 12000 : 79.2}
                features={[
                  "Unlimited template downloads",
                  "24/7 dedicated support",
                  "License for unlimited projects",
                  "Access to all templates",
                  "Custom template requests",
                  "Team collaboration features",
                  "60-day money-back guarantee",
                ]}
                onPurchase={() => handlePurchase("Enterprise")}
              />
            </div>
          </TabsContent>

          <TabsContent value="annual" className="mt-8">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Basic Plan (Annual) */}
              <PricingCard
                title="Basic"
                description="Perfect for individuals and small projects"
                price={billingCycle === "monthly" ? 29 : 2300}
                billingCycle="annual"
                features={[
                  "5 template downloads per month",
                  "Basic support",
                  "License for 1 project",
                  "7-day money-back guarantee",
                ]}
                onPurchase={() => handlePurchase("Basic Annual")}
              />

              {/* Professional Plan (Annual) */}
              <PricingCard
                title="Professional"
                description="Ideal for professionals and growing businesses"
                price={billingCycle === "monthly" ? 59 : 4700}
                billingCycle="annual"
                featured={true}
                features={[
                  "20 template downloads per month",
                  "Priority support",
                  "License for 5 projects",
                  "Access to premium templates",
                  "Template customization",
                  "30-day money-back guarantee",
                ]}
                onPurchase={() => handlePurchase("Professional Annual")}
              />

              {/* Enterprise Plan (Annual) */}
              <PricingCard
                title="Enterprise"
                description="For teams and large organizations"
                price={billingCycle === "monthly" ? 99 : 9000}
                billingCycle="annual"
                features={[
                  "Unlimited template downloads",
                  "24/7 dedicated support",
                  "License for unlimited projects",
                  "Access to all templates",
                  "Custom template requests",
                  "Team collaboration features",
                  "60-day money-back guarantee",
                ]}
                onPurchase={() => handlePurchase("Enterprise Annual")}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <FaqItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards, PayPal, and bank transfers for annual plans."
            />
            <FaqItem
              question="Can I upgrade my plan later?"
              answer="Yes, you can upgrade your plan at any time. You'll only pay the prorated difference."
            />
            <FaqItem
              question="How does the license work?"
              answer="Our licenses are based on the number of end products you create. Each plan has different license terms."
            />
            <FaqItem
              question="What's your refund policy?"
              answer="We offer a money-back guarantee period that varies by plan. If you're not satisfied, contact us within this period."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  billingCycle?: "monthly" | "annual";
  features: string[];
  featured?: boolean;
  onPurchase: () => void;
}

const PricingCard = ({
  title,
  description,
  price,
  billingCycle = "monthly",
  features,
  featured = false,
  onPurchase,
}: PricingCardProps) => {
  return (
    <Card
      className={`flex flex-col ₹{
        featured
          ? "border-primary shadow-lg scale-105 relative z-10"
          : "border-border"
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-4xl font-bold">₹{price}</span>
          <span className="text-muted-foreground">
            /{billingCycle === "monthly" ? "month" : "month, billed annually"}
          </span>
        </div>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onPurchase}
          className={`w-full ${featured ? "bg-primary" : ""}`}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="font-medium">{question}</div>
      <div className="text-sm text-muted-foreground">{answer}</div>
    </div>
  );
};

export default Pricing;
