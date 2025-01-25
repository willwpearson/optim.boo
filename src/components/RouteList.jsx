'use client'
import React from "react"
import { Transition } from "@headlessui/react"

export default function RouteList({ routes, isOpen, transitionDirection }) {
    const enterFrom = transitionDirection === "right" ? "translate-x-full" : transitionDirection === "left" ? "-translate-x-full" : "translate-y-full"
    const leaveTo = transitionDirection === "right" ? "translate-x-full" : transitionDirection === "left" ? "-translate-x-full" : "-translate-y-full"

    return (
        <Transition
            show={isOpen}
            appear={true}
            enter="transition opacity transform duration-500"
            enterFrom={`opacity-0 ${enterFrom}`}
            enterTo="opacity-100 translate-y-0 translate-x-0"
            leave="transition opacity transform duration-300"
            leaveFrom="opacity-100 translate-y-0 translate-x-0"
            leaveTo={`opacity-0 ${leaveTo}`}
        >
            <div className="bg-black p-4 rounded-xl shadow-lg shadow-sunflower/75 flex flex-col items-center space-y-4">
                {routes.map((route, index) => (
                    <div key={index} className="flex items-center justify-center w-full">
                        <button className="text-center text-sunflower hover:text-sunflowerDark text-3xl" onClick={route.click}>
                            <h1>{route.name}</h1>
                        </button>
                    </div>
                ))}
            </div>
        </Transition>
    )
}