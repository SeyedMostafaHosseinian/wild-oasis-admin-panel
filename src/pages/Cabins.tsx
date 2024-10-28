import CabinTableOperations from "../features/cabins/CabinTableOperations";
import { CabinTable } from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row type="vertical">
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
