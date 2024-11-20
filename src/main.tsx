import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
 import { ThirdwebProvider } from "thirdweb/react";
 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 import "./index.css";
 import "./i18n";

 createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
     <ToastContainer />
     <ThirdwebProvider>
       <App />
     </ThirdwebProvider>
   </React.StrictMode>
 );
