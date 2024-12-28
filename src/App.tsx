import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssetList } from "./components/AssetList";
import { AssetDetails } from "./components/AssetDetails";
import { Gainers } from "./components/Gainers";
import { Losers } from "./components/Losers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AssetList />} />
          <Route path="/asset/:id" element={<AssetDetails />} />
          <Route path="/gainers" element={<Gainers />} />
          <Route path="/losers" element={<Losers />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;