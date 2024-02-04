import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fixDate from "../function/fixDate";
import SubTaskTable from "./SubtaskTable";

const Tasks = () => {
  const [task, setDataTask] = useState(null);

  const [Loading, setLoading] = useState(true);
  const apiUrl = "http://localhost:8080/tasks";
  const navigate = useNavigate();
  const { id } = useParams();

  //GET DATA
  const loadTask = async () => {
    if (id !== "new") {
      // Make a GET request using the Fetch API
      fetch(apiUrl + "/" + id)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log("tasks", response);
          return response.json();
        })
        .then((e) => {
          // Process the retrieved user data
          console.log("Task:", e.task);
          setDataTask({ ...e.task, Dateline: fixDate(e.task.Dateline) });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setLoading(false);
    } else {
      setDataTask(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    loadTask();
  }, []);

  const [deletes, setDeletes] = useState(null);
  let nameRef = useRef();
  let StatusRef = useRef();

  //   DELETE ITEM FUNCTION
  const deleteItem = (e) => {
    e.preventDefault();
    fetch(apiUrl + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((newUserData) => {
        // Process the newly created user data
        console.log("Data Deleted", newUserData);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    e.preventDefault();
    // uploadProduct();
  };

  //   SAVE/UPDATE BUTTON FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();

    var date = new Date(task.Dateline);
    const formData = {
      ID: task.ID,
      Name: task.Name,
      Status: task.Status ?? 0,
      Dateline: date,
    };
    console.log("Data", JSON.stringify(formData));
    if (task?.ID) {
      fetch(apiUrl + "/" + task?.ID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((newUserData) => {
          // Process the newly created user data
          console.log("New User Data:", newUserData);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      fetch(apiUrl + "/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((newUserData) => {
          // Process the newly created user data
          console.log("New User Data:", newUserData);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    e.preventDefault();
    // uploadProduct();
  };
  if (Loading) {
    return <div>Loading..</div>;
  }

  return (
    <section className="h-full  w-full px-20">
      <div className=" w-full border-b-2 border-black">
        <button
          onClick={() => navigate(`/`)}
          className="text-3xl text-black text-bold  "
        >
          Go Back
        </button>
      </div>
      <h1 className="text-3xl text-black text-bold">
        Main task - {task?.Name ?? "New"}
      </h1>

      <div className="bg-white h-full  flex items-center">
        <div className="w-full h-auto py-20">
          <div
            className={` bg-gray-100 border shadow-xl p-10 rounded-lg  md:w-3/4 mx-auto lg:w-1/2`}
          >
            <form onSubmit={handleSubmit} action="">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="text-left block mb-2 font-bold text-gray-600"
                >
                  Task Name
                </label>
                <input
                  required
                  ref={nameRef}
                  value={task?.Name}
                  onChange={(ev) =>
                    setDataTask({ ...task, Name: ev.target.value })
                  }
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Enter Task Name."
                  className="border border-gray-300 shadow p-3 w-full rounded mb-"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="text-left block mb-2 font-bold text-gray-600"
                >
                  Task Status
                </label>
                <input
                  ref={StatusRef}
                  value={task?.Status}
                  checked={task?.Status == 1 ? true : false}
                  onChange={(ev) =>
                    setDataTask({
                      ...task,
                      Status: ev.target.checked == true ? 1 : 0,
                    })
                  }
                  type="checkbox"
                  id="buy_price"
                  name="buy_price"
                  placeholder="Masukkan harga beli barang."
                  //   className="border border-gray-300 shadow p-3 w-full rounded mb-"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="text-left block mb-2 font-bold text-gray-600"
                >
                  Dateline
                </label>
                <input
                  required
                  ref={StatusRef}
                  value={task?.Dateline}
                  onChange={(ev) =>
                    setDataTask({ ...task, Dateline: ev.target.value })
                  }
                  type="datetime-local"
                  id="dateline"
                  name="dateline"
                  placeholder="Masukkan Dateline."
                  className="border border-gray-300 shadow p-3 w-full rounded mb-"
                />
              </div>
              {deletes ? (
                <div className="mb-5">
                  <label className="text-center block mb-2 font-bold text-gray-600">
                    Are you sure you want to delete {task?.Name}
                  </label>
                  <div className="mb-5 gap-5 w-full flex justify-center">
                    <button
                      onClick={deleteItem}
                      className="block w-1/4 bg-red-500 text-white font-bold p-4 rounded-lg"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeletes(false)}
                      className="block w-1/4 bg-blue-500 text-white font-bold p-4 rounded-lg"
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : null}
              <div className="mb-5 gap-5 w-full flex justify-end">
                <button className="block w-1/4 bg-blue-500 text-white font-bold p-4 rounded-lg">
                  {task?.ID ? "Update" : "Submit"}
                </button>
              </div>
            </form>
            {task?.ID ? (
              <div className="mb-5 gap-5 w-full flex justify-end">
                <button
                  onClick={() => setDeletes(true)}
                  className="block w-1/4 bg-red-500 text-white font-bold p-4 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {task?.ID ? <SubTaskTable id={task?.ID} /> : null}
    </section>
  );
};

export default Tasks;
