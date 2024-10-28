import SignupForm from "../features/authentication/SignupForm";
import UsersTable from "../features/authentication/UsersTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import { Modal } from "../ui/Modal";
import Row from "../ui/Row";

function NewUsers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Manage users</Heading>
        <Modal>
          <Modal.Open id="create-user">
            <Button>create new user +</Button>
          </Modal.Open>
          <Modal.Window id="create-user">
            <SignupForm />
          </Modal.Window>
        </Modal>
      </Row>
      <Row>
        <UsersTable />
      </Row>
    </>
  );
}

export default NewUsers;
