import { Col, Container } from "react-bootstrap";
import { AuthorizationForm } from "../../components/authorization-from/authorization-form";
import { AuthorizationNavigation } from "../../components/authorization-navigation/authorization-navigation";

const getTitle = (thereIsAccount) =>
    thereIsAccount ? "Sign In to The App" : "Sign Up to The App";

export const AuthorizationPage = ({ thereIsAccount = true }) => {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Col xs={12} md={8} lg={6} className="d-flex flex-column gap-5">
                    <h1>{getTitle(thereIsAccount)}</h1>
                    <AuthorizationForm thereIsAccount={thereIsAccount} />
                    <AuthorizationNavigation thereIsAccount={thereIsAccount} />
            </Col>
        </Container>
    );
};
