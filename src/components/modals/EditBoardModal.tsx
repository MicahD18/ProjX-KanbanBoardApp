/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Board, Column } from "../../models/board.model";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onClose: () => void;
  onSaveBoard?: (updatedBoard: Board) => void;
  onCreateBoard?: (newBoard: Board) => void;
  board?: Board;
}

const EditBoardModal: React.FC<Props> = ({
  onClose,
  board,
  onSaveBoard,
  onCreateBoard,
}) => {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState<Column[]>([]);
  // State to track column input errors
  const [columnInputErrors, setColumnInputErrors] = useState<
    Record<number, string>
  >({});

  // Keep track of the original board data
  const [originalBoard, setOriginalBoard] = useState<Board | null>(null);

  useEffect(() => {
    if (board) {
      setName(board.name);
      setColumns(board.columns);
      setOriginalBoard({ ...board });
      return;
    }
    // Create new task object and bind the properties to the states for user input
    const newBoard: Board = {
      id: `board-${uuidv4()}`,
      name: "",
      columns: [],
    };
    setName(newBoard.name);
    setColumns(newBoard.columns);
    setOriginalBoard(null);
  }, [board]);

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleColumnChange = (index: number, name: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = {
      ...updatedColumns[index],
      name,
    };
    setColumns(updatedColumns);
    setColumnInputErrors((prevErrors) => ({
      ...prevErrors,
      [index]: name.trim() === "" ? "Can't be empty" : "",
    }));
  };

  const handleRemoveColumn = (column: Column) => {
    const updatedColumns = columns.filter((item) => item !== column);
    setColumns(updatedColumns);
    setColumnInputErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[columns.indexOf(column)];
      return newErrors;
    });
  };

  // TODO: NOTE: When this function is called, all the tasks in the board get erased
  const handleAddColumn = () => {
    const newColumn: Column = {
      id: `container-${uuidv4()}`,
      name: "",
      tasks: [
        {
          id: `item-${uuidv4()}`,
          title: "",
          description: "",
          status: "",
          subtasks: [],
        },
      ],
    };
    const updatedColumns = [...columns, newColumn];
    setColumns(updatedColumns);
  };

  const handleSaveBoard = () => {
    // Check if all column inputs are filled
    const hasEmptyColumns = columns.some((column) => column.name.trim() === "");
    if (hasEmptyColumns) {
      columns.forEach((column, index) => {
        setColumnInputErrors((prevErrors) => ({
          ...prevErrors,
          [index]: column.name.trim() === "" ? "Can't be empty" : "",
        }));
      });
      return;
    }

    const updatedBoard: any = {
      ...board,
      name,
      columns,
    };

    if (onSaveBoard) {
      onSaveBoard(updatedBoard);
    }

    onClose();
  };

  const handleCreateBoard = () => {
    const hasEmptyColumns = columns.some((column) => column.name.trim() === "");
    if (hasEmptyColumns) {
      columns.forEach((column, index) => {
        setColumnInputErrors((prevErrors) => ({
          ...prevErrors,
          [index]: column.name.trim() === "" ? "Can't be empty" : "",
        }));
      });
      return;
    }

    const newBoard: Board = {
      id: `board-${uuidv4()}`,
      name,
      columns,
    };

    if (onCreateBoard) {
      onCreateBoard(newBoard);
    }
  };

  const handleCancel = () => {
    if (originalBoard) {
      // Restore the state to the original board data
      setName(originalBoard.name);
      setColumns(originalBoard.columns);
      setColumnInputErrors({});
      onClose();
    }
    onClose();
  };

  return (
    <div className="plus-jakarta">
      <div className="flex flex-row w-full justify-between">
        {board ? (
          <h3 className="font-bold text-xl text-black">Edit Board</h3>
        ) : (
          <h3 className="font-bold text-xl text-black">Add New Board</h3>
        )}
      </div>
      <div className="form-group flex flex-col mt-4">
        <label htmlFor="title" className="mb-2 text-gray-500">
          Board Name
        </label>
        <input
          type="text"
          id="title"
          value={name}
          onChange={handleBoardNameChange}
          className="input input-bordered bg-white border-gray-200 border-2 text-black focus:border-primary_btn_idle"
        />
      </div>
      <p className="mt-4 text-gray-500">Board Columns</p>
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
            <button
              className="btn bg-transparent border-none text-medium_gray hover:text-white hover:bg-primary_btn_hover"
              onClick={() => handleRemoveColumn(column)}
            >
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
      <button
        className="btn button-secondary w-full border-none mt-3"
        onClick={handleAddColumn}
      >
        <AddIcon />
        Add New Column
      </button>
      {board && (
        <div className="modal-actions flex flex-row gap-3 items-center mt-8 justify-between">
          <button
            className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white h-12 hover:bg-primary_btn_hover w-[45%]"
            onClick={handleSaveBoard}
          >
            Save Changes
          </button>
          <button
            className="btn button-secondary border-none w-[45%]"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
      {!board && (
        <div className="modal-actions flex flex-row gap-3 items-center mt-8 justify-between">
          <button
            className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white h-12 hover:bg-primary_btn_hover w-[45%]"
            onClick={handleCreateBoard}
            disabled={name === ""}
          >
            Create New Board
          </button>
          <button
            className="btn button-secondary border-none w-[45%]"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBoardModal;
