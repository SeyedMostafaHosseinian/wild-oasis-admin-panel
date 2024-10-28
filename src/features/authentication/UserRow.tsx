import { UserInterface } from "../../types/user.interface";
import Table from "../../ui/Table";

export default function UserRow({ user }: { user: UserInterface }) {
  return (
    <Table.Row>
      <img src={user.user_metadata?.profile || ""} />
      <span>{user.email}</span>
    </Table.Row>
  );
}
