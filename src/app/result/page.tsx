"use client";
import React, { useEffect, useRef } from "react";
import {Chart, ArcElement} from 'chart.js'
import { Doughnut } from "react-chartjs-2";
import { useRouter } from "next/navigation";

Chart.register(ArcElement);


const PageShowResult = () => {
    const canvasEl = useRef<any>(null);
    const router = useRouter();
    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: ['#fdd09f', '#fed0ee', '#dbaeff'],
            hoverOffset: 4,
        }],
    };
    const handleBack = () => {
        router.push("/");
    }

    return (
        <>
            
            <h1 className="text-black text-4xl text-center font-bold mb-10">
                Poll Result
            </h1>
            <button
                className="text-black text-xl ml-10 mb-5 font-bold "
                onClick={handleBack} 
            > 
                {`<`} Back
            </button>
            <div className=" py-10 px-10 flex flex-col gap-6 items-center relative w-full bg-white mx-auto mb-10">
                <div className="w-[600px]">
                    <Doughnut data={data}/>
                </div>
            </div>
        </>
    )
}

export default PageShowResult