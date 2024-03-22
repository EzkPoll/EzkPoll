import React, { useEffect, useRef, useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { chainById } from "../utils/chains";
import { useRouter } from 'next/navigation';
import WelcomeBanner from "./welcome_banner";
import { getPolls } from "@/utils/api";

interface PollInfo {
    name: string,
    description: string
}

export enum PollType {
    ongoing = "ongoing",
    completed = "completed"
}

const TEST_POLL_DATA: PollInfo = {
    title: "Test Poll",
    description: "Test Poll Description"
}

const HomePage = () => {

    const [ongoingPolls, setOngoingPolls] = useState<any[]>([]);
    const [completedPolls, setCompletedPolls] = useState<any[]>([]);

    const [allPolls, setAllPolls] = useState<any[]>([]);

    const router = useRouter();

    const handleCreatePoll = () => {
        router.push("/create_poll");
    }

    useEffect(() => {
        const init = async () => {
            const _polls = Array.from((await getPolls()).list);
            console.log("_polls", _polls);
            setAllPolls(_polls);
            const _ongoingPolls = _polls.filter((poll: any) => poll.metadata.endTime > Date.now());
            setOngoingPolls(_ongoingPolls);
            const _completedPolls = _polls.filter((poll: any) => poll.metadata.endTime < Date.now());
            setCompletedPolls(_completedPolls);
        }
        init();
    }, []);
    return (
        <div className="w-full mx-auto">
            <button
                className="bg-sky-blue hover:bg-blue-700 text-blue-700  hover:text-white font-bold py-2 px-4 rounded-lg create"
                onClick={handleCreatePoll}
            >
                Create Poll
            </button>
            <WelcomeBanner/>
            <div className="">
                <div className="w-4/5 flex mx-auto">
                <div className=" w-1/2 pr-5">
                    <h2>Ongoing Polls</h2>
                    {ongoingPolls.map((poll: PollInfo, index: number) => (
                        <PollItem
                            type={PollType.ongoing}
                            poll={poll}
                            key={index}
                        />
                    ))}
                </div>
                <div className=" w-1/2 pl-5">
                    <h2>Completed Polls</h2>
                        {completedPolls.map((poll: PollInfo, index: number) => (
                            <PollItem
                                type={PollType.completed}
                                poll={poll}
                                key={index}
                            />
                        ))}
                </div>
                </div>
            </div>
        </div>
    )
}

const PollItem = (props: {
    poll: PollInfo,
    type: PollType
}) => {
    const btnRef = useRef<any>();
    return (

        <div className="mb-4 rounded-md shadow p-10 flex justify-between bg-white h-[200px]">
            <div className="w-full box-border">
                <p className="text-black overflow-hidden w-full">{props.poll.name}</p>
                <p className="text-gray-500 overflow-hidden h-[100px] w-full">
                    {props.poll.description}
                </p>
            </div>
            <ConnectButton
                chain={chainById}
            />
            <button
                className="bg-sky-blue hover:bg-blue-700 text-blue-700  hover:text-white font-bold py-2 px-4 rounded-lg">
                {props.type === PollType.completed ? "View Result" : "Join Poll"}
            </button>
        </div>
    )
}

export default HomePage;