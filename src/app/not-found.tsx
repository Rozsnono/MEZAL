"use client"

import { useRouter } from "next/navigation";

export default function NotFound() {

    const route = useRouter();

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-zinc-900 text-white flex-col">
            <div className="text-2xl text-red-700">404 - Oldal nem található</div>
            <button
                onClick={() => {route.replace("/")}}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Vissza a főoldalra
            </button>
        </div>
    )
}