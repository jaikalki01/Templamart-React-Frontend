
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const AnalyticsManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive analytics and platform performance insights.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+20.1% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              New Users
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+12.4% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Sales Count
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sellers
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <div className="flex items-center pt-1 text-xs text-red-600">
              <TrendingDown className="mr-1 h-4 w-4" />
              <span>-2.5% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="customers">Users</TabsTrigger>
          <TabsTrigger value="sellers">Sellers</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>
                  Monthly revenue trends for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart 
                  data={[
                    {name: "Jan", value: 4000},
                    {name: "Feb", value: 6000},
                    {name: "Mar", value: 5000},
                    {name: "Apr", value: 7000},
                    {name: "May", value: 8000},
                    {name: "Jun", value: 10000},
                  ]}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `$${value}`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Sales Distribution</CardTitle>
                <CardDescription>
                  Sales by template category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart 
                  data={[
                    {name: "Website Templates", value: 42},
                    {name: "Email Templates", value: 18},
                    {name: "Presentations", value: 15},
                    {name: "Graphics", value: 25},
                  ]}
                  index="name"
                  categories={["value"]}
                  colors={["blue", "teal", "amber", "rose"]}
                  valueFormatter={(value) => `${value}%`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  New user sign-ups over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={[
                    {name: "Jan", value: 400},
                    {name: "Feb", value: 500},
                    {name: "Mar", value: 700},
                    {name: "Apr", value: 1100},
                    {name: "May", value: 1300},
                    {name: "Jun", value: 1700},
                  ]}
                  index="name"
                  categories={["value"]}
                  colors={["green"]}
                  valueFormatter={(value) => `${value}`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Top Sellers</CardTitle>
                <CardDescription>
                  Highest revenue-generating sellers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart 
                  data={[
                    {name: "DesignPro Studios", value: 12500},
                    {name: "Template Masters", value: 8200},
                    {name: "Digital Designs Inc", value: 5400},
                    {name: "Creative Solutions", value: 4100},
                    {name: "Web Wizards", value: 3800},
                  ]}
                  index="name"
                  categories={["value"]}
                  colors={["violet"]}
                  valueFormatter={(value) => `$${value}`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Revenue Analytics</CardTitle>
              <CardDescription>
                In-depth revenue metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1">
                <div className="h-[300px]">
                  <LineChart 
                    data={[
                      {name: "Week 1", gross: 5300, fees: 1590, payouts: 3710},
                      {name: "Week 2", gross: 6100, fees: 1830, payouts: 4270},
                      {name: "Week 3", gross: 4800, fees: 1440, payouts: 3360},
                      {name: "Week 4", gross: 7200, fees: 2160, payouts: 5040},
                    ]}
                    index="name"
                    categories={["gross", "fees", "payouts"]}
                    colors={["blue", "green", "amber"]}
                    valueFormatter={(value) => `$${value}`}
                    className="h-full"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium">Gross Revenue</div>
                      <div className="text-2xl font-bold">$23,400</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium">Platform Fees</div>
                      <div className="text-2xl font-bold">$7,020</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium">Seller Payouts</div>
                      <div className="text-2xl font-bold">$16,380</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>
                User acquisition and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="h-[300px]">
                  <LineChart 
                    data={[
                      {name: "Jan", newUsers: 500, activeUsers: 1200},
                      {name: "Feb", newUsers: 620, activeUsers: 1450},
                      {name: "Mar", newUsers: 800, activeUsers: 1800},
                      {name: "Apr", newUsers: 950, activeUsers: 2100},
                      {name: "May", newUsers: 1100, activeUsers: 2600},
                      {name: "Jun", newUsers: 1350, activeUsers: 3200},
                    ]}
                    index="name"
                    categories={["newUsers", "activeUsers"]}
                    colors={["blue", "green"]}
                    valueFormatter={(value) => `${value}`}
                    className="h-full"
                  />
                </div>
                <div className="h-[300px]">
                  <BarChart 
                    data={[
                      {name: "New Users", mobile: 2350, desktop: 1870},
                      {name: "Purchases", mobile: 980, desktop: 1550},
                      {name: "Return Rate", mobile: 65, desktop: 72},
                    ]}
                    index="name"
                    categories={["mobile", "desktop"]}
                    colors={["indigo", "sky"]}
                    valueFormatter={(value) => `${value}`}
                    className="h-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sellers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seller Performance</CardTitle>
              <CardDescription>
                Seller activity and revenue generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1">
                <div className="h-[300px]">
                  <BarChart 
                    data={[
                      {name: "DesignPro Studios", templates: 23, avgRating: 4.8, revenue: 12500},
                      {name: "Template Masters", templates: 15, avgRating: 4.6, revenue: 8200},
                      {name: "Digital Designs Inc", templates: 18, avgRating: 4.4, revenue: 5400},
                      {name: "Creative Solutions", templates: 12, avgRating: 4.7, revenue: 4100},
                      {name: "Web Wizards", templates: 10, avgRating: 4.5, revenue: 3800},
                    ]}
                    index="name"
                    categories={["revenue"]}
                    colors={["purple"]}
                    valueFormatter={(value) => `$${value}`}
                    className="h-full"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium">Active Sellers</div>
                      <div className="text-2xl font-bold">245</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        From 312 total registered sellers
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium">New Seller Applications</div>
                      <div className="text-2xl font-bold">18</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pending approval
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium">Avg. Templates per Seller</div>
                      <div className="text-2xl font-bold">12.4</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +3.2 from previous period
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>
                Sales and revenue by template category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="h-[400px]">
                  <PieChart 
                    data={[
                      {name: "Website Templates", value: 42},
                      {name: "Email Templates", value: 18},
                      {name: "Presentations", value: 15},
                      {name: "Graphics", value: 25},
                    ]}
                    index="name"
                    categories={["value"]}
                    colors={["blue", "teal", "amber", "rose", "indigo"]}
                    valueFormatter={(value) => `${value}%`}
                    className="h-full"
                  />
                </div>
                <div className="h-[400px]">
                  <BarChart 
                    data={[
                      {name: "Website Templates", revenue: 18500, sales: 230},
                      {name: "Email Templates", revenue: 7800, sales: 310},
                      {name: "Presentations", revenue: 6400, sales: 185},
                      {name: "Graphics", revenue: 12100, sales: 275},
                    ]}
                    index="name"
                    categories={["revenue"]}
                    colors={["blue"]}
                    valueFormatter={(value) => `$${value}`}
                    className="h-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsManagement;
