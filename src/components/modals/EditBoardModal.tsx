import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Board, Column } from "../../models/board.model";

interface Props {
  onClose: () => void;
  board: Board;
}

const EditBoardModal: React.FC<Props> = ({ onClose, board }) => {
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState<Column[]>([]);
  // State to track column input errors
  const [columnInputErrors, setColumnInputErrors] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    setBoardName(board.name);
    setColumns(board.columns);
  }, [board]);

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const handleColumnChange = (index: number, name: string) => {
    console.log(index, name);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div>
      <div className="flex flex-row w-full justify-between">
        <h3 className="font-bold text-lg text-black">Edit Board</h3>
      </div>
      <div className="form-group flex flex-col mt-4">
        <label htmlFor="title" className="mb-2">
          Board Name
        </label>
        <input
          type="text"
          id="title"
          value={boardName}
          onChange={handleBoardNameChange}
          className="input input-bordered bg-white border-gray-200 border-2 text-black focus:border-primary_btn_idle"
        />
      </div>
      <p className="mt-4">Board Columns</p>
      <div className="flex flex-col gap-3 my-2">
        {columns.map((column, index) => (
          <div
            key={index}
            className="form-group flex flex-row items-center gap-1"
          >
            <input
              type="text"
              value={column.name}
              onChange={(e) => handleColumnChange(index, e.target.value)}
              className={`input input-bordered bg-white border-gray-200 text-black w-full border-2 focus:border-primary_btn_idle ${
                columnInputErrors[index] ? "border-red-500" : ""
              }`}
            />
            {columnInputErrors[index] && (
              <span className="text-red-500 text-sm">
                {columnInputErrors[index]}
              </span>
            )}
            <button className="btn bg-transparent border-none text-medium_gray hover:text-white hover:bg-primary_btn_hover">
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
      <button className="btn button-secondary w-full border-none mt-3">
        <AddIcon />
        Add New Column
      </button>
      <div className="modal-actions flex flex-row gap-3 items-center mt-8 justify-between">
        <button className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white h-12 hover:bg-primary_btn_hover w-52">
          Save Changes
        </button>
        <button
          className="btn button-secondary border-none w-52"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditBoardModal;
