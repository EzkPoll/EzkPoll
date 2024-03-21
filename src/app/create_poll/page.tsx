"use client"
import { Icon } from "@/components/icon"
import React, { useState, useRef } from "react";
import upload_icon from "@/assets/upload.png"
import Image from "next/image";
import { AddressLabel } from "@/components/components";

const Home = () => {
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState("");

    return (
        <div className="bg-gradient-to-br from-blue-200 to-white min-h-screen flex justify-center">
            <div className="w-full mx-auto">
                <Icon />
                <AddressLabel/>
                <h1 className="text-black text-7xl text-center font-bold">
                    Welcome to EzkPoll
                </h1>
                <p className="text-gray-600 text-3xl text-center my-10">
                    Web2 Comfort, Web3 Power. Cast in Privacy, Count in Impact
                </p>
                <div className="bg-white rounded-3xl max-w-2xl mx-auto p-10">
                    <div className="flex">
                        <h2 className="text-black text-center text-3xl">Create A/B testing poll</h2>
                        {/*FIXME AB testing component*/}
                    </div>
                    <form action="" className="w-full block">
                        <p>
                            You can upload A/B testing images for generating test case
                        </p>
                        <label
                            className="block text-gray-700 text-lg font-bold mb-2"
                            htmlFor="subject"
                        >
                            Test Subject
                        </label>
                        <input
                            className="w-full text-lg bg-gray-50 rounded-md px-4 py-2 mt-3 mb-8" 
                            id="subject"
                            name="subject"
                            type="text"
                            placeholder="Enter Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <label
                            className="block text-gray-700 text-lg font-bold mb-2"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <input
                            className="w-full text-lg bg-gray-50 rounded-md px-4 py-2 mt-3 mb-8" 
                            id="description"
                            name="description"
                            type="text" 
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label
                            className="block text-gray-700 text- font-bold mb-2"
                            htmlFor="duration"
                        >
                            Duration
                        </label>
                        <input
                            className="w-full text-lg bg-gray-50 rounded-md px-4 py-2 mt-3 mb-8" 
                            id="duration"
                            name="duration"
                            type="text" 
                            placeholder="Select Date Rage"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <div className="flex gap-2 my-5">
                            <div className="w-1/2 text-gray-400">
                                <p className="mb-4">
                                    Upload Case A image
                                </p>
                                <UploadComponent/>
                            </div>
                            <div className="w-1/2 text-gray-400">
                                <p className="mb-4">
                                    Upload Case B image
                                </p>
                                <UploadComponent/>
                            </div>
                        </div>
                        <button className=" mt-5 mx-auto block bg-sky-blue hover:bg-blue-700 text-blue-700  hover:text-white font-bold py-2 px-4 rounded-lg">
                            Create Poll
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

const UploadComponent = () => {
    return (
        <div className="flex items-center justify-center">
            <label htmlFor="dropzone-file" className="flex flex-col border-0 items-center justify-center w-full h-64 border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                   <Image src={upload_icon} alt="upload_icon" width={50} height={50}/>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Upload .JPG/.PNG</p>
                </div>
                <input id="dropzone-file" type="file" className="w-0" />
            </label>
        </div> 

    )
}
export default Home;