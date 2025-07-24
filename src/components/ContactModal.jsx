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
        <div className="bg-black p-4 rounded-xl shadow-xl shadow-violetLight/75 flex flex-col items-center space-y-8">
            <h1 className="text-center text-5xl text-sunflowerDark">Contact</h1>
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-center text-2xl text-white">
                    <EnvelopeIcon className="h-6 w-6 inline-block mr-2" />
                    Email: <span className="text-xl text-violetLight">{`${process.env.NEXT_PUBLIC_EMAIL ?? '--'}`}</span>
                </h1>
                <h1 className="text-center text-2xl text-white">
                    <PhoneIcon className="h-6 w-6 inline-block mr-2" />
                    Phone: <span className="text-xl text-violetLight">{`${process.env.NEXT_PUBLIC_PHONE ?? '--'}`}</span>
                </h1>
                <h1 className="text-center text-2xl text-white">
                    GitHub: <a className="flex items-center text-xl text-violetLight hover:text-plumLight shadow shadow-violetLight hover:shadow-plumLight p-2 rounded-lg" href={process.env.NEXT_PUBLIC_GH_LINK} target="_blank" rel="noopener noreferrer">
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
                    LinkedIn: <a className="flex items-center text-xl text-violetLight hover:text-plumLight shadow shadow-violetLight hover:shadow-plumLight p-2 rounded-lg" href={process.env.NEXT_PUBLIC_LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
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
            </div>
        </div>
    )
}