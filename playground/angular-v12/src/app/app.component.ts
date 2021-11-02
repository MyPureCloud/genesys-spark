import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  // styleUrls: ['./app.component.less']
})
export class AppComponent {
  editConfigurationForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.minLength(5)] }),
    description: new FormControl('', Validators.maxLength(1)),
    'text-1': new FormControl('r', { validators: [Validators.minLength(5)] })
  });

  get name(): AbstractControl | null {
    return this.editConfigurationForm.get('name');
  }

  get description(): AbstractControl | null {
    return this.editConfigurationForm.get('description');
  }

  get text1(): AbstractControl | null {
    return this.editConfigurationForm.get('text-1');
  }

  hasError(control: AbstractControl | null): boolean {
    const invalid = control?.invalid;
    const touched = control?.touched;
    const dirty = control?.dirty;

    return Boolean(invalid && (touched || dirty));
  }

  get showNameError(): boolean {
    return this.hasError(this.name);
  }

  get showDescriptionError(): boolean {
    return this.hasError(this.description);
  }

  get showText1Error(): boolean {
    return this.hasError(this.text1);
  }

  onFormSubmit(): void {
    console.info('Name:' + this.name?.value);
    console.info('Description:' + this.description?.value);
  }
}
