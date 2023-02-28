import { Component, OnInit } from '@angular/core';
import { Person } from '../Person';
import { FakeBackendService } from '../fake-backend.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  persons: Person[] = [];
  selectedPerson?: Person;
  addingPerson = false;
  
  constructor(private fakeBackendService: FakeBackendService) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(): void {
   this.fakeBackendService.getPersons().subscribe(res => {
      this.persons = res;
    });
  }

  addPerson(): void {
    this.addingPerson = true;
    this.selectedPerson = undefined;
  }

  editPerson(person: Person): void {
    this.addingPerson = false;
    this.selectedPerson = { ...person };
  }

  savePerson(person: Person): void {
    if (this.addingPerson) {
      this.fakeBackendService.addPerson(person);
    } else {
      this.fakeBackendService.updatePerson(person);
    }
    this.cancel();
  }

  deletePerson(person: Person): void {
    this.fakeBackendService.deletePerson(person.id);
    this.cancel();
  }

  cancel(): void {
    this.selectedPerson = undefined;
    this.addingPerson = false;
    this.getPersons();
  }
}
