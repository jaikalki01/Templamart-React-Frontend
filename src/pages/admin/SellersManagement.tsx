
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Search, MoreHorizontal, ShieldAlert, CheckCircle } from "lucide-react";

interface Seller {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "approved" | "pending" | "rejected";
  templateCount: number;
  salesCount: number;
  revenue: number;
}

const mockSellers: Seller[] = [
  {
    id: "s1",
    name: "DesignPro Studios",
    email: "contact@designpro.com",
    joinDate: "2023-01-10",
    status: "approved",
    templateCount: 23,
    salesCount: 156,
    revenue: 4590
  },
  {
    id: "s2",
    name: "Template Masters",
    email: "support@templatemasters.com",
    joinDate: "2023-02-05",
    status: "approved",
    templateCount: 15,
    salesCount: 89,
    revenue: 2670
  },
  {
    id: "s3",
    name: "Creative Solutions",
    email: "hello@creativesolutions.com",
    joinDate: "2023-03-20",
    status: "pending",
    templateCount: 0,
    salesCount: 0,
    revenue: 0
  },
  {
    id: "s4",
    name: "Web Wizards",
    email: "sales@webwizards.com",
    joinDate: "2023-02-18",
    status: "rejected",
    templateCount: 0,
    salesCount: 0,
    revenue: 0
  },
  {
    id: "s5",
    name: "Digital Designs Inc",
    email: "info@digitaldesigns.com",
    joinDate: "2023-04-12",
    status: "approved",
    templateCount: 8,
    salesCount: 42,
    revenue: 1260
  }
];

const SellersManagement = () => {
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isSellerDialogOpen, setIsSellerDialogOpen] = useState(false);

  const filteredSellers = sellers.filter(seller => 
    seller.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    seller.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (sellerId: string, newStatus: "approved" | "pending" | "rejected") => {
    setSellers(prevSellers => 
      prevSellers.map(seller => 
        seller.id === sellerId ? { ...seller, status: newStatus } : seller
      )
    );
    
    const seller = sellers.find(s => s.id === sellerId);
    if (seller) {
      toast.success(`Seller status updated`, {
        description: `${seller.name}'s status has been set to ${newStatus}`
      });
    }
    
    setIsSellerDialogOpen(false);
    setSelectedSeller(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Seller Management</h2>
        <p className="text-muted-foreground">
          Manage seller accounts, review applications, and monitor seller activity.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search sellers..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Sellers</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Sellers</CardTitle>
              <CardDescription>
                View and manage all sellers on the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 py-2 font-medium border-b">
                  <div className="col-span-3">Seller</div>
                  <div className="col-span-2">Email</div>
                  <div className="col-span-1">Join Date</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Templates</div>
                  <div className="col-span-1">Sales</div>
                  <div className="col-span-2">Revenue</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {filteredSellers.map((seller) => (
                  <div key={seller.id} className="grid grid-cols-12 py-3 border-b last:border-0">
                    <div className="col-span-3 font-medium">{seller.name}</div>
                    <div className="col-span-2 text-muted-foreground truncate">{seller.email}</div>
                    <div className="col-span-1 text-muted-foreground">
                      {new Date(seller.joinDate).toLocaleDateString()}
                    </div>
                    <div className="col-span-1">
                      <Badge
                        variant="outline"
                        className={
                          seller.status === "approved"
                            ? "bg-green-50 text-green-600 border-green-200"
                            : seller.status === "pending"
                            ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                            : "bg-red-50 text-red-600 border-red-200"
                        }
                      >
                        {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="col-span-1">{seller.templateCount}</div>
                    <div className="col-span-1">{seller.salesCount}</div>
                    <div className="col-span-2">${seller.revenue.toFixed(2)}</div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedSeller(seller);
                          setIsSellerDialogOpen(true);
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredSellers.length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No sellers found matching your search
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Sellers</CardTitle>
              <CardDescription>Sellers who have been approved to sell on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for approved sellers */}
                {filteredSellers.filter(seller => seller.status === "approved").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No approved sellers found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Applications</CardTitle>
              <CardDescription>Seller applications awaiting review.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for pending sellers */}
                {filteredSellers.filter(seller => seller.status === "pending").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No pending applications found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Sellers</CardTitle>
              <CardDescription>Seller applications that have been rejected.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for rejected sellers */}
                {filteredSellers.filter(seller => seller.status === "rejected").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No rejected sellers found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Seller action dialog */}
      {selectedSeller && (
        <Dialog open={isSellerDialogOpen} onOpenChange={setIsSellerDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Seller</DialogTitle>
              <DialogDescription>
                View and update details for {selectedSeller.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{selectedSeller.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{selectedSeller.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Join Date:</span>
                    <span className="font-medium">
                      {new Date(selectedSeller.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant="outline"
                      className={
                        selectedSeller.status === "approved"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : selectedSeller.status === "pending"
                          ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }
                    >
                      {selectedSeller.status.charAt(0).toUpperCase() + selectedSeller.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Template Count:</span>
                    <span className="font-medium">{selectedSeller.templateCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sales Count:</span>
                    <span className="font-medium">{selectedSeller.salesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Revenue:</span>
                    <span className="font-medium">${selectedSeller.revenue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col space-y-2 sm:space-y-0">
              <div className="flex space-x-2 w-full">
                <Button 
                  variant="default" 
                  onClick={() => handleStatusChange(selectedSeller.id, "approved")}
                  disabled={selectedSeller.status === "approved"}
                  className="flex-1"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleStatusChange(selectedSeller.id, "rejected")}
                  disabled={selectedSeller.status === "rejected"}
                  className="flex-1"
                >
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SellersManagement;
