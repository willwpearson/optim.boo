'use client'
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AboutModal({ isOpen, returnHome }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (isOpen) {
            setTimeout(() => setIsVisible(true), 100);
        }
    }, [isOpen]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const sections = [
        {
            title: "Who I Am",
            content: "I'm a passionate software engineer who thrives at the intersection of cutting-edge technology and meaningful impact. Currently working as a Software Engineer II at Xenter, I specialize in building IoT systems that make a difference in medical environments. What drives me most is transforming complex technical challenges into elegant, reliable solutions that real people depend on.",
            icon: "🚀"
        },
        {
            title: "My Journey",
            content: "My path began with a deep love for mathematics at the University of Utah, where I earned my B.S. in Mathematics with an emphasis on Computation and a minor in Computer Science. What started as academic curiosity has evolved into a career building everything from embedded Linux systems to cloud-native microservices. I've had the privilege of working across the entire technology stack – from low-level Bluetooth protocols running on medical devices to React dashboards that help clinicians make critical decisions.",
            icon: "📚"
        },
        {
            title: "What I Build",
            content: "I create systems that bridge the physical and digital worlds. My work involves architecting Dockerized microservices that run seamlessly from IoT medical devices to cloud platforms, developing custom Linux networking stacks, and crafting intuitive frontends with Next.js and React. Whether it's real-time data streaming, mobile apps deployed to app stores, or CI/CD pipelines, I love the challenge of making complex systems work harmoniously together.",
            icon: "⚡"
        },
        {
            title: "My Approach",
            content: "I believe the best software comes from understanding both the technical intricacies and the human needs behind every project. I enjoy mentoring fellow developers, collaborating across disciplines with hardware and clinical teams, and ensuring that every line of code I write contributes to something meaningful. Quality and reliability aren't just goals – they're essential when lives depend on the systems we build.",
            icon: "🎯"
        },
        {
            title: "Beyond Code",
            content: "When I'm not immersed in code, you'll find me scaling rock walls, diving into the latest video games, or tinkering with personal projects that push my skills in new directions. I approach everything with the same dedication and curiosity that drives my professional work – always learning, always growing, and always looking for the next challenge that will help me become a better engineer and person.",
            icon: "🌟"
        }
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isClient && isVisible ? "visible" : "hidden"}
            className="glass-dark p-4 sm:p-6 lg:p-8 xl:p-12 rounded-2xl sm:rounded-3xl hover-glow-orange transition-all duration-500 relative overflow-hidden"
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-sunsetOrange/10 via-violet/5 to-sunflower/10 opacity-50 rounded-2xl sm:rounded-3xl"></div>
            
            {/* Floating decorative elements */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-gradient-to-br from-sunsetOrange/20 to-violet/20 rounded-full blur-xl float-animation"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-gradient-to-br from-violet/20 to-sunflower/20 rounded-full blur-xl float-animation" style={{animationDelay: '2s'}}></div>

            <div className="relative z-10">
                {/* Header */}
                <motion.div 
                    variants={itemVariants}
                    className="text-center mb-8 sm:mb-10 lg:mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-text mb-3 sm:mb-4">
                        About Me
                    </h1>
                    <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-sunsetOrange to-violet mx-auto rounded-full"></div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid gap-6 sm:gap-8 lg:gap-12">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl glass hover:glass-dark transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl">
                                {/* Icon */}
                                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-sunsetOrange to-violet rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:shadow-violet/50 transition-all duration-300 mx-auto sm:mx-0">
                                    {section.icon}
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sunsetOrangeDark mb-3 sm:mb-4 group-hover:text-sunsetOrange transition-colors duration-300">
                                        {section.title}
                                    </h2>
                                    <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Skills/Tech Stack Footer */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-white/10"
                >
                    <div className="text-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-violet mb-4 sm:mb-6">Technologies I Love</h3>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {['React', 'Next.js', 'Node.js', 'Python', 'Docker', 'Linux', 'IoT', 'Microservices', 'TypeScript', 'Tailwind CSS'].map((tech, index) => (
                                <span
                                    key={tech}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-violet/20 to-sunsetOrange/20 rounded-full text-white/90 text-xs sm:text-sm font-medium hover:from-violet/30 hover:to-sunsetOrange/30 transition-all duration-300 cursor-default hover:scale-105"
                                    style={{animationDelay: `${index * 0.1}s`}}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}