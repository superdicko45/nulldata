import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/empleado'

const CreateEmpleado = () => {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [puesto, setPuesto] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [domicilio, setDomicilio] = useState('')
    const [skills, setSkills] = useState([{'nombre': '', 'calificacion':''}])

    const [showError, setShowError] = useState(false);
    const [errors, setErrors] = useState([]);

    const store = async (e) => {
        e.preventDefault()

        try {
            await axios.post(endpoint, {nombre: nombre, email: email, puesto: puesto, fecha_nacimiento: fechaNacimiento, domicilio: domicilio, skills: skills})
            navigate('/')
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response);
            
            setShowError(true);
            setErrors(err.response.data);
        }
    }

    const handleFormChange = (key, e, type) => {
        let data = [...skills];
        data[key][type] = e.target.value;
        setSkills(data);
    }

    const addFields = () => {
        let newSkill = { nombre: '', calificacion: '' }
        setSkills([...skills, newSkill])
    }

  return (
    <div>
        {showError &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Ocurrio un error, validar</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <ul>
                    { Object.keys(errors).map( (error, key) => (
                        <li key={key}>{error}</li>
                    )) }
                </ul>
            </div>
        }

        <h3>Create Empleado</h3>
        <form onSubmit={store}>
            <div className='mb-3'>
                <label className='form-label'>Nombre</label>
                <input 
                    value={nombre}
                    onChange={ (e)=> setNombre(e.target.value)}
                    type='text'
                    maxLength={100}
                    required
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input 
                    value={email}
                    onChange={ (e)=> setEmail(e.target.value)}
                    type='email'
                    maxLength={255}
                    required
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Puesto</label>
                <input 
                    value={puesto}
                    onChange={ (e)=> setPuesto(e.target.value)}
                    type='text'
                    maxLength={255}
                    required
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Fecha de nacimiento</label>
                <input 
                    value={fechaNacimiento}
                    onChange={ (e)=> setFechaNacimiento(e.target.value)}
                    type='text'
                    placeholder='dd/mm/YYYY'
                    maxLength={100}
                    required
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Domicilio</label>
                <input 
                    value={domicilio}
                    onChange={ (e)=> setDomicilio(e.target.value)}
                    type='text'
                    maxLength={255}
                    required
                    className='form-control'
                />
            </div>
            <hr></hr>
            <button className='btn btn-secondary mb-3 mt-3' onClick={addFields}>Agrear skills</button>
            { skills.map( (skill, key) => (
                    <div key={key} className='row'>
                        <div className='col-md-6'>
                            <label className='form-label'>Skill</label>
                            <input
                                value={skill.nombre}
                                onChange={ (e)=> handleFormChange(key, e, 'nombre')}
                                type='text'
                                maxLength={100}
                                required
                                className='form-control'
                            />
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>Calificación</label>
                            <input
                                value={skill.calificacion}
                                onChange={ (e)=> handleFormChange(key, e, 'calificacion')}
                                type='numbre'
                                min={1}
                                max={5}
                                required
                                className='form-control'
                            />
                        </div>
                    </div>
                )) }
            <button type='submit' className='btn btn-success btn-lg mt-2 mb-2 text-white'>Guardar</button>
        </form>
    </div>
  )
}

export default CreateEmpleado