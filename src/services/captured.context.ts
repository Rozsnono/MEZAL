import { createContext } from "react";


export interface Map {
    map: null | [{ capturedBy?: string, basedBy?: string, county: string }];
    setMap: (map: [{ capturedBy?: string, basedBy?: string, county: string }] | null) => void;
    user: null | string;
    setUser: (user: string | null) => void;
    round: null | number;
    setRound: (round: number | null) => void;
}

export const MapContext = createContext<Map>({
    map: getMapFromLocal(),
    setMap: (cmap: any) => { setMapToLocal(cmap) },
    user: getUserFromLocal(),
    setUser: (user: string | null) => { },
    round: null,
    setRound: (round: number | null) => { },
});

export function setMapToLocal(map: any) {
    localStorage.setItem("map", JSON.stringify(map));
}
export function getMapFromLocal() {
    if (typeof window == "undefined") {
        return null;
    } else {
        const map = localStorage.getItem("map");
        if (map) {
            return JSON.parse(map);
        }
        return null;
    }
}
export function clearMapFromLocal() {
    localStorage.removeItem("map");
    localStorage.removeItem("round");
}

export function setUserToLocal(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
}
export function getUserFromLocal() {
    if (typeof window == "undefined") {
        return null;
    }
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    }
    return null;
}
export function clearUserFromLocal() {
    localStorage.removeItem("user");
}

export function setRoundToLocal(round: string) {
    localStorage.setItem("round", JSON.stringify(round));
}
export function getRoundFromLocal() {
    if (typeof window == "undefined") {
        return null;
    }
    const round = localStorage.getItem("round");
    if (round) {
        return JSON.parse(round);
    }
    return null;
}