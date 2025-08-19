const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;
const SCOPES = encodeURIComponent("read:user user:email repo");

export function GithubLoginButton() {
    const href =
        `https://github.com/login/oauth/authorize` +
        `?client_id=${encodeURIComponent(CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&scope=${SCOPES}`;

    return (
        <a href={href}>
            <button>Login with GitHub</button>
        </a>
    );
}
