import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PostsComponent} from "../../user/posts/posts.component";
import {RelationshipComponent} from "../../user/relationship/relationship.component";
import {ImageComponent} from "../../image/image.component";
import {AuthGuard} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: "list-friend",
    component: RelationshipComponent
  },
  {
    path: "list-image",
    component: ImageComponent
  },
  {
    path: "",
    component: PostsComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileRoutingModule { }
