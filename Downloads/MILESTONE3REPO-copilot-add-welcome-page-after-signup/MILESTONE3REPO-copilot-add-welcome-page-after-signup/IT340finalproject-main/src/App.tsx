import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Welcome from "./pages/Welcome";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";
import About from "./pages/About";
import NewDrops from "./pages/NewDrops";
import Trending from "./pages/Trending";
import Sale from "./pages/Sale";
import Cart from "./pages/Cart";
import CartPage from "./pages/CartPage";
import VerifyEmail from "./pages/VerifyEmail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/newdrops" element={<NewDrops />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
