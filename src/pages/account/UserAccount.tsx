
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Package, Receipt, Settings, User } from "lucide-react";
import { toast } from "sonner";

// Mock user data - would come from auth context in a real app
const userData = {
  id: "user123",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "",
  joinDate: "January 15, 2023",
};

// Mock purchase history
const purchaseHistory = [
  {
    id: "ord-001",
    date: "2023-06-15",
    template: "Modern Dashboard UI Kit",
    price: 49.99,
    templateId: "1",
  },
  {
    id: "ord-002",
    date: "2023-05-22",
    template: "E-commerce Website Template",
    price: 69.99,
    templateId: "2",
  },
  {
    id: "ord-003",
    date: "2023-04-10",
    template: "Business Presentation Template",
    price: 29.99,
    templateId: "3",
  },
];

const UserAccount = () => {
  const [user, setUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
    });
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const downloadInvoice = (orderId: string) => {
    toast.success(`Downloading invoice for order ${orderId}`, {
      description: "Your invoice will be downloaded shortly.",
    });
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">My Account</h1>
      <p className="text-muted-foreground mb-6">
        Manage your profile, view purchase history, and download templates
      </p>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="purchases">
            <Package className="mr-2 h-4 w-4" />
            My Purchases
          </TabsTrigger>
          <TabsTrigger value="invoices">
            <Receipt className="mr-2 h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                View and update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: user.name,
                              email: user.email,
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="font-medium">Full Name</p>
                        <p>{user.name}</p>
                      </div>
                      <div>
                        <p className="font-medium">Email Address</p>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <p className="font-medium">Member Since</p>
                        <p>{user.joinDate}</p>
                      </div>
                      <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>
                View and download your purchased templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {purchaseHistory.length > 0 ? (
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{purchase.template}</h3>
                        <p className="text-sm text-muted-foreground">
                          Purchased on: {purchase.date}
                        </p>
                        <p className="text-sm">${purchase.price.toFixed(2)}</p>
                      </div>
                      <div className="flex space-x-2 mt-4 sm:mt-0">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/template/${purchase.templateId}`}>View</a>
                        </Button>
                        <Button size="sm">Download</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    You haven&apos;t purchased any templates yet.
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/templates">Browse Templates</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>
                Access and download invoices for your purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              {purchaseHistory.length > 0 ? (
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-muted-foreground mr-3" />
                        <div>
                          <h3 className="font-medium">
                            Invoice #{purchase.id}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {purchase.date} • ${purchase.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 sm:mt-0"
                        onClick={() => downloadInvoice(purchase.id)}
                      >
                        Download PDF
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No invoices available.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <div className="grid gap-2">
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Current password"
                  />
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="New password"
                  />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <Button className="mt-2">Update Password</Button>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing-emails">Marketing emails</Label>
                    <input
                      type="checkbox"
                      id="marketing-emails"
                      className="toggle"
                      defaultChecked
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="update-emails">Product updates</Label>
                    <input
                      type="checkbox"
                      id="update-emails"
                      className="toggle"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={() => toast.success("Settings saved")}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAccount;
