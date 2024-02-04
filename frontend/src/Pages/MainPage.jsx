import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fixDateTimeTable from "../function/fixDateTimeTable";
import compareDate from "../function/compareDate";

// import image from "../Image/background.jpg";
const MainPage = () => {
  // overflow-y-hidden
  // Specify the API endpoint for user data
  const apiUrl = "http://localhost:8080/tasks/status/";
  const [dataTasks, setDataTasks] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const loadProduct = (Status) => {
    // Make a GET request using the Fetch API
    fetch(apiUrl + Status)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("tasks", response);
        return response.json();
      })
      .then((e) => {
        // Process the retrieved user data
        console.log("Task:", e.tasks);
        setDataTasks(e.tasks);
        setStatusData(Status);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    // Update the document title using the browser API
    loadProduct(0);
  }, []);
  const navigate = useNavigate();
  if (!dataTasks) {
    return <div>Loading</div>;
  }
  console.log(new Date());

  console.log(dataTasks);
  return (
    <section className="   h-auto lg:h-full grid justify-items-center  flex-row  py-20">
      <div className="h-screen w-full  px-6">
        <h1 className="text-3xl text-black text-bold">Main Page</h1>
        <div className="w-auto  h-full py-12 md:py-24 lg:py-32 ">
          <div className="grid grid-cols-6 gap-6 mb-24">
            <button
              onClick={() => navigate(`/tasks/new`)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-700 text-white"
            >
              New task
            </button>
            <button
              onClick={() => loadProduct(0)}
              className={` ${
                statusData == 0 ? "bg-slate-400" : null
              } inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-slate-700 text-white`}
            >
              On Going
            </button>
            <button
              onClick={() => loadProduct(1)}
              className={` ${
                statusData == 1 ? "bg-slate-400" : null
              } inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-slate-700 text-white`}
            >
              Completed
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
                      Dateline
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
                          {compareDate(index?.Dateline) == true
                            ? "Not Late"
                            : "Late"}
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                          {fixDateTimeTable(index?.Dateline)}
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                          <button
                            onClick={() => navigate(`/tasks/${index?.ID}`)}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-slate-500 text-white"
                          >
                            Action
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {/* <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                  John Doe
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  Active
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-02-01
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-green-500 text-white">
                    Action
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                  Jane Smith
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  Inactive
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-01-25
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-green-500 text-white">
                    Action
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                  Alice Johnson
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  Active
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-01-20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-green-500 text-white">
                    Action
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                  Bob Williams
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  Inactive
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-01-15
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-green-500 text-white">
                    Action
                  </button>
                </td>
              </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
