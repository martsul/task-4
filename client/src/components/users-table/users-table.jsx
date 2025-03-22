import { Table } from "react-bootstrap";
import { useSelectUsers } from "../context/select-users/use-select-users";
import { getUsers } from "../../hooks/use-users";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const UsersTable = () => {
    const { users, setUsers, addInputs } = useSelectUsers();
    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then((result) => {
            if (result.redirect) {
                navigate(result.redirect);
            } else {
                setUsers(result);
                addInputs(result);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, setUsers]);

    return (
        <Table striped bordered hover>
            <UsersThead />
            {Array.isArray(users) && <UsersTbody data={users} />}
        </Table>
    );
};

const UsersThead = () => {
    const { mainChecked, handlerMainChecked } = useSelectUsers();

    return (
        <thead>
            <tr>
                <th>
                    <input
                        onChange={handlerMainChecked}
                        type="checkbox"
                        checked={mainChecked || false}
                    />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Last seen</th>
                <th>Status</th>
            </tr>
        </thead>
    );
};

const UsersTbody = ({ data = [] }) => {
    const { allChecked, handlerAllChecked } = useSelectUsers();

    return (
        <tbody>
            {data.map((e) => {
                const { id, email, name, lastEntry, isBlocked } = e;
                const date = new Date(lastEntry).toLocaleString();

                return (
                    <tr key={id}>
                        <td>
                            <input
                                type="checkbox"
                                name={email}
                                checked={allChecked[email] || false}
                                onChange={handlerAllChecked}
                            />
                        </td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{date}</td>
                        <td>{isBlocked ? "Blocked" : "Available"}</td>
                    </tr>
                );
            })}
        </tbody>
    );
};
