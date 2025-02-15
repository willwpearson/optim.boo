'use client'
import React from "react"
import clsx from "clsx"
import { Transition } from "@headlessui/react"
import {
    EnvelopeIcon,
    PhoneIcon
} from "@heroicons/react/24/outline"
import Image from "next/image"

export default function ContactModal({ isOpen, returnHome }) {
    return (
        <Transition
            show={isOpen}
            appear={true}
            enter="transition opacity transform duration-500"
            enterFrom="-translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition opacity transform duration-300"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="-translate-x-full opacity-0"
        >
            <div className="bg-black p-4 rounded-xl shadow-xl shadow-violetLight/75 flex flex-col items-center space-y-8">
                <h1 className="text-center text-5xl text-violet shadow-violet rounded-lg">Contact</h1>
                <h1 className="text-center text-2xl text-white">
                    <EnvelopeIcon className="h-6 w-6 inline-block mr-2" />
                    Email: <span className="text-xl text-plumLight">{`${process.env.NEXT_PUBLIC_EMAIL ?? '--'}`}</span>
                </h1>
                <h1 className="text-center text-2xl text-white">
                    <PhoneIcon className="h-6 w-6 inline-block mr-2" />
                    Phone: <span className="text-xl text-plumLight">{`${process.env.NEXT_PUBLIC_PHONE ?? '--'}`}</span>
                </h1>
                <h1 className="text-center text-2xl text-white">
                    GitHub: <a className="flex items-center text-xl text-plumLight hover:text-violetLight shadow shadow-plumLight hover:shadow-violetLight p-2 rounded-lg" href={process.env.NEXT_PUBLIC_GH_LINK} target="_blank" rel="noopener noreferrer">
                        <Image
                            className="inline-block mr-2"
                            src="/github-mark-white.png"
                            alt="GitHub"
                            width={24}
                            height={24}
                        />
                        {`${process.env.NEXT_PUBLIC_GITHUB ?? '--'}`}
                    </a>
                </h1>
                <h1 className="text-center text-2xl text-white">
                    LinkedIn: <a className="flex items-center text-xl text-plumLight hover:text-violetLight shadow shadow-plumLight hover:shadow-violetLight p-2 rounded-lg" href={process.env.NEXT_PUBLIC_LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
                        <Image
                            className="inline-block mr-2"
                            src="/In-White-128.png"
                            alt="LinkedIn"
                            width={24}
                            height={24}
                        />
                        {`${process.env.NEXT_PUBLIC_LINKEDIN ?? '--'}`}
                    </a>
                </h1>
                <button className="text-center text-sunflowerLight hover:text-sunflowerDark text-2xl shadow shadow-sunflowerLight hover:shadow-sunflowerDark p-2 rounded-lg" onClick={() => returnHome()}>
                    <h1>Return Home</h1>
                </button>
            </div>
        </Transition>
    )
}