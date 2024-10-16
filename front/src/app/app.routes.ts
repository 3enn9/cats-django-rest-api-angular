import { Routes } from '@angular/router';
import { CatListComponent } from './cat-list/cat-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AddCatComponent } from './add-cat/add-cat.component';
import { CatDetailComponent } from './cat-detail/cat-detail.component';
import { CatEditComponent } from './cat-edit/cat-edit.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    {path: '', component: CatListComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'add-cat', component: AddCatComponent},
    {path: 'cat/:id', component: CatDetailComponent},
    {path: 'edit-cat/:id', component: CatEditComponent},
    {path: 'chat', component: ChatComponent},


];
