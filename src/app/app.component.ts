import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sparrow';
  id: any

  constructor(private router : Router) {
  }

  ngOnInit(): void {
    this.id = localStorage.getItem("ID")
    if (this.id == null) {
      this.router.navigate(["/login"])
    }
  }
}
