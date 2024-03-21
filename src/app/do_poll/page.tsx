"use client"
import WelcomeBanner from "@/components/welcome_banner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const PageJoinPoll = () => {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState(-1);
    const handleSubmit = () => {
        if (selectedId === -1) {
            alert("do not select any image");
            return;
        }
        router.push("/do_poll_finish");
    }

    return (
        <div className="rounded-[40px] py-10 flex flex-col gap-6 items-center relative w-[600px] bg-white mx-auto">
            <h1 className="text-black text-2xl text-center font-bold">
                Which image generation o you think is more natural?
            </h1>
            <p className="text-gray-600 text-md text-center my-8 px-10">
                This A/B test is to collect and train AI models to better serve people in general.
            </p>
            <p className="text-gray-600 text-md text-center mb-2 px-10">
                Choose the prefered image
            </p>
            <div className="flex gap-2">
                <div className="w-1/2" onClick={() => setSelectedId(1)} role="button">
                    <Image src="https://picsum.photos/id/16/159/254" alt="image" height={159} width={254}/>
                </div>
                <div className="w-1/2" onClick={() => setSelectedId(2)} role="button">
                    <Image src="https://picsum.photos/id/16/159/254" alt="image" height={159} width={254}/>
                </div>
            </div>
            <button
                className="text-[#4285f4] w-[296px] rounded-[9px] px-8 py-[14px] flex gap-6 justify-center items-center self-stretch relative mx-auto my-10 bg-[#e9f1ff] font-bold"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}

export default PageJoinPoll;