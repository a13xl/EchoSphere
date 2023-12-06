import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

/**
 * @fileoverview
 * This interface ist used to check if a form control is in an error state.
 * explicitly, it is used to check the controlled input forms from angular material.
 * "namend in angular material as 'Input with a custom ErrorStateMatcher'"
 */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
