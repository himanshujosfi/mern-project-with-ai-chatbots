import React from 'react'
import { useMutation, useQuery } from "@tanstack/react-query"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const TaskList = () => {
    const navigate = useNavigate()

    const [list, setList] = useState("")
    const [search, setSearch] = useState("")

    const { data, refetch } = useQuery({
        queryKey: ["tasks", search],
        queryFn: async () => {
            const response = await fetch(
                `http://localhost:8000/api/getTask?search=${search}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    //   body: JSON.parse(),
                }
            );
            return response.json();
        },

        onSuccess: (res) => {
            //   toast.success("Task added sucessfully !")
            navigate("/taskList")
            // console.log("res", res);
        },

        onError: (err) => {
            console.log("err", err);
        },
    });

    const deleteMutaion = useMutation({
        // queryKey: ["tasks", search],
        mutationFn: async (rowData) => {

            console.log("Deleting ID:", rowData.id);
            const response = await fetch(
                `http://localhost:8000/api/delete`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: rowData?.id,
                    }),
                }
            );
            return response.json();
        },
        onSuccess: (res) => {
            toast.success("Task deleted sucessfully !")
            refetch()
            console.log("res", res);
        },

        onError: (err) => {
            console.log("err", err);
        },
    });

    return (
        <div className="card p-3">
            <div className="flex md:flex-row justify-content-between align-items-center mb-4 gap-3">
                <h2 className="text-xl font-bold m-0">Task List</h2>
                <div>
                    <button className='btn p-3 cursore-pointer'
                        onClick={() => navigate("/add")}
                    >Add New Tasks</button>
                    
                </div>
            </div>
            <div className="flex flex-column md:flex-row gap-2 mb-4 ">
                <span className="p-input-icon-left ">
                    <i className="pi pi-search" />
                    <InputText
                        placeholder="Search by topic or description..."
                        className="w-full"
                        value={list}
                        onChange={(e) => setList(e.target.value)}
                    />
                </span>

                <button
                    className="btn px-4 py-2 md:w-auto"
                    onClick={() => setSearch(list)}
                >
                    Search
                </button>
            </div>

            <DataTable
                value={data?.data}
                // globalFilter={globalFilter}
                // paginator
                // rows={10}
                // stripedRows
                responsiveLayout="scroll"
            >
                <Column field="topic" header="Topic" sortable />
                <Column field="description" header="Description" sortable />
                <Column
                    header="Actions"
                    body={(rowData) => {
                        // console.log("row", rowData)
                        return (
                            <div className="flex gap-3 justify-content-center">
                                <i
                                    className="pi pi-pencil  cursor-pointer text-sm"
                                    onClick={() =>
                                        navigate(`/add/${rowData?.id}`, {
                                            state: rowData,
                                        })
                                    }
                                />

                                <i
                                    className="pi pi-trash cursor-pointer text-sm"
                                    onClick={() => {
                                        console.log("clic", rowData)
                                        deleteMutaion.mutate(rowData)
                                    }}
                                />
                            </div>
                        );
                    }}
                />
            </DataTable>
        </div>
    )
}

export default TaskList
