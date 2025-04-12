import React from "react"

export default function Rounds({ round }: { round: number }) {

    const rounding: (1 | 2 | 3)[][] = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]];
    const rounds: (1 | 2 | 3)[] = [1, 1, 2, 3, 2, 3];

    return (
        <main className="fixed top-2 right-2 flex">
            <div className="text-3xl">
                {round.toFixed(0)} / 10
            </div>

        </main>
    )
}