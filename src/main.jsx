import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./Context/ThemeContext";

import App from "./App.jsx";
import Blog from "./Pages/Blog.jsx";
import PostPage from "./Pages/Posts.jsx";
import NotFound from "./Pages/NotFound.jsx";

import "./index.css";
import 'prismjs/themes/prism-tomorrow.css';

const ThemedAppWrapper = () => {
  const { isDark } = useTheme();

  return (
    <div className={`relative h-screen w-screen flex flex-col font-mono overflow-x-hidden selection:text-lime-400 ${isDark ? "dark" : "light"}`}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

createRoot(document.getElementById("root")).render(
    <ThemeProvider>
      <HeroUIProvider>
        <BrowserRouter>
          <ThemedAppWrapper />
        </BrowserRouter>
      </HeroUIProvider>
    </ThemeProvider>
);
