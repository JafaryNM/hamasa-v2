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

import { Bar, Pie } from "react-chartjs-2";
import { IoRadioSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { GrProjects } from "react-icons/gr";
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
        backgroundColor: "#66308d",
        barPercentage: 0.45,
        categoryPercentage: 0.6,
      },
      {
        label: "TV",
        data: selected.tv,
        backgroundColor: "#2aa6af",
        barPercentage: 0.45,
        categoryPercentage: 0.6,
      },
      {
        label: "Radio",
        data: selected.radio,
        backgroundColor: "#F59E0B",
        barPercentage: 0.45,
        categoryPercentage: 0.6,
      },
      {
        label: "Social Media",
        data: selected.social,
        backgroundColor: "#EC4899",
        barPercentage: 0.45,
        categoryPercentage: 0.6,
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
    { tag: "Tawla", text: "12/10/2025", color: "bg-red-500" },
    { tag: "WFC", text: "1/10/2026", color: "bg-green-500" },
    { tag: "LHRC", text: "13/11/2025", color: "bg-blue-500" },
    { tag: "LHRC", text: "13/11/2025", color: "bg-blue-500" },
  ];

  const coverageData = [
    { name: "Television", pct: 85, color: "bg-[#2aa6af]", count: 35 },
    { name: "Newspapers", pct: 78, color: "bg-[#66308d]", count: 41 },
    { name: "Radio Stations", pct: 92, color: "bg-[#F59E0B]", count: 28 },
    { name: "Social Media", pct: 67, color: "bg-[#EC4899]", count: 22 },
    { name: "Other Media", pct: 60, color: "bg-blue-500", count: 9 },
  ];

  return (
    <div className="grid grid-cols-12 gap-6">
      <Card className="col-span-3 p-5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-xl">
            <FaUsers className="w-7 h-7" />
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
            <GrProjects className="w-7 h-7" />
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
            <GoProjectSymlink className="w-7 h-7" />
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
            <IoRadioSharp className="w-7 h-7" />
          </div>
          <div>
            <p>Total Media Sources</p>
            <p className="text-4xl font-bold">127</p>
          </div>
        </div>
      </Card>

      {/* LEFT SIDE */}
      <div className="col-span-8 flex flex-col gap-6 h-full">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Media Source Coverage</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {coverageData.map((item) => (
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

        <Card className="flex-1 relative top-7">
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

      {/* RIGHT SIDE */}
      <div className="col-span-4 flex flex-col gap-6 h-full">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>

          <CardContent>
            {reports.map((a) => (
              <div
                key={a.tag}
                className="flex items-center justify-between my-2 p-3 bg-orange-50 rounded-md"
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

        <Card className="flex-1 mt-6">
          <CardHeader>
            <CardTitle>Total Reports Status</CardTitle>
          </CardHeader>

          <CardContent className="flex justify-center items-center h-64">
            <Pie
              data={{
                labels: ["Verified", "Approval", "Pending", "Rejected"],
                datasets: [
                  {
                    data: [3456, 122, 122, 22],
                    backgroundColor: [
                      "#10B981", // Green
                      "#6366F1", // Indigo
                      "#FBBF24", // Yellow
                      "#EF4444", // Red
                    ],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
