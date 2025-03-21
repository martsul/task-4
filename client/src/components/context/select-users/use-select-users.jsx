import { useContext } from "react";
import { SelectUsersContext } from ".";

export const useSelectUsers = () => useContext(SelectUsersContext);
