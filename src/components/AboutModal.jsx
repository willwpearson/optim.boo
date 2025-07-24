'use client'
import React from "react"
import clsx from "clsx"
import { Transition } from "@headlessui/react"

export default function AboutModal({ isOpen, returnHome }) {
    return (
        <div className="bg-black p-4 rounded-xl shadow-xl shadow-sunsetOrangeLight/75 flex flex-col items-center space-y-8">
            <h1 className="text-center text-5xl text-sunsetOrangeLight bg-black p-2 rounded-md">About Me</h1>

            {/* Who I Am */}
            <div className="flex flex-col items-center w-full">
                <h2 className="w-full text-start text-3xl text-sunsetOrangeDark">Who I Am</h2>
                <p className="text-start text-xl text-white">
                    I'm a passionate software engineer who thrives at the intersection of cutting-edge technology and meaningful impact. Currently working as a Software Engineer II at Xenter, I specialize in building IoT systems that make a difference in medical environments. What drives me most is transforming complex technical challenges into elegant, reliable solutions that real people depend on.
                </p>
            </div>

            {/* My Journey */}
            <div className="flex flex-col items-center w-full">
                <h2 className="w-full text-start text-3xl text-sunsetOrangeDark">My Journey</h2>
                <p className="text-start text-xl text-white">
                    My path began with a deep love for mathematics at the University of Utah, where I earned my B.S. in Mathematics with an emphasis on Computation and a minor in Computer Science. What started as academic curiosity has evolved into a career building everything from embedded Linux systems to cloud-native microservices. I've had the privilege of working across the entire technology stack – from low-level Bluetooth protocols running on medical devices to React dashboards that help clinicians make critical decisions.
                </p>
            </div>

            {/* What I Build */}
            <div className="flex flex-col items-center w-full">
                <h2 className="w-full text-start text-3xl text-sunsetOrangeDark">What I Build</h2>
                <p className="text-start text-xl text-white">
                    I create systems that bridge the physical and digital worlds. My work involves architecting Dockerized microservices that run seamlessly from IoT medical devices to cloud platforms, developing custom Linux networking stacks, and crafting intuitive frontends with Next.js and React. Whether it's real-time data streaming, mobile apps deployed to app stores, or CI/CD pipelines, I love the challenge of making complex systems work harmoniously together.
                </p>
            </div>

            {/* My Approach */}
            <div className="flex flex-col items-center w-full">
                <h2 className="w-full text-start text-3xl text-sunsetOrangeDark">My Approach</h2>
                <p className="text-start text-xl text-white">
                    I believe the best software comes from understanding both the technical intricacies and the human needs behind every project. I enjoy mentoring fellow developers, collaborating across disciplines with hardware and clinical teams, and ensuring that every line of code I write contributes to something meaningful. Quality and reliability aren't just goals – they're essential when lives depend on the systems we build.
                </p>
            </div>

            {/* Beyond Code */}
            <div className="flex flex-col items-center w-full">
                <h2 className="w-full text-start text-3xl text-sunsetOrangeDark">Beyond Code</h2>
                <p className="text-start text-xl text-white">
                    When I'm not immersed in code, you'll find me scaling rock walls, diving into the latest video games, or tinkering with personal projects that push my skills in new directions. I approach everything with the same dedication and curiosity that drives my professional work – always learning, always growing, and always looking for the next challenge that will help me become a better engineer and person.
                </p>
            </div>
        </div>
    )
}