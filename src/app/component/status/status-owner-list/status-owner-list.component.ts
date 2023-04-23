import {Component, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RelationshipService} from "../../../service/relationship.service";
import {Status} from "../../../model/status";
import {Image} from "../../../model/image";
import {ImageService} from "../../../service/image.service";
import {LikeStatusService} from "../../../service/like-status.service";


@Component({
  selector: 'app-status-owner-list',
  templateUrl: './status-owner-list.component.html',
  styleUrls: ['./status-owner-list.component.css']
})
export class StatusOwnerListComponent implements OnInit {
  statuses: Status [] = [];
  statusesOwner : any;
  currentId: any;
  id: any;
  relationship: any;
  statuz: Status [] = [];
  numberOfLike : any;

  constructor(private statusService: StatusService, private activatedRoute: ActivatedRoute,
              private fb: FormBuilder, private router: Router, private relationshipService: RelationshipService,
              private imageService: ImageService,
              private likeService: LikeStatusService) {

  }
  statusForm: FormGroup = this.fb.group({
      content: new FormControl(''),
      status: new FormControl(''),
    }
  )
  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
    })
    this.relationshipService.getRelationship(this.currentId, this.id).subscribe(data => {
      this.relationship = data;
    })
    this.statusService.findAllByOwnerId(this.id).subscribe((status) => {
     this.statusesOwner = status;
      for (let i = 0; i < this.statusesOwner[0].length; i++) {
        this.likeService.check(this.statusesOwner[0][i].id, this.currentId).subscribe(data => {
          this.statusesOwner[0][i].isLiked = data;
        }, error => (
          console.log("err", error)
        ))
      }
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
