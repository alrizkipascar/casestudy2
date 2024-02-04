import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SubTaskTable = ({ id }) => {
  const apiUrl = `http://localhost:8080/tasks/${id}/subtask`;
  const [dataTasks, setDataTasks] = useState(null);

  //   GET DATA
  const loadProduct = () => {
    // Make a GET request using the Fetch API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("SubTask", response);
        return response.json();
      })
      .then((e) => {
        // Process the retrieved user data
        console.log("SubTask:", e);
        setDataTasks(e.tasks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    // Update the document title using the browser API
    loadProduct();
  }, []);
  const navigate = useNavigate();
  console.log(
    "=======================SUBSTACK=======================",
    dataTasks,
    id
  );

  return (
    <section className="   h-auto lg:h-full grid justify-items-center  flex-row  py-20">
      <div className="h-screen w-full  px-6">
        <h1 className="text-3xl text-black text-bold">Sub task</h1>
        <div className="w-auto  h-full py-12 md:py-24 lg:py-32 ">
          <div className="grid grid-cols-6 gap-6 mb-24">
            <button
              onClick={() => navigate(`/tasks/${id}/subtask/new`)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-700 text-white"
            >
              New Sub Task
            </button>
          </div>
          <div className=" md:mx-6 ">
            <div className="relative w-full overflow-auto">
              <table className="caption-bottom text-sm w-full">
                <thead className="">
                  <tr className="border-b  ">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[200px]">
                      Name
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      Status
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="[&amp;_tr:last-child]:border-0">
                  {dataTasks?.map((index, i) => {
                    return (
                      <tr
                        key={i}
                        className="border-b transition-colors hover:bg-slate-400/50 "
                      >
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                          {index?.Name}
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                          {index?.Status == 0 ? "On-going" : "Completed"}
                        </td>

                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                          <button
                            onClick={() =>
                              navigate(`/tasks/${id}/subtask/${index?.ID}`)
                            }
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-slate-500 text-white"
                          >
                            Action
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubTaskTable;
