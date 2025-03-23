import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderSection } from "../../screens/Portfolio/sections/HeaderSection/HeaderSection";
import { motion } from "framer-motion";

export const Layout: React.FC = () => {

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="min-h-screen bg-[#171616]">
      <HeaderSection />
      <motion.main
        className="flex-grow p-4"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};
