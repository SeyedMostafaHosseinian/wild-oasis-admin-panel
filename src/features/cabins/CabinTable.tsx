import { CabinRow } from "./CabinRow";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import { Modal } from "../../ui/Modal";
import Table from "../../ui/Table";
import { CabinInterface } from "../../types/cabin.interface";
import { Menus } from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export function CabinTable() {
  const { isLoading, cabins } = useCabins() as {
    isLoading: boolean;
    cabins: CabinInterface[];
  };
  const [searchParams] = useSearchParams();
  const discountFilter = searchParams.get("discount") || "all";

  // 1) FILTER
  let filteredCabins: CabinInterface[] = [];
  // const filteredCabins: CabinInterface[] =
  if (discountFilter === "all") filteredCabins = cabins;
  if (discountFilter === "with-discount")
    filteredCabins = cabins?.filter((c: CabinInterface) => c.discount > 0);
  if (discountFilter === "no-discount")
    filteredCabins = cabins?.filter((c) => c.discount === 0);

  // 2) SORTING
  let sortedCabins: CabinInterface[] = filteredCabins;
  const sortParam = searchParams.get("sortBy") || "name-asc";
  const [targetFieldName, direction] = sortParam?.split("-") as [
    keyof CabinInterface,
    "asc" | "desc"
  ];
  // this is for set ascending or descending in sort method. We multiply the final result by this number for set positive of negative result
  const modifier = direction === "asc" ? 1 : -1;
  sortedCabins = filteredCabins?.sort((a, b) => {
    // if value is string we will sort by localCompare function.
    if (
      typeof a[targetFieldName] === "string" &&
      typeof b[targetFieldName] === "string"
    )
      return a[targetFieldName].localeCompare(b[targetFieldName]) * modifier;

    return (
      ((a[targetFieldName] as any) - (b[targetFieldName] as any)) * modifier
    );
  });
  if (isLoading) return <Spinner />;

  return (
    <>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>poster</div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Menus>
          <Table.Body
            data={sortedCabins as CabinInterface[]}
            render={(c: any) => (
              <CabinRow cabin={c as CabinInterface} key={c.id} />
            )}
          />
        </Menus>
      </Table>
      <div>
        <Modal>
          <Modal.Open id="new-cabin">
            <Button size="large" variation="primary">
              add new cabin
            </Button>
          </Modal.Open>
          <Modal.Window id="new-cabin">
            <CreateCabinForm />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}
