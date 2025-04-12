"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { clearMapFromLocal, MapContext } from "@/services/captured.context";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function EndPage() {

    const param = useParams();
    const route = useRouter();

    const { setMap } = useContext(MapContext);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
            <div className="flex flex-col gap-4 items-center justify-center bg-zinc-800 border border-gray-500 p-6 rounded-lg shadow-md">
                <Image src={"/assets/logo.png"} width={160} height={160} alt="Logo"></Image>
                <h1 className="text-4xl font-bold">Vetésforgó</h1>
                <p className="text-gray-400 mt-2 text-xs">Ahol a tudás terem – hódítsd meg a földet kérdésről kérdésre!</p>

                <hr />

                <div className="text-center text-zinc-400 mt-2 text-lg">
                    Köszönjük, hogy játszottál!<br />
                    A játék során összesen <strong className="text-gray-100">{param.pos}</strong> pontot szereztél!<br />
                    Reméljük, hogy élvezted a játékot és sok új dolgot tanultál!<br />
                </div>
                <div className="flex flex-col gap-4 mt-6 w-full">
                    <button onClick={() => { clearMapFromLocal(); route.replace("/game"); setMap(null); }} className="flex w-full items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-md hover:bg-emerald-600 text-lg">
                        <span>🎮</span> Játsz újra
                    </button>
                    <button onClick={() => { route.replace("/") }} className="flex w-full items-center justify-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-md hover:bg-sky-600 text-lg">
                        <span>📋</span> Vissza a menübe
                    </button>
                </div>
                <p className="text-sm text-gray-400 mt-6">
                    &copy; 2025 Vetésforgó. Minden jog fenntartva.
                </p>
            </div>
        </main>
    );
}