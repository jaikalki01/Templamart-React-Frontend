
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Download, FileText, Calendar, MoreHorizontal } from "lucide-react";

interface Sale {
  id: string;
  templateName: string;
  templateId: string;
  sellerName: string;
  sellerId: string;
  buyerName: string;
  buyerId: string;
  price: number;
  commissionRate: number;
  sellerPayout: number;
  platformFee: number;
  date: string;
  status: "completed" | "refunded" | "disputed";
}

const mockSales: Sale[] = [
  {
    id: "sale1",
    templateName: "Modern Business Website",
    templateId: "t1",
    sellerName: "DesignPro Studios",
    sellerId: "s1",
    buyerName: "John Smith",
    buyerId: "u1",
    price: 79.99,
    commissionRate: 30,
    sellerPayout: 56.0,
    platformFee: 23.99,
    date: "2023-06-10",
    status: "completed"
  },
  {
    id: "sale2",
    templateName: "Email Marketing Campaign",
    templateId: "t2",
    sellerName: "Template Masters",
    sellerId: "s2",
    buyerName: "Sarah Williams",
    buyerId: "u4",
    price: 29.99,
    commissionRate: 30,
    sellerPayout: 21.0,
    platformFee: 8.99,
    date: "2023-06-08",
    status: "completed"
  },
  {
    id: "sale3",
    templateName: "Social Media Kit",
    templateId: "t4",
    sellerName: "Template Masters",
    sellerId: "s2",
    buyerName: "Robert Davis",
    buyerId: "u5",
    price: 49.99,
    commissionRate: 30,
    sellerPayout: 35.0,
    platformFee: 14.99,
    date: "2023-06-05",
    status: "refunded"
  },
  {
    id: "sale4",
    templateName: "Modern Business Website",
    templateId: "t1",
    sellerName: "DesignPro Studios",
    sellerId: "s1",
    buyerName: "Emily Johnson",
    buyerId: "u2",
    price: 79.99,
    commissionRate: 30,
    sellerPayout: 56.0,
    platformFee: 23.99,
    date: "2023-06-02",
    status: "disputed"
  },
  {
    id: "sale5",
    templateName: "Social Media Kit",
    templateId: "t4",
    sellerName: "Template Masters",
    sellerId: "s2",
    buyerName: "John Smith",
    buyerId: "u1",
    price: 49.99,
    commissionRate: 30,
    sellerPayout: 35.0,
    platformFee: 14.99,
    date: "2023-06-01",
    status: "completed"
  }
];

