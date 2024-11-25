import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Details from "./components/ui/Details";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
      {
        path: "/contact/:id",
        element: <Details/>,
      },
    ],
  },
]);
function App() {

  const queryClint = new QueryClient([])

  return (
      <QueryClientProvider client={queryClint}>

        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    
  );
}

export default App;
