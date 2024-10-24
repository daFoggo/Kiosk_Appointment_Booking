import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import RootNavBar from "@/components/RootNavBar/RootNavBar";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <header className="z-10">
        <RootNavBar />
      </header>
      <main className="flex-grow">
        <Outlet />
        <Toaster
          toastOptions={{
            style: {
              color: "#4893f4",
            },
          }}
          position="top-center"
        />
      </main>
      <footer className="z-10"></footer>
    </div>
  );
};

export default RootLayout;
