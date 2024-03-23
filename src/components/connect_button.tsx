import { jsx as _jsx } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { useContext, useState, useMemo, useEffect } from "react";
import { Spinner } from "../components/Spinner.js";
import { Button } from "../components/buttons.js";
import { useCustomTheme, CustomThemeProvider, } from "../design-system/CustomThemeProvider.js";
import { fadeInAnimation } from "../design-system/animations.js";
import { ConnectedWalletDetails } from "./Details.js";
import { defaultTokens } from "./defaultTokens.js";
import { useActiveAccount, useActiveWalletChain, useActiveWalletConnectionStatus, useSwitchActiveWalletChain, } from "../../../core/hooks/wallets/wallet-hooks.js";
import { useThirdwebProviderProps } from "../../../core/hooks/others/useThirdwebProviderProps.js";
import { useTWLocale } from "../../providers/locale-provider.js";
import { useSetIsWalletModalOpen, SetModalConfigCtx, } from "../../providers/wallet-ui-states-provider.js";
import { canFitWideModal } from "../../utils/canFitWideModal.js";
const TW_CONNECT_WALLET = "tw-connect-wallet";
/**
 * A component that allows the user to connect their wallet.
 * It renders a button which when clicked opens a modal to allow users to connect to wallets specified in the `ThirdwebProvider`'s `wallets` prop.
 * @example
 * ```tsx
 * <ConnectButton />
 * ```
 * @param props
 * Props for the `ConnectButton` component
 *
 * Refer to [ConnectButtonProps](https://portal.thirdweb.com/references/typescript/v5/ConnectButtonProps) to see the available props.
 * @component
 */
export function ConnectButton(props) {
    const activeAccount = useActiveAccount();
    const activeWalletChain = useActiveWalletChain();
    const contextTheme = useCustomTheme();
    const theme = props.theme || contextTheme || "dark";
    const connectionStatus = useActiveWalletConnectionStatus();
    const locale = useTWLocale();

    useEffect(() => {
        import("./Modal/ConnectModal.js");
    }, []);

    const walletConfigs = useThirdwebProviderProps().wallets;
    const isLoading = connectionStatus === "connecting" || connectionStatus === "unknown";
    const connectButtonLabel = props.connectButton?.label || locale.connectWallet.defaultButtonTitle;
    const setIsWalletModalOpen = useSetIsWalletModalOpen();
    const setModalConfig = useContext(SetModalConfigCtx);

    const isNetworkMismatch = activeWalletChain?.id !== undefined &&
        props.chain?.id &&
        activeWalletChain.id !== props.chain.id;
    const supportedTokens = useMemo(() => {
        if (!props.supportedTokens) {
            return defaultTokens;
        }
        const tokens = { ...defaultTokens };
        for (const k in props.supportedTokens) {
            const key = Number(k);
            const tokenList = props.supportedTokens[key];
            if (tokenList) {
                tokens[key] = tokenList;
            }
        }
        return tokens;
    }, [props.supportedTokens]);
    return (_jsx(CustomThemeProvider, { theme: theme, children: (() => {
            // wallet is not connected
            if (!activeAccount) {
                // Connect Wallet button
                return (_jsx(AnimatedButton, { disabled: isLoading, className: `${props.connectButton?.className || ""} ${TW_CONNECT_WALLET}`, "data-theme": theme, "data-is-loading": isLoading, variant: "primary", type: "button", style: {
                        minWidth: "140px",
                        ...props.connectButton?.style,
                    }, "aria-label": connectionStatus === "connecting"
                        ? locale.connectWallet.connecting
                        : connectButtonLabel, onClick: () => {
                        let modalSize = props.connectModal?.size || "wide";
                        if (!canFitWideModal() || walletConfigs.length === 1) {
                            modalSize = "compact";
                        }
                        setModalConfig({
                            title: props.connectModal?.title ||
                                locale.connectWallet.defaultModalTitle,
                            theme,
                            data: undefined,
                            modalSize,
                            termsOfServiceUrl: props.connectModal?.termsOfServiceUrl,
                            privacyPolicyUrl: props.connectModal?.privacyPolicyUrl,
                            welcomeScreen: props.connectModal?.welcomeScreen,
                            titleIconUrl: props.connectModal?.titleIcon,
                            // auth: props.auth,
                            onConnect: props.onConnect,
                            chain: props.chain ? props.chain : undefined,
                            chains: props.chains,
                            showThirdwebBranding: props.connectModal?.showThirdwebBranding,
                        });
                        setIsWalletModalOpen(true);
                    }, "data-test": "connect-wallet-button", children: isLoading ? (_jsx(Spinner, { size: "sm", color: "primaryButtonText" })) : (connectButtonLabel) }));
            }
            // switch network button
            if (props.chain && isNetworkMismatch) {
                return (_jsx(SwitchNetworkButton, { style: props.switchButton?.style, className: props.switchButton?.className, switchNetworkBtnTitle: props.switchButton?.label, targetChain: props.chain }));
            }

            return (_jsx(ConnectedWalletDetails, { theme: theme, detailsButton: props.detailsButton, detailsModal: props.detailsModal, supportedTokens: supportedTokens, onDisconnect: () => {
                }, chains: props?.chains || [] }));
        })() }));
}
