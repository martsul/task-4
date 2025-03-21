import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { OpenLock } from "../../svg/open-lock";
import { Delete } from "../../svg/delete";
import { useToolbar } from "./use-toolbar";

export const Toolbar = () => {
    const { handlerClick, message } = useToolbar();

    return (
        <>
            <ToolbarModal message={message} />
            <div className="d-flex gap-3">
                <ToolbarButton
                    key={"banned"}
                    message={"Block users"}
                    id="banned"
                    onClick={handlerClick}
                >
                    Block
                </ToolbarButton>
                <ToolbarButton
                    key={"unbanned"}
                    message={"Unblock users"}
                    id="unbanned"
                    onClick={handlerClick}
                >
                    <OpenLock />
                </ToolbarButton>
                <ToolbarButton
                    key={"delete"}
                    message={"Delete Users"}
                    id="delete"
                    onClick={handlerClick}
                    style={"danger"}
                >
                    <Delete />
                </ToolbarButton>
            </div>
        </>
    );
};

const ToolbarButton = ({
    id,
    message,
    children,
    onClick,
    style = "primary",
}) => {
    return (
        <OverlayTrigger
            key={id}
            transition={false}
            placement={"bottom"}
            overlay={<Tooltip id={id}>{message}</Tooltip>}
        >
            <Button id={id} onClick={onClick} variant={style}>
                {children}
            </Button>
        </OverlayTrigger>
    );
};

const ToolbarModal = ({ message }) => {
    return (
        <Modal show={message}>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
        </Modal>
    );
};
