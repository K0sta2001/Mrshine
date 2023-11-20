import { Modal } from "antd";

export default function Popup({ visible, onClose, children, modalClass }) {
  return (
    <Modal
      open={visible}
      centered
      onCancel={onClose}
      footer={null}
      styles={{ body: { padding: 0 } }}
      mask={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className={modalClass}
    >
      {children}
    </Modal>
  );
}
