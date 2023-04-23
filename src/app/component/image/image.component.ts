import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ImageService} from "../../service/image.service";
import {RelationshipService} from "../../service/relationship.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {


  relationship: any
  currentId:any
  id:any
  listImage:any=[]
  constructor(private router:Router,
              private imageService:ImageService,
              private activatedRoute: ActivatedRoute,
              private relationshipService: RelationshipService) { }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    this.id = this.router.url.split("/")[1];
    this.imageService.findAllImageByUser(this.id).subscribe(data=>{
      this.listImage=data
      console.log(this.listImage)
      }
    )
    this.relationshipService.getRelationship(this.currentId,this.id).subscribe(data => {
      this.relationship = data
      console.log("relay",this.relationship)
    })
  }


}
