import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuthorizationForm } from "./use-authorization-form";
import { Alert } from "react-bootstrap";

export const AuthorizationForm = ({ thereIsAccount }) => {
    const { handlerSubmit, error } = useAuthorizationForm(thereIsAccount);

    return (
        <Form onSubmit={handlerSubmit}>
            {error && (
                <Alert variant="danger">
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            )}
            {!thereIsAccount && (
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        required
                        placeholder="Enter name"
                    />
                </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    name="email"
                    type="email" 
                    required
                    placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                />
            </Form.Group>
            <div className="d-grid">
                <Button variant="primary" type="submit">
                    {thereIsAccount ? "Sign In" : "Sign Up"}
                </Button>
            </div>
        </Form>
    );
};
