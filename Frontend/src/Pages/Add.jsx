import { useMutation, useQuery } from "@tanstack/react-query"
import { AutoComplete } from "primereact/autocomplete"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const Add = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const [textData, setTextData] = useState({
    description: "",
    topic: ""
  })

  const handleChange = (field, value) => {
    setTextData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  // __________________________________________--------------------------------------------------------------------

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        topic: textData.topic,
        description: textData.description,
      };

      const response = await fetch(
        "http://localhost:8000/api/addTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      return response.json();
    },

    onSuccess: (res) => {
      toast.success("Task added sucessfully !")
      navigate("/taskList")
      // console.log("res", res);
    },

    onError: (err) => {
      console.log("err", err);
    },
  });


  const updateMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        topic: textData.topic,
        description: textData.description,
      };

      const response = await fetch(
        `http://localhost:8000/api/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      return response.json();
    },

    onSuccess: (res) => {
      toast.success("Task updated sucessfully !")
      navigate("/taskList")
      // console.log("res", res);
    },

    onError: (err) => {
      console.log("err", err);
    },
  });

  // _-----------------------------------------------------------------------------------------------
  useEffect(() => {
    if (id) {
      setTextData({
        description: location.state?.description || "",
        topic: location.state?.topic || "",
      });
    }
  }, [id]);
  // console.log("query", getDataByIdQuery?.data)
  // console.log("useloca", location?.state)

  return (
    <>
      <div className="d-flex justify-content-end ">
        <Button
          label="Task Lists"
          icon="pi pi-align-justify"
          className="btn w-1 border-0 p-3"
          onClick={()=>navigate("/taskList")}
        />
      </div>

      <div
        className=" pageSize flex justify-content-center align-items-center px-3"    >
        <Card
          className="w-full md:w-8 lg:w-6 shadow-4"
          style={{
            maxWidth: "700px",
            borderRadius: "20px",
          }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="m-0 text-3xl font-bold">
              Add New Task
            </h2>
            <p className="text-600 mt-2 mb-4">
              Create and manage your tasks efficiently
            </p>
          </div>

          {/* Topic */}
          <div className="mb-6">
            <FloatLabel>
              <InputText
                id="topic"
                className="w-full"
                value={textData.topic}
                onChange={(e) =>
                  handleChange("topic", e.target.value)
                }
              />
              <label htmlFor="topic">Topic Name</label>
            </FloatLabel>
          </div>

          {/* Description */}
          <div className="mb-5">
            <FloatLabel>
              <InputTextarea
                id="description"
                className="w-full"
                rows={5}
                autoResize
                value={textData?.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
              />
              <label htmlFor="description">
                Description
              </label>
            </FloatLabel>
          </div>

          {/* Buttons */}
          <div className="flex flex-column sm:flex-row justify-content-end gap-3 mt-5">
            <Button
              label="Cancel"
              icon="pi pi-times"
              severity="secondary"
              outlined
              onClick={""}
            />

            <Button
              label={id ? "Edit Task" : "Create Task"}
              icon="pi pi-check"
              onClick={() => id ? updateMutation.mutate() : mutation.mutate()}
            />
          </div>
        </Card>
      </div>
    </>
  )
}

export default Add
