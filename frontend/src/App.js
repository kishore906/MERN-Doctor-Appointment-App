import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Search from "./routes/Search";
import PaymentSuccess from "./routes/PaymentSuccess";
import DoctorProfile from "./routes/DoctorProfile";
import UserProfileLayout from "./routes/UserProfileLayout";
import DoctorUpdateProfileLayout from "./routes/DoctorUpdateProfileLayout";
import Contact from "./routes/Contact";
import ProtectedRoute from "./routes/ProtectedRoute";
import PageNotFound from "./routes/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctors" element={<Search />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route
              exact
              path="/users/profile/me"
              element={
                <ProtectedRoute>
                  <UserProfileLayout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctors/profile/me"
              element={
                <ProtectedRoute doctor={true}>
                  <DoctorUpdateProfileLayout />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment_success" element={<PaymentSuccess />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
