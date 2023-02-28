import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Person } from './Person';

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {
  private persons: Person[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 2, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
  ];

  getPersons(): Observable<Person[]> {
    return of(this.persons);
  }

  getPerson(id: number): Observable<Person> {
    const person = this.persons.find(p => p.id == id);
    if (person) {
      return of(person);
    } else {
        return throwError(() => `Person with id ${id} not found`); 
    }
  }

  addPerson(person: Person): Observable<void> {
    const errors = this.validatePerson(person);
    if (errors.length > 0) {
        return throwError(() => errors);
    }
    person.id = this.getNextId();
    this.persons.push(person);
    return of(undefined);
  }

  updatePerson(person: Person): Observable<Person[]> {
    const index = this.persons.findIndex(p => p.id === person.id);
    console.log(person);
    if (index === -1) {
        return throwError(() => `Person not found`); 
    }
    if (index !== -1) {
        this.persons[index] = person;
    }
    return of(this.persons);
  }

  deletePerson(id: number): Observable<void> {
    const index = this.persons.findIndex(p => p.id === id);
    if (index === -1) {
        return throwError(() => `Person with id ${id} not found`); 
    }
    this.persons.splice(index, 1);
    return of(undefined);
  }

  private getNextId(): number {
    return this.persons.reduce((maxId, person) => Math.max(maxId, person.id), 0) + 1;
  }

  private validatePerson(person: Person): string[] {
    const errors: string[] = [];
    if (!person.firstName) {
      errors.push('First name is required');
    } else if (person.firstName.length > 50) {
      errors.push('First name cannot be longer than 50 characters');
    }
    if (!person.lastName) {
      errors.push('Last name is required');
    } else if (person.lastName.length > 50) {
      errors.push('Last name cannot be longer than 50 characters');
    }
    if (!person.email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email)) {
      errors.push('Invalid email format');
    }
    return errors;
  }
}
