"use client";
import { counties, countyBorders } from "@/assets/counties";
import Map from "../../../components/map";
import { useContext, useEffect, useState } from "react";
import Question from "@/components/question";
import { Bot } from "@/services/bot.service";
import Rounds from "@/components/rounds";
import Loading from "@/components/loading";
import PlayerCard from "@/components/playerCard";
import { getRoundFromLocal, MapContext, setMapToLocal, setRoundToLocal } from "@/services/captured.context";
import MapWar from "@/components/map.war";
import { useRouter } from "next/navigation";


export default function War() {

    const route = useRouter();
    const { map, setMap } = useContext(MapContext);

    const users = [
        { name: "User1", color: "fill-rose-800", hover: "hover:fill-rose-600" },
        { name: "Bot1", color: "fill-green-800", hover: "hover:fill-green-600" },
        { name: "Bot2", color: "fill-blue-800", hover: "hover:fill-blue-600" },
    ]

    const [question, setQuestion] = useState<any>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const [baseCounties, setBaseCounties] = useState<any>([]);
    const [capturedCounties, setCapturedCounties] = useState<any>([]);
    const [selectedCounty, setSelectedCounty] = useState<any>({});
    const [selecting, setSelecting] = useState<boolean>(true);
    const [round, setRound] = useState<number>(0);

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [bot1, setBot1] = useState<any>();
    const [bot2, setBot2] = useState<any>();

    async function fetchQuestions() {
        const res = await fetch("/assets/questions.json");
        const resJson = await res.json();
        setQuestion(resJson);
    };

    useEffect(() => {

        // setBaseCounties(getBaseCountiesRandomly());
        fetchQuestions();
        if (map) {
            setBaseCounties(map?.filter((c) => c.basedBy) as any);
            setBot1(new Bot(users[1].name, map?.filter((c) => c.basedBy == users[1].name) as any));
            setBot2(new Bot(users[2].name, map?.filter((c) => c.basedBy == users[2].name) as any));
            if (map?.filter((c) => c.capturedBy)) {
                setRound(1);
            }
            setCapturedCounties(map?.filter((c) => c.capturedBy) as any);
            if (getRoundFromLocal()) {
                setRound(parseInt(getRoundFromLocal()));
            }
        }
    }, []);

    function captureCounty(county: any, user: string, overwrite?: string) {
        const tmp = capturedCounties;
        const selected = tmp.find((c: any) => c.county === county.county);
        if (selected) {
            selected.capturedBy = user;
        }
        setCapturedCounties(tmp);
    }

    function captureAllCounties(ownedBy: string, capturedBy: string) {
        const tmp = capturedCounties;
        const b = baseCounties.find((c: any) => c.basedBy == ownedBy);
        tmp.push({ county: b.county, capturedBy: capturedBy });
        setCapturedCounties(tmp.map((c: any) => { return c.capturedBy === ownedBy ? { ...c, capturedBy: capturedBy } : c }));
        setBaseCounties(baseCounties.filter((c: any) => c.basedBy !== ownedBy));
        setSelecting(false);
        setLoading(true);

        const map = tmp.map((c: any) => { return c.capturedBy === ownedBy ? { ...c, capturedBy: capturedBy } : c }).concat(baseCounties.filter((c: any) => c.basedBy != ownedBy));

        setTimeout(() => {
            setLoading(false);
            setMap(map);
            setMapToLocal(map);
        }, 1000);
    }

    function selectCounty(county: string, user: string, ownedBy?: string) {
        setSelectedCounty({ county: county, selectedBy: user, ownedBy: ownedBy });
    }

    const [showQuestion, setShowQuestion] = useState(false);
    const [showNumberQ, setShowNumberQ] = useState(false);

    async function onCountySelection(county: string) {
        setLoading(true);

        setSelectedCounty({ county: county, selectedBy: users[0].name, ownedBy: capturedCounties.find((c: any) => c.county === county)?.capturedBy || baseCounties.find((c: any) => c.county === county)?.basedBy });

        setSelecting(false);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowQuestion(true);

            setMap(capturedCounties.concat(baseCounties));
            setMapToLocal(capturedCounties.concat(baseCounties));
            setRoundToLocal(round.toFixed(0));
        }, 1000);

    }

    async function onQuestionFilterCheck(attackedBy: number, defendBy: number, roundplus: number, bot?: any, attackedByindex?: number) {

        if (attackedBy != -1) {
            if (defendBy != -1) {
                setCurrentQuestion(Math.floor(Math.random() * question.length));
                setSelectedCounty({});
                setMap(capturedCounties.concat(baseCounties));
                setMapToLocal(capturedCounties.concat(baseCounties));
                setRoundToLocal(round.toFixed(0));
                setRound((prev) => parseFloat((prev + roundplus).toFixed(1)));

                if (attackedByindex != 2) {
                    setTimeout(() => { BotPlayingChoosing(bot) }, 2000);
                }

                checkIfGameOver(baseCounties, round + roundplus);

                return;
            } else {
                if (baseCounties.find((c: any) => c.county === selectedCounty.county)) {
                    const updatedBaseCounties = baseCounties.map((c: any) =>
                        c.county === selectedCounty.county ? { ...c, hp: c.hp - 1 } : c
                    );
                    checkIfGameOver(updatedBaseCounties, round + roundplus);
                    setBaseCounties(updatedBaseCounties);
                    if (updatedBaseCounties.find((c: any) => c.county === selectedCounty.county && c.hp <= 0)) {
                        captureAllCounties(selectedCounty.ownedBy, users[attackedByindex!].name);
                        setSelectedCounty({});
                        setRoundToLocal(round.toFixed(0));
                        setCurrentQuestion(Math.floor(Math.random() * question.length));
                        setRound((prev) => parseFloat((prev + roundplus).toFixed(1)));

                        if (attackedByindex != 2) {
                            setTimeout(() => { BotPlayingChoosing(bot, updatedBaseCounties) }, 2000);
                        }
                        checkIfGameOver(baseCounties, round + roundplus);

                        return;
                    } else {
                        setShowQuestion(true);
                        setMap(capturedCounties.concat(baseCounties));
                        setMapToLocal(capturedCounties.concat(baseCounties));
                        setRoundToLocal(round.toFixed(0));
                        setCurrentQuestion(Math.floor(Math.random() * question.length));
                        checkIfGameOver(baseCounties, round + roundplus);

                        return;
                    }
                } else {
                    captureCounty(selectedCounty, users[attackedByindex!].name);
                    setSelectedCounty({});
                    setRound((prev) => parseFloat((prev + roundplus).toFixed(1)));

                    setMap(capturedCounties.concat(baseCounties));
                    setMapToLocal(capturedCounties.concat(baseCounties));
                    setRoundToLocal(round.toFixed(0));
                    setCurrentQuestion(Math.floor(Math.random() * question.length));
                    if (attackedByindex != 2) {
                        setTimeout(() => { BotPlayingChoosing(bot) }, 2000);
                    }
                    checkIfGameOver(baseCounties, round + roundplus);

                    return;
                }
            }
        } else {
            setCurrentQuestion(Math.floor(Math.random() * question.length));
            setSelectedCounty({});
            setMap(capturedCounties.concat(baseCounties));
            setMapToLocal(capturedCounties.concat(baseCounties));
            setRoundToLocal(round.toFixed(0));
            setRound((prev) => parseFloat((prev + roundplus).toFixed(1)));
            if (attackedByindex != 2) {
                setTimeout(() => { BotPlayingChoosing(bot) }, 2000);
            }
            checkIfGameOver(baseCounties, round + roundplus);

            return;
        }
    }

    async function onQuestionAnswered(position: any, rounds?: number = round) {
        setShowQuestion(false);
        setShowNumberQ(false);
        setLoading(true);
        await setTimeout(() => {
            setLoading(false);
            if (rounds! % 1 == 0) {
                onQuestionFilterCheck(position[users[0].name], position[selectedCounty.ownedBy], 0.3, bot1, 0);
            } else if (rounds!.toString().split(".")[1] == "3") {
                onQuestionFilterCheck(position[users[1].name], position[selectedCounty.ownedBy], 0.3, bot2, 1);
            } else if (rounds!.toString().split(".")[1] == "6") {
                onQuestionFilterCheck(position[users[2].name], position[selectedCounty.ownedBy], 0.4, null, 2);
            } else {
                setRound(parseInt(rounds.toFixed(0)));
            }
        }, 1000);
    }

    function BotPlayingChoosing(bot: any, baseCountyes: any = baseCounties) {
        setLoading(true);
        if (!baseCountyes.find((c: any) => c.basedBy == bot.id) || baseCountyes.find((c: any) => c.basedBy == bot.id && c.hp <= 0)) {
            setTimeout(() => {
                onQuestionAnswered({ [users[0].name]: -1, [users[1].name]: -1, [users[2].name]: -1 }, round + (bot.id == users[1].name ? 0.3 : 0.4));
            }, 2000);
            return;
        }
        checkIfGameOver(baseCountyes);
        const cap = bot.chooseToAttack(capturedCounties.concat(baseCountyes));
        if (cap) {
            selectCounty(cap.county, bot.id, cap.capturedBy || cap.basedBy);
            setTimeout(() => {
                setLoading(false);
                setShowQuestion(true);
                setMap(capturedCounties.concat(baseCountyes));
                setMapToLocal(capturedCounties.concat(baseCountyes));
                setRoundToLocal(round.toFixed(0));
            }, 1000);
        } else {
            // setRound(round + 1);
            // checkIfGameOver();
        }


    }

    function checkIfGameOver(baseCountyes: any = baseCounties, rounds: number = round) {
        if (rounds >= 10) {
            route.push("/end/" + getPoints()[users[0].name]);
        } else if (baseCountyes.length == 1) {
            route.push("/end/" + getPoints()[users[0].name]);
        } else if (!baseCountyes.find((c: any) => c.basedBy == users[0].name)) {
            route.push("/end/" + getPoints()[users[0].name]);
        }
        return false;
    }

    function getPoints() {
        const points: any = { User1: 0, Bot1: 0, Bot2: 0 };
        baseCounties.forEach((county: any) => {
            points[county.basedBy] += 1000;
        });
        capturedCounties.forEach((county: any) => {
            points[county.capturedBy] += 100;
        });
        return points;
    }

    if (!question) {
        return null;
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-zinc-900">
            <MapWar selectAll={baseCounties.length == 0} selectable={round % 1 == 0} onSelect={onCountySelection} selectedCounties={[selectedCounty]} users={users} baseCounties={baseCounties} capturedCounties={capturedCounties}></MapWar>
            {
                showQuestion &&
                <Question onlyBots={selectedCounty.selectedBy != users[0].name && selectedCounty.ownedBy != users[0].name} whichBot={selectedCounty.ownedBy === users[0].name ? (selectedCounty.selectedBy === users[1].name ? 1 : 2) : (selectedCounty.ownedBy === users[1].name ? 1 : 2)} onClose={onQuestionAnswered} question={question[currentQuestion].question} answer_id={question[currentQuestion].answer_id} options={question[currentQuestion].options} bot1={bot1} bot2={bot2}></Question>
            }
            {loading && <Loading></Loading>}
            <Rounds round={round}></Rounds>

            {round % 1 === 0 &&
                <main className="fixed bottom-2 left-0 w-full flex justify-center items-center">
                    <div className="flex justify-between items-center gap-6 bg-zinc-800 p-4 rounded-lg border border-zinc-700 text-3xl">
                        Foglalj el minél több vármegyét!
                    </div>
                </main>
            }

            <PlayerCard points={getPoints()} current={round}></PlayerCard>
        </div>
    );
}
