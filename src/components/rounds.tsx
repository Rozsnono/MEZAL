import React from "react"

export default function Rounds({ round }: { round: number }) {

    const rounds: (1 | 2 | 3)[] = [1, 2, 2, 1, 3, 3];

    return (
        <main className="fixed bottom-2 left-0 w-full flex justify-center items-center">
            <div className="flex justify-between items-center gap-6">
                {rounds.map((r, index) => {
                    return <RoundComponent key={index} current={round === index + 1 ? r : 0} colors={["#ce3838", "#33a32d", "#2d42a3"]}></RoundComponent>
                })}
            </div>

        </main>
    )
}

function RoundComponent({ colors, current }: { colors: string[], current: 0 | 1 | 2 | 3 }) {
    return (
        <div className="flex w-24 relative h-12 bg-zinc-700 rounded-md border border-zinc-600 items-end justify-center ">
            <div className="w-full flex justify-between items-center absolute -top-4 px-2">
                <div className={`w-6 h-10 rounded-full border-2 border-zinc-300`} style={{ backgroundColor: colors[0] }}></div>
                <div className={`w-6 h-10 rounded-full border-2 border-zinc-300`} style={{ backgroundColor: colors[1] }}></div>
                <div className={`w-6 h-10 rounded-full border-2 border-zinc-300`} style={{ backgroundColor: colors[2] }}></div>
            </div>
            <div className="w-full flex justify-between p-2 px-4">
                <div style={{ opacity: current == 1 ? 1 : 0 }} className="w-2 h-2 bg-zinc-300 rounded-full top-0 animate-"></div>
                <div style={{ opacity: current == 2 ? 1 : 0 }} className="w-2 h-2 bg-zinc-300 rounded-full top-0 animate-"></div>
                <div style={{ opacity: current == 3 ? 1 : 0 }} className="w-2 h-2 bg-zinc-300 rounded-full top-0 animate-"></div>
            </div>
        </div>

    )
}