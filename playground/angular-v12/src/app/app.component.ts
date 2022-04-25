import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { countryList } from '../data/country-list';
import { petList } from '../data/pet-list';

type SelectOption = {
  id: string;
  name: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  contactForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    pet: new FormControl(null, Validators.required),
    email: new FormControl('daragh.king@example.com', [
      Validators.email,
      Validators.required
    ])
  });

  countryList: SelectOption[] = countryList;
  petList: SelectOption[] = petList;

  showRequiredErrorMessage(formControlName: string): boolean {
    const control = this.contactForm.get(formControlName);

    return Boolean(control?.hasError('required') && control?.touched);
  }

  showEmailErrorMessage(formControlName: string): boolean {
    const control = this.contactForm.get(formControlName);

    return Boolean(control?.hasError('email') && control?.touched);
  }

  onSubmit() {
    console.log(this.contactForm.value);
  }
}
