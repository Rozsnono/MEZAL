import { useState } from "react";
import Icon from "./icons";

export default function Question() {
    const answers = [{ _id: 1, answer: "1990" }, { _id: 2, answer: "1991" }, { _id: 3, answer: "1992" }, { _id: 4, answer: "1993" }];
    const [selectedAnswer, setSelectedAnswer] = useState(0);

    function getBackgroundColor(answer: { _id: number, answer: string }) {
        console.log(selectedAnswer, answer._id);
        if (selectedAnswer === answer._id) {
            return `linear-gradient(69deg, ${'#e046fc20'} 0%, ${'#e046fcc0'} 50%, ${'#75c32ac0'} 51%, ${'#75c32a20'} 100%)` 
        }
    }


    return (
        <main className="fixed w-screen h-screen flex justify-center items-center bg-[#00000090]">
            <div className="p-10 min-w-[50vw] flex flex-col gap-4 border border-zinc-700 rounded-md bg-zinc-800">
                <div className="p-3 pb-6 flex justify-center items-center">
                    <h1 className="text-3xl text-zinc-100">III. Kázmér dupla évszám:</h1>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {
                        answers.map((answer, i) => {
                            return (
                                <div onClick={() => { setSelectedAnswer(answer._id) }} style={{backgroundImage: getBackgroundColor(answer)}} key={i} className="group w-full p-5 bg-zinc-700 rounded-md flex justify-between items-center hover:bg-zinc-600 duration-200 cursor-pointer">
                                    <div className="w-6 flex justify-center items-center relative">
                                        <Icon name="circle" className="group-hover:opacity-0 opacity-100 absolute duration-200"></Icon>
                                        <Icon name="check-empty" className="group-hover:opacity-100 opacity-0 absolute duration-200"></Icon>
                                    </div>
                                    <div>{answer.answer}</div>
                                    <div></div>
                                </div>
                            );
                        })
                    }



                </div>
            </div>
        </main>
    )
}