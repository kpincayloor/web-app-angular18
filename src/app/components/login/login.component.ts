import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  credentialsInvalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getErrorMessage(field: string): string {
    if (field === 'usuario') {
      if (this.loginForm.get('usuario')?.hasError('required')) {
        return 'El usuario es obligatorio';
      }
      if (this.loginForm.get('usuario')?.hasError('usuario')) {
        return 'Usuario no válido';
      }
    } else if (field === 'password') {
      if (this.loginForm.get('password')?.hasError('required')) {
        return 'La contraseña es obligatoria';
      }
    }
    return '';
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { usuario, password } = this.loginForm.value;
      try {
        this.authService.login(usuario, password)
        .subscribe(
          response => {
            if (response) {
              this.router.navigate(['/register']);
            } else {
              this.credentialsInvalid = true;
              setTimeout(() => {
                this.credentialsInvalid = false;
              }, 3000);
            }
          },
          error => {
            console.error('Error de solicitud:', error);
            if (error.status === 400) {
              this.credentialsInvalid = true;
            } else {
              this.credentialsInvalid = true;
            }
          }
        );
      } catch (error) {
        console.error('Error de autenticación:', error);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
