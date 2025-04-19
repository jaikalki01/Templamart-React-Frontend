
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Package, Receipt, Settings, User } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useAuth } from "@/context/auth-context";
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
    const { user } = useAuth(); // from context (includes token)
    const [userData, setUserData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      full_name: "",
      email: "",
    });
    const [purchaseHistory, setPurchaseHistory] = useState([]);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserData(data);
        setFormData({
          full_name: data.full_name,
          email: data.email,
        });
      } catch (error) {
        console.error(error);
        toast.error("Error fetching user profile");
      }
    };

    fetchProfile();
  }, [user.token]);
  useEffect(() => {
    axios.get(`${BASE_URL}/users/user/purchase-history`, {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    }},

    ) // adjust base URL if needed
      .then(res => setPurchaseHistory(res.data))
      .catch(err => console.error(err));
  }, []);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/users/user/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserData({ ...userData, ...formData });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  
  const handleSubmit = async () => {
    try {
      await axios.post(`${BASE_URL}/users/user/password-update`,
        form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      
      toast.success("Password updated!");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Error updating password");
    }
  };

  const [prefs, setPrefs] = useState({
    marketing_emails: true,
    update_emails: true,
  });

  const handleToggle = (e) => {
    setPrefs({ ...prefs, [e.target.id]: e.target.checked });
  };

  const savePrefs = async () => {
    try {
      await axios.post(`${BASE_URL}/users/user/email-preferences`, 
        prefs,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
        
      setPrefs(prefs);
      toast.success("Preferences saved!");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Error updating Preferences");
    }
  };

  if (!userData) return <div className="loader">Loading...</div>;

  

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
                    <AvatarImage src={userData.avatar} alt={userData.full_name} />
                    <AvatarFallback>{userData.full_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    My Avatar
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          value={formData.full_name}
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
                              full_name: userData.full_name,
                              email: userData.email,
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
                        <p>{userData.full_name}</p>
                      </div>
                      <div>
                        <p className="font-medium">Email Address</p>
                        <p>{userData.email}</p>
                      </div>
                      <div>
                        <p className="font-medium">Member Since</p>
                        <p>{userData.created_at}</p>
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
                    id="current_password"
                    type="password"
                    value={form.current_password}
                    onChange={handleChange}
                    placeholder="Current password"
                    />
                    <Input
                    id="new_password"
                    type="password"
                    value={form.new_password}
                    onChange={handleChange}
                    placeholder="New password"
                    />
                    <Input
                    id="confirm_password"
                    type="password"
                    value={form.confirm_password}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    />

                  
                </div>
                <Button className="mt-2" onClick={handleSubmit}>Update Password</Button>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing-emails">Marketing emails</Label>
                    <input
                      type="checkbox"
                      id="marketing_emails"
                      className="toggle"
                      checked={prefs.marketing_emails}
                      onChange={handleToggle}
                      />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="update-emails">Product updates</Label>
                    <input
                        type="checkbox"
                        id="update_emails"
                        className="toggle"
                        checked={prefs.update_emails}
                        onChange={handleToggle}
                      />  
                    
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button className="mt-2" onClick={savePrefs}> Save Changes</Button>
              
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAccount;
