import { Link } from "react-router-dom";

const getNavigationInfo = (thereIsAccount) => ({
    message: thereIsAccount
        ? "Don't have an account?"
        : "Do you have an account",
    link: thereIsAccount ? "/signup" : "/signin",
    linkMessage: thereIsAccount ? "Sign up" : "Sign in",
});

export const AuthorizationNavigation = ({ thereIsAccount }) => {
    const { link, linkMessage, message } = getNavigationInfo(thereIsAccount);

    return (
        <div className="d-flex gap-3">
            <span>{message}</span>
            <Link to={link}>{linkMessage}</Link>
        </div>
    );
};
