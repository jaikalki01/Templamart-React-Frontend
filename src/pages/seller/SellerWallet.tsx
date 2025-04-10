import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useState, useEffect } from "react";
interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "sale" | "payout" | "commission";
  status: "completed" | "pending" | "failed";
  description: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    date: "2023-06-01",
    amount: 49.99,
    type: "sale",
    status: "completed",
    description: "Sale of Modern Dashboard UI Kit"
  },
  {
    id: "tx2",
    date: "2023-06-05",
    amount: 29.99,
    type: "sale",
    status: "completed",
    description: "Sale of Business Presentation Template"
  },
  {
    id: "tx3",
    date: "2023-06-10",
    amount: -50.00,
    type: "commission",
    status: "completed",
    description: "Platform commission fee"
  },
  {
    id: "tx4",
    date: "2023-06-15",
    amount: 69.99,
    type: "sale",
    status: "completed",
    description: "Sale of E-commerce Website Template"
  },
  {
    id: "tx5",
    date: "2023-06-20",
    amount: -100.00,
    type: "payout",
    status: "pending",
    description: "Payout request #12345"
  }
];

const SellerWallet = () => {
  //const [transactions] = useState<Transaction[]>(mockTransactions);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("paypal");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [transactions, settransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/seller/wallet/transactions`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        settransactions(res.data);
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
  const walletBalance = transactions
    .reduce((total, tx) => total + tx.amount, 0)
    .toFixed(2);

  const availableBalance = transactions
    .filter(tx => tx.status === "completed")
    .reduce((total, tx) => total + tx.amount, 0)
    .toFixed(2);

  const pendingBalance = transactions
    .filter(tx => tx.status === "pending")
    .reduce((total, tx) => total + tx.amount, 0)
    .toFixed(2);

    const handlePayoutRequest = async () => {
      if (!payoutAmount || Number(payoutAmount) <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }
    
      if (Number(payoutAmount) > Number(availableBalance)) {
        toast.error("Payout amount exceeds available balance");
        return;
      }
    
      try {
        const response = await axios.post(
          `${BASE_URL}/seller/payout-request`, // Make sure this matches your FastAPI route
          {
            amount: Number(payoutAmount)
          },
          {
            headers: {
               Authorization: `Bearer ${user.token}` 
              //Authorization: `Bearer ${localStorage.getItem("token")}` // If you're using JWT auth
            }
          }
        );
    
        toast.success("Payout request submitted", {
          description: `Your payout request for ₹${payoutAmount} has been submitted and is pending approval.`
        });
    
        setIsDialogOpen(false);
        setPayoutAmount("");
      } catch (error) {
        console.error(error);
        const message =
          error?.response?.data?.detail || "Something went wrong. Please try again.";
        toast.error("Failed to request payout", {
          description: message
        });
      }
    };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Wallet</h2>
        <p className="text-muted-foreground">
          Manage your earnings, view transactions, and request payouts.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletBalance}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Available for Payout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${availableBalance}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingBalance}</div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="lg">Request Payout</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Payout</DialogTitle>
            <DialogDescription>
              Enter the amount you wish to withdraw from your available balance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-7"
                  min={1}
                  step={0.01}
                  max={parseFloat(availableBalance)}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payoutMethod" className="text-right">
                Payout Method
              </Label>
              <select
                id="payoutMethod"
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value)}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePayoutRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View all your transactions including sales, payouts, and commissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()} | 
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} | 
                        <span className={`ml-1 ${
                          transaction.status === "completed" 
                            ? "text-green-500" 
                            : transaction.status === "pending" 
                            ? "text-amber-500" 
                            : "text-red-500"
                        }`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </p>
                    </div>
                    <div className={`font-semibold ${
                      transaction.amount >= 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {transaction.amount >= 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardDescription>
                View your template sales and earnings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions
                  .filter(tx => tx.type === "sale")
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()} | 
                          <span className={`ml-1 ${
                            transaction.status === "completed" 
                              ? "text-green-500" 
                              : transaction.status === "pending" 
                              ? "text-amber-500" 
                              : "text-red-500"
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </p>
                      </div>
                      <div className="text-green-500 font-semibold">
                        +${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Payouts</CardTitle>
              <CardDescription>
                View your payout history and pending requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions
                  .filter(tx => tx.type === "payout")
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()} | 
                          <span className={`ml-1 ${
                            transaction.status === "completed" 
                              ? "text-green-500" 
                              : transaction.status === "pending" 
                              ? "text-amber-500" 
                              : "text-red-500"
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </p>
                      </div>
                      <div className="text-red-500 font-semibold">
                        ${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                {transactions.filter(tx => tx.type === "payout").length === 0 && (
                  <div className="py-6 text-center text-muted-foreground">
                    No payout history available
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setIsDialogOpen(true)} className="w-full">
                Request New Payout
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerWallet;
