import { useState } from "react";
import { SelectUsersContext } from ".";

export const SelectUsersContextProvider = ({ children }) => {
    const [mainChecked, setMainChecked] = useState(false);
    const [allChecked, setAllChecked] = useState({});
    const [users, setUsers] = useState([]);

    const getSelectedUsers = () => {
        const selectedUsers = [];
        for (const key in allChecked) {
            if (allChecked[key]) {
                selectedUsers.push(key);
            }
        }

        return selectedUsers;
    };

    const addInputs = (data) => {
        const tempSate = { ...allChecked };
        data.forEach((e) => {
            tempSate[e.email] = false;
        });
        setAllChecked(tempSate);
    };

    const handlerMainChecked = () => {
        const tempState = { ...allChecked };
        for (const key in tempState) {
            tempState[key] = !mainChecked;
        }

        setAllChecked(tempState);

        setMainChecked(!mainChecked);
    };

    const handlerAllChecked = (event) => {
        const name = event.target.name;
        const tempState = { ...allChecked };
        tempState[name] = !tempState[name];

        setAllChecked(tempState);
    };

    return (
        <SelectUsersContext.Provider
            value={{
                addInputs,
                handlerMainChecked,
                handlerAllChecked,
                mainChecked,
                allChecked,
                getSelectedUsers,
                users,
                setUsers,
            }}
        >
            {children}
        </SelectUsersContext.Provider>
    );
};
