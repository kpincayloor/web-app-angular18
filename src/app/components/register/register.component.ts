import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService
  ) {
    this.registerForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      numeroIdentificacion: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      tipoIdentificacion: ['', Validators.required],
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  getErrorMessage(field: string): string {
    if (field === 'nombres') {
      if (this.registerForm.get('nombres')?.hasError('required')) {
        return 'Los nombres son obligatorios';
      }
    } else if (field === 'apellidos') {
      if (this.registerForm.get('apellidos')?.hasError('required')) {
        return 'Los apellidos son obligatorios';
      }
    } else if (field === 'numeroIdentificacion') {
      if (this.registerForm.get('numeroIdentificacion')?.hasError('required')) {
        return 'El número de identificación es obligatorio';
      } else if (this.registerForm.get('numeroIdentificacion')?.hasError('pattern')) {
        return 'Solo se permiten números';
      }
    } else if (field === 'email') {
      if (this.registerForm.get('email')?.hasError('required')) {
        return 'El email es obligatorio';
      } else if (this.registerForm.get('email')?.hasError('email')) {
        return 'Email no válido';
      }
    } else if (field === 'tipoIdentificacion') {
      if (this.registerForm.get('tipoIdentificacion')?.hasError('required')) {
        return 'El tipo de identificación es obligatorio';
      }
    } else if (field === 'user') {
      if (this.registerForm.get('user')?.hasError('required')) {
        return 'El usuario es obligatorio';
      }
    } else if (field === 'pass') {
      if (this.registerForm.get('pass')?.hasError('required')) {
        return 'La contraseña es obligatoria';
      }
    }
    return '';
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { nombres, apellidos, numeroIdentificacion, email, tipoIdentificacion, user, pass } = this.registerForm.value;
      try {
        this.personService.add({ nombres, apellidos, numeroIdentificacion, email, tipoIdentificacion, user, pass })
        .subscribe(
          response => {
            if (response) {
              console.log(response);
            } else {
              this.registrationError = true;
              setTimeout(() => {
                this.registrationError = true;
              }, 3000);
            }
          },
          error => {
            console.error('Error de solicitud:', error);
            this.registrationError = true;
          }
        );
      } catch (error) {
        console.error('Error de autenticación:', error);
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
