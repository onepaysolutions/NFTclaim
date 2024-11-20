import { Landing } from "./pages/landing/Landing";
import { ThirdwebProvider } from "thirdweb/react";


export function App() {
  return (
    <ThirdwebProvider>
      <main className="App gradient-background w-full">
        <Landing />
      </main>
    </ThirdwebProvider>
  );
}
