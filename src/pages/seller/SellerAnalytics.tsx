
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  PieChart,
} from "@/components/ui/charts";
import { Calendar, Download } from "lucide-react";

const SellerAnalytics = () => {
  const [period, setPeriod] = useState("30days");

  // Mock chart data
  const visitsData = [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1900 },
    { name: "Mar", value: 1500 },
    { name: "Apr", value: 2200 },
    { name: "May", value: 2800 },
    { name: "Jun", value: 2400 },
  ];

  const conversionData = [
    { name: "Jan", visits: 1200, conversions: 36 },
    { name: "Feb", visits: 1900, conversions: 76 },
    { name: "Mar", visits: 1500, conversions: 45 },
    { name: "Apr", visits: 2200, conversions: 88 },
    { name: "May", visits: 2800, conversions: 112 },
    { name: "Jun", visits: 2400, conversions: 96 },
  ];

  const sourceData = [
    { name: "Organic Search", value: 40 },
    { name: "Direct", value: 25 },
    { name: "Social Media", value: 20 },
    { name: "Referral", value: 10 },
    { name: "Other", value: 5 },
  ];

  const demographicData = [
    { name: "North America", value: 45 },
    { name: "Europe", value: 30 },
    { name: "Asia", value: 15 },
    { name: "Other", value: 10 },
  ];

  const downloadReport = () => {
    console.log("Downloading analytics report");
    // In a real app, this would generate and download a CSV/PDF report
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Detailed insights into your template performance
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="templates">Template Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Template Views</CardTitle>
                <CardDescription>
                  Number of views for all templates over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={visitsData}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value} views`}
                  className="aspect-[3/1]"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>
                  Where your visitors are coming from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart 
                  data={sourceData}
                  index="name"
                  categories={["value"]}
                  colors={["blue", "violet", "indigo", "sky", "cyan"]}
                  valueFormatter={(value) => `${value}%`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
                <CardDescription>
                  Views vs. sales conversion over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart 
                  data={conversionData}
                  index="name"
                  categories={["visits", "conversions"]}
                  colors={["blue", "green"]}
                  valueFormatter={(value) => `${value}`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>
                Key metrics and insights for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">12,452</p>
                  <p className="text-xs text-green-500">+24% vs. prev. period</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg. Time on Page</p>
                  <p className="text-2xl font-bold">2:45</p>
                  <p className="text-xs text-green-500">+0:18 vs. prev. period</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.8%</p>
                  <p className="text-xs text-green-500">+0.5% vs. prev. period</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                  <p className="text-2xl font-bold">$42.80</p>
                  <p className="text-xs text-red-500">-$1.20 vs. prev. period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources Overview</CardTitle>
              <CardDescription>
                Detailed breakdown of where your visitors come from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <PieChart 
                  data={sourceData}
                  index="name"
                  categories={["value"]}
                  colors={["blue", "violet", "indigo", "sky", "cyan"]}
                  valueFormatter={(value) => `${value}%`}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Referral Sources</CardTitle>
              <CardDescription>
                Top websites sending traffic to your templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="px-4 py-3 text-sm font-medium">Source</th>
                      <th className="px-4 py-3 text-sm font-medium">Visitors</th>
                      <th className="px-4 py-3 text-sm font-medium">Conversion Rate</th>
                      <th className="px-4 py-3 text-sm font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted">
                      <td className="px-4 py-3 text-sm">Google</td>
                      <td className="px-4 py-3 text-sm">3,245</td>
                      <td className="px-4 py-3 text-sm">4.2%</td>
                      <td className="px-4 py-3 text-sm">$892.50</td>
                    </tr>
                    <tr className="border-b hover:bg-muted">
                      <td className="px-4 py-3 text-sm">Pinterest</td>
                      <td className="px-4 py-3 text-sm">1,875</td>
                      <td className="px-4 py-3 text-sm">3.8%</td>
                      <td className="px-4 py-3 text-sm">$640.20</td>
                    </tr>
                    <tr className="border-b hover:bg-muted">
                      <td className="px-4 py-3 text-sm">Dribbble</td>
                      <td className="px-4 py-3 text-sm">1,240</td>
                      <td className="px-4 py-3 text-sm">5.1%</td>
                      <td className="px-4 py-3 text-sm">$585.30</td>
                    </tr>
                    <tr className="border-b hover:bg-muted">
                      <td className="px-4 py-3 text-sm">Behance</td>
                      <td className="px-4 py-3 text-sm">980</td>
                      <td className="px-4 py-3 text-sm">4.7%</td>
                      <td className="px-4 py-3 text-sm">$425.80</td>
                    </tr>
                    <tr className="border-b hover:bg-muted">
                      <td className="px-4 py-3 text-sm">Twitter</td>
                      <td className="px-4 py-3 text-sm">850</td>
                      <td className="px-4 py-3 text-sm">2.9%</td>
                      <td className="px-4 py-3 text-sm">$210.50</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Geographical Distribution</CardTitle>
                <CardDescription>
                  Where your customers are located
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart 
                  data={demographicData}
                  index="name"
                  categories={["value"]}
                  colors={["blue", "green", "purple", "orange"]}
                  valueFormatter={(value) => `${value}%`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>
                  Countries with the most template purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart 
                  data={[
                    {name: "USA", value: 450},
                    {name: "UK", value: 320},
                    {name: "Canada", value: 280},
                    {name: "Germany", value: 230},
                    {name: "Australia", value: 190},
                  ]}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value} sales`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Demographics Overview</CardTitle>
              <CardDescription>
                Insights into your customer base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">18-24</span>
                      <span className="text-sm">15%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">25-34</span>
                      <span className="text-sm">42%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">35-44</span>
                      <span className="text-sm">28%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">45+</span>
                      <span className="text-sm">15%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Gender</h4>
                  <PieChart 
                    data={[
                      { name: "Male", value: 58 },
                      { name: "Female", value: 40 },
                      { name: "Other", value: 2 },
                    ]}
                    index="name"
                    categories={["value"]}
                    colors={["blue", "pink", "purple"]}
                    valueFormatter={(value) => `${value}%`}
                    className="aspect-square"
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Device Type</h4>
                  <PieChart 
                    data={[
                      { name: "Desktop", value: 65 },
                      { name: "Mobile", value: 25 },
                      { name: "Tablet", value: 10 },
                    ]}
                    index="name"
                    categories={["value"]}
                    colors={["blue", "green", "orange"]}
                    valueFormatter={(value) => `${value}%`}
                    className="aspect-square"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Performance</CardTitle>
              <CardDescription>
                How your templates are performing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="px-4 py-3 text-sm font-medium">Template</th>
                      <th className="px-4 py-3 text-sm font-medium">Views</th>
                      <th className="px-4 py-3 text-sm font-medium">Conversions</th>
                      <th className="px-4 py-3 text-sm font-medium">Rate</th>
                      <th className="px-4 py-3 text-sm font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted">
                      <td className="px-4 py-3 text-sm">Modern Dashboard UI Kit</td>
                      <td className="px-4 py-3 text-sm">3,850</td>
                      <td className="px-4 py-3 text-sm">245</td>
                      <td className="px-4 py-3 text-sm">6.4%</td>
                      <td className="px-4 py-3 text-sm">$12,245.55</td>
                    </tr>
                    <tr className="border-b hover:bg-muted">
                      <td className="px-4 py-3 text-sm">E-commerce Website Template</td>
                      <td className="px-4 py-3 text-sm">2,740</td>
                      <td className="px-4 py-3 text-sm">189</td>
                      <td className="px-4 py-3 text-sm">6.9%</td>
                      <td className="px-4 py-3 text-sm">$13,228.11</td>
                    </tr>
                    <tr className="border-b hover:bg-muted">
                      <td className="px-4 py-3 text-sm">Business Presentation Template</td>
                      <td className="px-4 py-3 text-sm">5,120</td>
                      <td className="px-4 py-3 text-sm">320</td>
                      <td className="px-4 py-3 text-sm">6.3%</td>
                      <td className="px-4 py-3 text-sm">$9,596.80</td>
                    </tr>
                    <tr className="border-b hover:bg-muted">
                      <td className="px-4 py-3 text-sm">Email Marketing Template</td>
                      <td className="px-4 py-3 text-sm">3,560</td>
                      <td className="px-4 py-3 text-sm">178</td>
                      <td className="px-4 py-3 text-sm">5.0%</td>
                      <td className="px-4 py-3 text-sm">$3,558.22</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Views Comparison</CardTitle>
                <CardDescription>
                  Template views comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart 
                  data={[
                    {name: "Dashboard", value: 3850},
                    {name: "E-commerce", value: 2740},
                    {name: "Presentation", value: 5120},
                    {name: "Email", value: 3560},
                  ]}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value} views`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Comparison</CardTitle>
                <CardDescription>
                  Template revenue comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart 
                  data={[
                    {name: "Dashboard", value: 12245},
                    {name: "E-commerce", value: 13228},
                    {name: "Presentation", value: 9596},
                    {name: "Email", value: 3558},
                  ]}
                  index="name"
                  categories={["value"]}
                  colors={["green"]}
                  valueFormatter={(value) => `$${value}`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerAnalytics;
