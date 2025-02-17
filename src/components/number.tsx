"use client";

import { useState } from "react";
import Icon from "./icons";

export default function NumberTest() {

    const [number, setNumber] = useState("");
    const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

    return (
        <div className="fixed bg-[#00000090] p-4 h-screen w-screen flex flex-col items-center justify-center gap-2 ">
            <div className="p-10 flex flex-col gap-4 border border-zinc-700 rounded-md bg-zinc-800">

                <div className="pb-6">
                    <h1 className="text-3xl text-zinc-100">III. Kázmér dupla évszám:</h1>
                </div>

                <div className="h-32 relative flex justify-center items-center">

                    <div className="h-full w-1 bg-zinc-300 rounded-lg"></div>
                    <div className="w-full h-1 bg-zinc-300 rounded-lg absolute"></div>


                </div>

                <div className="flex flex-col gap-2 border border-zinc-700 rounded-md p-2 hidden">
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

                                            <button className="col-span-3 h-16 w-16 flex justify-center items-center rounded-md bg-green-700 hover:bg-green-500 cursor-pointer text-white text-xl ">
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
            </div>
        </div>
    )
}