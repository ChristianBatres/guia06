import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//  Service 
import { AlumnoService } from '../../services/alumno.service';
// Class
import { Alumno } from '../../models/alumno';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  constructor(
    public alumnoService: AlumnoService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.alumnoService.getAlumnos();
    this.resetForm();
  }

  // Recibe un formulario del tipo NgForm, lo envia a guardar o actualizar , invocando el servicio Firebase
  // lo termina limpiando resetForm
  onSubmit(alumnoForm: NgForm) {
    if (alumnoForm.value.$key == null)
      this.alumnoService.insertAlumno(alumnoForm.value);
    else
      this.alumnoService.updateAlumno(alumnoForm.value);

    this.resetForm(alumnoForm);
    this.toastr.success('Operacion Exitosa', 'Alumno Registrado!');
  }

  // Para limpiar el formulario
  resetForm(productForm?: NgForm) {
    if (productForm != null)
      productForm.reset();
    this.alumnoService.selectedAlumno = new Alumno();
  }

}
