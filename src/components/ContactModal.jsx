'use client'
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
    EnvelopeIcon,
    PhoneIcon
} from "@heroicons/react/24/outline"
import Image from "next/image"

export default function ContactModal({ isOpen, returnHome }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (isOpen) {
            setTimeout(() => setIsVisible(true), 300);
        }
    }, [isOpen]);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const iconVariants = {
        hidden: { rotate: -180, scale: 0 },
        visible: {
            rotate: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const contactMethods = [
        {
            icon: <EnvelopeIcon className="h-8 w-8" />,
            label: "Email",
            value: process.env.NEXT_PUBLIC_EMAIL ?? 'contact@example.com',
            href: `mailto:${process.env.NEXT_PUBLIC_EMAIL ?? 'contact@example.com'}`,
            color: "from-violet to-violetLight",
            hoverColor: "violet"
        },
        {
            icon: <PhoneIcon className="h-8 w-8" />,
            label: "Phone",
            value: process.env.NEXT_PUBLIC_PHONE ?? '+1 (555) 123-4567',
            href: `tel:${process.env.NEXT_PUBLIC_PHONE ?? '+15551234567'}`,
            color: "from-sunflower to-sunflowerLight",
            hoverColor: "sunflower"
        },
        {
            icon: <Image src="/github-mark-white.png" alt="GitHub" width={32} height={32} className="invert" />,
            label: "GitHub",
            value: process.env.NEXT_PUBLIC_GITHUB ?? 'github-username',
            href: process.env.NEXT_PUBLIC_GH_LINK ?? 'https://github.com',
            color: "from-plum to-plumLight",
            hoverColor: "plum"
        },
        {
            icon: <Image src="/In-White-128.png" alt="LinkedIn" width={32} height={32} />,
            label: "LinkedIn",
            value: process.env.NEXT_PUBLIC_LINKEDIN ?? 'linkedin-profile',
            href: process.env.NEXT_PUBLIC_LINKEDIN_LINK ?? 'https://linkedin.com',
            color: "from-sunsetOrange to-sunsetOrangeLight",
            hoverColor: "sunsetOrange"
        }
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isClient && isVisible ? "visible" : "hidden"}
            className="glass-dark p-4 sm:p-6 lg:p-8 xl:p-12 rounded-2xl sm:rounded-3xl hover-glow transition-all duration-500 relative overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet/10 via-transparent to-sunflower/10 rounded-2xl sm:rounded-3xl"></div>
            <div className="absolute -top-6 sm:-top-10 -right-6 sm:-right-10 w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-gradient-to-br from-violet/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 sm:-bottom-10 -left-6 sm:-left-10 w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-gradient-to-tr from-sunflower/20 to-transparent rounded-full blur-2xl"></div>

            <div className="relative z-10">
                {/* Header */}
                <motion.div 
                    variants={itemVariants}
                    className="text-center mb-8 sm:mb-10 lg:mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-text mb-3 sm:mb-4">
                        Let's Connect
                    </h1>
                    <p className="text-lg sm:text-xl text-white/80 max-w-md mx-auto px-4">
                        Ready to build something amazing together? Reach out through any of these channels.
                    </p>
                    <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-violet to-sunflower mx-auto rounded-full mt-4 sm:mt-6"></div>
                </motion.div>

                {/* Contact Methods Grid */}
                <div className="grid gap-4 sm:gap-6 max-w-2xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={method.label}
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="flex items-center p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl glass hover:glass-dark transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl">
                                {/* Icon Container */}
                                <motion.div
                                    variants={iconVariants}
                                    className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${method.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-${method.hoverColor}/50 transition-all duration-300 group-hover:scale-110`}
                                >
                                    <div className="text-white">
                                        {method.icon}
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <div className="flex-1 ml-4 sm:ml-6 min-w-0">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-violetLight transition-colors duration-300">
                                        {method.label}
                                    </h3>
                                    <p className="text-sm sm:text-base lg:text-lg text-white/80 group-hover:text-white transition-colors duration-300 truncate">
                                        {method.value}
                                    </p>
                                </div>

                                {/* Arrow indicator */}
                                <div className="flex-shrink-0 ml-2 sm:ml-4">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:translate-x-1">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 sm:mt-10 lg:mt-12 text-center"
                >
                    <div className="inline-block p-4 sm:p-6 rounded-xl sm:rounded-2xl glass">
                        <h3 className="text-xl sm:text-2xl font-bold text-sunflower mb-2 sm:mb-3">
                            Let's Build Something Great
                        </h3>
                        <p className="text-sm sm:text-base text-white/80 max-w-lg mx-auto px-2">
                            Whether it's a complex IoT system, a sleek web application, or an innovative mobile solution, 
                            I'm always excited to discuss new opportunities and challenges.
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}