/**
 * Created by sesha on 7/26/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {WebsiteNewComponent} from './components/website/website-new/website-new.component';
import {WebsiteEditComponent} from './components/website/website-edit/website-edit.component';
import {WebsiteListComponent} from './components/website/website-list/website-list.component';
import {PageNewComponent} from './components/page/page-new/page-new.component';
import {PageEditComponent} from './components/page/page-edit/page-edit.component';
import {PageListComponent} from './components/page/page-list/page-list.component';
import {WidgetChooserComponent} from './components/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './components/widget/widget-edit/widget-edit.component';
import {WidgetListComponent} from './components/widget/widget-list/widget-list.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {AuthGuard} from './services/auth-guard.service';
import {HomeComponent} from './components/home/home.component';
import {MemeListComponent} from './components/memes/meme-list/meme-list.component';
import {AboutComponent} from './components/about/about.component';
import {MemeNewComponent} from './components/memes/meme-new/meme-new.component';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {AdminGuard} from './services/admin-guard.service';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {TestComponent} from './components/test/test.component';
import {MemeEditComponent} from './components/memes/meme-edit/meme-edit.component';
import {UserNewComponent} from './components/user/user-new/user-new.component';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'default', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'memes', component: MemeListComponent},
  {path: 'memes/search/:uid', component: MemeListComponent},
  {path: 'memes/edit/:mid', component: MemeEditComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'users/:uid', component: UserEditComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'users/new', component: UserNewComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'memes/new', component: MemeNewComponent, canActivate: [AuthGuard]},
  {path: 'test', component: TestComponent},
  {path: 'user/:uid/website', component: WebsiteListComponent},
  {path: 'user/:uid/website/new', component: WebsiteNewComponent},
  {path: 'user/:uid/website/:wid', component: WebsiteEditComponent},
  {path: 'user/:uid/website/:wid/page', component: PageListComponent},
  {path: 'user/:uid/website/:wid/page/new', component: PageNewComponent},
  {path: 'user/:uid/website/:wid/page/:pid', component: PageEditComponent},
  {path: 'user/:uid/website/:wid/page/:pid/widget', component: WidgetListComponent},
  {path: 'user/:uid/website/:wid/page/:pid/widget/new', component: WidgetChooserComponent},
  {path: 'user/:uid/website/:wid/page/:pid/widget/:wgid', component: WidgetEditComponent},
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
