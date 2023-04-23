import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  // @ts-ignore
  id = parseInt(localStorage.getItem("ID"));

  userForm: FormGroup = new FormGroup({
    fullname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    birthday: new FormControl(),
    hobby: new FormControl(),
    address: new FormControl(),
  })

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private toast : NgToastService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.getProfile(this.id);
    });
  }

  getProfile(id: number) {
    return this.userService.getUserProfile(id).subscribe(user => {
      this.userForm = new FormGroup({
        fullname: new FormControl(user.fullname,[Validators.required,Validators.pattern("^[^%,*]*$")]),
        email: new FormControl(user.email,[Validators.email,Validators.required]),
        phone: new FormControl(user.phone,[Validators.required,Validators.pattern("(03|05|07|08|09)+([0-9]{8})")]),
        birthday: new FormControl(user.birthday,[Validators.required]),
        hobby: new FormControl(user.hobby,[Validators.pattern("^[^%,*]*$")]),
        address: new FormControl(user.address,[Validators.pattern("^[^%,*]*$")]),
      });
    });
  }

  updateProfile(id: number) {
    const user = this.userForm.value;
    this.userService.updateUserProfile(id, user).subscribe(() => {
      this.toast.success({detail: "Thông Báo", summary: "Sửa thông tin thành công", duration: 3000})
      localStorage.setItem("FULLNAME", user.fullname)
      window.setTimeout(function(){location.reload()},1500)
    }, e => {
      console.log(e);
    });
  }



  get fullname() {
    return this.userForm.get('fullname');
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone(){
    return this.userForm.get('phone');
  }

  get address(){
    return this.userForm.get('address')
  }

  get hobby(){
    return this.userForm.get('hobby')
  }

  ngOnInit(): void {
    // @ts-ignore
    document.getElementById("datePickerId").max = new Date().toISOString().split("T")[0];
  }

}
