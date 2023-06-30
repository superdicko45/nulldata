<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Empleado;
use App\Models\EmpleadoSkill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $empleados = Empleado::all();
        return $empleados;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|max:100',
            'email' => 'required|max:255|unique:empleados',
            'puesto' => 'required|max:255',
            'fecha_nacimiento' => 'required|date_format:d/m/Y',
            'domicilio' => 'max:255',
            'skills' => 'required|array|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $empleado = new Empleado();
        $empleado->nombre = $request->nombre;
        $empleado->email = $request->email;
        $empleado->puesto = $request->puesto;
        $empleado->fecha_nacimiento = date('Y-m-d H:i:s', strtotime($request->fecha_nacimiento));
        $empleado->domicilio = $request->domicilio;
        $empleado->save();

        foreach($request->skills as $skill) {
            $empleadoSkill = new EmpleadoSkill();
            $empleadoSkill->nombre = $skill['nombre'];
            $empleadoSkill->calificacion = $skill['calificacion'];
            $empleadoSkill->empleado_id = $empleado->id;
            $empleadoSkill->save();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $empleado = Empleado::find($id);
        $empleado->skills = $empleado->skills;
        return $empleado;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|max:100',
            'email' => 'required|max:255|unique:empleados',
            'puesto' => 'required|max:255',
            'fecha_nacimiento' => 'required|date_format:d/m/Y',
            'domicilio' => 'max:255',
            'skills' => 'required|array|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $empleado = Empleado::findOrFail($request->id);
        $empleado->nombre = $request->nombre;
        $empleado->email = $request->email;
        $empleado->puesto = $request->puesto;
        $empleado->fecha_nacimiento = date('Y-m-d H:i:s', strtotime($request->fecha_nacimiento));
        $empleado->domicilio = $request->domicilio;
        $empleado->save();

        foreach($request->skills as $skill) {
            $empleadoSkill = new EmpleadoSkill();
            $empleadoSkill->nombre = $skill['nombre'];
            $empleadoSkill->calificacion = $skill['calificacion'];
            $empleadoSkill->emppleado_id = $empleado->id;
            $empleado->save();
        }

        return $empleado;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $empleado = Empleado::destroy($id);
        return $empleado;
    }
}
