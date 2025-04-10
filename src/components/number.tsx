"use client";

import { useState } from "react";
import Icon from "./icons";
import { Bot } from "@/services/bot.service";

export default function NumberTest({ question, answer, onClose, bot1, bot2 }: { question: string, answer: number, onClose: (position: any) => void, bot1: Bot, bot2: Bot }) {

    const [number, setNumber] = useState("");
    const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

    const [checkAnswering, setCheckAnswering] = useState(false);

    const [pos, setPos] = useState<any>({ 'User1': -4, 'Bot1': -4, 'Bot2': -4 });

    const users = [
        { name: "User1", color: "#ce3838" },
        { name: "Bot1", color: "#33a32d" },
        { name: "Bot2", color: "#2d42a3" }
    ]

    function getPosition(answer: number, number: number, pos: any) {
        console.log(pos, answer, number);
        if (answer > number - (number * 0.2) && answer < number + (number * 0.2)) {
            return !pos.includes(0) ? 0 : !pos.includes(1) ? 1 : -1;
        }
        if (answer > number - (number * 1) && answer < number + (number * 1)) {
            return !pos.includes(1) ? 1 : !pos.includes(-1) ? -1 : -2;
        }
        if (answer > number - (number * 2) && answer < number + (number * 2)) {
            return !pos.includes(2) ? 2 : !pos.includes(-2) ? -2 : -3;
        }
        return pos.includes(3) ? 3 : -3;
    }

    function checkAnswer() {
        if (number === "") {
            return;
        }

        const num = parseInt(number);
        const newPos = { ...pos };
        newPos['User1'] = getPosition(answer, num, Object.values(newPos));
        newPos['Bot1'] = getPosition(answer, bot1.chooseNumber(answer), Object.values(newPos));
        newPos['Bot2'] = getPosition(answer, bot2.chooseNumber(answer), Object.values(newPos));
        console.log(newPos);
        setPos(newPos);
        setNumber("");
        setCheckAnswering(true);
        setTimeout(() => {
            setCheckAnswering(false);
            onClose(Object.keys(newPos).map((p: any, i: number) => { return { name: Object.keys(newPos)[i], position: Math.abs(newPos[p] as number) } }));
        }, 5000);
    }

    return (
        <div className="fixed bg-[#00000090] p-4 h-screen w-screen flex flex-col items-center justify-center gap-2 ">
            <div className="p-10 flex flex-col gap-4 border border-zinc-700 rounded-md bg-zinc-800">

                <div className="pb-6">
                    <h1 className="text-3xl text-zinc-100">{question}</h1>
                </div>

                {
                    checkAnswering &&
                    <div className="h-32 relative flex justify-center items-center">

                        <div className="h-3 w-1 bg-zinc-300 rounded-lg"></div>
                        <div className="w-full h-1 bg-zinc-300 rounded-lg absolute"></div>
                        <div className="w-full flex justify-center h-16 items-end absolute">
                            {answer}
                        </div>

                        {users.map((user, i) => {
                            return (
                                <div key={i} className="w-full absolute left-0 h-16 flex justify-between items-start">
                                    <div style={{ opacity: pos[user.name] === 3 ? 1 : 0, backgroundColor: user.color }} className="w-3 h-3 rounded-full bg-red-300 animate-bounce border"></div>
                                    <div style={{ opacity: pos[user.name] === 2 ? 1 : 0, backgroundColor: user.color }} className="w-3 h-3 rounded-full bg-red-300 animate-bounce border"></div>
                                    <div style={{ opacity: pos[user.name] === 1 ? 1 : 0, backgroundColor: user.color }} className="w-3 h-3 rounded-full bg-red-300 animate-bounce border"></div>
                                    <div style={{ opacity: pos[user.name] === 0 ? 1 : 0, backgroundColor: user.color }} className="w-3 h-3 rounded-full bg-red-300 animate-bounce border"></div>
                                    <div style={{ opacity: pos[user.name] === -1 ? 1 : 0, backgroundColor: user.color }} className="w-3 h-3 rounded-full bg-red-300 animate-bounce border"></div>
                                    <div style={{ opacity: pos[user.name] === -2 ? 1 : 0, backgroundColor: user.color }} className="w-3 h-3 rounded-full bg-red-300 animate-bounce border"></div>
                                    <div style={{ opacity: pos[user.name] === -3 ? 1 : 0, backgroundColor: user.color }} className="w-3 h-3 rounded-full bg-red-300 animate-bounce border"></div>
                                </div>
                            )
                        })}



                    </div>
                }

                {
                    !checkAnswering &&
                    <div className="flex flex-col gap-2 border border-zinc-700 rounded-md p-2">
                        <div className="flex gap-1">
                            <input value={number} type="text" readOnly className="h-16 w-full p-1 px-2 rounded-md text-zinc-900" />
                            <button onClick={() => { setNumber(number.slice(0, number.length - 1)) }} className="col-span-3 h-16 w-16 flex justify-center items-center rounded-md bg-zinc-700 hover:bg-zinc-500 cursor-pointer text-white text-xl ">
                                <Icon name="arrow-left"></Icon>
                            </button>
                        </div>
                        <div className="grid grid-reverse select-none grid-cols-3 justify-center items-center w-full gap-2">
                            {
                                numbers.map((n, i) => {
                                    if (i === 9) {
                                        return (
                                            <div key={i} className="flex col-span-3 gap-2 w-full">
                                                <div onClick={() => { setNumber(number + (0)) }} key={i} className="col-span-2 w-full h-16 flex justify-center items-center rounded-md bg-zinc-700 hover:bg-zinc-500 cursor-pointer text-white text-xl font-bold">
                                                    {0}
                                                </div>

                                                <button onClick={checkAnswer} className="col-span-3 h-16 w-16 flex justify-center items-center rounded-md bg-green-700 hover:bg-green-500 cursor-pointer text-white text-xl ">
                                                    <Icon name="check-noCircle"></Icon>
                                                </button>
                                            </div>
                                        )
                                    }
                                    return (
                                        <div onClick={() => { setNumber(number + (n)) }} key={i} className="flex h-16 justify-center items-center rounded-md bg-zinc-700 hover:bg-zinc-500 cursor-pointer text-white text-xl font-bold">
                                            {n}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}