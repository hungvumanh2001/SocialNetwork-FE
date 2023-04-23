import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  fullname: any
  avatar: any
  id: any
  constructor(private authenticationService : AuthenticationService,
              private router : Router) { }

  ngOnInit(): void {
    this.avatar = localStorage.getItem("AVATAR")
    this.fullname = localStorage.getItem("FULLNAME")
    this.id = localStorage.getItem("ID")
  }

  logout() {
    this.authenticationService.logout()
    this.router.navigate(["/login"])
  }

}
