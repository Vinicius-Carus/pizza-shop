import { RouterProvider } from "react-router/dom";
import "./index.css";
import { router } from "./routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import { QueryClientContext } from "@tanstack/react-query";

export function App() {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
          <Helmet titleTemplate="%s | pizza.shop" />
          <Toaster richColors />

          <QueryClientContext>
            <RouterProvider router={router} />
          </QueryClientContext>
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
