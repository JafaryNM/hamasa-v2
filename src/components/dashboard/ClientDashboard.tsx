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
  ChartOptions,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";
import { TbSourceCode, TbABOff } from "react-icons/tb";
import { User2 } from "lucide-react";
import { useState } from "react";

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

export default function ClientDashboard() {
  const [viewMode, setViewMode] = useState("daily");

  const dailyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    print: [12, 18, 20, 15, 30, 10, 22],
    tv: [20, 29, 32, 28, 40, 22, 30],
    radio: [14, 16, 18, 17, 22, 15, 20],
    social: [40, 44, 38, 50, 60, 55, 48],
  };

  const weeklyData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    print: [120, 140, 160, 180],
    tv: [200, 230, 250, 270],
    radio: [100, 120, 130, 140],
    social: [300, 330, 360, 390],
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    print: [450, 520, 480, 600, 700, 760],
    tv: [700, 760, 820, 890, 920, 980],
    radio: [380, 420, 460, 510, 540, 590],
    social: [900, 1000, 1100, 1150, 1200, 1300],
  };

  const selected =
    viewMode === "daily"
      ? dailyData
      : viewMode === "weekly"
      ? weeklyData
      : monthlyData;

  const monitoringChartData = {
    labels: selected.labels,
    datasets: [
      {
        label: "Print Media",
        data: selected.print,
        backgroundColor: "rgba(79, 70, 229, 0.85)",
        borderColor: "rgba(79, 70, 229, 1)",
        borderWidth: 2,
      },
      {
        label: "TV",
        data: selected.tv,
        backgroundColor: "rgba(16, 185, 129, 0.85)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 2,
      },
      {
        label: "Radio",
        data: selected.radio,
        backgroundColor: "rgba(245, 158, 11, 0.85)",
        borderColor: "rgba(245, 158, 11, 1)",
        borderWidth: 2,
      },
      {
        label: "Social Media",
        data: selected.social,
        backgroundColor: "rgba(236, 72, 153, 0.85)",
        borderColor: "rgba(236, 72, 153, 1)",
        borderWidth: 2,
      },
    ],
  };
  const monitoringChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        beginAtZero: true,
        stacked: false,
      },
    },
  } satisfies ChartOptions<"bar">;

  const mediaOutletStats = [
    { name: "Jamii Forum", value: 120 },
    { name: "Millard Ayo", value: 94 },
    { name: "Radio One", value: 75 },
    { name: "Chanel Ten", value: 60 },
  ];

  const outletPieData = {
    labels: mediaOutletStats.map((d) => d.name),
    datasets: [
      {
        label: "Coverage",
        data: mediaOutletStats.map((d) => d.value),
        backgroundColor: ["#6366f1", "#10b981", "#f43f5e", "#f59e0b"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const upcomingNews = [
    { type: "TV", title: "Election Debate Coverage", status: "Pending" },
    { type: "Radio", title: "Economic Growth Report", status: "In Progress" },
    { type: "Newspaper", title: "Climate Change Brief", status: "Completed" },
    { type: "Online", title: "Tech Startup Funding Story", status: "Pending" },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
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

      <Card className="col-span-12 md:col-span-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Media Monitoring (By Category)</CardTitle>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("daily")}
              className={`px-3 py-1 rounded-md text-sm ${
                viewMode === "daily"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setViewMode("weekly")}
              className={`px-3 py-1 rounded-md text-sm ${
                viewMode === "weekly"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode("monthly")}
              className={`px-3 py-1 rounded-md text-sm ${
                viewMode === "monthly"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Monthly
            </button>
          </div>
        </CardHeader>

        <CardContent className="h-72">
          <Bar data={monitoringChartData} options={monitoringChartOptions} />
        </CardContent>
      </Card>

      <Card className="col-span-12 md:col-span-6">
        <CardHeader>
          <CardTitle>Leading Media Source Coverage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-gray-700">ITV (Television)</p>
            <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
              <div
                className="h-1 bg-indigo-600 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">85% coverage</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">The Citizen (Newspaper)</p>
            <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
              <div
                className="h-1 bg-emerald-600 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">78% coverage</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Clouds FM (Radio)</p>
            <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
              <div
                className="h-1 bg-pink-600 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">92% coverage</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">
              Millard Ayo (Social Media)
            </p>
            <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
              <div
                className="h-1 bg-yellow-500 rounded-full"
                style={{ width: "67%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">67% coverage</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">TBC (Broadcast)</p>
            <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
              <div
                className="h-1 bg-blue-600 rounded-full"
                style={{ width: "74%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">74% coverage</p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-12 md:col-span-6">
        <CardHeader>
          <CardTitle>Media Coverage Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <Pie data={outletPieData} />
        </CardContent>
      </Card>

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
                      className={`px-3 py-1 rounded-full text-white text-sm ${
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
