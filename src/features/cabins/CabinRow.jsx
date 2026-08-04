import { formatCurrency } from "../../utils/helpers.js";
import styled from "styled-components";
import PropTypes from "prop-types";

import CreateCabinForm from "./CreateCabinForm.jsx";
import useDeleteCabin from "./useDeleteCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

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

export default function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();

  const { id, name, image, regularPrice, discount, maxCapacity } = cabin;
  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      image,
      regularPrice,
      discount,
      maxCapacity,
    });
  };
  const { isDeleting, deleteCabin } = useDeleteCabin();
  return (
    <TableRow>
      <Img src={image} alt="" />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount > 0 ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button onClick={() => handleDuplicate()} disabled={isCreating}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens={`edit-form`}>
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Open opens="confirm-delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              onConfirm={() => deleteCabin(id)}
              resourceName={cabin.name}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    maxCapacity: PropTypes.number.isRequired,
  }).isRequired,
};
