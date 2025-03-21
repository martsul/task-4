import { Container, Row } from "react-bootstrap";
import { Toolbar } from "../../components/toolbar/toolbar";
import { UsersTable } from "../../components/users-table/users-table";
import { Link } from "react-router-dom";

export const UsersPage = () => {
    return (
        <Container className="mt-4">
            <Link to="/signin">asdasda</Link>
            <Row className="mb-3">
                <Toolbar />
            </Row>
            <Row className="overflow-auto">
                <UsersTable />
            </Row>
        </Container>
    );
};
