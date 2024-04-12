import { Button } from "react-daisyui";

const TaskModal = () => {
  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Hello!</h3>
      <p className="py-4">Press ESC key or click the button below to close.</p>
      <div className="modal-action">
        <Button color="primary">Close</Button>
      </div>
    </div>
  );
};

export default TaskModal;
