import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SideMenu } from "./componentspage/Page/SideBarMenu.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BrowserRouter } from "react-router-dom";

// Imports do Convex
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { api } from "../convex/_generated/api";

const client = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL || "http://localhost:8080");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={client} api={api}>
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex">
            <SideMenu />
            <App />
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </ConvexProvider>
  </StrictMode>
);
