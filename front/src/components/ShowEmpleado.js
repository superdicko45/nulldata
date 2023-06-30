import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const endpoint = 'http://localhost:8000/api/empleado/'

const ShowEmpleado = () => {
    const [empleado, setEmpleado] = useState({})
    const {id} = useParams()
    
    useEffect( () =>{
        getEmpleadoById()
    }, [] )

    const getEmpleadoById = async () => {
        const response = await axios.get(`${endpoint}${id}`)
        setEmpleado(response.data)
    }

    return (
        <div>
        <h3>Empleado</h3>
        <br></br>
        <p><strong>Id: </strong>{empleado.id}</p>
        <p><strong>Nombre: </strong>{empleado.nombre}</p>
        <p><strong>Email: </strong>{empleado.email}</p>
        <p><strong>Puesto: </strong>{empleado.puesto}</p>
        <p><strong>Fecha de nacimiento: </strong>{empleado.fecha_nacimiento}</p>
        <p><strong>Domicilio: </strong>{empleado.domicilio}</p>
        <p><strong>Skills: </strong></p>
        {empleado.skills &&
            <ul>
                { empleado.skills.map( (skill, key) => (
                    <button type="button" className="btn btn-primary ml-3 mr-5" key={key} >
                        {skill.nombre} <span className="badge badge-light">({skill.calificacion})</span>
                    </button>
                )) }
            </ul>
        }
    </div>
    )
}

export default ShowEmpleado