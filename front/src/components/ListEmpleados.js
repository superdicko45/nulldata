import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'

const ListEmpleados = () => {
  const [ empleados, setEmpleados ] = useState( [] )

  useEffect ( ()=> {
      getAllEmpleados()
  }, [])

  const getAllEmpleados = async () => {
    const response = await axios.get(`${endpoint}/empleados`)
    setEmpleados(response.data)
    //console.log(response.data)
  }

  const deleteEmpleado = async (id) => {
    await axios.delete(`${endpoint}/emeplado/${id}`)
    getAllEmpleados()
  }
  return (
    <div>
        <div className='d-grid gap-2'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear Empleado</Link>
        </div>

        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Puesto</th>
                    <th>Nacimiento</th>
                    <th>Domicilio</th>
                </tr>
            </thead>
            <tbody>
                { empleados.map( (empleado) => (
                    <tr key={empleado.id}>
                        <td> {empleado.nombre} </td>
                        <td> {empleado.email} </td>    
                        <td> {empleado.puesto} </td>    
                        <td> {empleado.fecha_nacimiento} </td>    
                        <td> {empleado.domicilio} </td>    
                        <td>
                            <Link to={`/show/${empleado.id}`} className='btn btn-info'>Ver</Link>
                        </td>

                    </tr>
                )) }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmpleados