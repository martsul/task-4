import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthorizationPage } from "./pages/authorization-page/authorization-page";
import { UsersPage } from "./pages/users-page/users-page";
import { SelectUsersContextProvider } from "./components/context/select-users/select-users-context";

export const App = () => {
    const router = createBrowserRouter([
        { path: "/", element: <UsersPage /> },
        { path: "/signin", element: <AuthorizationPage /> },
        {
            path: "/signup",
            element: <AuthorizationPage thereIsAccount={false} />,
        },
    ]);

    return (
        <SelectUsersContextProvider>
            <RouterProvider router={router} />
        </SelectUsersContextProvider>
    );
};
