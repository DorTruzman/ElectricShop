import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import pages from "./pages";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {pages.map((page) => (
            <Route
              key={"route" + page.url}
              exact
              path={page.url}
              element={<ProtectedRoute>{page.component}</ProtectedRoute>}
            />
          ))}

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
