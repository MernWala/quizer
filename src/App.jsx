import { HashRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import GenralHeaderFooter from "./components/layout/GenralHeaderFooter";
import ClientDashboardLayoutWraper from "./components/layout/ClientDashboardLayoutWraper";
import AdminDashboardLayoutWraper from "./components/layout/AdminDashboardLayoutWraper";

import Home from "./pages/Home";
import NotFound from "./utils/404";
import ManualAuth from "./auth/ManualAuth";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RecoverLinkGenerate from "./auth/RecoverLinkGenerate";
import { useEffect } from "react";
import ChangePassword from "./auth/ChangePassword";

import ApiState from "./context/api/ApiState"
import CommonState from "./context/common/CommonState";
import { Toaster } from "react-hot-toast";
import AccountVerify from "./auth/AccountVerify";
import PublicQuizzes from "./pages/PublicQuizzes";
import TermsConditions from "./pages/legal_pages/TermsConditions";
import PrivacyPolicy from "./pages/legal_pages/PrivacyPolicy";

const App = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
    });
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <ApiState>
        <CommonState>
          <HashRouter>
            <Routes>
              {/* General pages goes here */}
              <Route element={<GenralHeaderFooter />}>
                <Route index element={<Home />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="free-quizzes" element={<PublicQuizzes />} />

                <Route path="legal">
                  <Route path="terms-conditions" element={<TermsConditions />} />
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                </Route>
              </Route>

              {/* Authentication Pages goes here */}
              <Route path="/auth">
                <Route index element={<ManualAuth />} />
                <Route path="recover" element={<RecoverLinkGenerate />} />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="verify" element={<AccountVerify />} />
              </Route>

              {/* Client dashboard pages goes here */}
              <Route path="/dashboard/client" element={<ClientDashboardLayoutWraper />}>
                <Route index element={<>Client Dashboard</>} />
              </Route>

              {/* Admin dashboard pages goes here */}
              <Route path="/dashboard/admin" element={<AdminDashboardLayoutWraper />}>
                <Route index element={<>Admin Dashboard</>} />
              </Route>

              {/* All Error pages goes here */}
              <Route element={<GenralHeaderFooter />}>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </HashRouter>
        </CommonState>
      </ApiState>
    </>
  );
};

export default App;
