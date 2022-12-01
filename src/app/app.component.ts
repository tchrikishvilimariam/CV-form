import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    userContactInfo: new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.email]),
      phone: new FormControl('', [Validators.required,
        Validators.minLength(9),
        Validators.maxLength(12),
        Validators.pattern('[0-9]+')]
      )
    }),
    resources: new FormGroup({
      gitUrl: new FormControl('', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')),
      linkedinUrl: new FormControl('', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'))
    }),
    experience: new FormArray([]
    ),
    education: new FormArray([])
  })

  submit() {
    console.log(this.form)
  }

  get experienceFormArray() {
    return <FormArray>this.form.get('experience');
  }

  get educationFormArray() {
    return <FormArray>this.form.get('education');
  }

  addExperience() {
    this.experienceFormArray.push(new FormGroup({
      company: new FormControl('',Validators.required),
      startYear: new FormControl(null,[Validators.required,Validators.max(2022)]),
      endYear: new FormControl(null,Validators.max(2022))
    }))
  }

  addEducation() {
    this.educationFormArray.push(new FormGroup({
      school: new FormControl('',Validators.required),
      startYear: new FormControl(null,[Validators.required, Validators.max(2022)]),
      endYear: new FormControl(null,Validators.max(2022))
    }))
  }

  removeExperience(i: number) {
    this.experienceFormArray.removeAt(i);
  }

  removeEducation(i: number) {
    this.educationFormArray.removeAt(i);
  }
}
