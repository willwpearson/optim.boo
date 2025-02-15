'use client'
import React from "react"
import { Transition } from "@headlessui/react"
import clsx from "clsx"

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
            <div className="relative flex items-center justify-center w-full h-full">
                <div className="absolute w-[110%] lg:w-[105%] h-[110%] bg-gradient-to-b from-sunflowerLight/75 via-sunsetOrangeLight/75 to-violetLight/75 blur-md z-0 animate-pulse"/>
                <div className="bg-black w-[98%] h-[98%] p-8 rounded-xl flex flex-col items-center space-y-8 z-10">
                    {routes.map((route, index) => (
                        <div key={index} className="flex items-center justify-center w-full">
                            <button onClick={route.click}>
                                <h1 className={clsx([
                                    "text-center",
                                    route.name === "About Me" && "text-4xl text-sunsetOrangeLight hover:text-sunsetOrangeDark",
                                    route.name === "Contact" && "text-2xl text-sunflowerDark hover:text-sunflowerLight"
                                ])}>{route.name}</h1>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Transition>
    )
}