export const getUsers = async () => {
    const response = await fetch("/api/users", {
        method: "GET",
        credentials: "include",
        headers: {
            "Cache-Control": "no-cache",
        },
    });

    return await response.json();
};
