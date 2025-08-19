import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export function GithubCallbackHandler() {
    const { loginWithGithub } = useAuth();

    useEffect(() => {
        const url = new URL(window.location.href);
        if (url.pathname === "/accounts/github/callback/") {
            const code = url.searchParams.get("code");
            if (code) {
                (async () => {
                    await loginWithGithub(code);
                    window.history.replaceState({}, "", "/");
                })();
            } else {
                window.history.replaceState({}, "", "/");
            }
        }
    }, [loginWithGithub]);

    return null;
}
