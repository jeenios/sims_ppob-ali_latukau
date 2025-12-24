import { Outlet } from "react-router-dom";
import { Navbar } from "@/components";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
