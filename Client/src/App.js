import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import pages from "./pages";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Routes>
            {pages.map((page) => (
              <Route
                key={"route" + page.url}
                exact
                path={page.url}
                element={<ProtectedRoute>{page.component}</ProtectedRoute>}
              />
            ))}

            <Route
              key={"routeDefault"}
              exact
              path="/"
              element={<ProtectedRoute>{pages[0]?.component}</ProtectedRoute>}
            />

            <Route path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
