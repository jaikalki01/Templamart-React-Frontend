import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
} from "@/components/ui/charts";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  DollarSign,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useState, useEffect } from "react";

interface DashboardData {
  id: string;
  customer: string;
  email: string;
  date: string;
  template: string;
  amount: number;
  commission: number;
  earning: number;
  status: 'pending' | 'completed' | 'failed';
}

// ✅ Mock sales data
const salesData: DashboardData[] =  [
  {
    id: "sale-001",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "2023-06-10",
    template: "Modern Dashboard UI Kit",
    amount: 49.99,
    commission: 14.99,
    earning: 35.00,
    status: "completed",
  },
  {
    id: "sale-002",
    customer: "Emily Johnson",
    email: "emily.j@example.com",
    date: "2023-06-08",
    template: "E-commerce Website Template",
    amount: 69.99,
    commission: 20.99,
    earning: 49.00,
    status: "completed",
  },
  {
    id: "sale-003",
    customer: "Michael Brown",
    email: "m.brown@example.com",
    date: "2023-06-05",
    template: "Business Presentation Template",
    amount: 29.99,
    commission: 8.99,
    earning: 21.00,
    status: "completed",
  },
  {
    id: "sale-004",
    customer: "Sarah Wilson",
    email: "s.wilson@example.com",
    date: "2023-06-01",
    template: "Email Marketing Template",
    amount: 19.99,
    commission: 5.99,
    earning: 14.00,
    status: "completed",
  },
  {
    id: "sale-005",
    customer: "David Lee",
    email: "d.lee@example.com",
    date: "2023-05-28",
    template: "Modern Dashboard UI Kit",
    amount: 49.99,
    commission: 14.99,
    earning: 35.00,
    status: "completed",
  },
  {
    id: "sale-006",
    customer: "Jessica Taylor",
    email: "j.taylor@example.com",
    date: "2023-05-25",
    template: "Business Presentation Template",
    amount: 29.99,
    commission: 8.99,
    earning: 21.00,
    status: "completed",
  },
];

const SellerSales = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<DashboardData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/seller/purchases`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSalesData(res.data);
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

  const [period, setPeriod] = useState("30days");
  const [searchQuery, setSearchQuery] = useState("");
  
  const totalSales = salesData.length;
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.amount, 0);
  const totalEarnings = salesData.reduce((sum, sale) => sum + sale.earning, 0);
  const commissionRate = ((totalRevenue - totalEarnings) / totalRevenue) * 100;
  
  // Mock chart data
  const revenueData = [
    { name: "Week 1", revenue: 420, earnings: 294 },
    { name: "Week 2", revenue: 580, earnings: 406 },
    { name: "Week 3", revenue: 350, earnings: 245 },
    { name: "Week 4", revenue: 900, earnings: 630 },
  ];
  
  const salesByTemplateData = [
    { name: "Dashboard UI Kit", value: 3 },
    { name: "E-commerce Template", value: 1 },
    { name: "Presentation", value: 2 },
    { name: "Email Template", value: 1 },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter sales data based on search query
    console.log("Searching for:", searchQuery);
  };
  
  const downloadReport = () => {
    console.log("Downloading sales report");
    // In a real app, this would generate and download a CSV/PDF report
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
          <p className="text-muted-foreground">
            Track your template sales and revenue
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={downloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
              <SelectItem value="alltime">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">18.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              After {commissionRate.toFixed(0)}% platform commission
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500">3.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <ArrowUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">0.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue vs. Earnings</CardTitle>
                <CardDescription>
                  Your revenue and earnings over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={revenueData}
                  index="name"
                  categories={["revenue", "earnings"]}
                  colors={["blue", "green"]}
                  valueFormatter={(value) => `$${value}`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales by Template</CardTitle>
                <CardDescription>
                  Distribution of sales across templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart 
                  data={salesByTemplateData}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value} sales`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Sales Transactions</CardTitle>
                  <CardDescription>
                    Recent sales of your templates
                  </CardDescription>
                </div>
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="px-4 py-3 text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-sm font-medium">Template</th>
                      <th className="px-4 py-3 text-sm font-medium">Customer</th>
                      <th className="px-4 py-3 text-sm font-medium text-right">Amount</th>
                      <th className="px-4 py-3 text-sm font-medium text-right">Commission</th>
                      <th className="px-4 py-3 text-sm font-medium text-right">Earning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((sale) => (
                      <tr key={sale.id} className="border-b hover:bg-muted">
                        <td className="px-4 py-3 text-sm">{sale.date}</td>
                        <td className="px-4 py-3 text-sm">{sale.template}</td>
                        <td className="px-4 py-3 text-sm">
                          <div>{sale.customer}</div>
                          <div className="text-xs text-muted-foreground">{sale.email}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">${sale.amount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-right">${sale.commission.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-right">${sale.earning.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerSales;
