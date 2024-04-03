import MainNav from "../components/MainNav";

const BoardsPage = () => {
  return (
    <div className="flex flex-row w-screen h-screen bg-cool_gray" role="boards">
      <MainNav />
      <div>
        {/* if no boards, show nothing */}
        {/* if no columns on selected board, show this */}
        {/* show content */}
        <p>boards</p>
      </div>
    </div>
  );
};

export default BoardsPage;
