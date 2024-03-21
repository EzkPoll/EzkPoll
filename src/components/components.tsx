import React from "react"
import { useRecoilValue } from "recoil"
import { addressAtom } from "@/state/state";

export const AddressLabel = () => {
    const walletAddress = useRecoilValue(addressAtom);
    return (
        <div className="font-bold bg-white text-gray-500 py-2 px-4 rounded address">
            {/* {
                walletAddress &&
                    walletAddress.address.slice(0, 6) +
                    "..." +
                    walletAddress.address.slice(-4)
            } */}
            0x400..237
        </div>
    )
};