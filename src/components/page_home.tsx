import React, { useEffect, useRef, useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { chainById } from "../utils/chains";
interface PollInfo {
    title: string,
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

const TEST_ON_GOING_POLLS = Array.from({ length: 10 }).fill(TEST_POLL_DATA); //FIXME testdata
const TEST_COMPLETED_POLLS = Array.from({ length: 10 }).fill(TEST_POLL_DATA); //FIXME testdata
const HomePage = () => {

    const [ongoingPolls, setOngoingPolls] = useState<any[]>(TEST_ON_GOING_POLLS);
    const [completedPolls, setCompletedPolls] = useState<any[]>(TEST_COMPLETED_POLLS);

    useEffect(() => {
        console.log(ongoingPolls);
        console.log(completedPolls);
    }, [ongoingPolls, completedPolls])

    return (
        <div className="w-full mx-auto ">
            <button
                className="bg-sky-blue hover:bg-blue-700 text-blue-700  hover:text-white font-bold py-2 px-4 rounded-lg create">
                Create Poll
            </button>
            <h1 className="text-black text-7xl text-center font-bold">
                Welcome to EzkPoll
            </h1>
            <p className="text-gray-600 text-3xl text-center my-6">
                Web2 Comfort, Web3 Power. Cast in Privacy, Count in Impact
            </p>
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

        <div className="mb-4 rounded-md shadow p-10 flex justify-between bg-white">
            <div>
                <p className="text-black">{props.poll.title}</p>
                <p className="text-gray-500">
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