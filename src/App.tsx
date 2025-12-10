import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import NotFound from "./pages/OtherPage/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Clients from "./pages/ClientPage/Clients";
import ProjectCategories from "./pages/ProjectCategories/ProjectCategories";
import Media from "./pages/MediasPage/Media";
import Project from "./pages/ProjectPages/Project";
import ProjectCreate from "./pages/ProjectPages/ProjectCreate";
import ProjectDetails from "./pages/ProjectPages/ProjectDetails";
import ProjectEdit from "./pages/ProjectPages/ProjectEdit";
import ProjectReportAvenue from "./pages/ProjectReportAvenuePage/ProjectReportAvenue";
import ProjectReportTime from "./pages/ProjectReportTimePage/ProjectReportTime";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route index path="/projects" element={<Project />} />
              <Route index path="/projects/:id" element={<ProjectDetails />} />
              <Route
                index
                path="/projects/:id/edit"
                element={<ProjectEdit />}
              />
              <Route
                index
                path="/projects/create"
                element={<ProjectCreate />}
              />
              <Route
                index
                path="/system/system-clients"
                element={<Clients />}
              />
              <Route
                index
                path="/system/system-project-categories"
                element={<ProjectCategories />}
              />

              <Route
                index
                path="/system/system-project-report-avenue"
                element={<ProjectReportAvenue />}
              />

              <Route
                index
                path="/system/system-project-report-time"
                element={<ProjectReportTime />}
              />
              <Route index path="/system/medias" element={<Media />} />
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
