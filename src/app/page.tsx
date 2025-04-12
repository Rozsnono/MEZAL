"use client";

import { clearMapFromLocal, MapContext, setUserToLocal } from "@/services/captured.context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Image from "next/image";


export default function Home() {
  const route = useRouter();

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    route.replace("/mobile");
  }

  const { setMap, user, setUser } = useContext(MapContext);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className="flex flex-col gap-4 items-center justify-center bg-zinc-800 border border-gray-500 p-6 rounded-lg shadow-md">
        <Image src={"/assets/logo.png"} width={160} height={160} alt="Logo"></Image>
        <h1 className="text-4xl font-bold">Vetésforgó</h1>
        <p className="text-gray-400 mt-2">Ahol a tudás terem – hódítsd meg a földet kérdésről kérdésre!</p>
        <input
          type="text"
          value={user || ""}
          onChange={(e) => { setUser(e.target.value); }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              clearMapFromLocal();
              setUserToLocal(user);
              route.replace("/game");
              setMap(null);
            }
          }}
          placeholder="Add meg a neved"
          className="mt-4 p-3 border bg-zinc-700 border-gray-300 rounded-md w-full"
        />
        <div className="flex flex-col gap-4 mt-6 w-full">
          <button disabled={loading} onClick={user == "" ? () => { } : () => { setLoading(true); clearMapFromLocal(); route.replace("/game"); setMap(null); setUserToLocal(user); }} className="flex w-full items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-md hover:bg-emerald-600 text-lg">
            <span>🎮</span> Játék
          </button>
          <button disabled className="flex items-center justify-center gap-2 bg-blue-800 text-gray-200 px-6 py-3 rounded-md text-lg cursor-not-allowed">
            <span>⚙️</span> Beállítások
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-red-900 text-gray-300 px-6 py-3 rounded-md cursor-not-allowed text-lg"
            disabled
          >
            <span>❓</span> Segítség
          </button>
          <p className="text-sm text-gray-400 mt-4 text-center">
            Felhívjuk figyelmedet, hogy a játék során előfordulhatnak technikai problémák. <br />Elnézést kérünk az esetleges kellemetlenségekért, és köszönjük a megértésedet!
          </p>
        </div>
        <p className="text-sm text-gray-400 mt-6">
          &copy; 2025 Vetésforgó. Minden jog fenntartva.
        </p>
      </div>
    </main>
  )
}
