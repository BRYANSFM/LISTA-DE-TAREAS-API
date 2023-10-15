import React from 'react'
import TareaFormulario from './componentes/TareaFormulario';
import { useState, useEffect } from "react";
import { BsX, BsCheck } from "react-icons/bs";
// import Tareas from './componentes/Tareas';

async function getTodosService() {
  const promesaFetch = await fetch(
    'https://calm-plum-jaguar-tutu.cyclic.app/todos',
    { method: 'GET' }
  );
  const json = await promesaFetch.json();

  return json;
}

async function createTodosService(title) {
  const promesaFetch = await fetch(
    'https://calm-plum-jaguar-tutu.cyclic.app/todos',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todoName: title,
        isComplete: false,
      }),
    }
  );
  const json = await promesaFetch.json();
  return json;
}

async function updateTodosService(id, isComplete) {
  const promesaFetch = await fetch(
    `https://calm-plum-jaguar-tutu.cyclic.app/todos/${id}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isComplete: isComplete,
      }),
    }
  );
  const json = await promesaFetch.json();
  return json;
}

async function deleteTodosService(id) {
  const promesaFetch = await fetch(
    `https://calm-plum-jaguar-tutu.cyclic.app/todos/${id}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const json = await promesaFetch.json();
  return json;
}


function App() {

  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tarea, setTarea] = useState('');

  async function fetchTodos() {
    setIsLoading(true);
    const f = await getTodosService();
    setTodos(f.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  function getLast5Elements(array) {
    const longitud = array.length;
    return array.filter((elementActual, indice) => {
      if (indice > longitud - 6) {
        return true;
      }
      return false;
    }).reverse();
  }

  return (
    <div className=" p-[25px] md:p-[0px] flex flex-wrap items-center justify-center flex-col text-center bg-gradient-to-r from-blue-700  via-[#6f2894]  to-[#9f28a2] w-screen border h-screen ">
      <div className="flex justify-start items-start  text-[25px] text-[white] w-full md:w-[40%] h-[6%] font-bold">
        T O D O
      </div>
      <TareaFormulario
        CrearServicios={
          async function () {
            await createTodosService(tarea);
            fetchTodos();
          }
        }
        tareaNueva={(e) => setTarea(e.target.value)}
      />
      
      {isLoading ?
       <h1 className='text-[yellow] font-bold text-[20px] md:text-[50px]'>¡Cargando...!</h1>
        : getLast5Elements(todos).map(
          (el) => (
        <div
          className = 'w-full md:w-[40%]  flex justify-between items-center border-[2px] border-[#44496a] text-white bg-[#25273c]  min-h-[6%]  px-[40px]  py-[10px]'>
          
          <div 
            className='bg-transparent flex justify-between items-center '>
            <div 
              className='h-[30px] w-[30px] rounded-[50%] flex justify-center items-center cursor-pointer' 
              onClick={
                async function () {
                  await updateTodosService(el._id, !el.isComplete);
                  fetchTodos();
                }
              }>
              <BsCheck 
                className={
                  el.isComplete ? ' bg-gradient-to-b from-[#71bdf5] to-[#a574f2] h-[30px] w-[30px] rounded-[50%]' : 'h-[30px] w-[30px] rounded-[50%] bg-[#44496a]'
                }/>
            </div>
            <h1
              className={
                el.isComplete ? 'line-through pl-[30px] text-[#4a4c61]' : 'pl-[30px]'
              }>
              {el.todoName}
            </h1>
          </div>

          <div 
            className='cursor-pointer'
            onClick={
              async function () {
                await deleteTodosService(el._id);
                fetchTodos();
              }
            }>
            <BsX className='h-[30px] w-[30px] ml-[10px]'/>
          </div>
        </div>
      ))}
      
    </div>

  );
}

export default App;
