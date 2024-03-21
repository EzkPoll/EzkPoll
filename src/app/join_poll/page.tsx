"use client"
import WelcomeBanner from "@/components/welcome_banner";
import { useRouter } from "next/navigation";

const PageJoinPoll = () => {
    const router = useRouter();
    const handleJoinPoll = () => {
        router.push("/do_poll");
    }

    return (
        <div className="w-[600px] mx-auto border border-black flex flex-col gap-6 items-center relative bg-white px-10 py-10">
            <WelcomeBanner/>
            <div className="relative w-[132px] h-8 bg-transparent">
                <p className="tracking-[-0.024em] text-center font-medium leading-6 text-xs text-[#565656]">
                    Polling till 2024/3/21
                </p>
            </div>
            <div className="w-full">
                <h4 className="tracking-[-0.048em] text-center font-bold leading-[38px] text-2xl text-black">
                    Image generation A/B Test
                </h4>
                <p className="tracking-[-0.032em] text-center leading-6 text-base text-[#8f9bba] my-10">
                    This A/B test is to collect and train AI models to better serve people in general.
                </p>
                <p className="tracking-[-0.032em] text-center leading-6 text-base text-[#8f9bba]">
                    Less than 1 min
                </p>
                <button
                    className="text-[#4285f4] w-[296px] rounded-[9px] px-8 py-[14px] flex gap-6 justify-center items-center self-stretch relative mx-auto mt-5 bg-[#e9f1ff]"
                    onClick={handleJoinPoll}
                >
                    Join test
                </button>
            </div>
        </div>
    )
}

export default PageJoinPoll;