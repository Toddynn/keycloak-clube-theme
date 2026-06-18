import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirectUrlOrigin } from "@/login/shared/redirectUrlOrigin";
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@radix-ui/react-tooltip";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { FiHome } from "react-icons/fi";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import clubeLogo from "./../../assets/img/clube-logo.svg";
import { BackgroundImage } from "../BackgroundImage";
import { useInitializeTemplate } from "./useInitializeTemplate";

export function Template(props: {
    displayInfo?: boolean;
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    headerNode: ReactNode;
    socialProvidersNode?: ReactNode;
    infoNode?: ReactNode;
    documentTitle?: string;
    bodyClassName?: string;
    children: ReactNode;
}) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        children
    } = props;

    const { kcContext } = useKcContext();

    const { auth, url, message, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = useI18n();

    const { kcClsx } = useKcClsx();

    useEffect(() => {
        document.title =
            documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName || kcContext.realm.name);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitializeTemplate();

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="relative flex h-dvh flex-col gap-16 overflow-hidden overflow-y-auto p-5 text-foreground sm:p-7 lg:flex-row lg:items-center lg:gap-0">
            <BackgroundImage color="var(--color-clube-green-darker)" />

            <a
                href={kcContext.client.baseUrl ?? redirectUrlOrigin}
                className="fixed top-5 left-5 z-20 sm:top-7 sm:left-7"
            >
                <img
                    src={clubeLogo}
                    alt="Clube Pormade"
                    className="h-12 w-auto brightness-0 invert"
                />
            </a>

            <div className="absolute top-5 right-5 z-20 sm:top-7 sm:right-7">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    asChild
                >
                    <a href={kcContext.client.baseUrl ?? redirectUrlOrigin}>
                        <FiHome />
                    </a>
                </Button>
            </div>

            <aside className="relative z-10 flex w-full flex-col items-center lg:grow lg:items-start lg:justify-center">
                <div className="flex w-full max-w-xl flex-col gap-4 pt-16 text-start text-white sm:pt-20 lg:max-w-2xl lg:pt-24 lg:mb-12">
                    <h1 className="font-playfair text-4xl leading-snug font-bold sm:text-5xl lg:text-6xl">
                        {msg("welcomeTitle")}
                    </h1>
                    <p className="text-lg leading-snug text-white/90 sm:text-xl">
                        {msg("welcomeMessage")}
                    </p>
                </div>
            </aside>

            <aside className="relative z-10 flex w-full flex-col items-center lg:grow lg:justify-center">
                <Card className="kc-login-card w-full max-w-xl rounded-2xl border-0 bg-white p-2 shadow-sm sm:p-4">
                    <CardHeader className="text-center">
                        <CardTitle>
                            {(() => {
                                const node = !(
                                    auth !== undefined &&
                                    auth.showUsername &&
                                    !auth.showResetCredentials
                                ) ? (
                                    <div className="text-start">{headerNode}</div>
                                ) : (
                                    <div
                                        id="kc-username"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <label
                                            className="text-lg font-semibold"
                                            id="kc-attempted-username"
                                        >
                                            {auth.attemptedUsername}
                                        </label>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" size="icon" asChild>
                                                        <a
                                                            id="reset-login"
                                                            href={url.loginRestartFlowUrl}
                                                            aria-label={msgStr("restartLoginTooltip")}
                                                        >
                                                            <RotateCcw className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{msg("restartLoginTooltip")}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                );

                                if (displayRequiredFields) {
                                    return (
                                        <div className="flex items-center justify-between gap-2">
                                            <div>{node}</div>
                                            <div>
                                                <span className="subtitle">
                                                    <span className="text-red-500">*</span>
                                                    {msg("requiredFields")}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }

                                return node;
                            })()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div id="kc-content">
                            <div id="kc-content-wrapper">
                                {displayMessage &&
                                    message !== undefined &&
                                    (message.type !== "warning" || !isAppInitiatedAction) && (
                                        <Alert variant={message.type} className="my-3">
                                            <AlertDescription>
                                                <div>
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: kcSanitize(message.summary)
                                                        }}
                                                    />
                                                </div>
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                <div className="children">{children}</div>
                                {socialProvidersNode}
                                {auth !== undefined && auth.showTryAnotherWayLink && (
                                    <form
                                        id="kc-select-try-another-way-form"
                                        action={url.loginAction}
                                        method="post"
                                    >
                                        <div className={kcClsx("kcFormGroupClass")}>
                                            <input type="hidden" name="tryAnotherWay" value="on" />
                                            <a
                                                href="#"
                                                id="try-another-way"
                                                onClick={(event) => {
                                                    document.forms[
                                                        "kc-select-try-another-way-form" as never
                                                    ].submit();
                                                    event.preventDefault();
                                                    return false;
                                                }}
                                            >
                                                {msg("doTryAnotherWay")}
                                            </a>
                                        </div>
                                    </form>
                                )}
                                {displayInfo && (
                                    <div className="mt-4 text-center text-sm text-muted-foreground">
                                        {infoNode}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
}
