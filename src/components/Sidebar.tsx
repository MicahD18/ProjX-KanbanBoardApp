import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";

const Sidebar = () => {
  return (
    <div
      role="navigation"
      className="w-[250px] lg:w-[325px] bg-white h-screen absolute top-0 border-solid border-r-2 border-slate-300"
    >
      <div className="flex flex-col px-8">
        <div className="flex flex-row py-7 text-amber-500 text-xl items-center">
          <DashboardIcon />
          <p className="ml-2 plus-jakarta font-bold">ProjX</p>
        </div>
        <div className="mt-4">
          <p className="plus-jakarta font-semibold text-xs tracking-widest text-medium_gray">
            ALL BOARDS (0)
          </p>
          <button className="btn btn-sm lg:btn-md plus-jakarta text-white mt-4 h-12">
            <AddIcon />
            Create New Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
