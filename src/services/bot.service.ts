import { countyBorders } from "@/assets/counties";

export class Bot {

    captureds: any[] = [];

    id: string;

    constructor(id: string, base: string) {
        this.id = id;
        this.captureds.push(base);
    }

    public setCaptured(captured: any) {
        this.captureds.push(captured);
    }

    public chooseAnswer(answers: any[]) {
        return answers[parseInt((Math.random() * answers.length).toFixed(0))]
    }

    public chooseToCapture() {
        let possible: any = [];
        this.captureds.forEach((cap: any) => {
            possible = possible.concat(countyBorders[cap]);
            console.log(countyBorders[cap], cap)
        });
        possible = possible.filter((cap: any, i: number) => { return possible.indexOf(cap) == i });
        return possible[Math.floor(Math.random() * possible.length)]
    }
}