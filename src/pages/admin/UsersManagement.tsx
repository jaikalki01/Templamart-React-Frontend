
//import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserPlus, Search, MoreHorizontal, UserX } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useState, useEffect } from "react";
interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "active" | "suspended" | "inactive";
  purchaseCount: number;
}

const mockUsers: User[] = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@example.com",
    joinDate: "2023-01-15",
    status: "active",
    purchaseCount: 12
  },
  {
    id: "u2",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    joinDate: "2023-02-20",
    status: "active",
    purchaseCount: 5
  },
  {
    id: "u3",
    name: "Michael Chen",
    email: "mchen@example.com",
    joinDate: "2023-03-10",
    status: "inactive",
    purchaseCount: 0
  },
  {
    id: "u4",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    joinDate: "2023-02-05",
    status: "active",
    purchaseCount: 8
  },
  {
    id: "u5",
    name: "Robert Davis",
    email: "rdavis@example.com",
    joinDate: "2023-04-18",
    status: "suspended",
    purchaseCount: 3
  }
];

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(res.data);
        
        
      } catch (err: any) {
        setError("Failed to load dashboard data.");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (userId: string, newStatus: "active" | "suspended" | "inactive") => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    
    const user = users.find(u => u.id === userId);
    if (user) {
      toast.success(`User status updated`, {
        description: `${user.name}'s status has been set to ${newStatus}`
      });
    }
    
    setIsUserDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          Manage user accounts, view purchase history, and moderate user activity.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Manage and monitor all registered users in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 py-2 font-medium border-b">
                  <div className="col-span-3">Name</div>
                  <div className="col-span-3">Email</div>
                  <div className="col-span-2">Join Date</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Purchases</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {filteredUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-12 py-3 border-b last:border-0">
                    <div className="col-span-3 font-medium">{user.name}</div>
                    <div className="col-span-3 text-muted-foreground">{user.email}</div>
                    <div className="col-span-2 text-muted-foreground">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant="outline"
                        className={
                          user.status === "active"
                            ? "bg-green-50 text-green-600 border-green-200"
                            : user.status === "suspended"
                            ? "bg-red-50 text-red-600 border-red-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="col-span-1">{user.purchaseCount}</div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsUserDialogOpen(true);
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredUsers.length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No users found matching your search
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>Currently active users on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for active users */}
                {filteredUsers.filter(user => user.status === "active").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No active users found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Users</CardTitle>
              <CardDescription>Users who haven't been active recently.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for inactive users */}
                {filteredUsers.filter(user => user.status === "inactive").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No inactive users found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suspended">
          <Card>
            <CardHeader>
              <CardTitle>Suspended Users</CardTitle>
              <CardDescription>Users who have been suspended from the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for suspended users */}
                {filteredUsers.filter(user => user.status === "suspended").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No suspended users found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User action dialog */}
      {selectedUser && (
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage User</DialogTitle>
              <DialogDescription>
                View and update user details for {selectedUser.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{selectedUser.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Join Date:</span>
                    <span className="font-medium">
                      {new Date(selectedUser.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant="outline"
                      className={
                        selectedUser.status === "active"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : selectedUser.status === "suspended"
                          ? "bg-red-50 text-red-600 border-red-200"
                          : "bg-gray-50 text-gray-600 border-gray-200"
                      }
                    >
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Purchases:</span>
                    <span className="font-medium">{selectedUser.purchaseCount}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col space-y-2 sm:space-y-0">
              <div className="flex space-x-2 w-full">
                <Button 
                  variant="default" 
                  onClick={() => handleStatusChange(selectedUser.id, "active")}
                  disabled={selectedUser.status === "active"}
                  className="flex-1"
                >
                  Activate
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleStatusChange(selectedUser.id, "inactive")}
                  disabled={selectedUser.status === "inactive"}
                  className="flex-1"
                >
                  Deactivate
                </Button>
              </div>
              <Button 
                variant="destructive" 
                onClick={() => handleStatusChange(selectedUser.id, "suspended")}
                disabled={selectedUser.status === "suspended"}
                className="w-full"
              >
                <UserX className="mr-2 h-4 w-4" />
                Suspend User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UsersManagement;
