"use client";

import Icon from "./icons";

export default function Map({ capturedCounties = [], baseCounties = [], users }: { capturedCounties?: { capturedBy: string, county: string }[], baseCounties: { basedBy: string, county: string }[], users: { name: string, color: string }[] }) {

    function handleClick(e: any) {
        console.log(e.target.id);
    }

    const counties = [
        { name: "HUGS", x: 200, y: 200, d: "m285.3,192l0.3,2.6l1.2,4.2l0.1,4.4l-0.5,3.5l1,3.5l-0.2,6.1l3.9,3.5l-2.9,8l3.2,4.5l-1.5,3.4l-3,-1.1l-1.2,1.3l1.5,5.5l-2.1,5.7l0,4l-4.1,-4.5l-4.7,-3.1l-0.1,3.8l-2.5,-1.1l-2.5,-0.4l-2.3,2.2l-4.8,-2.3l-6.1,2.1l-5.7,4.4l-5.4,-2.4l-3.8,2.4l-6.9,-1l-2.7,4.1l-3.1,1l-2.9,0l-2,1.8l-2.4,-0.1l-2.2,-0.8l-4.5,-3.3l-5,0.4l-5,1.6l-2.4,-0.5l-1.2,2.1l-3.7,2.9l-5.2,1.9l-3.1,-5.1l-3.5,-2.6l-12.7,6.8l1.1,-5.1l1.4,-4.1l-3.3,-0.9l-14.4,8.3l-10.9,-1.9l-3.3,-2.7l-10.1,6.3l-3.8,0.8l-3.7,-3.7l-6.9,-1.6l-1.9,-1.4l-1.6,-2.1l-0.3,-0.3l1.8,-1.5l-0.5,-8l1.5,-1.6l3.9,-1.7l1.5,-2.5l0.1,-3.1l-1,-2.5l-1.9,-1.9l-2.3,-1.2l0.8,-3.9l-1.1,-4l-2.4,-3.2l-2.9,-1.3l-1.1,0.2l-1.1,0.2l-1.1,0.2l-1.1,0.2l-0.6,-0.25l-0.6,-0.25l-7.9,-3.35l-3.8,0.75l-9.3,-4.26l3.85,-5.61l1.2,1.64l1.2,0.14l2.29,-1.74l5.54,-3.04l1.29,-1.34l0.89,-1.69l-0.45,-2.39l0.5,-1.94l4.8,-2.29l5.8,0.96l10.15,3.75l2,1.4l2.05,5.1l0.3,0.7l1.5,1.5l1.5,0.9l7.5,1.2l1.2,-0.3l1.5,-1.4l2.6,-4.2l1.8,-1.5l1.9,5.2l5.1,0.9l10.6,-2.7l9.8,-1.3l2.8,-1.3l-1.6,-0.9l-1.1,-1.5l-0.7,-2l-0.2,-6.6l-0.9,-4l-0.2,-3.4l2,-2.3l-0.9,-1.2l-1.2,-3.8l-1.1,-0.8l-2.8,-1.3l-0.8,-0.9l-0.1,-2.1l1.7,-0.9l4.6,-1.1l2.2,-1.7l1.4,-2l0.7,-2.6l0.6,-3.6l-0.3,-0.4l-0.7,-0.2l-0.7,-0.4l-0.1,-0.9l0.4,-0.6l1.2,-0.8l0.3,-0.4l0.3,-1.7l0.7,-1.2l0.1,-1.3l-1.5,-1.6l8.4,-7.1l4.9,-2.9l4.9,1l5.5,1.6l1.4,0.3l8.7,1.4l4.3,3.5l13.7,18.5l1.3,1.2l1.4,0.6l3.4,0.7l1.2,0.8l4.6,6.8l1.6,1.7l1.4,-0.1l1.3,-0.6l1.5,-0.2l2,1l2.8,2l2.5,2.3l1.1,2.1l1.4,1.6l5.7,3l3,1.7l11.2,3.1l7.8,-0.5z" },
        { name: "HUKE", x: 330, y: 200, d: "m285.1,251.1l0,-4l2.1,-5.7l-1.5,-5.5l1.2,-1.3l3,1.1l1.5,-3.4l-3.2,-4.5l2.9,-8l-3.9,-3.5l0.2,-6.1l-1,-3.5l0.5,-3.5l-0.1,-4.4l-1.2,-4.2l-0.3,-2.6l30.7,-2l16.5,1.7l5,-0.5l10,-4.1l27.4,-3.2l6,0.5l4.9,2.1l4,0.8l3.9,-0.4l3.3,-2l4.4,-5.1l2.4,-1.8l3,-0.8l3.3,-1.1l0.3,0l4.1,3l4.8,1l3,4.7l1.3,3.4l0.8,6l1.7,1.8l-2.4,2.1l-3,-1l-5.5,1.9l1.4,10.2l-7,-0.8l-7,1l1.3,2.5l0.8,2.9l-3.6,2.7l-2.9,3.8l-2.1,5.3l-3.4,3.3l-22.7,1.3l-2.4,1.15l-1.8,2.3l-3,6.45l-2.1,2.2l-2.6,1.1l-3.8,3.9l-6.7,3.4l-2,2.9l1.7,1.8l1.3,2.4l-7.1,1.9l-2.4,-1.6l-1.8,-2.9l-7.8,-6.8l-2.8,-0.1l-2.3,3.7l-3.2,0.9l-3.1,0.1l-1.4,4.7l0.4,5.8l-1.5,2.4l-0.9,3.2l-15.3,3.3l-3,-0.7l-1.5,-3.6l-0.8,-4.1l-4.3,-0.7l-5.1,-2.1l0.8,-5.4l-0.4,-5.7z" },
        { name: "HUVE", x: 240, y: 300, d: "m193.9,262.3l5.2,-1.9l3.7,-2.9l1.2,-2.1l2.4,0.5l5,-1.6l5,-0.4l4.5,3.3l2.2,0.8l2.4,0.1l2,-1.8l2.9,0l3.1,-1l2.7,-4.1l6.9,1l3.8,-2.4l5.4,2.4l5.7,-4.4l6.1,-2.1l4.8,2.3l2.3,-2.2l2.5,0.4l2.5,1.1l0.1,-3.8l4.7,3.1l4.1,4.5l0.4,5.7l-0.8,5.4l5.1,2.1l4.3,0.7l0.8,4.1l1.5,3.6l3,0.7l15.3,-3.3l4.5,8.7l-4.8,1.3l-0.8,5.4l1.6,5.3l5.7,5.6l4.8,11.1l3.8,2.2l1.9,4.8l-1.1,13l1.4,5l-2,9.7l-5.1,7.9l-6.7,-3.1l-7.3,-0.6l-12.9,7.3l-3.5,0.9l-3.2,2l-5.3,5.6l-6,1.8l-24.1,14.4l-27.3,11.6l-6.9,0.9l-2.2,-1.2l-2.3,-1.8l-0.8,-4.4l-1.9,-4.2c-0.9,-0.53 -1.8,-1.07 -2.7,-1.6l-2,-1.6l-7.2,-11.7l-7.6,-17.8l-4.4,-3.5l-3.6,-2l0.7,-2.1l-0.9,-1.9l-3.5,-1.5l-1.6,-1.8l-1.4,-2.1l16.4,-4l-2.8,-20.6l0.6,-9.5l-1.1,-5.6l1.6,-4.9l1.7,-1.7l1,-2.2l-0.1,-3l1.2,-1.2l8.9,-4l-7.5,-5.2l-6,-7.5z" },
        { name: "HUVA", x: 130, y: 280, d: "m116.9,253l0.3,0.3l1.6,2.1l1.9,1.4l6.9,1.6l3.7,3.7l3.8,-0.8l10.1,-6.3l3.3,2.7l10.9,1.9l14.4,-8.3l3.3,0.9l-1.4,4.1l-1.1,5.1l12.7,-6.8l3.5,2.6l3.1,5.1l6,7.5l7.5,5.2l-8.9,4l-1.2,1.2l0.1,3l-1,2.2l-1.7,1.7l-1.6,4.9l1.1,5.6l-0.6,9.5l2.8,20.6l-16.4,4l-3.7,5.2l-1.5,-0.4l-1.5,0.3l-1,-1.1l-0.4,-1.6l-3.2,0l-1.8,2.8l0.6,2.4l-1.1,2.1l-5.6,3.3l-6.2,1.4l-3.2,-0.5l-6.2,1.4l-1.5,3.6l-2.6,0.2l-2.9,-1.1l-4.7,3.4l-13.4,0.8l-5.1,2.5l-2.2,3.6l-1.6,4.6l-2.4,3.6l-6.1,5.7l-2.7,5.1l-5.7,3.8l-6.3,0l1.2,6.8l-6.5,10l-0.8,0.8l-0.1,-0.1l-1,-0.4l-0.1,-3.3l-1.8,0.3l-1.3,-1.5l-1.1,-2.2l-1.5,-2l-1.9,-5.6l-0.3,-0.7l0.2,-0.8l0.3,-1.4l1.2,-2.1l0.6,-0.9l0.9,-2.2l0.7,-2.4l0.3,-1.7l-0.5,-1l-2,-0.1l-1.2,-0.6l-0.6,-0.8l-2,-2.5l-1.4,-0.8l-12.4,1.1l-5.9,0.5l-0.7,-0.2l-4.8,-1.2l2.1,-1l1.7,-1.6l4.9,-6.7l1.5,-1.6l3.4,-2.5l2.8,-1.2l1,-0.7l0.9,-1.5l0,-1.2l-0.1,-1l0.4,-1.2l1.3,-1.2l1.4,-0.3l1,-0.9l0.6,-3l1.3,-2.2l1.8,-0.2l5,1l5.5,-0.7l2.8,0.4l2.3,1.7l0.8,0.6l0.6,0.2l0.7,-0.2l0.6,-0.5l0,-0.1l2.2,-0.4l3.5,0l2.5,-0.6l-0.6,-2.2l-1.9,-1.7l-1.9,-0.7l-3.8,-0.4l1.6,-1.6l6,-2.4l1.5,-1l0.6,-1l-0.5,-1.1l-1.6,-0.8l-2.7,-0.9l-1,-2.6l0.9,-2.8l2.8,-1.8l3.1,-4.1l0.6,-2.3l-1.6,-2.4l-2.2,-0.2l-4.5,2.2l-1.8,-1.2l0,-1.1l1.1,-3.3l0,-1.8l-0.9,-1.2l-1.2,-0.2l-1,0.1l-0.8,-0.7l-0.5,-3.2l2.1,-4.3l-0.5,-3.5l4.2,-2.3l1.9,-1.7l0.9,-2.6l-0.6,-3.3l-4,-8.6l-0.4,-0.3l-0.6,-0.3l-0.6,-0.3l-0.4,-0.8l0.1,-1.1l0.6,-0.6l0.7,-0.3l0.2,-0.6l-0.3,-7.6l1.4,-2.5l1.6,-0.5l1.8,1.3l1.6,2.6l14.4,-6.6l5.1,-3.9z" },
        { name: "HUZA", x: 140, y: 380, d: "m81.9,400.4l0.8,-0.8l6.5,-10l-1.2,-6.8l6.3,0l5.7,-3.8l2.7,-5.1l6.1,-5.7l2.4,-3.6l1.6,-4.6l2.2,-3.6l5.1,-2.5l13.4,-0.8l4.7,-3.4l2.9,1.1l2.6,-0.2l1.5,-3.6l6.2,-1.4l3.2,0.5l6.2,-1.4l5.6,-3.3l1.1,-2.1l-0.6,-2.4l1.8,-2.8l3.2,0l0.4,1.6l1,1.1l1.5,-0.3l1.5,0.4l3.7,-5.2l1.4,2.1l1.6,1.8l3.5,1.5l0.9,1.9l-0.7,2.1l4.2,2.3l3.9,3.2l7.7,18.1l7.1,11.4l4.1,3.28l2.4,4.18l0.55,4.22l3.75,3.22l-5.05,2.62l-8.25,-0.58l-5.5,4.78l-5.2,8.8l0.8,25.7l-2.1,7l-2.3,4.3l-1.6,6.3l-15.1,3.7l-2,6.6l2.3,5l-0.7,4.4l-2.5,3.1l-2.4,0.8l-2.2,0.2l-9.4,3.5l-3.4,-4l-5.1,2l-1,-2.9l0.4,-3.1l-1.3,-3.1l-0.8,-1.1l-1.2,-1.6l-1.7,-1.7l-0.7,-0.1l-0.3,0.9l-0.3,0.7l-0.9,-0.8l-0.6,-0.8l-0.6,-0.6l-0.6,-0.4l-0.6,-0.3l-3.6,-0.8l-0.9,-0.6l-1,2.8l-1,0l-1.6,-3.5l-4.1,-2.5l-2.5,-3.3l-2.2,-3.7l-2.4,-3l-2.9,-2l-3.6,-0.7l-1.2,-0.8l-1,-0.2l-0.8,0.7l-0.6,1.7l-0.8,0l-1.8,-1.8l-5.8,-3.6l-0.8,-0.6l-1.9,-8.4l-4.5,-3.9l-5,-7.8l-4.8,-2.8l-2.4,-2l-0.6,-1.4l-0.5,-1.3l1.3,-1.9l2.5,-1.2l0.8,-0.8l1.1,-1l-0.8,-3.7l-2,-1.4l-2.5,-0.1l-0.7,-0.3z" },
        { name: "HUSO", x: 230, y: 440, d: "m176.1,453.6l15.1,-3.7l1.6,-6.3l2.3,-4.3l2.1,-7l-0.8,-25.7l5.1,-8.9l5.5,-4.5l8.9,0.5l5.5,-2.8l6.9,-0.9l27.3,-11.6l24.1,-14.4l6,-1.8l5.3,-5.6l3.2,-2l3.5,-0.9l12.9,-7.3l7.3,0.6l6.7,3.1l3,7.6l2.7,5.1l-0.4,1.3l-0.6,1.2l-0.1,11.1l0.9,5.5l-6.2,2.7l-1.5,0.3l-1.2,1.1l-1.5,3.2l-1.9,2.7l-0.9,2.8l-0.3,3.3l-2.6,5.9l-1.1,7.3l-0.4,7.6l-4,7.8l-2.5,9l1.2,8l2.9,1.7l3.9,18.4l-2.6,2.3l-0.9,4.2l-2.6,3l-15.3,1.9l-12.4,16.2l-4.1,3.3l-6.5,0.2l-6.3,2.2l-3.8,4.5l0.3,11.9l-2.3,6.1l-7.9,4.1l3.8,11.8l-2,3.9l1.5,5.8l2.9,4.6l3.8,3.5l2.2,3.9l-0.4,5.6l-3.2,1.7l-3.6,-0.3l-0.2,-1l-0.1,-2.2l-0.7,-2.9l-0.2,-1.6l-1,-1.8l-6.3,-6.7l-4.9,-2.2l-5.7,-1.2l-11.5,-0.6l-1.1,0.7l-0.4,0.7l-0.5,0.6l-0.7,0.5l-0.9,-3.1l-1.4,-0.6l-3.2,1.2l-2.7,0.2l-0.4,-0.5l0.2,-1.8l-0.8,-3.3l-1.4,2.5l-1.4,-0.4l-1.3,-1.1l-0.3,-0.3l-2,-0.7l0,-1.3l1,-0.2l1.6,-0.8l1,-0.2l-1.2,-1.6l-2.2,-0.3l-2.1,-0.8l-0.9,-3.3l-0.3,-1.9l-1.7,-6.2l-0.7,-1.8l-5.4,-7l-1.5,-0.9l-10.9,-0.4l-2,-1l-6.4,-4.9l-1.6,-1.7l-0.7,-2l-1.1,-1.5l-7.1,-5.8l-1.3,-1.7l-3.3,-6.2l-5,-5.9l-1,-0.9l-0.9,-1.1l-1.3,-3.9l5.1,-2l3.4,4l9.4,-3.5l2.2,-0.2l2.4,-0.8l2.5,-3.1l0.7,-4.4l-2.3,-5l-1.2,-5.8l3.2,-0.8z" },
        { name: "HUFE", x: 360, y: 300, d: "m430.6,334.4l-0.2,1.8l-0.6,1.3l-0.7,1.1l-0.3,1.3l0.1,2l0.61,3.71l1.11,7.78l-0.06,3.71l-2.45,3.1l-3,10.4l-6.2,2l-5.8,4l-13.1,16.7l-5.7,3.7l-2.5,0.9l-2.4,1.4l-4,-1.1l-9.5,-15l-2.7,0.2l-2.7,2.1l-1.7,3l-1.6,2.1l-1.7,0.2l-5.6,-1l-5.6,-2.6l-9.3,-7.7l-1.1,0.5l-6.8,0l-7,1.9l-0.9,-5.5l0.1,-11.1l0.6,-1.2l0.4,-1.3l-2.7,-5.1l-3,-7.6l5.1,-7.9l2,-9.7l-1.4,-5l1.1,-13l-1.9,-4.8l-3.8,-2.2l-4.8,-11.1l-5.7,-5.6l-1.6,-5.3l0.8,-5.4l4.8,-1.3l-4.5,-8.7l0.9,-3.2l1.5,-2.4l-0.4,-5.8l1.4,-4.7l3.1,-0.1l3.2,-0.9l2.3,-3.7l2.8,0.1l7.8,6.8l1.8,2.9l2.4,1.6l7.1,-1.9l-1.3,-2.4l-1.7,-1.8l2,-2.9l6.7,-3.4l3.8,-3.9l2.6,-1.1l2.1,-2.2l2.7,-6.6l4.5,-3.3l22.7,-1.3l5.3,10.8l6.8,8.5l1.5,5.1l-0.8,5.6l3.5,8.7l1.7,2l3.9,4.8l1,2.8l1.6,2.2l4.7,0.6l2.1,3.3l-1.5,9.8l-2.8,5.8l-0.7,3.7l-0.3,4l0,3.9l1.3,7.7l1.1,3.9l0.8,1.7l2.1,1.5l6.6,8.1z" },
        { name: "HUTO", x: 360, y: 420, d: "m425.1,370.6l-0.1,2.6l0.2,1.6l0.7,1.3l2.4,2.6l0.5,0.7l0.5,0.6l2.3,3.3l0.4,0.7l0.8,0.9l0.3,2l0.1,2.2l0.2,1.7l1.3,4.4l0.4,2.8l-0.7,2.7l-2,3.6l-3.8,3.9l-9.1,4.1l-3.6,4l2.5,4.6l4.1,11.6l1.7,6.4l0.3,5.9l-3.2,10.6l-0.9,6.9l0.5,3.1l1.9,3.8l0.5,2.4l0.1,16.5l-2.1,2.2l-7.6,1.7l-2.4,1.6l-0.5,1l0.4,1.1l1.6,0.7l1.6,-0.5l0.9,2.3l-2.7,6.1l-2.1,1.2l-2.1,-1.1l-1,2l1.6,3.8l3,1.6l-2.7,2.9l-3.1,1.6l-7.1,-2.1l-6.7,-3.7l-4.3,-5l-4.1,-6.2l-3.4,-7.4l-2.2,-2.5l-2.7,1.7l-2.6,0l-6.7,-6.5l-3.3,0.6l-2.3,2.7l-5.3,3.8l-2,-16.6l-2.6,-6.9l-5.1,-5.9l0.4,-3.2l-0.6,-2.5l-4.1,-0.7l-15.8,1.4l-2.2,4.2l-2.6,3.5l-3.5,-0.2l-3.4,-1.1l-3.9,-18.4l-2.9,-1.7l-1.2,-8l2.5,-9l4,-7.8l0.4,-7.6l1.1,-7.3l2.6,-5.9l0.3,-3.3l0.9,-2.8l1.9,-2.7l1.5,-3.2l1.2,-1.1l1.5,-0.3l6.2,-2.7l7,-1.9l6.8,0l1.1,-0.5l9.3,7.7l5.6,2.6l5.6,1l1.7,-0.2l1.6,-2.1l1.7,-3l2.7,-2.1l2.7,-0.2l9.5,15l4,1.1l2.4,-1.4l2.5,-0.9l5.7,-3.7l13.1,-16.7l5.8,-4l6.2,-2z" },
        { name: "HUBA", x: 320, y: 510, d: "m406.2,516.3l2.4,-0.2l2.4,0.4l0.9,2.1l0,2.7l2.2,4.7l0.1,4.6l0.9,2.8l-1,4.1l-1.8,3.7l-1,5.9l-3,3.9l2.8,2.8l-0.6,0l-1.8,-1.6l-1.3,2.1l-0.6,1.7l-0.6,1.4l-1.4,0.8l-1.6,-0.3l-5.3,-2.7l-6.6,-2.3l-2.6,0.5l-3,3l-0.5,1l-0.4,2.3l-0.3,1.2l-0.2,0l-2,2.3l-3,5.7l-1.6,2l-5.8,5l-3.4,1.3l-3.1,-1.5l-2.1,1.5l-4.7,5.8l-2.5,2l-1,0.3l-0.9,0.1l-1,-0.1l-0.8,-0.3l-0.1,0l-2.2,-2.9l-2.2,0l-2.1,1.2l-2.3,0.9l-2.3,-0.8l-2.4,-2.6l-3,0l-4.1,-3.1l-2.5,-0.8l-11,0l-1.2,0.4l-2.3,1.7l-1.5,0.5l-1.5,0l-14.1,-3.9l-9.3,0l-2.2,0l-1.2,0.7l-0.7,1.5l-0.7,1.4l-1.6,0.3l-0.1,-0.8l-2.6,-4.5l-3.9,-2.9l-16.3,-5l-3.1,-0.2l-1.1,-0.7l-0.2,-1.3l3.6,0.3l3.2,-1.7l0.4,-5.6l-2.2,-3.9l-3.8,-3.5l-2.9,-4.6l-1.5,-5.8l2,-3.9l-3.8,-11.8l7.9,-4.1l2.3,-6.1l-0.3,-11.9l3.8,-4.5l6.3,-2.2l6.5,-0.2l4.1,-3.3l12.4,-16.2l15.3,-1.9l2.6,-3l0.9,-4.2l2.6,-2.3l3.4,1.1l3.5,0.2l2.6,-3.5l2.2,-4.2l15.8,-1.4l4.1,0.7l0.6,2.5l-0.4,3.2l5.1,5.9l2.6,6.9l2,16.6l5.3,-3.8l2.3,-2.7l3.3,-0.6l6.7,6.5l2.6,0l2.7,-1.7l2.2,2.5l3.4,7.4l4.1,6.2l4.3,5l6.7,3.7l7.1,2.1z" },
        { name: "HUPE", x: 460, y: 230, d: "m521.6,338.5l-3.1,-3.1l-7.4,-12.3l-5.1,-5.1l-9.2,-1.4l-1.9,2.5l-0.3,3.9l-1.6,2.8l-4.1,1.6l-3.8,2.5l-3,5.8l-3.9,1.3l-2.7,-4.2l1,-5.5l3.2,-5.2l-0.6,-5.7l-3.8,-4.1l-4.9,-1.3l-14.4,6.5l-10,8.1l-6.2,1.8l-6.3,0.4l-2.9,6.6l-6.6,-8.1l-2.1,-1.5l-0.8,-1.7l-1.1,-3.9l-1.3,-7.7l0,-3.9l0.3,-4l0.7,-3.7l2.8,-5.8l1.5,-9.8l-2.1,-3.3l-2.45,0.05l-3.2,-1.15l-1.85,-4.9l-3.7,-4.4l-1.7,-2l-3.5,-8.7l0.8,-5.6l-1.5,-5.1l-6.8,-8.5l-5.3,-10.8l3.4,-3.3l2.1,-5.3l2.9,-3.8l3.6,-2.7l-0.8,-2.9l-1.3,-2.5l7,-1l7,0.8l-1.4,-10.2l5.5,-1.9l3,1l2.4,-2.1l-1.7,-1.8l-0.8,-6l-1.3,-3.4l-3,-4.7l-4.8,-1l-4.1,-3l-0.3,0l0.2,-0.1l-5.2,-3.8l-3.9,-3.8l-0.8,-3.8l0.3,-4.2l1.3,-8.2l-0.4,-2.3l-0.9,-0.8l-0.2,-0.8l1.7,-2.1l1.2,-0.8l2.6,-0.4l1.3,-1.1l3.6,-7.5l2.3,-1.9l12.8,-2.9l4.5,6.5l0.4,9.3l-4.7,4.2l3.2,7l16.6,11.9l10.8,-0.3l28.6,5.5l5.2,2.4l4.5,10l1.3,13.1l8,-4.6l8.3,-1.6l2,3.1l1.6,0.8l1.7,0.4l-0.8,2.6l-1.6,2.6l1.4,3.7l2.5,2.9l3.7,6.2l0.2,3.4l1.9,2.4l-1.3,5.9l2.5,5.5l4.3,2.8l5,-0.5l0.7,3.7l0,3.2l5.6,4.9l2.5,3.5l24.1,24l1.1,2.7l0,3.6l-0.6,3l0.4,2.8l2.3,3.6l3.4,2.4l4.7,7.8l-3.5,9l-0.7,9.5l4.3,9l7.4,6.6l8.5,3.3l-7.5,5.6l-4.9,-5.4l-4.5,-2.7l-3.9,1.8l-3.8,2.7l-5.6,6.8l-4.2,-1.5l-4,-3l-4.2,1l-3.8,3.6l-2.3,3.1l-2.6,0.2l-2.4,-0.7l-4.3,0.2l-10.3,-6.4l-6.1,-6.2z" },
        { name: "HUBK", x: 470, y: 400, d: "m577.1,380l-6.6,5.9l-5.8,8.2l2.7,2.1l1.2,3.5l-2.5,21.4l-4.7,5.1l-11.6,-1.8l-5.1,3.5l0.2,8l6.4,4.5l1.5,9.1l-2.3,8.8l-1.7,3.9l-2.9,-0.2l-4.2,1.4l-3.7,2.7l-3.9,0.4l-3.7,-1.2l-3.1,0.4l-2.7,2l0.4,4.6l-0.1,4.4l-2.1,4.1l-0.4,5.5l2.6,6.7l3.3,6.2l2,5.7l-2.9,-1.9l-2.8,-0.9l-2.9,-0.1l-7.8,1.5l-2.8,-0.1l-2.5,0.5l-3.3,1.5l-3.1,2.1l-2,2.2l0.3,1.5l1,1.8l0.3,1.6l-3.5,1.9l-1,1.3l-0.6,1.5l-1,1.3l-2.3,1.9l-1.1,0.4l-1.5,0.3l-1.7,0.8l-1.1,1.6l-1,2l-1.3,1.5l-2.3,0.8l-4.9,0l-2.5,0.5l-1.1,0.9l-1.6,1.2l-1,2.4l-0.6,2.3l-1.5,2l-3.7,0.7l-11.8,-1.2l-2.9,-1.8l-2,-3.8l-3,-1.2l-3.1,1.4l-2.1,3.6l-0.2,5.7l-2.4,0.7l-3.4,-0.5l-3.1,2.3l-0.5,0.7l-0.1,0.7l0.2,0.7l1,1.6l0.3,0.9l-0.2,0.6l-0.7,0.4l-2.6,-1.2l-8.2,-0.7l-2,0.2l-1.3,1.5l-1.5,0.9l-2.7,0.8l-2.3,1.6l-0.8,0l-2.8,-2.8l3,-3.9l1,-5.9l1.8,-3.7l1,-4.1l-0.9,-2.8l-0.1,-4.6l-2.2,-4.7l0,-2.7l-0.9,-2.1l-2.4,-0.4l-2.4,0.2l3.1,-1.6l2.7,-2.9l-3,-1.6l-1.6,-3.8l1,-2l2.1,1.1l2.1,-1.2l2.7,-6.1l-0.9,-2.3l-1.6,0.5l-1.6,-0.7l-0.4,-1.1l0.5,-1l2.4,-1.6l7.6,-1.7l2.1,-2.2l-0.1,-16.5l-0.5,-2.4l-1.9,-3.8l-0.5,-3.1l0.9,-6.9l3.2,-10.6l-0.3,-5.9l-1.7,-6.4l-4.1,-11.6l-2.5,-4.6l3.6,-4l9.1,-4.1l3.8,-3.9l2,-3.6l0.7,-2.7l-0.4,-2.8l-1.3,-4.4l-0.2,-1.7l-0.1,-2.2l-0.3,-2l-0.8,-0.9l-0.4,-0.7l-2.3,-3.3l-0.5,-0.6l-0.5,-0.7l-2.4,-2.6l-0.7,-1.3l-0.2,-1.6l0.1,-2.6l0.1,-3.2l0.4,-2.4l1.1,-2.9l1.3,-2.3l1.3,-1l1.1,-1.7l0.1,-3.6l-0.9,-8.2l-0.7,-3.4l-0.1,-2l0.3,-1.3l0.7,-1.1l0.6,-1.3l0.2,-1.8l2.9,-6.6l6.3,-0.4l6.2,-1.8l10,-8.1l14.4,-6.5l4.9,1.3l3.8,4.1l0.6,5.7l-3.2,5.2l-1,5.5l2.7,4.2l3.9,-1.3l3,-5.8l3.8,-2.5l4.1,-1.6l1.6,-2.8l0.3,-3.9l1.9,-2.5l9.2,1.4l5.1,5.1l7.4,12.3l3.1,3.1l5.5,5.75l10.95,6.85l4.25,-0.25l2.4,0.75l2.6,-0.2l2.3,-3.1l3.8,-3.6l4.2,-1l4,3l4.2,1.5l5.6,-6.8l3.8,-2.7l3.9,-1.8l4.5,2.7l4.9,5.4l-4.6,3.4l-0.8,1.6l0.8,1.6l2,0.6l2.1,0.4l1.6,0.7l0,1.2l-2.4,3.6l-1.3,-0.2l-2.4,-2.1l-3,-0.3l0,3.1l2.7,1.7l-2,3.7l-4,-0.3l-4.6,1.8l-2.9,4.3l0.8,0.4l-1.9,5l0.6,2.7l1.8,1.5l2.6,-0.6l3.5,1.2z" },
        { name: "HUNO", x: 490, y: 130, d: "m574,107l1.4,1.8l3.8,2.7l2.6,2.7l-1.4,0.8l-1.1,1.5l-3.8,1.8l-2.9,3.1l-3.9,1l-1.8,1.2l-0.7,2.7l1,1.1l1.6,0.8l2.9,5.4l0.9,6.6l-4,0.5l-3.3,2.9l-1.7,5.1l-0.5,4.6l-3.4,3.5l-3.7,2.4l-1.8,-1.9l-2.3,0.1l-1.9,3.1l-1.4,3.5l-3.4,2.5l-4.3,-2.5l-3.8,2.7l-6.7,11.6l-5.1,1.6l-12.6,15.1l-8.3,1.6l-8,4.6l-1.3,-13.1l-4.5,-10l-5.2,-2.4l-28.6,-5.5l-10.8,0.3l-16.6,-11.9l-3.2,-7l4.7,-4.2l-0.4,-9.3l-4.5,-6.5l6.5,-1.4l1.9,-1l3,0.2l2.7,0.1l8,-1.2l16.6,2.1l1.5,-0.3l8,-5.2l18.1,0.4l7.2,-5.1l0.2,-1l0,-1.1l0,-1.1l-0.2,-1.1l-0.1,-0.1l0,-0.1l0,-0.1l0.1,-0.1l1.5,-3.2l1.3,-7.8l1.5,-2.9l2.3,-1.4l12.3,-3.2l1.4,0l1.4,0.4l1.5,1.3l2.9,3.6l1.4,0.7l6.1,-1.2l3.2,0.5l2.4,2.9l0,2l-0.7,1.7l-0.4,1.7l4.3,1.85l5.55,-0.15l2.9,0.85l1.95,0.45l1.5,0.8l2,0.4l2,0.35l1.5,-1.1l6.1,-3.35l3.1,-1.9l5.1,-1.6l0.4,-0.2z" },
        { name: "HUHE", x: 580, y: 160, d: "m629,166.4l1.1,1.7l1.1,0.8l8.5,15.2l6.2,7.3l1.8,6.2l2.8,4.6l14.7,3l3.1,2l4.3,0.7l-0.8,1.5l-0.6,1.9l-1.8,2.5l-4,1.7l-1.4,1.3l0.8,2.3l-0.4,1.3l-0.4,0.8l-0.7,0.5l-1.2,0.3l0,1.2l-0.8,3.5l-23.7,16.1l-1.2,1.6l-0.7,4.2l-1.9,1.7l-4.8,1.6l-0.7,0.8l-1.7,2.2l-1.3,1.1l-3.3,1l-2.9,-0.9l-7.7,-5.1l-2.4,-3l-1.5,-3.5l0.9,-4.4l-2.3,-6.3l-5.1,-2.8l-2.6,-3.4l-1.4,-5.2l-1.8,-1.4l-12.7,3.5l1.3,2.8l2.1,1.5l-6.7,1.8l-7.1,-4.9l-2.2,-7.5l-1,-8.1l-5.3,-1.8l-6.4,2.1l-3.1,-0.9l-2.2,2.2l-7.4,10.1l-1.6,-0.4l-3,-2.4l-7.3,0.8l-7.3,3.3l-1.9,-2.4l-0.2,-3.4l-3.7,-6.2l-2.5,-2.9l-1.4,-3.7l1.6,-2.6l0.8,-2.6l-1.7,-0.4l-1.6,-0.8l-2,-3.1l12.6,-15.1l5.1,-1.6l6.7,-11.6l3.8,-2.7l4.3,2.5l3.4,-2.5l1.4,-3.5l1.9,-3.1l2.3,-0.1l1.8,1.9l3.7,-2.4l3.4,-3.5l0.5,-4.6l1.7,-5.1l3.3,-2.9l4,-0.5l-0.9,-6.6l-2.9,-5.4l-1.6,-0.8l-1,-1.1l0.7,-2.7l1.8,-1.2l3.9,-1l2.9,-3.1l3.8,-1.8l1.1,-1.5l1.4,-0.8l2.9,-1.3l3.2,2.7l2.6,3.2l2.2,-0.3l1.9,0.7l1.7,2.9l2.2,1.8l4.7,0l3.9,-3.4l4.8,-0.4l4.5,3.4l8.6,-11.4l7.3,7.7l2.3,2.4l0.7,4.7l-0.5,4.6l-1.7,8l-6,6.3l-1.6,2.9l0.8,3.9l2.3,2.8l2.3,3.8l0.2,3.5l-0.7,1.4l-1.4,2.3z" },
        { name: "HUJN", x: 620, y: 280, d: "m702.2,294.4l-2.6,1.3l-2,2.7l-1,2.7l-1.5,2l-3.2,1.3l-1.1,2.6l-1.5,2.5l-1.9,0.6l-1.2,2.6l-1.9,1.1l-2.7,-0.8l-2.6,1l-8.1,10l-2.2,1.6l-1.4,2.5l0.5,1.2l0.1,2.6l-5.1,6.2l0.1,3l1.3,2.5l0.7,6.4l-1.4,5.9l-2.1,1.4l-2.2,0.4l-2.5,1.8l-2.7,0.6l-1.6,-2.3l-2.1,-1.4l-3.1,2.7l-3.9,-1.1l-3.8,5.4l-4.5,-1.2l-4.7,0.5l-5.3,4.6l-1.4,5.7l2,6.5l-4.4,2.7l-4.8,1.4l-4.3,3.5l-4.9,-1.4l-4.8,-4.5l-15.4,5.1l-9.9,-6.3l-3.5,-1.2l-2.6,0.6l-1.8,-1.5l-0.6,-2.7l1.9,-5l-0.8,-0.4l2.9,-4.3l4.6,-1.8l4,0.3l2,-3.7l-2.7,-1.7l0,-3.1l3,0.3l2.4,2.1l1.3,0.2l2.4,-3.6l0,-1.2l-1.6,-0.7l-2.1,-0.4l-2,-0.6l-0.8,-1.6l0.8,-1.6l4.6,-3.4l7.5,-5.6l-8.5,-3.3l-7.4,-6.6l-4.3,-9l0.7,-9.5l1.55,-4.15l2.05,-4.75l-5,-7.5l-3.2,-2.8l-2.3,-3.6l-0.4,-2.8l0.6,-3l0,-3.6l-1.1,-2.7l-24.1,-24l-2.5,-3.5l-5.6,-4.9l0,-3.2l-0.7,-3.7l-5,0.5l-4.3,-2.8l-2.5,-5.5l1.3,-5.9l7.3,-3.3l7.3,-0.8l3,2.4l1.6,0.4l7.4,-10.1l2.2,-2.2l3.1,0.9l6.4,-2.1l5.3,1.8l1,8.1l2.2,7.5l7.1,4.9l6.7,-1.8l-2.1,-1.5l-1.3,-2.8l12.7,-3.5l1.8,1.4l1.4,5.2l2.6,3.4l5.1,2.8l2.3,6.3l-0.9,4.4l1.5,3.5l2.4,3l7.7,5.1l2.9,0.9l3.3,-1l1.3,-1.1l1.7,-2.2l0.7,-0.8l4.8,-1.6l1.9,-1.7l0.7,-4.2l1.2,-1.6l23.7,-16.1l0.8,-3.5l0,-1.2l1.2,-0.3l0.7,-0.5l0.4,-0.8l0.4,-1.3l-0.8,-2.3l1.4,-1.3l4,-1.7l1.8,-2.5l0.6,-1.9l0.8,-1.5l2.4,-1l3.7,-0.4l3.1,10.1l5.2,5.4l4.3,2l4.3,0.5l4.2,4l1.8,8l1.6,16.8l2.2,9.3l1.3,9.4l-0.7,12.5l-3.8,9.9z" },
        { name: "HUCS", x: 590, y: 430, d: "m652.4,476.7zm-26.8,-97.2l10.9,3.9l6.7,1.8l4.3,4l0.4,12.5l-1.8,9.2l0.4,14.6l2.1,3.9l4,1.7l-1.8,6.3l-2.9,5l0.8,3.9l-1.4,3.1l-0.2,7.4l4.2,-0.9l-2.2,5.4l6.42,-0.14l7.42,-1.64l1.12,2.36l2.62,-0.44l2.52,3.36l1.42,2.96l-0.28,4.86l-1.18,4.16l0.92,3.56l-13.88,7.26l-3.58,6.46l-9.98,5.26l-13.88,3.06l-13.28,-2.44l-6.78,-2.44l-15.38,6.86l-13.7,0.6c-0.73,0.87 -1.47,1.73 -2.2,2.6l-3.8,0.5l-5.6,-3.2l-8.6,-0.8l-5.4,1.2l-2,0.8l-11.2,4.7l-2.3,-0.5l-8.2,-5.3l-2,-5.7l-3.3,-6.2l-2.6,-6.7l0.4,-5.5l2.1,-4.1l0.1,-4.4l-0.4,-4.6l2.7,-2l3.1,-0.4l3.7,1.2l3.9,-0.4l3.7,-2.7l4.2,-1.4l2.9,0.2l1.7,-3.9l2.3,-8.8l-1.5,-9.1l-6.4,-4.5l-0.2,-8l5.1,-3.5l11.6,1.8l4.7,-5.1l2.5,-21.4l-1.2,-3.5l-2.7,-2.1l5.8,-8.2l6.6,-5.9l9.9,6.3l15.4,-5.1l4.8,4.5l4.9,1.4l4.3,-3.5l4.8,-1.4l4.4,-2.7z" },
        { name: "HUBZ", x: 680, y: 80, d: "m858.1,61.6l-2.8,3.1l-5,10.6l-2.8,4.6l-3.7,2.4l-1.2,-0.3l-2.6,-1.4l-1.6,0.2l-0.8,0.8l-4.5,6.7l-3.8,4.5l-1.9,1.6l-2.6,0.9l-8.5,0.6l-2,1.5l-2.4,2.6l-2.5,2l-2.2,0.1l-1.6,0.4l-10.2,6.4l-2.5,0.4l-2.6,-0.4l-5.3,-2.6l-2.2,0l-5,0.7l-8.6,-0.4l-2.5,0.4l-2,1.4l-1.9,2.4l-1.5,2.9l-1,2.8l-0.2,3.5l0.7,1.8l1,1.6l0.4,2.7l-1.3,6.3l-3.4,3.4l-4.6,1.3l-4.5,0.2l0.9,0l-6.4,0.4l-1.9,-0.4l-1.6,-1.4l-1.2,-1.7l-1.4,-1.2l-2.2,0.1l-0.9,1l-0.4,1.4l-0.5,1.2l-1.4,0.6l-3.3,-0.2l-0.9,0.2l-5.8,3.9l-1.5,1.5l-0.9,2.5l-0.8,5.2l-0.3,1.7l-0.7,2.8l-1.1,1.7l-4.4,5.2l-1.2,2.6l-0.1,1.5l0.3,1.9l0,3.7l-0.4,3.2l-0.8,1.5l-2.8,3l0.8,6.1l0,1.2l-7.4,1.4l0,1.5l-3.2,6.3l-0.9,1.1l-0.8,1.9l-6.7,6.9l-9.8,0.9l-3.7,0.4l-2.4,1l-4.3,-0.7l-3.1,-2l-14.7,-3l-2.8,-4.6l-1.8,-6.2l-6.2,-7.3l-8.5,-15.2l-1.1,-0.8l-1.1,-1.7l1.3,-1.9l0.9,-1.8l-0.5,-3.9l-1.8,-3.1l-2.5,-2.9l-0.9,-4.1l1.6,-2.9l6,-6.3l1.7,-8l0.6,-4.8l-0.7,-4.2l-2.4,-2.7l-7.3,-7.7l-8.6,11.4l-4.5,-3.4l-4.8,0.4l-3.9,3.4l-4.7,0l-2.2,-1.8l-1.7,-2.9l-1.9,-0.7l-2.2,0.3l-2.6,-3.2l-3.2,-2.7l-2.9,1.3l-2.6,-2.7l-3.8,-2.7l-1.4,-1.8l5.4,-3.3l2.5,-1l1.1,-0.9l1,-1.8l0.7,-3.6l0.6,-1.4l1.6,-2l1.2,-0.2l1.4,0.5l2.3,0.2l2.3,-1l4,-3.7l1.5,-0.7l2.7,1.4l1.5,1.6l1.6,0.7l3.1,-1.6l3.9,-3.9l3.3,-5.1l2.8,-5.9l5.2,-16l1.6,-3.1l2,-2.7l4.1,-4.3l0.3,-0.3l1.8,-2.7l0.1,-0.7l0,-0.7l0,-0.8l-0.1,-0.7l-0.2,-3.5l0,-1.7l0.2,-1.5l3.8,-1.5l8.3,-0.6l28.4,-6.6l2.2,0l2,1.1l4,3.6l2,0.5l4.2,0.5l7.3,4.4l4.7,0.5l3.4,-0.3l3.9,0.7l3.8,1.7l2.7,2.7l3.4,0.8l10.3,-5l4.5,-1l2.4,1.1l1.7,1.4l1.5,0.6l2,-1.1l1.5,-2.2l0.8,-2.2l1.1,-1.9l2.7,-1.5l2.2,-0.5l4.6,-0.1l6.9,-2.2l2,0.6l4.5,2.7l2.4,0.9l1.1,1.1l0.9,1.7l1.3,3.9l0.9,1.5l2.1,1l4.9,-0.1l2.3,0.5l1.2,2.3l1.7,8.3l1.1,2.2l7.5,11.6l3.2,3.7l3.5,2.6l4.2,1.5l4.1,-0.4l7,-3.6l5.7,-0.8l4.1,-2.4l2,-0.7l7,-0.4l2.4,-0.9l2.4,-0.1l8.1,0.8l2.5,-0.8l2.3,-1.8l2.5,-3.3l1.6,0.3l0.1,0l1.5,0.3l0.2,-0.1z" },
        { name: "HUSZ", x: 840, y: 120, d: "m857.6,225.9l-0.1,-0.1l-2.8,-3.7l-2.7,-11.5l-2.3,-3.5l-6.2,7l-3.5,-3.5l0.7,-5.2l-3.8,-6.9l-9.4,-5.3l-4.5,0.3l-3.3,5.6l-1.6,4.2l-2.5,2.5l-2.8,-1.7l-2.4,-3l-2.7,-1.1l-2.9,0l-5.6,-2.1l-2.6,-2.5l-6.6,-1.4l-2.2,-3.1l-12.6,-9.9l0.6,-11.2l1.7,-10.7l-1.4,-4.2l-4.2,-1.5l-5.2,3.1l-21.7,1.7l-6,2.4l-11.1,-8.9l-9.7,-1.3l0.8,-5.2l0.9,-2.5l1.5,-1.5l5.8,-3.9l0.9,-0.2l3.3,0.2l1.4,-0.6l0.5,-1.2l0.4,-1.4l0.9,-1l2.2,-0.1l1.4,1.2l1.2,1.7l1.6,1.4l1.9,0.4l6.4,-0.4l-0.9,0l4.5,-0.2l4.6,-1.3l3.4,-3.4l1.3,-6.3l-0.4,-2.7l-1,-1.6l-0.7,-1.8l0.2,-3.5l1,-2.8l1.5,-2.9l1.9,-2.4l2,-1.4l2.5,-0.4l8.6,0.4l5,-0.7l2.2,0l5.3,2.6l2.6,0.4l2.5,-0.4l10.2,-6.4l1.6,-0.4l2.2,-0.1l2.5,-2l2.4,-2.6l2,-1.5l8.5,-0.6l2.6,-0.9l1.9,-1.6l3.8,-4.5l4.5,-6.7l0.8,-0.8l1.6,-0.2l2.6,1.4l1.2,0.3l3.7,-2.4l2.8,-4.6l5,-10.6l2.8,-3.1l0.2,0l1.3,-1.4l4.4,-1.8l3,0.4l0.1,0.1l0.1,0.2l0,0.1l0.1,0l0.1,0.1l0.1,0.1l0.1,0.1l0.2,0.1l0.2,0.1l0.1,0.1l0.1,0.1l0.1,0l0.2,0.1l0.2,0.1l0.2,0l0.2,0.1l0.1,0l0.2,0l0.3,-0.1l0.1,0l0.2,-0.1l0.2,0l0.3,-0.1l1.9,1l0,0.1l-0.1,0.2l0,0.2l-0.1,0.1l0,0.2l-0.1,0.2l-0.1,0.2l-0.1,0.1l-0.1,0.2l0,0.2l-0.1,0.1l-0.1,0.1l0,0.1l-0.1,0.3l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.1,0.1l0,0.1l-0.2,0.1l-0.2,0.1l-0.1,0l-0.2,0.1l-0.1,0l-0.3,0l-0.3,0.1l-0.1,0l-0.1,0l-0.1,0.1l-0.1,0.1l-0.1,0.1l0,0.1l0,0.1l0,0.1l0,0.1l0.1,0.1l0.1,0.1l0.1,0.1l0.1,0l0.1,0.1l0.1,0l0.1,0.1l0.2,0.1l0.2,0.1l0.1,0.1l0.1,0.1l0.1,0.2l0.2,0.2l0.1,0.1l0.1,0.1l0,0.1l0.1,0.1l0,0.1l0.1,0.2l0.1,0.1l0,0.2l0.1,0.2l0.1,0.2l0.1,0.4l0.5,0.9l0.8,1.1l0.1,0l0.2,0.1l1.6,0.4l0.1,0l1.3,0.4l0.9,1.5l0,1.9l-0.3,2.4l0.1,2.7l1.4,4.1l6.6,10.2l0.9,0.9l0.9,0.3l1,-0.3l0.4,0.4l0.4,0.5l0.1,0l0,-0.1l0,-0.1l0,-0.1l0.1,-0.1l0,-0.1l0,-0.1l0,-0.1l0.1,-0.1l0,-0.1l0.1,0l0.1,0l0,-0.1l0.1,0l0.1,-0.1l0.1,0l0.1,-0.1l0.2,-0.1l0.1,0l0.1,0l0,-0.1l0.1,0l0,-0.1l0,-0.1l0.1,0l0,-0.1l0,-0.1l0,-0.1l0.1,-0.1l0,-0.1l0.4,0.1l2.6,1l2.1,0.5l2.1,-0.2l2.2,-1.1l0.1,0.1l0.1,0l0,-0.1l0.1,0l0,-0.1l0.1,0l0,-0.1l0.6,-0.1l0.5,0.1l0.6,0.3l9.9,13.2l1.8,4.1l1.9,6.4l1.2,2.5l-0.3,0.9l0.1,0l0.1,0l0.1,0l0.1,0l0.2,0l0.1,0l0.1,0l0.2,0.1l0.2,0.1l0,0.1l0.1,0.1l0.1,0.1l0.1,0.1l0.1,0.1l0.1,0l0.1,0l0,0.1l0.1,0l0.1,0l0.1,0l0.1,0l0.2,0l0.2,0l0.2,0l0.1,0l0.1,0l0.1,0l0.1,0l0.1,-0.1l0.1,-0.1l0.1,0l0.2,-0.1l0.1,-0.1l0.2,0l0,0.2l0,0.1l0,0.1l0.1,0.1l0,-0.1l0.2,0l0.1,0l0.1,0.1l0.2,0.2l0.1,0.1l0.1,0.1l0.2,0.4l0.3,0.3l0.3,0.3l0.1,0.1l0.2,0.1l0.2,0l0.2,0l0.4,0l0.3,0l0.1,0l0.1,0l0.1,0l0.3,0.1l0.3,0l0.3,0l0.3,0l0.1,-0.1l0.2,0l0.2,0.1l0.2,0l0.2,0.1l0.2,0.2l0.1,0.1l0.3,0.1l0.3,0.1l0.3,0l0.4,0l0.2,0l0.2,0l0.1,-0.1l0.1,-0.1l0.1,0l0.2,-0.1l0.1,-0.2l0.2,-0.3l0.2,-0.1l0.2,-0.2l0.2,-0.3l1,-0.6l2.4,-0.8l2.3,-1.5l2.3,-0.6l2.2,1.4l0.4,1l4.8,2.7l4,3.7l1.8,2.3l1.4,2.7l0.9,3.8l-0.5,2.1l-0.9,1.9l-0.1,1.1l0,0.1l-0.4,0l0,0.2l0,0.1l0.1,0.3l0,0.2l0.1,0l-0.2,0.2l-0.1,0l-0.3,-0.2l0,0.1l-0.1,0.1l0,0.1l-0.1,0.1l-0.1,0l0,0.1l-0.1,0l-0.1,0.2l0,0.1l-0.1,0.1l-0.1,0.1l0,0.1l-0.2,0.2l0,0.1l0,0.1l-0.1,0l-0.1,0.1l-0.1,0.1l0,0.1l0.1,0l0.1,0l0.1,0l0.1,0.1l0.1,0.1l0,0.1l0.1,0l0.1,0l0.1,0l0.1,0l0,0.1l0,0.1l-0.1,0.1l-1.2,1.5l1.1,2.5l4.9,4l-2.2,2.6l-3.3,6.2l-2.2,2.1l-5.4,2l-2.1,1.5l-1.5,2.7l0.1,1.7l0.7,1.3l0.2,1.4l-1.1,2.3l-0.8,0.5l-2.9,0.3l-2.7,1.3l-1.7,1.3l-3.3,4.3l-3.9,3.5l-4.9,2.1l-5.1,0.7l-4.6,-0.7l-10,-5.3l-4.1,1l-2.2,7.8l-1.5,1.5l-1.8,0.7l-1.9,0.2l-6.2,-0.9l-1.7,0.1l-2.4,0.9l-2.5,1.4l-1.5,1.6l-2.9,4.4l-1.1,1.1l-2.2,1.6l-1,1.3l-0.5,1.4l-0.5,3.7l-0.4,1.7l-3.3,4.8l-0.4,1.3l-0.1,1.4l-0.2,1.3l0,0.3l-0.7,1.5l-1.1,0.8z" },
        { name: "HUHB", x: 750, y: 230, d: "m718.2,150.4l9.7,1.3l11.1,8.9l6,-2.4l21.7,-1.7l5.2,-3.1l4.2,1.5l1.4,4.2l-1.7,10.7l-0.6,11.2l12.6,9.9l2.2,3.1l6.6,1.4l2.6,2.5l5.6,2.1l2.9,0l2.7,1.1l2.4,3l2.8,1.7l2.5,-2.5l1.6,-4.2l3.3,-5.6l4.5,-0.3l9.4,5.3l3.8,6.9l-0.7,5.2l3.5,3.5l6.2,-7l2.3,3.5l2.7,11.5l2.8,3.7l0.1,0.1l-0.8,0.5l-6.5,1.7l-8.3,6.3l-4,4.3l-2.6,4.9l0.4,6.1l1.2,6.9l0.1,6.6l-2.6,5.5l-6,1.8l-2.4,1.5l-2.5,2.7l-5.1,7.6l-0.9,2.3l-1.5,7.1l-0.7,1.8l-1.5,2.9l-0.6,2.2l0,2.3l0.3,1.7l0,1.9l-0.8,2.4l-1.1,1.6l-3,2.8l-1.3,1.9l-0.6,1.8l-0.6,3.5l-0.9,1.7l-2.7,2.7l-6.6,4.4l-3,2.8l-5.3,6.3l0.2,0.7l-3.3,0.8l-5.7,2.8l-9.2,9.3l-5.6,-0.1l-9.3,2.6l-4.5,-0.9l-2.5,-2.5l1.2,-4.8l-2.5,-2.5l-3.2,-0.9l-1.7,-3.1l0.3,-5.6l0.1,-14.2l-2.7,-5.7l-8.8,-4.3l-6,-0.7l-5.7,-2l-16.6,-10.9l3.8,-9.9l0.7,-12.5l-1.3,-9.4l-2.2,-9.3l-1.6,-16.8l-1.8,-8l-4.2,-4l-4.3,-0.5l-4.3,-2l-5.2,-5.4l-3.1,-10.1l9.8,-0.9l6.7,-6.9l0.8,-1.9l0.9,-1.1l3.2,-6.3l0,-1.5l7.4,-1.4l0,-1.2l-0.8,-6.1l2.8,-3l0.8,-1.5l0.4,-3.2l0,-3.7l-0.3,-1.9l0.1,-1.5l1.2,-2.6l4.4,-5.2l1.1,-1.7l0.7,-2.8l0.3,-1.7z" },
        { name: "HUBE", x: 690, y: 380, d: "m674.4,484.7l0,-0.1l-1.6,-2.4l-2.5,-1.9l-1,-3l1.1,-4.8l0.2,-4.6l-1.5,-3.7l-2.3,-2.9l-2.6,0.3l-1.2,-2.3l-7.1,1.9l-6.7,-0.1l2.4,-5.3l-4.3,1.1l0.1,-8.1l1.3,-2.5l-0.8,-3.9l2.9,-5l1.8,-6.3l-4,-1.7l-2.1,-3.9l-0.4,-14.6l1.8,-9.2l-0.4,-12.5l-4.3,-4l-6.7,-1.8l-10.9,-3.9l-2,-6.5l1.4,-5.7l5.3,-4.6l4.7,-0.5l4.5,1.2l3.8,-5.4l3.9,1.1l3.1,-2.7l2.1,1.4l1.6,2.3l2.7,-0.6l2.5,-1.8l2.2,-0.4l2.1,-1.4l1.4,-5.9l-0.7,-6.4l-1.3,-2.5l-0.1,-3l5.1,-6.2l-0.1,-2.6l-0.5,-1.2l1.4,-2.5l2.2,-1.6l8.1,-10l2.6,-1l2.7,0.8l1.9,-1.1l1.2,-2.6l1.9,-0.6l1.5,-2.5l1.1,-2.6l3.2,-1.3l1.5,-2l1,-2.7l2,-2.7l2.6,-1.3l16.6,10.9l5.7,2l6,0.7l8.8,4.3l2.7,5.7l-0.1,14.2l-0.3,5.6l1.7,3.1l3.2,0.9l2.5,2.5l-1.2,4.8l2.5,2.5l4.5,0.9l9.3,-2.6l5.6,0.1l9.2,-9.3l5.7,-2.8l3.3,-0.8l0.3,1l1.2,0.6l1.3,0.2l0.9,0.8l1.2,2.3l0.1,0.2l-0.5,0.2l-2.6,9.7l-1.1,1.4l-6.1,5.1l-0.6,0.2l-0.2,0.5l-0.2,2.3l0.1,2.4l0.5,2.1l0,2.1l-1.1,2.5l-1.4,1.2l-4.9,1.4l-2.8,2.6l-1.7,3.2l-2.8,7.9l-0.6,0.9l-0.5,1l-0.3,1.2l-0.1,1.2l0.3,0.5l0.3,0.5l0.4,0.4l3.6,2.4l-0.4,3.9l-2.5,3.6l-2.7,1.6l-3.6,0.6l-1.5,2.3l-0.2,0.7l-0.9,2.6l-2.8,3.7l-2.9,1.5l-4.9,-0.4l-2.9,0.8l-2,2.4l-0.8,3.7l-0.5,7.5l-1.7,3.6l-2.3,2.9l-1.9,3.1l-0.3,4l3.9,7.5l0.8,4.3l-3.1,2.3l-5.6,0.3l-2.7,0.9l-2.2,2.7l-1.4,4.2l-0.5,8.6l-1.2,3.8l-1.5,2.9l-1.3,1l-3.9,0l-0.9,0.4l-6.4,7.8l-2.4,1l-2.6,-2.3l-0.9,-1.1l-1.1,-0.6l-1.1,0l-1.3,0.6l-2.6,0.1l-5,-2.2l-2.4,-0.5l-0.9,0.3l-2,1.1l-1.3,0.1l-1.1,-0.5l-2.4,-2.1l-1.3,-0.6l-2.6,-0.2l-2.9,0.8l-1.5,0.9z" }
    ];

    function hasCaptured(county: string) {
        return baseCounties.find(c => c.county === county) || capturedCounties.find(c => c.county === county);
    }

    return (
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" strokeLinejoin="round" strokeWidth=".5" version="1.2">
            <g className="layer 2xl:scale-[130%] lg:scale-[110%]">
                <g id="features">
                    {
                        counties.map((county, index) => {
                            return (
                                <path className={`${!hasCaptured(county.name) ? 'hover:fill-zinc-500 cursor-pointer' : ''}`} key={index} d={county.d} fill={baseCounties.find(c => c.county === county.name) ? (users!.find(user => user.name === baseCounties.find(c => c.county === county.name)!.basedBy)!.color) : '#010101'} id={county.name} stroke="#ffffff" />
                            )
                        })
                    }
                </g>

                <g>
                    {
                        counties.filter(castle => baseCounties.find(cap => cap.county === castle.name)).map((castle, index) => {
                            return (
                                <foreignObject key={index} x={castle.x} y={castle.y} width="30px" height="30px" name={castle.name}>
                                    <Icon name="castle" size={30}></Icon>
                                </foreignObject>
                            )
                        })
                    }

                </g>
            </g>

        </svg>
    )
}