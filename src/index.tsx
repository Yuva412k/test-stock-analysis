import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Portfolio } from "./screens/Portfolio";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
);
