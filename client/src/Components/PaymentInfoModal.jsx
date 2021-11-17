import { Modal } from "antd";

const PaymentInfoModal = ({ showModal, session, setShowModal, orderBy }) => {
  return (
    <>
      <Modal
        visible={showModal}
        title="Payment details"
        onCancel={() => setShowModal(false)}
      >
        <p>Status: {session.payment_status}</p>
        <p>
          Amount paid: {session.amount_total / 100}{" "}
          {session.currency.toUpperCase()}
        </p>
        <p>Ordered by: {orderBy.name}</p>
      </Modal>
    </>
  );
};

export default PaymentInfoModal;
