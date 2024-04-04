import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Header = () => {
  return (
    <div
      role="header"
      className="w-full bg-white h-20 flex flex-row justify-between items-center px-2 pl-6 lg:pl-0"
    >
      <div className="flex flex-row w-[350px] lg:w-[450px] justify-between">
        <div className="flex flex-row text-[#635FC7] text-xl items-center">
          <DashboardIcon />
          <p className="ml-2 plus-jakarta font-extrabold">ProjX</p>
        </div>
        <p className="plus-jakarta text-medium_gray font-semibold">
          "Board Name"
        </p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button className="btn bg-primary_btn_idle border-none plus-jakarta text-white hover:bg-primary_btn_hover">
          <AddIcon />
          Add New Task
        </button>
        <button className="btn bg-transparent border-none text-medium_gray hover:text-white hover:bg-primary_btn_hover">
          <MoreVertIcon />
        </button>
      </div>
    </div>
  );
};

export default Header;
