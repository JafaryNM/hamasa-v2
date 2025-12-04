import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Bar, Line, Pie } from "react-chartjs-2";

import { TbSourceCode, TbABOff } from "react-icons/tb";
import { User2 } from "lucide-react";

// Register Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

export default function Home() {
  // MEDIA MONITORING
  const mediaMonitoringData = [
    { month: "Jan", mentions: 120 },
    { month: "Feb", mentions: 350 },
    { month: "Mar", mentions: 280 },
    { month: "Apr", mentions: 420 },
    { month: "May", mentions: 610 },
    { month: "Jun", mentions: 500 },
    { month: "Jul", mentions: 720 },
  ];

  // TREND DATA
  const mediaTrendingData = [
    { month: "Jan", score: 40 },
    { month: "Feb", score: 52 },
    { month: "Mar", score: 46 },
    { month: "Apr", score: 58 },
    { month: "May", score: 71 },
    { month: "Jun", score: 69 },
    { month: "Jul", score: 80 },
  ];

  // MEDIA OUTLET COVERAGE (Pie Chart)
  const mediaOutletStats = [
    { name: "BBC News", value: 120 },
    { name: "Al Jazeera", value: 94 },
    { name: "Fox Business", value: 75 },
    { name: "The Guardian", value: 60 },
  ];

  const outletPieData = {
    labels: mediaOutletStats.map((d) => d.name),
    datasets: [
      {
        label: "Coverage",
        data: mediaOutletStats.map((d) => d.value),
        backgroundColor: [
          "#6366f1", // Indigo
          "#10b981", // Emerald
          "#f43f5e", // Rose
          "#f59e0b", // Amber
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // REDUCED BAR WIDTH
  const barData = {
    labels: mediaMonitoringData.map((d) => d.month),
    datasets: [
      {
        label: "Monthly Mentions",
        data: mediaMonitoringData.map((d) => d.mentions),
        backgroundColor: "rgba(99, 102, 241, 0.9)",
        borderRadius: 5,
        barPercentage: 0.45,
        categoryPercentage: 0.6,
      },
    ],
  };

  const barOptions = { responsive: true, maintainAspectRatio: false };

  const areaData = {
    labels: mediaTrendingData.map((d) => d.month),
    datasets: [
      {
        label: "Trend Score",
        data: mediaTrendingData.map((d) => d.score),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.4)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const areaOptions = { responsive: true, maintainAspectRatio: false };

  const upcomingNews = [
    { type: "TV", title: "Election Debate Coverage", status: "Pending" },
    { type: "Radio", title: "Economic Growth Report", status: "In Progress" },
    { type: "Newspaper", title: "Climate Change Brief", status: "Completed" },
    { type: "Online", title: "Tech Startup Funding Story", status: "Pending" },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* TOP CARDS */}
      <Card className="col-span-12 md:col-span-4 rounded-xl hover:shadow-xl transition-all duration-300">
        <div className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-md">
            <TbSourceCode className="w-7 h-7" />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Active Sources</p>
            <p className="text-4xl font-bold">83</p>
          </div>
        </div>
      </Card>

      <Card className="col-span-12 md:col-span-4 rounded-xl hover:shadow-xl transition-all duration-300">
        <div className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-600 text-white shadow-md">
            <TbABOff className="w-7 h-7" />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Media Coverage</p>
            <p className="text-4xl font-bold">1,294</p>
          </div>
        </div>
      </Card>

      <Card className="col-span-12 md:col-span-4 rounded-xl hover:shadow-xl transition-all duration-300">
        <div className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-pink-600 text-white shadow-md">
            <User2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Users</p>
            <p className="text-4xl font-bold">3,820</p>
          </div>
        </div>
      </Card>

      {/* CHARTS ROW - TWO COLUMNS */}
      <Card className="col-span-12 md:col-span-6">
        <CardHeader>
          <CardTitle>Media Monitoring (Mentions)</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <Bar data={barData} options={barOptions} />
        </CardContent>
      </Card>

      <Card className="col-span-12 md:col-span-6">
        <CardHeader>
          <CardTitle>Media Trending Analytics</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <Line data={areaData} options={areaOptions} />
        </CardContent>
      </Card>

      {/* NEW PIE CHART FOR MEDIA OUTLET COVERAGE */}
      <Card className="col-span-12 md:col-span-6">
        <CardHeader>
          <CardTitle>Media Coverage Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <Pie data={outletPieData} />
        </CardContent>
      </Card>

      {/* UPCOMING NEWS TABLE */}
      <Card className="col-span-12 md:col-span-6">
        <CardHeader>
          <CardTitle>Upcoming Media Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Media Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingNews.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm
                      ${
                        item.status === "Pending"
                          ? "bg-yellow-500"
                          : item.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-green-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
