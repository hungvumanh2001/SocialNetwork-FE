import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {RelationshipService} from "../../../service/relationship.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.css']
})
export class RelationshipComponent implements OnInit {
  id: any
  user: any
  currentId: any
  relationship: any
  listFriend: any = [];
  listMutualFriend:any=[];

  constructor(private userService: UserService,
              private relationshipService: RelationshipService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    this.id = this.router.url.split("/")[1];
    this.relationshipService.findAllFriendListByUserId(this.id).subscribe(data => {
      this.listFriend = data;
    })
    this.relationshipService.getRelationship(this.currentId,this.id).subscribe(data => {
      this.relationship = data
    })
    this.userService.getUserProfile(this.id).subscribe(data => {
      this.user = data
      console.log(data)
    })
    this.getMutualFriend(this.currentId,this.id)

  }


  getMutualFriend(currentId, id) {
    this.relationshipService.findMutualFriend(currentId, id).subscribe(data => {
      console.log(data)
      this.listMutualFriend=data
    })
  }

}
