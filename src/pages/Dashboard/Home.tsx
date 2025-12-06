import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { TbSourceCode, TbWalk, TbAlertCircle } from "react-icons/tb";
import { CogIcon } from "lucide-react";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

export default function Home() {
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

  const monitoringData = {
    labels: selected.labels,
    datasets: [
      {
        label: "Print Media",
        data: selected.print,
        backgroundColor: "#4F46E5",
      },
      { label: "TV", data: selected.tv, backgroundColor: "#10B981" },
      { label: "Radio", data: selected.radio, backgroundColor: "#F59E0B" },
      {
        label: "Social Media",
        data: selected.social,
        backgroundColor: "#EC4899",
      },
    ],
  };

  const monitoringOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true } },
  };

  const reports = [
    { tag: "Tawla", text: "Report date 12/10/2025", color: "bg-red-500" },
    { tag: "WFC", text: "Report date 1/10/2026", color: "bg-green-500" },
    { tag: "LHRC", text: "Report date 13/11/2025", color: "bg-blue-500" },
    { tag: "LHRC", text: "Report date 13/11/2025", color: "bg-blue-500" },
  ];

  return (
    <div className="grid grid-cols-12 gap-6">
      <Card className="col-span-3 p-5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-xl">
            <TbSourceCode className="w-7 h-7" />
          </div>
          <div>
            <p>Total Clients</p>
            <p className="text-4xl font-bold">100</p>
          </div>
        </div>
      </Card>

      <Card className="col-span-3 p-5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-600 text-white rounded-xl">
            <TbWalk className="w-7 h-7" />
          </div>
          <div>
            <p>Total Projects</p>
            <p className="text-4xl font-bold">40</p>
          </div>
        </div>
      </Card>

      <Card className="col-span-3 p-5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-600 text-white rounded-xl">
            <TbAlertCircle className="w-7 h-7" />
          </div>
          <div>
            <p>Active Projects</p>
            <p className="text-4xl font-bold">38</p>
          </div>
        </div>
      </Card>

      <Card className="col-span-3 p-5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-600 text-white rounded-xl">
            <CogIcon className="w-7 h-7" />
          </div>
          <div>
            <p>Total Media Sources</p>
            <p className="text-4xl font-bold">127</p>
          </div>
        </div>
      </Card>

      {/* LEFT SIDE (equal height cards) */}
      <div className="col-span-8 flex flex-col gap-6 h-full">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Media Source Coverage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Television",
                pct: 85,
                color: "bg-indigo-600",
                count: 35,
              },
              { name: "Newspapers", pct: 78, color: "bg-green-600", count: 41 },
              {
                name: "Radio Stations",
                pct: 92,
                color: "bg-pink-600",
                count: 28,
              },
              {
                name: "Social Media",
                pct: 67,
                color: "bg-yellow-500",
                count: 22,
              },
              {
                name: "Other Media",
                pct: 60,
                color: "bg-blue-500",
                count: 9,
              },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>{item.count} sources</span>
                </div>
                <div className="bg-gray-200 h-1 rounded-full mt-1">
                  <div
                    className={`${item.color} h-1 rounded-full`}
                    style={{ width: `${item.pct}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{item.pct}% coverage</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Media Monitoring (By Category)</CardTitle>
            <div className="flex gap-2">
              {["daily", "weekly", "monthly"].map((m) => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    viewMode === m ? "bg-indigo-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <Bar data={monitoringData} options={monitoringOptions} />
          </CardContent>
        </Card>
      </div>

      {/* RIGHT SIDE (equal height cards) */}
      <div className="col-span-4 flex flex-col gap-6 h-full">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {reports.map((a) => (
              <div
                key={a.tag}
                className="flex items-center gap-3 p-3 bg-orange-50 rounded-md"
              >
                <span
                  className={`${a.color} px-3 py-1 text-white rounded-full text-sm`}
                >
                  {a.tag}
                </span>
                <span>{a.text}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Total Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="bg-green-500 px-3 py-1 text-sm rounded-full text-white">
                Verified
              </span>
              <span>3456</span>
            </div>

            <div className="flex justify-between">
              <span className="bg-indigo-500 px-3 py-1 text-sm rounded-full text-white">
                Approval
              </span>
              <span>122</span>
            </div>

            <div className="flex justify-between">
              <span className="bg-yellow-500 px-3 py-1 text-sm rounded-full text-white">
                Pending
              </span>
              <span>122</span>
            </div>

            <div className="flex justify-between">
              <span className="bg-red-500 px-3 py-1 text-sm rounded-full text-white">
                Rejected
              </span>
              <span>22</span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold">3600</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
