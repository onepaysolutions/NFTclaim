import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages/landing/Landing";
import { Whitelist } from "./pages/whitelist/Whitelist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/whitelist",
    element: <Whitelist />,
  }
]); 