const SalesManagement = () => {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTimeframe, setFilterTimeframe] = useState("all");
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isSaleDialogOpen, setIsSaleDialogOpen] = useState(false);

  const filteredSales = sales.filter(sale => {
    // Search filter
    const matchesSearch = 
      sale.templateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.buyerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Timeframe filter
    if (filterTimeframe === "all") return matchesSearch;
    
    const saleDate = new Date(sale.date);
    const now = new Date();
    
    switch (filterTimeframe) {
      case "today":
        // Check if sale date is today
        return matchesSearch && 
          saleDate.getDate() === now.getDate() &&
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getFullYear() === now.getFullYear();
      case "week":
        // Check if sale date is within the last 7 days
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return matchesSearch && saleDate >= weekAgo;
      case "month":
        // Check if sale date is within the last 30 days
        const monthAgo = new Date();
        monthAgo.setDate(now.getDate() - 30);
        return matchesSearch && saleDate >= monthAgo;
      default:
        return matchesSearch;
    }
  });

  const totalSales = filteredSales.length;
  const totalRevenue = filteredSales.reduce((total, sale) => total + sale.price, 0);
  const totalPlatformFees = filteredSales.reduce((total, sale) => total + sale.platformFee, 0);
  const totalSellerPayouts = filteredSales.reduce((total, sale) => total + sale.sellerPayout, 0);

  const handleViewSaleDetails = (sale: Sale) => {
    setSelectedSale(sale);
    setIsSaleDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Sales Management</h2>
        <p className="text-muted-foreground">
          Monitor and manage all template sales across the marketplace.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-muted-foreground">
              For selected period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Gross revenue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Platform Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPlatformFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Commission earnings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Seller Payouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSellerPayouts.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Net to sellers
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            defaultValue="all"
            onValueChange={setFilterTimeframe}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="shrink-0">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Sales</TabsTrigger>
          <TabsTrigger value="refunded">Refunded</TabsTrigger>
          <TabsTrigger value="disputed">Disputed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Sales Transactions</CardTitle>
              <CardDescription>
                Complete history of sales across the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 py-2 font-medium border-b">
                  <div className="col-span-1">Date</div>
                  <div className="col-span-3">Template</div>
                  <div className="col-span-2">Buyer</div>
                  <div className="col-span-2">Seller</div>
                  <div className="col-span-1">Price</div>
                  <div className="col-span-1">Fee</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {filteredSales.map((sale) => (
                  <div key={sale.id} className="grid grid-cols-12 py-3 border-b last:border-0">
                    <div className="col-span-1 text-muted-foreground">
                      {new Date(sale.date).toLocaleDateString()}
                    </div>
                    <div className="col-span-3 font-medium truncate">{sale.templateName}</div>
                    <div className="col-span-2 text-muted-foreground truncate">{sale.buyerName}</div>
                    <div className="col-span-2 text-muted-foreground truncate">{sale.sellerName}</div>
                    <div className="col-span-1">${sale.price.toFixed(2)}</div>
                    <div className="col-span-1">${sale.platformFee.toFixed(2)}</div>
                    <div className="col-span-1">
                      <Badge
                        variant="outline"
                        className={
                          sale.status === "completed"
                            ? "bg-green-50 text-green-600 border-green-200"
                            : sale.status === "refunded"
                            ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                            : "bg-red-50 text-red-600 border-red-200"
                        }
                      >
                        {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewSaleDetails(sale)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredSales.length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No sales found matching your criteria
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="refunded">
          <Card>
            <CardHeader>
              <CardTitle>Refunded Sales</CardTitle>
              <CardDescription>
                Sales that have been refunded to customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for refunded sales */}
                {filteredSales.filter(sale => sale.status === "refunded").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No refunded sales found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="disputed">
          <Card>
            <CardHeader>
              <CardTitle>Disputed Sales</CardTitle>
              <CardDescription>
                Sales that have been disputed by buyers or sellers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Similar layout as "all" tab but filtered for disputed sales */}
                {filteredSales.filter(sale => sale.status === "disputed").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No disputed sales found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sale details dialog */}
      {selectedSale && (
        <Dialog open={isSaleDialogOpen} onOpenChange={setIsSaleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sale Details</DialogTitle>
              <DialogDescription>
                Complete details for transaction #{selectedSale.id}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(selectedSale.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      selectedSale.status === "completed"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : selectedSale.status === "refunded"
                        ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }
                  >
                    {selectedSale.status.charAt(0).toUpperCase() + selectedSale.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="p-4 border rounded-md space-y-4">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{selectedSale.templateName}</p>
                      <p className="text-sm text-muted-foreground">Template ID: {selectedSale.templateId}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Buyer</p>
                      <p className="font-medium">{selectedSale.buyerName}</p>
                      <p className="text-sm text-muted-foreground">ID: {selectedSale.buyerId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seller</p>
                      <p className="font-medium">{selectedSale.sellerName}</p>
                      <p className="text-sm text-muted-foreground">ID: {selectedSale.sellerId}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md space-y-2">
                  <p className="font-medium">Financial Details</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Sale Price:</div>
                    <div className="text-sm font-medium">${selectedSale.price.toFixed(2)}</div>
                    
                    <div className="text-sm text-muted-foreground">Commission Rate:</div>
                    <div className="text-sm">{selectedSale.commissionRate}%</div>
                    
                    <div className="text-sm text-muted-foreground">Platform Fee:</div>
                    <div className="text-sm">${selectedSale.platformFee.toFixed(2)}</div>
                    
                    <div className="text-sm text-muted-foreground">Seller Payout:</div>
                    <div className="text-sm">${selectedSale.sellerPayout.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsSaleDialogOpen(false)}
              >
                Close
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SalesManagement;
