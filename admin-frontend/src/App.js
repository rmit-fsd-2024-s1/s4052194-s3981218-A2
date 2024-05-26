import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Owners from "./pages/Owners";
import CreateOwner from "./pages/CreateOwner";
import EditOwner from "./pages/EditOwner";
import MessageContext from "./contexts/MessageContext";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
export default function App() {
  const [message, setMessage] = useState(null);

  // Set message to null automatically after a period of time.
  useEffect(() => {
    if(message === null)
      return;

    const id = setTimeout(() => setMessage(null), 5000);

    // When message changes clear the queued timeout function.
    return () => clearTimeout(id);
  }, [message]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <MessageContext.Provider value={{ message, setMessage }}>
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
      </MessageContext.Provider>
    </div>
  );
}
