import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'] // ✅ Corregido
})
export class Register implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      password: [
        '',
        [
          Validators.required,
          // Mínimo 6 caracteres, al menos 1 mayúscula y 1 número
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/)
        ]
      ]
    });
  }

  onSubmit() {
    // Si el formulario es inválido, marca todos los campos como tocados
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      console.log('Formulario inválido');
      return;
    }

    console.log('Formulario válido', this.registerForm.value);
  }

  // Métodos helper para acceder a los campos desde el HTML
  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
