import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FakeBackendService } from '../fake-backend.service';
import { Person, personValidationMessages } from '../Person';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class CreateEditPersonComponent implements OnInit {
  personFormGroup: FormGroup;
  
  validationMessages = personValidationMessages;
  personId = -1;
  person: Person;
  createMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private fakeBackendService: FakeBackendService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.personFormGroup = new FormGroup({ firstName: new FormControl(), lastName: new FormControl(), email: new FormControl() });

    this.route.params.subscribe((params)=>{
      if (Object.keys(params).length > 0) {
        this.personId = params['id'];
        this.getPerson();
      } else {
        this.createMode = true;
      }
    });
  }

  private getPerson(): void {
    this.fakeBackendService
      .getPerson(this.personId)
      .subscribe(person => {
        this.person = person;
        this.personFormGroup.setValue({
          firstName: person.firstName,
          lastName: person.lastName,
          email: person.email,
      });
      });
  }

  onSubmit(): void {
    if (!this.createMode) {
      const person = {
        id: this.person.id,
        ...this.personFormGroup.value
      } as Person;
      this.fakeBackendService.updatePerson(person).subscribe(() => {
        this.router.navigate(['/persons']);
      });
    } else {
      const person = {
        ...this.personFormGroup.value
      } as Person;
      this.fakeBackendService.addPerson(person).subscribe(() => {
        this.router.navigate(['/persons']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/persons']);
  }
}
