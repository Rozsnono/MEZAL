"use client";
import { counties, countyBorders } from "@/assets/counties";
import Map from "../components/map";
import { useEffect, useState } from "react";
import NumberTest from "@/components/number";
import Question from "@/components/question";

export default function Home() {


  const users = [
    { name: "User1", color: "#18c032" },
    { name: "User2", color: "#8c2fba" },
    { name: "User3", color: "#f4c542" },
  ]

  const [baseCounties, setBaseCounties] = useState([]);

  useEffect(() => {
    setBaseCounties(getBaseCountiesRandomly());
  }, []);

  function getBaseCountiesRandomly(): any {
    const tmpBaseCounties: any = [];

    users.forEach(user => {
      let randomCounty = counties[Math.floor(Math.random() * counties.length)];
      do {
        randomCounty = counties[Math.floor(Math.random() * counties.length)];
      } while (tmpBaseCounties.some((baseCounty: any) => baseCounty.county === randomCounty.name) || tmpBaseCounties.find((c: any) => countyBorders[c.county].includes(randomCounty.name)));
      tmpBaseCounties.push({ basedBy: user.name, county: randomCounty.name });
    });

    console.log(tmpBaseCounties);

    return tmpBaseCounties;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Map users={users} baseCounties={baseCounties}></Map>
      <Question></Question>
      {/* <NumberTest></NumberTest> */}
    </div>
  );
}
