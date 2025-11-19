import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Beauty from "./pages/Beauty";
import Fit from "./pages/Fit";
import Tech from "./pages/Tech";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/fit" element={<Fit />} />
        <Route path="/tech" element={<Tech />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
