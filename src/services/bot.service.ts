import { countyBorders, counties } from "@/assets/counties";

export class Bot {

    captureds: any[] = [];

    id: string;

    constructor(id: string, base: any, captureds?: any[] = []) {
        this.id = id;
        this.captureds = captureds;
        if(base.length > 0) {
            this.captureds.push(base[0].county);
        }
    }

    public setCaptured(captured: any) {
        this.captureds.push(captured);
    }

    public chooseToAttack(captured: any[]) {
        const tmp = captured.filter((cap: any) => { return cap.capturedBy !== this.id && cap.basedBy !== this.id });
        if (tmp.length > 0) {
            return tmp[Math.floor(Math.random() * tmp.length)];
        }
        return null;
    }

    public chooseAnswer(answers: any[], answer_id: number) {
        if (Math.random() < 0.2) {
            return answers.find((answer: any) => answer._id == answer_id);
        }
        return answers[parseInt((Math.random() * answers.length).toFixed(0))]
    }

    public chooseNumber(answer: number) {
        return Math.floor(Math.random() * (answer + (answer % 10))) + answer - (answer % 10);
    }

    public chooseToCapture(alreadyCaptured: any[]) {
        let possible: any = [];
        this.captureds.forEach((cap: any) => {
            possible = possible.concat(countyBorders[cap]);
        });
        possible = possible.filter((cap: any, i: number) => { return possible.indexOf(cap) == i });
        possible = possible.filter((cap: any) => { return !this.captureds.includes(cap) && !alreadyCaptured.find((a) => a.county == cap) });
        if (possible.length == 0) {
            possible = counties.map((c: any) => c.name);
            possible = possible.filter((cap: any) => { return !this.captureds.includes(cap) && !alreadyCaptured.find((a) => a.county == cap) });
        }
        const select = possible[Math.floor(Math.random() * possible.length)];
        return select;
    }
}