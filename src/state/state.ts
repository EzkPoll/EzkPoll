import { atom } from "recoil";
import { Account } from "thirdweb/wallets";

export const addressAtom = atom<Account>({
    key: 'address',
    default: undefined as any,
});

