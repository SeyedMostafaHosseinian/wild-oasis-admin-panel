import { UserInterface } from "../../types/user.interface";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UserRow from "./UserRow";
import { useUsers } from "./useUsers";

export default function UsersTable() {
  const { isLoading, users } = useUsers();
  if (isLoading) return <Spinner />;
  return (
    <div className="w-full">
      <Table columns="1fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Avatar</div>
          <div>ID</div>
          <div>Name</div>
          <div>Email</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={users as UserInterface[]}
          render={(user) => <UserRow user={user} />}
        />
      </Table>
    </div>
  );
}
