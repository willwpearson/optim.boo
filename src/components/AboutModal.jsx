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
            <div className="bg-black p-4 rounded-xl shadow-lg shadow-sunsetOrangeLight/75 flex flex-col items-center space-y-4">
                <button className="text-center text-sunsetOrangeLight hover:text-sunsetOrangeDark text-3xl" onClick={() => returnHome()}>
                    <h1>Return</h1>
                </button>
            </div>
        </Transition>
    )
}