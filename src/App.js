import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Activities, AddActivities, AddCongratulations, AddLiquidation, AddNewDiwaniya, AddNews, AddOccasion, Congratulations, DiwaniyaDetails, Diwaniyas, EditActivities, EditCongratulations, EditDiwaniya, EditLiquidation, EditNews, EditOccasion, ForgetPassword, FreeBusiness, Home, Liquidation, LiquidationDetails, Login, NewDetails, News, Notifications, OccasionDetails, Occasions, Profile, Register, SingleCongratulation, SingleDiwaniya, SingleFreeBusiness, TechSupport, UserFreelanceRequest, WelcomePage } from './pages'
import { PagesGuard } from './components/AuthGuard';
import "react-loading-skeleton/dist/skeleton.css";
import "react-quill/dist/quill.snow.css";
import Cookies from 'js-cookie';

const App = () => {
  const  user = Cookies.get("user");
  const default_page = user && JSON.parse(Cookies.get("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if(default_page === 0) {
      navigate("/welcome")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <Routes>
        <Route path="" element={<PagesGuard />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/" element={<Home />} />
          <Route path="/free-business" element={<FreeBusiness />} />
          <Route path="/free-business/:slug" element={<SingleFreeBusiness />} />
          <Route
            path="/free-business/:slug/request"
            element={<UserFreelanceRequest />}
          />
          <Route path="/profile/:slug" element={<Profile />} />
          {/* ========== diwaniyas ========== */}
          <Route path="/diwaniyas" element={<Diwaniyas />} />
          <Route path="/diwaniyas/:slug" element={<SingleDiwaniya />} />
          <Route path="/diwaniyas/:slug/:slug" element={<DiwaniyaDetails />} />
          <Route path="/diwaniyas/add/:slug" element={<AddNewDiwaniya />} />
          <Route path="/diwaniyas/edit/:slug" element={<EditDiwaniya />} />
          {/* =============== Occasions ============== */}
          <Route path="/occasions" element={<Occasions />} />
          <Route path="/occasions/:slug" element={<OccasionDetails />} />
          <Route path="/occasions/add/:slug" element={<AddOccasion />} />
          <Route path="/occasions/edit/:slug" element={<EditOccasion />} />
          {/* ================ Congratulations ========= */}
          <Route path="/congratulations" element={<Congratulations />} />
          <Route
            path="/congratulations/:slug"
            element={<SingleCongratulation />}
          />
          <Route path="/congratulations/add" element={<AddCongratulations />} />
          <Route
            path="/congratulations/edit"
            element={<EditCongratulations />}
          />
          {/* ================ News ===================== */}
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewDetails />} />
          <Route path="/news/add" element={<AddNews />} />
          <Route path="/news/edit" element={<EditNews />} />
          {/* ================ Liquidation ===================== */}
          <Route path="/liquidation" element={<Liquidation />} />
          <Route path="/liquidation/:slug" element={<LiquidationDetails />} />
          <Route path="/liquidation/add" element={<AddLiquidation />} />
          <Route path="/liquidation/:slug/edit" element={<EditLiquidation />} />
          {/* ================ Activities ===================== */}
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/add" element={<AddActivities />} />
          <Route path="/activities/edit" element={<EditActivities />} />
          {/* ================================================== */}
          <Route path="/tech-support" element={<TechSupport />} />
          <Route path="/notification" element={<Notifications />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </>
  );
}

export default App