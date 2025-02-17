'use client'
import Game from "@/components/Game";
import React, { useRef, useState, useCallback, useEffect } from "react"

export default function Secret() {
    const [access, setAccess] = useState(false);
    const canvasRef = useRef(null);

    /**
     * Checks if the user is coming from the home page, if not, redirects them to the home page.
     */
    useEffect(() => {
        const referrer = document.referrer;

        if (referrer === process.env.NEXT_PUBLIC_BASE_URL + "/") {
            setAccess(true);
        } else {
            window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
        }
    }, []);

    return (
        <main className="bg-gradient-to-b from-violetDark via-plum to-midnightDark w-screen h-screen flex items-end justify-center overflow-hidden overscroll-none pb-4">
            <Game canvasRef={canvasRef} />
        </main>
    )
}