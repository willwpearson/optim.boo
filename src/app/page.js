'use client'

import { motion } from "framer-motion";
import {
  CpuChipIcon,
  ServerStackIcon,
  CodeBracketIcon,
  UsersIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import ServiceCard from "@/components/ServiceCard";
import ContactCard from "@/components/ContactCard";

const services = [
  {
    icon: CodeBracketIcon,
    title: "Full-Stack Web",
    description:
      "Next.js/React frontends, TypeScript, .NET APIs and services. Clean interfaces backed by reliable data layers.",
  },
  {
    icon: CpuChipIcon,
    title: "IoT & Embedded Systems",
    description:
      "Dockerized microservices on constrained Linux, Bluetooth stacks, and medical-grade reliability. Experience shipping production software in regulated environments.",
  },
  {
    icon: UsersIcon,
    title: "Technical Leadership",
    description:
      "Cross-functional collaboration, mentoring, code review, and architecture guidance. Comfortable leading without losing sight of the details.",
  },
  {
    icon: ServerStackIcon,
    title: "Systems Architecture",
    description:
      "Custom CI/CD pipelines, and containerized device-to-cloud stacks. Built for correctness and operational visibility.",
  }
];

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  ".NET",
  "Python",
  "Docker",
  "Linux",
  "IoT",
  "Microservices",
];

const contacts = [
  {
    icon: EnvelopeIcon,
    label: "Email",
    value: process.env.NEXT_PUBLIC_EMAIL || "—",
    href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
    isExternal: false,
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: process.env.NEXT_PUBLIC_PHONE || "—",
    href: `tel:${process.env.NEXT_PUBLIC_PHONE}`,
    isExternal: false,
  },
  {
    icon: "/github-mark-white.png",
    label: "GitHub",
    value: process.env.NEXT_PUBLIC_GH_LINK || "github.com/willwpearson",
    href: process.env.NEXT_PUBLIC_GH_LINK || "#",
    isExternal: true,
  },
  {
    icon: "/In-White-128.png",
    label: "LinkedIn",
    value: process.env.NEXT_PUBLIC_LINKEDIN_LINK || "linkedin.com/in/willwpearson",
    href: process.env.NEXT_PUBLIC_LINKEDIN_LINK || "#",
    isExternal: true,
  },
];

const fadeSlideDown = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const heroContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

const heroItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardInView = (i) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut", delay: i * 0.08 },
});

export default function Home() {
  return (
    <div className="bg-bg text-textPrimary font-inter min-h-screen">
      {/* Nav */}
      <motion.header
        {...fadeSlideDown}
        className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-textPrimary tracking-tight">William Pearson</span>
          <a
            href="#contact"
            className="text-sm border border-accent text-accent px-4 py-1.5 rounded-md hover:bg-accentDim transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Subtle radial teal glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(45,212,191,0.07) 0%, transparent 70%)",
          }}
        />
        <motion.div
          variants={heroContainer}
          initial="initial"
          animate="animate"
          className="relative max-w-2xl mx-auto text-center"
        >
          <motion.p
            variants={heroItem}
            className="text-textMuted text-xs uppercase tracking-widest mb-4"
          >
            Available for Contract Work
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-textPrimary leading-tight mb-4"
          >
            William Pearson
          </motion.h1>
          <motion.h2
            variants={heroItem}
            className="text-textSecondary text-lg sm:text-xl mb-6 leading-relaxed"
          >
            Software Development Engineer — Web Development, Full-Stack, Systems &amp; Health Tech
          </motion.h2>
          <motion.p
            variants={heroItem}
            className="text-textSecondary text-base leading-relaxed mb-10 max-w-xl mx-auto"
          >
            I build reliable, production-grade systems across the stack. Currently SDE II at
            Signify Health, with a background in medical IoT. Based in Utah.
            Open to remote contracts.
          </motion.p>
          <motion.div variants={heroItem} className="flex flex-wrap gap-3 justify-center">
            <a
              href="#contact"
              className="bg-accent text-bg font-semibold px-6 py-2.5 rounded-md hover:bg-accentText transition-colors"
            >
              Get in Touch →
            </a>
            <a
              href={process.env.NEXT_PUBLIC_GH_LINK || "https://github.com/willwpearson"}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border text-textPrimary px-6 py-2.5 rounded-md hover:border-accent/50 hover:bg-surfaceRaised transition-colors"
            >
              View GitHub
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* What I Do */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-textMuted text-xs uppercase tracking-widest mb-2">Services &amp; Specialties</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary mb-3">What I Do</h2>
          <div className="w-12 h-0.5 bg-accent mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <motion.div key={service.title} {...cardInView(i)}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-textMuted text-xs uppercase tracking-widest mb-6">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs text-accentText bg-accentDim border border-accent/20 px-3 py-1.5 rounded-md hover:border-accent/50 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <p className="text-textMuted text-xs uppercase tracking-widest mb-2">Background</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary mb-3">About</h2>
          <div className="w-12 h-0.5 bg-accent mb-8" />
          <div className="space-y-5 text-textSecondary leading-relaxed">
            <p>
              I recently joined Signify Health as a Software Development Engineer II, working on
              the health-tech platform that connects patients and providers. Before that, I spent
              several years at Xenter building medical IoT devices — writing software, Bluetooth
              stacks, and microservice systems that had to work reliably in clinical
              environments where failure wasn&apos;t an option.
            </p>
            <p>
              I studied at the University of Utah, where I first got serious about software
              engineering. That range — from low-level systems to enterprise health-tech
              — is something I lean into deliberately. I like understanding the full picture, from
              the hardware talking on a wire to the dashboard a clinician reads. If you need
              someone who can move between layers of the stack without losing the thread, that&apos;s
              where I&apos;m most useful.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-textMuted text-xs uppercase tracking-widest mb-2">Contact</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary mb-3">
            Let&apos;s Work Together
          </h2>
          <div className="w-12 h-0.5 bg-accent mb-4" />
          <p className="text-textSecondary mb-10 max-w-lg">
            Available for contract and consulting work. Reach out directly — I respond to every
            genuine inquiry.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((contact, i) => (
              <motion.div key={contact.label} {...cardInView(i)}>
                <ContactCard
                  icon={contact.icon}
                  label={contact.label}
                  value={contact.value}
                  href={contact.href}
                  isExternal={contact.isExternal}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border text-center">
        <p className="text-textMuted text-sm">© 2025 William Pearson</p>
      </footer>
    </div>
  );
}
