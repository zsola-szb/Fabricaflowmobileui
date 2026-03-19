import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  useEffect(() => {
    // Initialize dark mode from localStorage or default to dark
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || !theme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return <RouterProvider router={router} />;
}