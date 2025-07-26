'use client'
import React, { useRef, useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import RouteList from "@/components/RouteList"
import ContactModal from "@/components/ContactModal"
import AboutModal from "@/components/AboutModal"
import Background from "@/components/Background"

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.main 
      variants={pageVariants}
      initial="initial"
      animate={isClient ? "animate" : "initial"}
      className="relative min-h-screen w-full overflow-x-hidden"
    >
      {/* Enhanced background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-midnightDark via-plum/50 to-sunsetOrangeDark/80" />
      
      {/* Animated background overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-t from-black/20 via-transparent to-violet/10 transition-transform duration-1000"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      
      <Background />
      
      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <motion.section 
          variants={sectionVariants}
          className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12"
        >
          <div className="max-w-6xl mx-auto text-center">
            {/* Main hero content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-12 sm:mb-16"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold gradient-text mb-4 sm:mb-6 px-2">
                Welcome to My Universe
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
                Software Engineer. Problem Solver. Dream Builder.
              </p>
              <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-sunsetOrange via-violet to-sunflower mx-auto rounded-full mt-6 sm:mt-8"></div>
            </motion.div>

            {/* Navigation hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-8 sm:mb-12"
            >
              <div className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full glass text-white/80 hover:text-white transition-colors">
                <span className="text-xs sm:text-sm">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Content sections */}
        <div className="relative space-y-12 sm:space-y-16 lg:space-y-24 px-4 sm:px-6 pb-12 sm:pb-24">
          <div className="max-w-6xl mx-auto">
            {/* About Section */}
            <motion.section 
              variants={sectionVariants}
              className="mb-12 sm:mb-16 lg:mb-24"
            >
              <AboutModal isOpen={true} />
            </motion.section>

            {/* Contact Section */}
            <motion.section 
              variants={sectionVariants}
            >
              <ContactModal isOpen={true} />
            </motion.section>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          variants={sectionVariants}
          className="relative mt-8 sm:mt-12 py-6 sm:py-8 text-center border-t border-white/10"
        >
          <div className="glass-dark py-4 sm:py-6 px-6 sm:px-8 rounded-2xl max-w-sm sm:max-w-md mx-auto mx-4">
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Built with passion using Next.js, Tailwind CSS, and Framer Motion
            </p>
            <div className="flex justify-center space-x-2 mt-3">
              <div className="w-2 h-2 bg-violet rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-sunsetOrange rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-sunflower rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.main>
  )
}