import { getContract } from "thirdweb"
import { client } from "./client"
import { chainById } from "./chains"

export const contract = getContract({
    client: client,
    address: "",  // contract address
    chain: chainById,
});