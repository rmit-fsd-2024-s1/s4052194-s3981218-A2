import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Owners from "./pages/Owners";
import CreateOwner from "./pages/CreateOwner";
import EditOwner from "./pages/EditOwner";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar />
        <main role="main">
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Owners />} />
              <Route path="/user" element={<Users />} />
              <Route path="/review" element={<Reviews />} />
              <Route path="/product" element={<Products />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<CreateOwner />} />
              <Route path="/edit/:email" element={<EditOwner />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
