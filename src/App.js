import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Activities, AddActivities, AddArchive, AddCongratulations, AddLiquidation, AddNewDiwaniya, AddNews, AddOccasion, AddToFamilyTree, Archives, ArchivesCategories, Congratulations, DiwaniyaDetails, Diwaniyas, EditActivities, EditCongratulations, EditDiwaniya, EditLiquidation, EditNews, EditOccasion, EditProfile, ForgetPassword, FreeBusiness, Home, Inquiries, Liquidation, LiquidationDetails, Login, NewDetails, News, Notifications, OccasionDetails, Occasions, Profile, Register, SingleCongratulation, SingleDiwaniya, SingleFreeBusiness, TechSupport, UserFreelanceRequest, VotesCategories, WelcomePage } from './pages'
import { PagesGuard } from './components/AuthGuard';
import "react-loading-skeleton/dist/skeleton.css";
import "react-quill/dist/quill.snow.css";
import Cookies from 'js-cookie';
import MainLayout from './layout/MainLayout';

const App = () => {
  const  user = Cookies.get("user");
  const default_page = user && JSON.parse(Cookies.get("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if(default_page === 0) {
      navigate("/welcome")
    }
    Cookies.set("visitHome", false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <>
      <Routes>
        <Route path="" element={<PagesGuard />}>
          <Route path="" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/inquiries" element={<Inquiries />} />
            <Route path="/free-business" element={<FreeBusiness />} />
            <Route
              path="/free-business/:slug"
              element={<SingleFreeBusiness />}
            />
            <Route
              path="/free-business/:slug/request"
              element={<UserFreelanceRequest />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            {/* ========== diwaniyas ========== */}
            <Route path="/diwaniyas" element={<Diwaniyas />} />
            <Route path="/diwaniyas/:slug" element={<SingleDiwaniya />} />
            <Route
              path="/diwaniyas/:slug/:slug"
              element={<DiwaniyaDetails />}
            />
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
            <Route
              path="/congratulations/add"
              element={<AddCongratulations />}
            />
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
            <Route
              path="/liquidation/:slug/edit"
              element={<EditLiquidation />}
            />
            {/* ================ Archives ===================== */}
            <Route path="/archives" element={<ArchivesCategories />} />
            <Route path="/archives/:slug" element={<Archives />} />
            <Route path="/archives/:slug/add" element={<AddArchive />} />
            {/* ================ Activities ===================== */}
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/add" element={<AddActivities />} />
            <Route path="/activities/edit" element={<EditActivities />} />
            {/* ================ Family Tree ===================== */}
            <Route path="/family-tree/add" element={<AddToFamilyTree />} />
            {/* ================ Votes ===================== */}
            <Route path="/votes" element={<VotesCategories />} />
            {/* ================================================== */}
            <Route path="/tech-support" element={<TechSupport />} />
            <Route path="/notification" element={<Notifications />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </>
  );
}

export default App