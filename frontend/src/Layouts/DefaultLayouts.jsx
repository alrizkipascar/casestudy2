import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="h-screen ">
      <div className="w-full h-auto ">
        <header className="top-0 gap-5 relative flex justify-center z-50 w-full h-12 grid-cols-2 text-white  bg-gray-800">
          Study Case 2
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
