
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface PayoutRequest {
  id: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  paymentMethod: string;
}

const mockPayoutRequests: PayoutRequest[] = [
  {
    id: "pr1",
    sellerId: "s1",
    sellerName: "John Designer",
    amount: 250,
    requestDate: "2023-06-15",
    status: "pending",
    paymentMethod: "PayPal"
  },
  {
    id: "pr2",
    sellerId: "s2",
    sellerName: "WebCraft Studios",
    amount: 480,
    requestDate: "2023-06-14",
    status: "pending",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "pr3",
    sellerId: "s3",
    sellerName: "PresentPro",
    amount: 120,
    requestDate: "2023-06-10",
    status: "approved",
    paymentMethod: "PayPal"
  },
  {
    id: "pr4",
    sellerId: "s4",
    sellerName: "EmailMasters",
    amount: 350,
    requestDate: "2023-06-05",
    status: "rejected",
    paymentMethod: "Stripe"
  }
];

const WalletManagement = () => {
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>(mockPayoutRequests);
  const [commissionRate, setCommissionRate] = useState("30");
  const [isCommissionDialogOpen, setIsCommissionDialogOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<PayoutRequest | null>(null);
  const [isPayoutDialogOpen, setIsPayoutDialogOpen] = useState(false);

  const totalWalletBalance = 12450.75;
  const pendingPayouts = payoutRequests
    .filter(req => req.status === "pending")
    .reduce((total, req) => total + req.amount, 0);

  const handleCommissionUpdate = () => {
    const rate = parseFloat(commissionRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      toast.error("Please enter a valid commission rate between 0 and 100");
      return;
    }
    
    toast.success("Commission rate updated", {
      description: `Commission rate has been set to ${rate}%`
    });
    
    setIsCommissionDialogOpen(false);
  };

  const handlePayoutAction = (action: "approve" | "reject") => {
    if (!selectedPayout) return;
    
    setPayoutRequests(prev => 
      prev.map(req => 
        req.id === selectedPayout.id 
          ? { ...req, status: action === "approve" ? "approved" : "rejected" } 
          : req
      )
    );
    
    toast.success(
      action === "approve" 
        ? "Payout request approved" 
        : "Payout request rejected", 
      {
        description: action === "approve" 
          ? `Payout of $${selectedPayout.amount.toFixed(2)} to ${selectedPayout.sellerName} has been approved` 
          : `Payout request from ${selectedPayout.sellerName} has been rejected`
      }
    );
    
    setIsPayoutDialogOpen(false);
    setSelectedPayout(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Wallet Management</h2>
        <p className="text-muted-foreground">
          Manage platform wallet, commissions, and seller payout requests.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Platform Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalWalletBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total accumulated commissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Current Commission Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commissionRate}%</div>
            <Dialog open={isCommissionDialogOpen} onOpenChange={setIsCommissionDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="link" className="h-auto p-0 text-xs">
                  Change Commission Rate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Commission Rate</DialogTitle>
                  <DialogDescription>
                    Set the percentage that the platform will take from each sale.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="commissionRate" className="text-right">
                      Rate (%)
                    </Label>
                    <Input
                      id="commissionRate"
                      type="number"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(e.target.value)}
                      className="col-span-3"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCommissionDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCommissionUpdate}>Update Rate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingPayouts.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="approved">Approved Payouts</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payout Requests</CardTitle>
              <CardDescription>
                Review and process seller payout requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutRequests
                  .filter(req => req.status === "pending")
                  .map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{request.sellerName}</p>
                        <p className="text-sm text-muted-foreground">
                          Requested on {new Date(request.requestDate).toLocaleDateString()} | 
                          {request.paymentMethod}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          ${request.amount.toFixed(2)}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPayout(request);
                            setIsPayoutDialogOpen(true);
                          }}
                        >
                          Process
                        </Button>
                      </div>
                    </div>
                  ))}
                {payoutRequests.filter(req => req.status === "pending").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No pending payout requests
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Payouts</CardTitle>
              <CardDescription>
                History of approved and processed payouts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutRequests
                  .filter(req => req.status === "approved")
                  .map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{request.sellerName}</p>
                        <p className="text-sm text-muted-foreground">
                          Requested on {new Date(request.requestDate).toLocaleDateString()} | 
                          {request.paymentMethod}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          ${request.amount.toFixed(2)}
                        </span>
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Approved
                        </Badge>
                      </div>
                    </div>
                  ))}
                {payoutRequests.filter(req => req.status === "approved").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No approved payouts
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Payout Requests</CardTitle>
              <CardDescription>
                History of rejected payout requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutRequests
                  .filter(req => req.status === "rejected")
                  .map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{request.sellerName}</p>
                        <p className="text-sm text-muted-foreground">
                          Requested on {new Date(request.requestDate).toLocaleDateString()} | 
                          {request.paymentMethod}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          ${request.amount.toFixed(2)}
                        </span>
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                          Rejected
                        </Badge>
                      </div>
                    </div>
                  ))}
                {payoutRequests.filter(req => req.status === "rejected").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No rejected payout requests
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payout processing dialog */}
      {selectedPayout && (
        <Dialog open={isPayoutDialogOpen} onOpenChange={setIsPayoutDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Process Payout Request</DialogTitle>
              <DialogDescription>
                Review and take action on this payout request.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seller:</span>
                  <span className="font-medium">{selectedPayout.sellerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">${selectedPayout.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Request Date:</span>
                  <span className="font-medium">
                    {new Date(selectedPayout.requestDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">{selectedPayout.paymentMethod}</span>
                </div>
              </div>
            </div>
            <DialogFooter className="flex space-x-2">
              <Button 
                variant="destructive" 
                onClick={() => handlePayoutAction("reject")}
              >
                Reject
              </Button>
              <Button 
                onClick={() => handlePayoutAction("approve")}
              >
                Approve Payout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WalletManagement;
