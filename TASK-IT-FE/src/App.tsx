
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { MagicLink } from "./pages/MagicLink";
import Landing from "./pages/landing";
import { Dashboard } from "./pages/Dasboard";
import { Signin } from "./pages/Signin";
import { ProtectedRoute } from "./lib/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/magic/login" element={<MagicLink />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Landing />} />
        
      
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;