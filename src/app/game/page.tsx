"use client";
import { counties, countyBorders } from "@/assets/counties";
import Map from "../../components/map";
import { useEffect, useState } from "react";
import NumberTest from "@/components/number";
import Question from "@/components/question";
import { Bot } from "@/services/bot.service";
import Rounds from "@/components/rounds";
import Loading from "@/components/loading";


export default function Game() {


    const users = [
        { name: "User1", color: "#ce3838" },
        { name: "Bot1", color: "#33a32d" },
        { name: "Bot2", color: "#2d42a3" },
    ]

    const [question, setQuestion] = useState<any>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const [baseCounties, setBaseCounties] = useState([]);
    const [capturedCounties, setCapturedCounties] = useState<any>([]);
    const [selectedCounties, setSelectedCounties] = useState<any>([]);
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
    }, []);

    function getBaseCountiesRandomly(county: string): any {
        const tmpBaseCounties: any = [];

        users.forEach(async (user: any, i: number) => {
            setLoading(true);
            let randomCounty = counties[Math.floor(Math.random() * counties.length)];
            do {
                randomCounty = counties[Math.floor(Math.random() * counties.length)];
            } while (tmpBaseCounties.some((baseCounty: any) => baseCounty.county === randomCounty.name) || tmpBaseCounties.find((c: any) => countyBorders[c.county].includes(randomCounty.name)));
            switch (i) {
                case 1:
                    tmpBaseCounties.push({ basedBy: user.name, county: randomCounty.name });
                    setBot1(new Bot(user.name, randomCounty.name));
                    break;
                case 2:
                    tmpBaseCounties.push({ basedBy: user.name, county: randomCounty.name });
                    setBot2(new Bot(user.name, randomCounty.name));
                    break;
                default:
                    tmpBaseCounties.push({ basedBy: user.name, county: county });
                    break;
            }

            await setTimeout(() => {
                setLoading(false);
            }, 1000);
        });


        return tmpBaseCounties;
    }

    function BotPlays() {
        const answer1 = bot1.chooseAnswer(question[currentQuestion].options, question[currentQuestion].answer_id);
        const answer2 = bot2.chooseAnswer(question[currentQuestion].options, question[currentQuestion].answer_id);
        console.log("Bot1 answered correctly", answer1, question[currentQuestion].answer_id);
        console.log("Bot2 answered correctly", answer2);
        if (answer1._id == question[currentQuestion].answer_id) {
            captureCounty(selectedCounties, bot1.id);
        }
        if (answer2._id == question[currentQuestion].answer_id) {
            captureCounty(selectedCounties, bot2.id);
        }
    }

    function BotSelect() {
        const cap1 = bot1.chooseToCapture();
        const cap2 = bot2.chooseToCapture();
        selectCounty(cap1, bot1.id);
        selectCounty(cap2, bot2.id);
    }



    function captureCounty(counties: any[], user: string) {
        const tmp = capturedCounties;
        tmp.push({ county: counties.find((c: any) => c.selectedBy == user).county, capturedBy: user });
        console.log(tmp);
        setCapturedCounties(tmp);
    }

    function selectCounty(county: string, user: string) {
        const tmp = selectedCounties;
        tmp.push({ county: county, selectedBy: user });
        console.log(tmp);
        setSelectedCounties(tmp);
    }

    const [showQuestion, setShowQuestion] = useState(false);
    const [selectedCounty, setSelectedCounty] = useState("");

    function onCountySelection(county: string) {
        if (round == 0) {
            setBaseCounties(getBaseCountiesRandomly(county));
            setRound(1);
            return;
        }
        console.log(county);
        setSelectedCounty(county);
        const tmp = selectedCounties;
        tmp.push({ county: county, selectedBy: users[0].name });
        console.log(tmp);
        setSelectedCounties(tmp);
        setSelecting(false);
        BotSelect();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowQuestion(true);
        }, 1000);

    }

    function onQuestionAnswered(answer: boolean) {
        if (answer) {
            console.log("Correct answer", selectedCounty);

            captureCounty(selectedCounties, users[0].name);
        }
        BotPlays();
        setShowQuestion(false);
        setSelecting(true);
        setSelectedCounties([]);
        setCurrentQuestion(currentQuestion + 1);
    }

    if (!question) {
        return null;
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-zinc-900">
            <Map selectAll={baseCounties.length == 0} selectable={selecting} onSelect={onCountySelection} selectedCounties={selectedCounties} users={users} baseCounties={baseCounties} capturedCounties={capturedCounties}></Map>
            {
                showQuestion &&
                <Question onClose={onQuestionAnswered} question={question[currentQuestion].question} answer_id={question[currentQuestion].answer_id} options={question[currentQuestion].options}></Question>
            }
            {loading && <Loading></Loading>}
            <Rounds round={round}></Rounds>
            {/* {
                round == 1 &&
                <NumberTest onClose={(e) => { console.log(e) }} question={question[currentQuestion].question} answer={2000} bot1={bot1} bot2={bot2}></NumberTest>
            } */}
        </div>
    );
}
