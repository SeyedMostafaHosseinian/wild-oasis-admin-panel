import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { CabinInterface } from "../../types/cabin.interface";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateUpdateCabin } from "./useCreateUpdateCabin";
import { Modal } from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Menus } from "../../ui/Menus";
import {
  HiMiniPencilSquare,
  HiMiniTrash,
  HiSquare2Stack,
} from "react-icons/hi2";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export function CabinRow({ cabin }: { cabin: CabinInterface }) {
  const { isLoading: isDeleting, deleteCabin } = useDeleteCabin();
  const { mutate: createUpdateCabin } = useCreateUpdateCabin(false);
  return (
    <>
      <TableRow role="row">
        <Img src={cabin.image} />
        <Cabin>{cabin.name}</Cabin>
        <div>Fits up to {cabin.maxCapacity}</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        <Discount>{cabin.discount}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabin.id} />
              <Menus.List id={cabin.id}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={() => {
                    createUpdateCabin({
                      name: "copy of " + cabin.name,
                      description: cabin.description,
                      discount: cabin.discount,
                      image: cabin.image,
                      maxCapacity: cabin.maxCapacity,
                      regularPrice: cabin.regularPrice,
                    });
                  }}
                >
                  duplicate
                </Menus.Button>
                <Modal.Open id="edit-cabin">
                  <Menus.Button icon={<HiMiniPencilSquare />}>
                    edit
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open id="delete-cabin">
                  <Menus.Button icon={<HiMiniTrash />}>delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window id="delete-cabin">
                <ConfirmDelete
                  resourceName="cabin"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(cabin?.id as number)}
                />
              </Modal.Window>
              <Modal.Window id="edit-cabin">
                <CreateCabinForm editData={cabin} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}
