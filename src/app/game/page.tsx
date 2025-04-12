"use client";
import { counties, countyBorders } from "@/assets/counties";
import Map from "../../components/map";
import { useContext, useEffect, useState } from "react";
import Question from "@/components/question";
import { Bot } from "@/services/bot.service";
import Rounds from "@/components/rounds";
import Loading from "@/components/loading";
import PlayerCard from "@/components/playerCard";
import { MapContext, setMapToLocal } from "@/services/captured.context";
import { useRouter } from "next/navigation";


export default function Game() {

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
    const [selectedCounties, setSelectedCounties] = useState<any>([]);
    const [selecting, setSelecting] = useState<boolean>(true);
    const [round, setRound] = useState<number>(-1);

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [bot1, setBot1] = useState<any>();
    const [bot2, setBot2] = useState<any>();

    const route = useRouter();

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
            setBot1(new Bot(users[1].name, map?.filter((c) => c.basedBy == users[1].name) as any, map?.filter((c) => c.capturedBy) as any));
            setBot2(new Bot(users[2].name, map?.filter((c) => c.basedBy == users[2].name) as any, map?.filter((c) => c.capturedBy) as any));
            if (map?.filter((c) => c.capturedBy)) {
                setRound(1);
            }
            setCapturedCounties(map?.filter((c) => c.capturedBy) as any);
            checkIfGameOver(map?.filter((c) => c.basedBy) as any, map?.filter((c) => c.capturedBy) as any);
        }
    }, []);

    function getBaseCountiesRandomly(county: string): any {
        const tmpBaseCounties: any = [];

        users.forEach(async (user: any, i: number) => {
            let randomCounty = counties[Math.floor(Math.random() * counties.length)];
            do {
                randomCounty = counties[Math.floor(Math.random() * counties.length)];
            } while (tmpBaseCounties.some((baseCounty: any) => baseCounty.county === randomCounty.name) || tmpBaseCounties.find((c: any) => countyBorders[c.county].includes(randomCounty.name)));
            switch (i) {
                case 1:
                    tmpBaseCounties.push({ basedBy: user.name, county: randomCounty.name, hp: 3 });
                    setBot1(new Bot(user.name, [{county: randomCounty.name}]));
                    break;
                case 2:
                    tmpBaseCounties.push({ basedBy: user.name, county: randomCounty.name, hp: 3 });
                    setBot2(new Bot(user.name, [ {county: randomCounty.name}]));
                    break;
                default:
                    tmpBaseCounties.push({ basedBy: user.name, county: county, hp: 3 });
                    break;
            }

            await setTimeout(() => {
            }, 1000);
        });


        return tmpBaseCounties;
    }

    function BotPlaying(bot: any, index: number) {
        if (selectedCounties.find((c: any) => c.selectedBy == users[index].name)) {
            if (selectedCounties.find((c: any) => c.selectedBy == users[index].name).county == undefined) {
                captureCounty(selectedCounties, users[0].name, bot.id);
                bot.setCaptured(selectedCounties[0].county);
            } else {
                captureCounty(selectedCounties, bot.id);
                bot.setCaptured(selectedCounties.find((c: any) => c.selectedBy == users[index].name).county);
            }
        }
    }

    function BotSelect(selectedCounty: string) {
        const cap1 = bot1.chooseToCapture(capturedCounties.concat(baseCounties).concat({ selectedBy: 'User1', county: selectedCounty }));
        const cap2 = bot2.chooseToCapture(capturedCounties.concat(baseCounties).concat({ selectedBy: 'bot1', county: cap1 }).concat({ selectedBy: 'User1', county: selectedCounty }));
        selectCounty(cap1, bot1.id);
        selectCounty(cap2, bot2.id);
    }

    function captureCounty(counties: any[], user: string, overwrite?: string) {
        const tmp = capturedCounties;
        if (!overwrite) {
            tmp.push({ county: counties.find((c: any) => c.selectedBy == user).county, capturedBy: user });
        } else {
            tmp.push({ county: counties.find((c: any) => c.selectedBy == user).county, capturedBy: overwrite, });
        }
        setCapturedCounties(tmp);
    }

    function selectCounty(county: string, user: string) {
        const tmp = selectedCounties;
        tmp.push({ county: county, selectedBy: user });
        setSelectedCounties(tmp);
    }

    const [showQuestion, setShowQuestion] = useState(false);

    async function onCountySelection(county: string) {
        setLoading(true);
        if (round == -1) {
            await setTimeout(() => {
                setBaseCounties(getBaseCountiesRandomly(county));
                setLoading(false);
                setRound(1);
            }, 1000);

            return;
        }
        const tmp = selectedCounties;
        tmp.push({ county: county, selectedBy: users[0].name });
        setSelectedCounties(tmp);
        setSelecting(false);
        BotSelect(county);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowQuestion(true);

            setMap(capturedCounties.concat(baseCounties));
            setMapToLocal(capturedCounties.concat(baseCounties));
        }, 1000);

    }

    function onQuestionAnswered(positions: any) {
        if (positions[users[0].name] != -1) {
            captureCounty(selectedCounties, users[0].name);
        }
        if (positions[users[1].name] != -1) {
            BotPlaying(bot1, 1);
        }
        if (positions[users[2].name] != -1) {
            BotPlaying(bot2, 2);
        }
        setShowQuestion(false);
        setSelecting(true);
        setSelectedCounties([]);
        setCurrentQuestion(Math.floor(Math.random() * question.length));

        setMap(capturedCounties.concat(baseCounties));
        setMapToLocal(capturedCounties.concat(baseCounties));
        checkIfGameOver();
        setRound(round + 1);
    }

    function checkIfGameOver(baseCounty: any[] = baseCounties, capturedCounty: any[] = capturedCounties) {
        const allCounties = baseCounty.concat(capturedCounty);
        if (allCounties.length >= counties.length) {
            const allCapturedOrBased = counties.every((county) =>
                allCounties.some((c: any) => c.county === county.name)
            );
            if (allCapturedOrBased) {
                route.push("/game/war");
                setRound(-1); // End the game
            }
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
            <Map selectAll={baseCounties.length == 0} selectable={selecting} onSelect={onCountySelection} selectedCounties={selectedCounties} users={users} baseCounties={baseCounties} capturedCounties={capturedCounties}></Map>
            {
                showQuestion &&
                <Question whichBot={3} onClose={onQuestionAnswered} question={question[currentQuestion].question} answer_id={question[currentQuestion].answer_id} options={question[currentQuestion].options} bot1={bot1} bot2={bot2}></Question>
            }
            {loading && <Loading></Loading>}
            <PlayerCard current={0} points={getPoints()}></PlayerCard>

            {round < 0 &&
                <main className="fixed bottom-2 left-0 w-full flex justify-center items-center">
                    <div className="flex justify-between items-center gap-6 bg-zinc-800 p-4 rounded-lg border border-zinc-700 text-3xl">
                        Válassz vármegyét a térképen!
                    </div>
                </main>
            }

            {round > 0 &&
                <main className="fixed bottom-2 left-0 w-full flex justify-center items-center">
                    <div className="flex justify-between items-center gap-6 bg-zinc-800 p-4 rounded-lg border border-zinc-700 text-3xl">
                        Foglalj el minél több vármegyét!
                    </div>
                </main>
            }
        </div>
    );
}
