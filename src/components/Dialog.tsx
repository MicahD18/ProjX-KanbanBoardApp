interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

const Dialog: React.FC<Props> = ({ isOpen, children }) => {
  return (
    <dialog
      className="modal modal-bottom sm:modal-middle bg-black/50"
      open={isOpen}
    >
      <div className="modal-box bg-white">
        {children}
        {/* <div className="modal-action">
          <button
            className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white mt-6 h-12 hover:bg-primary_btn_hover"
            onClick={onClose}
          >
            Close
          </button>
        </div> */}
      </div>
    </dialog>
  );
};

export default Dialog;
