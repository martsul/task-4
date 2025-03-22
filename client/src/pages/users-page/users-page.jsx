import { Container, Row } from "react-bootstrap";
import { Toolbar } from "../../components/toolbar/toolbar";
import { UsersTable } from "../../components/users-table/users-table";

export const UsersPage = () => {
    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Toolbar />
            </Row>
            <Row className="overflow-auto">
                <UsersTable />
            </Row>
        </Container>
    );
};
