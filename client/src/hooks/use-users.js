export const getUsers = async () => {
    const response = await fetch("https://server-6g34.onrender.com/api/users", {
        method: "GET",
        credentials: "include",
        headers: {
            "Cache-Control": "no-cache",
        },
    });

    return await response.json();
};
