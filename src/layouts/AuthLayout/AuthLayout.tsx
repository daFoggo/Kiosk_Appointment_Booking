import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import AuthNavBar from "@/components/AuthNavBar/AuthNavBar";
import RootFooter from "@/components/RootFooter/RootFooter";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-gray-100">
      <header className="z-10">
        <AuthNavBar />
      </header>
      <main className="flex-grow p-2 sm:p-4">
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
      <footer className="z-10">
        <RootFooter />
      </footer>
    </div>
  );
};

export default RootLayout;