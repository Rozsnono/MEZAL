import { useState } from "react";
import Icon from "./icons";

export default function Question({ question, options, answer_id, onClose }: { question: string, options: any[], answer_id: number, onClose: (correct: boolean) => void }) {
    const [selectedAnswer, setSelectedAnswer] = useState(0);

    function getBackgroundColor(answer: { _id: number, answer: string }) {
        if (selectedAnswer === answer._id && answer_id === answer._id) {
            return `border-2 border-green-400`;
        } else if (selectedAnswer === answer._id && answer_id !== answer._id) {
            return `border-2 border-red-400`;
        }
        else {
            return `border-transparent`;
        }
    }

    function selectAnswer(answerId: number) {
        if (selectedAnswer) {
            return;
        }
        setSelectedAnswer(answerId);
        setTimeout(() => {onClose(answerId == answer_id)}, 5000);
    }


    return (
        <main className="fixed w-screen h-screen flex justify-center items-center bg-[#00000090]">
            <div className="p-10 min-w-[50vw] flex flex-col gap-4 border border-zinc-700 rounded-md bg-zinc-800 select-none">
                <div className="p-3 pb-6 flex justify-center items-center">
                    <h1 className="text-3xl text-zinc-100">{question}</h1>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {
                        options.map((answer, i) => {
                            if (selectedAnswer) {
                                return (
                                    <div onClick={() => { selectAnswer(answer._id) }} key={i} className={`group border-2 w-full p-5 bg-zinc-700 rounded-md flex justify-between items-center duration-200 cursor-default ${getBackgroundColor(answer)}`}>
                                        <div className="w-6 flex justify-center items-center relative">
                                            {
                                                selectedAnswer === answer._id ?
                                                    <Icon name="check-empty" className="opacity-100 absolute duration-200"></Icon>
                                                    :
                                                    <Icon name="circle" className="opacity-100 absolute duration-200"></Icon>
                                            }
                                        </div>
                                        <div>{answer.answer}</div>
                                        <div></div>
                                    </div>
                                )
                            }
                            return (
                                <div onClick={() => { selectAnswer(answer._id) }} key={i} className={`group border-2 w-full p-5 bg-zinc-700 rounded-md flex justify-between items-center hover:bg-zinc-600 duration-200 cursor-pointer ${getBackgroundColor(answer)}`}>
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