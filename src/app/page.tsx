"use client";
import { counties, countyBorders } from "@/assets/counties";
import Map from "../components/map";
import { useEffect, useState } from "react";
import NumberTest from "@/components/number";
import Question from "@/components/question";
import { Bot } from "@/services/bot.service";


export default function Home() {


  const users = [
    { name: "User1", color: "#18c032" },
    { name: "Bot1", color: "#8c2fba" },
    { name: "Bot2", color: "#f4c542" },
  ]

  const [question, setQuestion] = useState<any>(null);

  const [baseCounties, setBaseCounties] = useState([]);
  const [capturedCounties, setCapturedCounties] = useState<any>([]);

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [bot1, setBot1] = useState<any>();
  const [bot2, setBot2] = useState<any>();
  async function fetchQuestions() {
    const res = await fetch("/assets/questions.json");
    const resJson = await res.json();
    setQuestion(resJson);
  };

  useEffect(() => {

    setBaseCounties(getBaseCountiesRandomly());
    fetchQuestions();
  }, []);

  function getBaseCountiesRandomly(): any {
    const tmpBaseCounties: any = [];

    users.forEach((user: any, i: number) => {
      let randomCounty = counties[Math.floor(Math.random() * counties.length)];
      do {
        randomCounty = counties[Math.floor(Math.random() * counties.length)];
      } while (tmpBaseCounties.some((baseCounty: any) => baseCounty.county === randomCounty.name) || tmpBaseCounties.find((c: any) => countyBorders[c.county].includes(randomCounty.name)));
      tmpBaseCounties.push({ basedBy: user.name, county: randomCounty.name });
      switch (i) {
        case 1: setBot1(new Bot(user.name, randomCounty.name)); break;
        case 2: setBot2(new Bot(user.name, randomCounty.name)); break;
        default: break;
      }
    });

    console.log(tmpBaseCounties);

    return tmpBaseCounties;
  }

  function BotPlays() {
    const answer1 = bot1.chooseAnswer(question[currentQuestion].options);
    const answer2 = bot2.chooseAnswer(question[currentQuestion].options);

    const cap1 = bot1.chooseToCapture();
    const cap2 = bot2.chooseToCapture();

    console.log(answer1, cap1, answer2, cap2);
    captureCounty(cap1, bot1.id);
    captureCounty(cap2, bot2.id);
  }



  function captureCounty(county: string, user: string) {
    const tmp = capturedCounties;
    tmp.push({ county: county, capturedBy: user });
    console.log(tmp);
    setCapturedCounties(tmp);
  }

  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState("");

  function onCountySelection(county: string) {
    console.log(county);
    setShowQuestion(true);
    setSelectedCounty(county);
  }

  function onQuestionAnswered(answer: boolean) {
    if (answer) {
      console.log("Correct answer", selectedCounty);
      BotPlays();
      captureCounty(selectedCounty, users[0].name);
    }
    setShowQuestion(false);
  }

  if (!question) {
    return null;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Map onSelect={onCountySelection} users={users} baseCounties={baseCounties} capturedCounties={capturedCounties}></Map>
      {
        showQuestion &&
        <Question onClose={onQuestionAnswered} question={question[currentQuestion].question} answer_id={question[currentQuestion].answer_id} options={question[currentQuestion].options}></Question>
      }
      {/* <NumberTest></NumberTest> */}
    </div>
  );
}
