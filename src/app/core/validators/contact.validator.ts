import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const valid = /^\+?1?\d{9,15}$/.test(control.value);
  return valid ? null : { invalidPhone: true };
}