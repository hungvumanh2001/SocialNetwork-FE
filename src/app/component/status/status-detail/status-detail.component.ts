import {Component, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Image} from "../../../model/image";
import {CommentService} from "../../../service/comment.service";
import {Comment} from "../../../model/comment";
import {RelationshipService} from "../../../service/relationship.service";
import {LikeCommentService} from "../../../service/like-comment.service";
import {LikeStatusService} from "../../../service/like-status.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit {
  commentId: any
  currentUserId: any
  relationship: any
  statusId: any
  status: any
  listImage: Image[] = []
  listCommentOfStatus: any[] = []
  listCommentOfComment: any[] = []
  listNumberOfParentComment: any[] = []
  listNumberOfChildComment: any[] = []
  likeComments: any
  numberOfLikeOfStatus: any
  likeStatuses: any

  constructor(private statusService: StatusService,
              private activatedRoute: ActivatedRoute,
              private commentService: CommentService,
              private likeCommentService: LikeCommentService,
              private relationshipService: RelationshipService,
              private router: Router, private likeStatusService : LikeStatusService,
              private toast : NgToastService) {
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      this.statusId = param.get("id");
      this.getStatus(this.statusId)
      this.getComment(this.statusId)
    })
  }

  getStatus(id) {
    this.statusService.getById(id).subscribe(data => {
      this.status = data[0][0]
      console.log(data)
      this.relationshipService.getRelationship(this.currentUserId, this.status.owner.id).subscribe(data => {
        this.relationship = data
        this.likeStatusService.check(this.status.id, this.currentUserId).subscribe(data => {
          this.status.isLiked = data;
        }, error => (
          console.log("err", error)
        ))
      })
      this.listImage = data[1]
      this.numberOfLikeOfStatus = data[2][0]
      console.log(this.numberOfLikeOfStatus)
    }, error => {
      console.log(error)
    })
  }

  getComment(id) {
    this.commentService.getAllByStatus(id).subscribe(data => {
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i].comment == null) {
          this.listCommentOfStatus.push(data[0][i])
          this.listNumberOfParentComment.push(data[1][i])
          for (let i = 0; i < this.listCommentOfStatus.length; i++) {
            this.likeCommentService.check(this.listCommentOfStatus[i].id, this.currentUserId).subscribe(data => {
              this.listCommentOfStatus[i].isLikeComment = data;
            }, error => (
              console.log("err", error)
            ))
          }
        } else {
          this.listCommentOfComment.push(data[0][i])
          this.listNumberOfChildComment.push(data[1][i])
          for (let i = 0; i < this.listCommentOfComment.length; i++) {
            this.likeCommentService.check(this.listCommentOfComment[i].id, this.currentUserId).subscribe(data => {
              this.listCommentOfComment[i].isLike = data;
            }, error => (
              console.log("err", error)
            ))
          }
        }
      }
      console.log(data)
    }, error => {
      console.log(error)
    })
  }

  openChildCommentInput(index) {
    // @ts-ignore
    document.getElementsByClassName("child-comment-input")[index].style.display = "block"
  }

  delete(id) {
    this.commentService.delete(id).subscribe(() => {
      this.reloadCurrentRoute()
    }, error => {
      console.log(error)
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getCommentId(id) {
    this.commentId = id
  }

  update(index) {
    // @ts-ignore
    document.getElementsByClassName("comment-content")[index].style.display = "none"
    // @ts-ignore
    document.getElementsByClassName("comment-update")[index].style.display = "block"
  }

  childUpdate(index) {
    // @ts-ignore
    document.getElementsByClassName("child-comment-content")[index].style.display = "none"
    // @ts-ignore
    document.getElementsByClassName("child-comment-update")[index].style.display = "block"
  }

  cancel(index) {
    // @ts-ignore
    document.getElementsByClassName("comment-content")[index].style.display = "block"
    // @ts-ignore
    document.getElementsByClassName("comment-update")[index].style.display = "none"
  }

  childCancel(index) {
    // @ts-ignore
    document.getElementsByClassName("child-comment-content")[index].style.display = "block"
    // @ts-ignore
    document.getElementsByClassName("child-comment-update")[index].style.display = "none"
  }

  likeStatus(id: any) {
    this.likeStatusService.likeStatus(id, this.currentUserId).subscribe(data => {
      this.likeStatuses = data
      this.status.isLiked = !this.status.isLiked
      if (this.status.isLiked == true) {
        this.numberOfLikeOfStatus += 1
      } else {
        this.numberOfLikeOfStatus -= 1
      }
    })
  }

  likeComment(id: any, index, number) {
    this.likeCommentService.likeComment(id, this.currentUserId).subscribe(data => {
      this.likeComments = data
      if (number == 1) {
        this.listCommentOfStatus[index].isLikeComment = !this.listCommentOfStatus[index].isLikeComment
        if (this.listCommentOfStatus[index].isLikeComment == true) {
          this.listNumberOfParentComment[index] += 1
        } else {
          this.listNumberOfParentComment[index] -= 1
        }
      }
      if (number == 2) {
        console.log(this.listCommentOfComment[index])
        this.listCommentOfComment[index].isLike = !this.listCommentOfComment[index].isLike
        if (this.listCommentOfComment[index].isLike == true) {
          this.listNumberOfChildComment[index] += 1
        } else {
          this.listNumberOfChildComment[index] -= 1
        }
      }
    })
  }
}
