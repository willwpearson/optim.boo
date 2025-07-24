'use client'
import React, { useRef, useState, useCallback, useEffect } from "react"
import RouteList from "@/components/RouteList"
import ContactModal from "@/components/ContactModal"
import AboutModal from "@/components/AboutModal"
import Background from "@/components/Background"

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-midnightDark via-plum to-sunsetOrangeDark w-screen min-h-screen flex flex-col items-center justify-center py-8">
      <Background />
      <div className="w-11/12 lg:w-2/5 z-10 space-y-8">
        <AboutModal isOpen={true} />
        <ContactModal isOpen={true} />
      </div>
    </main>
  )
}