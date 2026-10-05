import { useCallback, useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { CookieNotice, CustomCursor, MobileBar, ScrollProgress } from "./components/Chrome";
import { PageHero } from "./components/sections/Shared";
import { Button } from "./components/ui/Button";
import { ROUTES } from "./data/site";

import Home from "./pages/Home";
import About from "./pages/About";
import { CouplesPage, IndividualPage, SinglesPage } from "./pages/TherapyPages";
import Workshops from "./pages/Workshops";
import Fees from "./pages/Fees";
import FaqPage from "./pages/FaqPage";
import Contact from "./pages/Contact";
import Reflections from "./pages/Reflections";
import { Privacy, Terms } from "./pages/Legal";

/**
 * Routing mode.
 * Default: HashRouter (/#/about). Works on ANY static host with zero config.
 * For clean URLs on Vercel set VITE_ROUTER=browser (vercel.json already contains the rewrite).
 */
const Router = import.meta.env.VITE_ROUTER === "browser" ? BrowserRouter : HashRouter;

function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page took a *different* path"
      intro={
        <>
          <p>Let’s get you back to somewhere familiar.</p>
        </>
      }
      actions={<Button to={ROUTES.home}>Return home</Button>}
    />
  );
}

/** Soft cross-fade between pages (opacity only, so sticky layouts are never disturbed). */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.couples} element={<CouplesPage />} />
          <Route path={ROUTES.singles} element={<SinglesPage />} />
          <Route path={ROUTES.individual} element={<IndividualPage />} />
          <Route path={ROUTES.workshops} element={<Workshops />} />
          <Route path={ROUTES.fees} element={<Fees />} />
          <Route path={ROUTES.faq} element={<FaqPage />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.reflections} element={<Reflections />} />
          <Route path={ROUTES.privacy} element={<Privacy />} />
          <Route path={ROUTES.terms} element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const SESSION_KEY = "caa-loaded";

export default function App() {
  // The brand loader plays once per browser session.
  const [loaded, setLoaded] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });
  const onDone = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  return (
    // reducedMotion="user": movement is removed (fades stay) when the OS asks for less motion
    <MotionConfig reducedMotion="user">
      <Router>
        <AnimatePresence>{!loaded && <Loader key="loader" onDone={onDone} />}</AnimatePresence>
        {loaded && (
          <>
            <a
              href="#main"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("main")?.focus();
              }}
              className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-evergreen px-5 py-3 font-semibold text-ivory transition-transform focus:translate-y-0"
            >
              Skip to main content
            </a>
            <ScrollProgress />
            <CustomCursor />
            <Navbar />
            <main id="main" tabIndex={-1} className="outline-none">
              <AnimatedRoutes />
            </main>
            <Footer />
            <MobileBar />
            <CookieNotice />
          </>
        )}
      </Router>
    </MotionConfig>
  );
}
