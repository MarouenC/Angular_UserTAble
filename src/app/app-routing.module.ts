import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonsComponent } from './persons/persons.component';

import { CreateEditPersonComponent } from './edit-person/edit-person.component';

const routes: Routes = [
  { path: '', redirectTo: '/persons', pathMatch: 'full' },
  { path: 'persons', component: PersonsComponent },

  { path: 'edit-person/:id', component: CreateEditPersonComponent },
  { path: 'add-person', component: CreateEditPersonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
