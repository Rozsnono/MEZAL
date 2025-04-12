import { MapContext } from "@/services/captured.context";
import { useContext } from "react";
import Icon from "./icons";

export default function PlayerCard({ points, current }: { points: { [name: string]: number }, current: number }) {
    const { user } = useContext(MapContext);
    return (
        <main className="fixed bottom-3 right-3 flex flex-col justify-center">
            <div className="grid grid-cols-3 items-center gap-8 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                <div>{current % 1 == 0 && <div className="w-4 h-4 rounded-full bg-zinc-200"></div>}</div>
                <div className="col-span-2 flex flex-col justify-center items-center gap-1 text-center px-8">
                    <div className="text-2xl flex items-center gap-2"> <div className="w-4 h-4 rounded-full bg-red-800 border"></div> {user}</div>
                    <div className="text-sm text-zinc-400">{points.User1}</div>
                </div>
                <div>{current.toFixed(1).split('.')[1] == '3' && <div className="w-4 h-4 rounded-full bg-zinc-200"></div>}</div>
                <div className="col-span-2 flex flex-col justify-center items-center gap-1 text-center px-8">
                    <div className="text-2xl flex items-center gap-2"> <div className="w-4 h-4 rounded-full bg-green-500 border"></div> Ferenc <Icon name="robot" noFill strokeWidth={2}></Icon></div>
                    <div className="text-sm text-zinc-400">{points.Bot1}</div>
                </div>
                <div>{current.toFixed(1).split('.')[1] == '6' && <div className="w-4 h-4 rounded-full bg-zinc-200"></div>}</div>
                <div className="col-span-2 flex flex-col justify-center items-center gap-1 text-center px-8">
                    <div className="text-2xl flex items-center gap-2"> <div className="w-4 h-4 rounded-full bg-blue-800 border"></div> József <Icon name="robot" noFill strokeWidth={2}></Icon></div>
                    <div className="text-sm text-zinc-400">{points.Bot2}</div>
                </div>
            </div>
        </main>
    )
}