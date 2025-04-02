
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Settings } from "lucide-react";

const AdminSettings = () => {
  // Commission settings
  const [commissionRate, setCommissionRate] = useState(30);
  const [volumeDiscounts, setVolumeDiscounts] = useState(true);
  const [tierBasedCommission, setTierBasedCommission] = useState(false);
  
  // Payment gateway settings
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(true);
  const [bankTransferEnabled, setBankTransferEnabled] = useState(false);
  
  // Email notification settings
  const [emailNewSale, setEmailNewSale] = useState(true);
  const [emailNewUser, setEmailNewUser] = useState(true);
  const [emailNewSeller, setEmailNewSeller] = useState(true);
  const [emailPayoutRequest, setEmailPayoutRequest] = useState(true);
  
  // Platform settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [platformName, setPlatformName] = useState("TemplaMarT");
  const [supportEmail, setSupportEmail] = useState("support@templamart.com");
  const [footerText, setFooterText] = useState("© 2023 TemplaMarT. All rights reserved.");

  const handleCommissionSave = () => {
    toast.success("Commission settings saved", {
      description: `Platform commission rate set to ${commissionRate}%`
    });
  };
  
  const handlePaymentSave = () => {
    toast.success("Payment gateway settings saved");
  };
  
  const handleEmailSettingsSave = () => {
    toast.success("Email notification settings saved");
  };
  
  const handlePlatformSettingsSave = () => {
    toast.success("Platform settings saved");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Settings</h2>
        <p className="text-muted-foreground">
          Configure platform settings, commission rates, and other options.
        </p>
      </div>

      <Tabs defaultValue="commission" className="space-y-4">
        <TabsList>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="payment">Payment Gateways</TabsTrigger>
          <TabsTrigger value="email">Email Notifications</TabsTrigger>
          <TabsTrigger value="platform">Platform Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="commission">
          <Card>
            <CardHeader>
              <CardTitle>Commission Settings</CardTitle>
              <CardDescription>
                Configure platform fees and seller commission rates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="commission-rate">Platform Commission Rate (%)</Label>
                    <span className="text-sm font-medium">{commissionRate}%</span>
                  </div>
                  <Slider
                    id="commission-rate"
                    min={0}
                    max={100}
                    step={1}
                    value={[commissionRate]}
                    onValueChange={(value) => setCommissionRate(value[0])}
                    className="py-4"
                  />
                  <p className="text-sm text-muted-foreground">
                    This is the percentage fee the platform will keep from each sale.
                    Sellers will receive {100 - commissionRate}% of the sale amount.
                  </p>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Switch
                    id="volume-discounts"
                    checked={volumeDiscounts}
                    onCheckedChange={setVolumeDiscounts}
                  />
                  <Label htmlFor="volume-discounts">Enable volume-based commission discounts</Label>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Reduce commission rates for sellers with high sales volumes
                </p>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="tier-based"
                    checked={tierBasedCommission}
                    onCheckedChange={setTierBasedCommission}
                  />
                  <Label htmlFor="tier-based">Enable tier-based commission rates</Label>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Apply different commission rates based on seller tier/status
                </p>

                {tierBasedCommission && (
                  <div className="ml-6 space-y-4 p-4 border rounded-md">
                    <div className="grid gap-2">
                      <Label htmlFor="standard-tier">Standard Tier Commission (%)</Label>
                      <Input id="standard-tier" type="number" defaultValue="30" min="0" max="100" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="premium-tier">Premium Tier Commission (%)</Label>
                      <Input id="premium-tier" type="number" defaultValue="25" min="0" max="100" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="elite-tier">Elite Tier Commission (%)</Label>
                      <Input id="elite-tier" type="number" defaultValue="20" min="0" max="100" />
                    </div>
                  </div>
                )}
              </div>
              
              <Button className="w-full sm:w-auto" onClick={handleCommissionSave}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Save Commission Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Settings</CardTitle>
              <CardDescription>
                Configure payment providers and options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <Switch
                    id="stripe-enabled"
                    checked={stripeEnabled}
                    onCheckedChange={setStripeEnabled}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="stripe-enabled">Enable Stripe Payments</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow buyers to purchase templates using Stripe.
                    </p>
                  </div>
                </div>
                
                {stripeEnabled && (
                  <div className="ml-6 space-y-4 p-4 border rounded-md">
                    <div className="grid gap-2">
                      <Label htmlFor="stripe-key">Stripe API Key</Label>
                      <Input id="stripe-key" type="password" defaultValue="sk_test_•••••••••••••" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stripe-pub-key">Stripe Public Key</Label>
                      <Input id="stripe-pub-key" type="text" defaultValue="pk_test_•••••••••••••" />
                    </div>
                  </div>
                )}
                
                <div className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                  <Switch
                    id="paypal-enabled"
                    checked={paypalEnabled}
                    onCheckedChange={setPaypalEnabled}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="paypal-enabled">Enable PayPal Payments</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow buyers to purchase templates using PayPal.
                    </p>
                  </div>
                </div>
                
                {paypalEnabled && (
                  <div className="ml-6 space-y-4 p-4 border rounded-md">
                    <div className="grid gap-2">
                      <Label htmlFor="paypal-client-id">PayPal Client ID</Label>
                      <Input id="paypal-client-id" type="text" defaultValue="client_id_•••••••••••••" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="paypal-secret">PayPal Secret</Label>
                      <Input id="paypal-secret" type="password" defaultValue="secret_•••••••••••••" />
                    </div>
                  </div>
                )}
                
                <div className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                  <Switch
                    id="bank-enabled"
                    checked={bankTransferEnabled}
                    onCheckedChange={setBankTransferEnabled}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="bank-enabled">Enable Bank Transfers</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow buyers to purchase templates using bank transfers.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={handlePaymentSave}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Settings</CardTitle>
              <CardDescription>
                Configure when the platform should send email notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Sale Notification</Label>
                    <p className="text-sm text-muted-foreground">
                      Email admin when a new sale is made
                    </p>
                  </div>
                  <Switch
                    checked={emailNewSale}
                    onCheckedChange={setEmailNewSale}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <Label className="text-base">New User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Email admin when a new user registers
                    </p>
                  </div>
                  <Switch
                    checked={emailNewUser}
                    onCheckedChange={setEmailNewUser}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Seller Application</Label>
                    <p className="text-sm text-muted-foreground">
                      Email admin when a new seller applies
                    </p>
                  </div>
                  <Switch
                    checked={emailNewSeller}
                    onCheckedChange={setEmailNewSeller}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <Label className="text-base">Payout Request</Label>
                    <p className="text-sm text-muted-foreground">
                      Email admin when a seller requests a payout
                    </p>
                  </div>
                  <Switch
                    checked={emailPayoutRequest}
                    onCheckedChange={setEmailPayoutRequest}
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="admin-email">Admin Email Address</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@templamart.com" />
                  <p className="text-sm text-muted-foreground">
                    Primary email address for admin notifications
                  </p>
                </div>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={handleEmailSettingsSave}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Save Email Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="platform">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>
                General configuration for the marketplace platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-row items-start space-x-3 space-y-0">
                  <Switch
                    id="maintenance-mode"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="maintenance-mode" className="text-base">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Put the site in maintenance mode. Only admins can access the site.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                  <Switch
                    id="approval-required"
                    checked={approvalRequired}
                    onCheckedChange={setApprovalRequired}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="approval-required" className="text-base">Require Template Approval</Label>
                    <p className="text-sm text-muted-foreground">
                      New templates must be approved by an admin before becoming available.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input 
                    id="platform-name" 
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input 
                    id="support-email" 
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footer-text">Footer Text</Label>
                  <Textarea 
                    id="footer-text" 
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={handlePlatformSettingsSave}>
                <Settings className="mr-2 h-4 w-4" />
                Save Platform Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
