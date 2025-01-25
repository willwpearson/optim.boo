'use client'
import React, { useRef, useState, useCallback, useEffect } from "react"
import RouteList from "@/components/RouteList"
import ContactModal from "@/components/ContactModal"
import AboutModal from "@/components/AboutModal"

export default function Home() {
  const [routesOpen, setRoutesOpen] = useState(true)
  const [contactInfoOpen, setContactInfoOpen] = useState(false)
  const [aboutMeOpen, setAboutMeOpen] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState("up")

  const returnHome = useCallback(() => {
    setTimeout(() => setRoutesOpen(true), 300)
    setContactInfoOpen(false)
    setAboutMeOpen(false)
  }, [])

  const routes = useRef([
    { name: "Projects", click: () => {
      setTransitionDirection("up")
      window.location.href = "/projects"
    }},
    { name: "About Me", click: () => {
      setTimeout(() => setAboutMeOpen(true), 300)
      setRoutesOpen(false)
      setTransitionDirection("left")
    }},
    { name: "Contact", click: () => {
      setTimeout(() => setContactInfoOpen(true), 300)
      setRoutesOpen(false)
      setTransitionDirection("right")
    }}
  ])

  return (
    <main className="bg-gradient-to-b from-midnightDark via-plum to-sunsetOrangeDark w-screen h-screen flex items-center justify-center">
      <div className="w-4/5">
        <RouteList routes={routes.current} isOpen={routesOpen} transitionDirection={transitionDirection} />
        <ContactModal isOpen={contactInfoOpen} returnHome={returnHome} />
        <AboutModal isOpen={aboutMeOpen} returnHome={returnHome} />
      </div>
    </main>
  )
}