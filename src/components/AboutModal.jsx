'use client'
import React from "react"
import clsx from "clsx"
import { Transition } from "@headlessui/react"

export default function AboutModal({ isOpen, returnHome }) {
    return (
        <Transition
            show={isOpen}
            appear={true}
            enter="transition opacity transform duration-500"
            enterFrom="translate-x-full opacity-0 absolute"
            enterTo="translate-x-0 opacity-100"
            leave="transition opacity transform duration-300"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
        >
            <div className="flex flex-col items-center w-full">
                <h1 className="text-center text-5xl text-violet shadow-violet rounded-lg">About Me</h1>

                <button className="bg-black text-center text-sunflowerLight hover:text-sunflowerDark text-3xl shadow shadow-sunflowerLight hover:shadow-sunflowerDark p-2 rounded-lg" onClick={() => returnHome()}>
                    <h1>Return Home</h1>
                </button>
            </div>
        </Transition>
    )
}