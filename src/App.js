import Router from "./route";
import Footer from "./components/Footer";
import { LoadingProvider } from "./components/Loading";

function App() {
  return (
    <div className="App">
      <LoadingProvider>
        <Router />
      </LoadingProvider>
    </div>
  );
}
export default App;
