import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';

import Home from "./Pages/Home";
import Add from "./Pages/Add";
import Update from "./Pages/Update";
import TaskList from "./Pages/Task";


function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add/:id?" element={<Add />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/descrption" element={<Home />} />
            <Route path="/taskList" element={<TaskList />} />

          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </>
  )
}

export default App
