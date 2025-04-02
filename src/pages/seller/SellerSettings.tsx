
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { DollarSign, Info } from "lucide-react";

const SellerSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(true);
  
  // Commission information - would come from API in a real app
  const commissionRate = 30; // 30%
  const yourRate = 70; // 70%
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your seller profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" placeholder="Your name or studio name" defaultValue="John Designer" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" defaultValue="john.designer@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Tell potential customers about yourself and your work"
                  defaultValue="UI/UX designer specializing in dashboard and admin interfaces. Over 8 years of experience creating clean, functional designs for web applications."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input id="website" placeholder="https://your-website.com" defaultValue="https://johndesigner.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social">Social Media Links</Label>
                <div className="space-y-2">
                  <Input id="twitter" placeholder="Twitter URL" defaultValue="https://twitter.com/johndesigner" />
                  <Input id="dribbble" placeholder="Dribbble URL" defaultValue="https://dribbble.com/johndesigner" />
                  <Input id="behance" placeholder="Behance URL" defaultValue="https://behance.net/johndesigner" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="commission">
          <Card>
            <CardHeader>
              <CardTitle>Commission Structure</CardTitle>
              <CardDescription>
                View current commission rates and earnings structure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4 bg-muted/20">
                <div className="flex items-start">
                  <DollarSign className="mr-2 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Current Commission Structure</h3>
                    <p className="text-sm text-muted-foreground">
                      TemplaMarT takes a {commissionRate}% commission on all sales. You receive {yourRate}% of each sale.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border p-6 text-center">
                  <div className="text-4xl font-bold text-primary">{commissionRate}%</div>
                  <p className="text-sm text-muted-foreground mt-2">Platform Commission</p>
                </div>
                
                <div className="rounded-lg border p-6 text-center">
                  <div className="text-4xl font-bold text-green-600">{yourRate}%</div>
                  <p className="text-sm text-muted-foreground mt-2">Your Earnings</p>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium flex items-center mb-2">
                  <Info className="mr-2 h-4 w-4 text-blue-500" />
                  Commission Example
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm">Template price</span>
                    <span className="text-sm font-medium">$50.00</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 text-red-500">
                    <span className="text-sm">Platform commission ({commissionRate}%)</span>
                    <span className="text-sm font-medium">-$15.00</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Your earnings ({yourRate}%)</span>
                    <span>$35.00</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Commission Tiers</h3>
                <p className="text-sm text-muted-foreground">
                  Increase your earnings percentage by reaching higher sales tiers:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left px-4 py-2 text-sm font-medium">Sales Tier</th>
                        <th className="text-left px-4 py-2 text-sm font-medium">Platform Fee</th>
                        <th className="text-left px-4 py-2 text-sm font-medium">Your Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm">Standard (Current)</td>
                        <td className="px-4 py-2 text-sm">30%</td>
                        <td className="px-4 py-2 text-sm font-medium">70%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm">Silver ($5,000+ sales)</td>
                        <td className="px-4 py-2 text-sm">25%</td>
                        <td className="px-4 py-2 text-sm">75%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm">Gold ($10,000+ sales)</td>
                        <td className="px-4 py-2 text-sm">20%</td>
                        <td className="px-4 py-2 text-sm">80%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">Platinum ($25,000+ sales)</td>
                        <td className="px-4 py-2 text-sm">15%</td>
                        <td className="px-4 py-2 text-sm">85%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how and when we contact you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for sales, reviews, and important updates
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional content and special offers
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Change Password</h3>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Update Security</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerSettings;
