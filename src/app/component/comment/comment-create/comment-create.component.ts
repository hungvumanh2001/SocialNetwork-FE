import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from 'src/app/service/comment.service';
import {StatusService} from "../../../service/status.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @Input()
  statusId: any
  @Input()
  commentId: any
  avatarCurrentUser: any
  comment: any;
  commentForm: FormGroup = new FormGroup({
    content: new FormControl(''),
  });

  constructor(private commentService: CommentService,
              private statusService: StatusService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.avatarCurrentUser = localStorage.getItem("AVATAR")
  }

  submit() {
    if (typeof this.commentId == "undefined" || this.commentId == 0) {
      this.comment = {
        content: this.commentForm.value.content,
        userComment: {
          id: localStorage.getItem('ID')
        },
        status: {
          id: this.statusId,
        },
        active: 1
      }
    }
    else {
      this.comment = {
        content: this.commentForm.value.content,
        userComment: {
          id: localStorage.getItem('ID')
        },
        status: {
          id: this.statusId,
        },
        comment: {
          id: this.commentId
        },
        active: 1
      }
    }
    console.log(this.comment)
    this.commentService.save(this.comment).subscribe(() => {
      this.commentForm.reset()
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
}


