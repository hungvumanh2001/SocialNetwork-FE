import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./component/page/register/register.component";
import {LoginComponent} from "./component/page/login/login.component";
import {HomepageComponent} from "./component/page/homepage/homepage.component";
import {CommentCreateComponent} from "./component/comment/comment-create/comment-create.component";
import {CommentUpdateComponent} from "./component/comment/comment-update/comment-update.component";
import {AuthGuard} from "./helper/auth-guard";

const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: HomepageComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import("./component/page/home-routing.module").then(module => module.HomeRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
