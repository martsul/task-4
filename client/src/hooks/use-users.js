export const getUsers = async () => {
    const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        credentials: "include",
        headers: {
            "Cache-Control": "no-cache",
        },
    });

    return await response.json();
};
