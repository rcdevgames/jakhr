import Router from "./route";
import Footer from "./components/Footer";
import { LoadingProvider } from "./components/Loading";

function App() {
  // console.log = function(){};
  // console.debug = function(){};
  // console.error = function(){};
  // console.warn = function(){};
  // console.info = function(){};
  return (
    <div className="App">
      <LoadingProvider>
        <Router />
      </LoadingProvider>
    </div>
  );
}
export default App;
