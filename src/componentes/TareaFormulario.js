import React from 'react'
import { useState, useEffect } from "react";


function TareaFormulario({ CrearServicios, tareaNueva }) {


  const Onsubmit = (e) => {
    e.preventDefault();
    console.log("esta funcionando el formulario");
    CrearServicios();
  };

  return (
    <form className='w-[40%] h-[6%] mb-[20px]' onSubmit={Onsubmit} >
      <input
        className=" bg-[#25273c] w-full h-full  item-center text-white px-[40px]"
        type="text"
        placeholder="Create a new todo..."
        onChange={tareaNueva}
      />
    </form>
  );
}

export default TareaFormulario;