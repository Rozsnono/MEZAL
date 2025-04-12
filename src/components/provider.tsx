"use client";
import { getMapFromLocal, getUserFromLocal, MapContext } from "@/services/captured.context";
import React from "react";

export default function Provider({ children }: { children: React.ReactNode }) {

    const [map, setMap] = React.useState<any>(getMapFromLocal());
    const [round, setRound] = React.useState<number | null>(null);
    const [user, setUser] = React.useState<string | null>(getUserFromLocal());

    

    return (
        <MapContext.Provider value={{ map, setMap, user, setUser, round, setRound }}>
            {children}
        </MapContext.Provider>
    )
}