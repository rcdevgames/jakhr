import Router from "./route";
import Footer from "./components/Footer";
import { LoadingProvider } from "./components/Loading";

function App() {
  console.log = function() {};
  console.warn = function() {};
  console.error = function() {};
  console.debug = function(){};
  // console.
  return (
    <div className="App">
      <LoadingProvider>
        <Router />
      </LoadingProvider>
    </div>
  );
}
export default App;
