'use client'
import React, { useRef, useState, useCallback, useEffect } from "react"
import RouteList from "@/components/RouteList"
import ContactModal from "@/components/ContactModal"
import AboutModal from "@/components/AboutModal"
import Background from "@/components/Background"

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
    <main className="bg-gradient-to-b from-midnightDark via-plum to-sunsetOrangeDark w-screen min-h-screen flex flex-col items-center justify-center py-8">
      <Background />
      <div className="w-4/5 lg:w-2/5 z-10">
        <RouteList routes={routes.current} isOpen={routesOpen} transitionDirection={transitionDirection} />
        <ContactModal isOpen={contactInfoOpen} returnHome={returnHome} />
        <AboutModal isOpen={aboutMeOpen} returnHome={returnHome} />
      </div>
    </main>
  )
}