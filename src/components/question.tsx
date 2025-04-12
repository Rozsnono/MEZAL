import { useEffect, useRef, useState } from "react";
import Icon from "./icons";

export default function Question({ question, options, answer_id, onClose, bot1, bot2, whichBot, onlyBots }: { question: string, options: any[], answer_id: number, onClose: (correct: boolean) => void, bot1: any, bot2: any, whichBot: number, onlyBots?: boolean }) {
    const [selectedAnswer, setSelectedAnswer] = useState<null | number>(null);
    const [answer1, setAnswer1] = useState(-1);
    const [answer2, setAnswer2] = useState(-1);
    const [loading, setLoading] = useState(false);

    const users = [
        { name: "User1", color: "#ce3838" },
        { name: "Bot1", color: "#33a32d" },
        { name: "Bot2", color: "#2d42a3" }
    ]

    function getBackgroundColor(answer: { _id: number, answer: string }) {
        let string = " border-4 border-zinc-600 ";
        if (onlyBots) {
            if (answer._id === answer1) {
                string += ` border-r-green-500 border-b-green-500 `;
            }
            if (answer._id === answer2) {
                string += ` border-l-blue-500 border-t-blue-500 `;
            }
            return string;
        }
        switch (whichBot) {
            case 1: // Bot1
                if (answer._id === answer1) {
                    string += ` border-r-green-500 border-b-green-500 `;
                }
                if (answer._id === selectedAnswer) {
                    string += ` border-l-red-500 border-t-red-500 `;
                }
                break;
            case 2: // Bot2
                if (answer._id === answer2) {
                    string += ` border-r-blue-500 border-b-blue-500 `;
                }
                if (answer._id === selectedAnswer) {
                    string += ` border-l-red-500 border-t-red-500 `;
                }
                break;
            default:
                if (answer._id === answer1) {
                    string += ` border-b-green-500 `;
                }
                if (answer._id === selectedAnswer) {
                    string += ` border-l-red-500 border-t-red-500 `;
                }
                if (answer._id === answer2) {
                    string += ` border-r-blue-500 `;
                }
                break;
        }

        return string;

    }

    function getOpponentColor() {
        if (onlyBots) {
            return { 0: 'bg-green-500', 1: 'bg-blue-500' };
        }
        if (whichBot === 1) {
            return { 0: 'bg-red-500', 1: 'bg-green-500' };
        }
        if (whichBot === 2) {
            return { 0: 'bg-red-500', 1: 'bg-blue-500' };
        }
    }

    function selectAnswer(answerId: number) {
        if (loading) {
            return;
        }
        setLoading(true);
        if (selectedAnswer) {
            return;
        }

        clearInterval(interval.current);

        const { answer1, answer2 } = BotPlays();


        setTimeout(() => {
            setLoading(false);
            setTimer(5);
            setSelectedAnswer(answerId);
            setAnswer1(answer1);
            setAnswer2(answer2);
            interval.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            setTimeout(() => { onClose(generatePositions(answerId, answer1, answer2, answer_id)) }, 5000);
        }, 1000);

    }

    function generatePositions(answer1: number, answer2: number, answer3: number, correctAnswer: number) {
        let pos: any = {};
        pos[users[0].name] = answer1 === correctAnswer ? 0 : -1;
        pos[users[1].name] = answer2 === correctAnswer ? pos[users[0].name] + 1 : -1;
        pos[users[2].name] = answer3 === correctAnswer ? pos[users[1].name] + 1 : -1;
        return pos;
    }

    const [timer, setTimer] = useState(20);
    const interval = useRef<any>(null);



    useEffect(() => {
        interval.current = setInterval(() => {
            setTimer((prev) => { if (prev <= 0) { clearInterval(interval.current); selectAnswer(-1); return prev; } return prev - 1 });
        }, 1000);
        setTimeout(() => {
            if (onlyBots) {
                selectAnswer(-1);
            }
        }, 3000);
        return () => clearInterval(interval.current);
    }, [])

    function BotPlays() {
        const answer1 = (bot1.chooseAnswer(options, answer_id) || { _id: null })._id;
        const answer2 = (bot2.chooseAnswer(options, answer_id) || { _id: null })._id;

        return { answer1, answer2 };
    }


    return (
        <main className="fixed w-screen h-screen flex justify-center items-end bg-[#00000090] z-50">
            <div className="p-10 min-w-[80vw] lg:min-w-[50vw] lg:max-w-[50vw] flex flex-col gap-4 border-4 border-zinc-700 rounded-xl rounded-t-[5rem] bg-zinc-800 select-none">
                <div className="p-3 pb-6 flex justify-center items-center relative">
                    <div className="w-full absolute -top-24 left-0 flex justify-center gap-16">
                        {
                            whichBot !== 3 &&
                            <div className={"w-16 h-16 border-4 border-zinc-600 rounded-full text-3xl flex justify-center items-center " + getOpponentColor()![0]}></div>
                        }
                        <div className="w-24 h-24 bg-zinc-800 border-4 border-zinc-600 rounded-full text-3xl flex justify-center items-center">
                            {loading ? <Icon name="loader" size={32} className="animate-spin text-3xl"></Icon> : timer}
                        </div>
                        {
                            whichBot !== 3 &&
                            <div className={"w-16 h-16 border-4 border-zinc-600 rounded-full text-3xl flex justify-center items-center " + getOpponentColor()![1]}></div>
                        }
                    </div>

                    <h1 className="text-3xl text-zinc-100 text-center">{question}</h1>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {
                        options.map((answer, i) => {
                            if (selectedAnswer) {
                                return (
                                    <div key={i} className={`group border-2 w-full p-5 bg-zinc-700 rounded-md flex justify-between items-center duration-200 cursor-default ${getBackgroundColor(answer)}`}>
                                        <div className="w-6 flex justify-center items-center relative">
                                            {
                                                answer_id === answer._id ?
                                                    <Icon name="check-empty" size={24} className="opacity-100 absolute duration-200"></Icon>
                                                    :
                                                    <Icon name="circle" size={24} className="opacity-100 absolute duration-200"></Icon>
                                            }
                                        </div>
                                        <div className="text-center">{answer.answer}</div>
                                        <div></div>
                                    </div>
                                )
                            }
                            return (
                                <div onClick={onlyBots ? () => { } : () => { selectAnswer(answer._id) }} key={i} className={`group border-2 w-full p-5 bg-zinc-700 rounded-md flex justify-between items-center duration-200 ${onlyBots ? "" : "  hover:bg-zinc-600 cursor-pointer "} ${getBackgroundColor(answer)}`}>
                                    <div className="w-6 flex justify-center items-center relative">
                                        <Icon name="circle" size={24} className="opacity-100 absolute duration-200"></Icon>
                                    </div>
                                    <div className="text-center">{answer.answer}</div>
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