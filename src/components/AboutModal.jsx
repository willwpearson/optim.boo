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
            <div className="bg-black p-4 rounded-xl shadow-xl shadow-sunsetOrangeLight/75 flex flex-col items-center space-y-8">
                <h1 className="text-center text-5xl text-sunsetOrangeLight bg-black p-2 rounded-md">About Me</h1>

                {/* Professional Summary */}
                <div className="flex flex-col items-center w-full">
                    <h2 className="w-full text-start text-3xl text-sunsetOrangeDark">Professional Summary</h2>
                    <p className="text-start text-xl text-white">
                        Full stack developer with a solid background in math and computer science. Skilled in designing, implementing, and optimizing software solutions. Quick learner, experienced in leadership and technical support, and adept at working in fast-paced environments.
                    </p>
                </div>

                {/* Education */}
                <div className="flex flex-col items-center w-full">
                    <h2 className="w-full text-start text-3xl text-sunsetOrangeDark">Education</h2>
                    <p className="text-start text-xl text-white">
                        Graduated from the University of Utah with a B.S. in Mathematics with an emphasis on Computation, and a minor in Computer Science. Always eager to learn new skills and technologies.
                    </p>
                </div>

                {/* Personal Life */}
                <div className="flex flex-col items-center w-full">
                    <h2 className="w-full text-start text-3xl text-sunsetOrangeDark">Personal Life</h2>
                    <p className="text-start text-xl text-white">
                        Outside of work, I enjoy spending time rock climbing, playing video games, and working on personal projects. I am dedicated and give my best effort in all my endeavors, striving to maximize every opportunity. I am constantly seeking to expand my knowledge and develop with each new challenge I encounter.
                    </p>
                </div>

                <button className="bg-black text-center text-sunsetOrangeLight hover:text-sunsetOrangeDark text-3xl shadow shadow-sunsetOrangeLight hover:shadow-sunsetOrangeDark p-2 rounded-lg" onClick={() => returnHome()}>
                    <h1>Return Home</h1>
                </button>
            </div>
        </Transition>
    )
}