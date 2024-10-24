import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import AuthNavBar from "@/components/AuthNavBar/AuthNavBar";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-10">
        <AuthNavBar />
      </header>
      <main className="flex-grow">
        <Outlet />
        <Toaster
          toastOptions={{
            style: {
              color: "#4893f4"
            },
          }}
          position="top-center"
        />
      </main>
      <footer className="z-10">
      </footer>
    </div>
  );
};

export default AuthLayout;
