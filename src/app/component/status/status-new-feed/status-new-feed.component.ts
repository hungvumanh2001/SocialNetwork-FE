import {Component, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RelationshipService} from "../../../service/relationship.service";
import {Status} from "../../../model/status";
import {NgToastService} from "ng-angular-popup";
import {LikeStatusService} from "../../../service/like-status.service";
import {ImageService} from "../../../service/image.service";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-status-new-feed',
  templateUrl: './status-new-feed.component.html',
  styleUrls: ['./status-new-feed.component.css']
})
export class StatusNewFeedComponent implements OnInit {
  statuses: any;
  currentId: any;
  id: any;
  avatar: any
  fullname: any;
  relationship: any;
  numberStatusOwner: any;
  numberFriend: any;
  likeStatuses: any
  imgs: any [] = [];
  newSelectedImages: [];
  selectedImages: any[] = [];
  statusForm: FormGroup = this.fb.group({
      content: new FormControl(''),
      status: new FormControl(''),
    }
  )
  statusz: Status = {
    owner: {
      id: 0,
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      birthday: "",
      fullname: "",
      avatar: "",
      address: "",
      hobby: "",
      enabled: false,
      roles: [undefined]
    },
    content: "",
    createAt: "",
    id: 0,
    status: ""
  };

  constructor(private statusService: StatusService, private activatedRoute: ActivatedRoute,
              private relationshipService: RelationshipService, private router: Router,
              private fb: FormBuilder, private toast: NgToastService,
              private likeService: LikeStatusService,
              private imageService: ImageService,
              private storage: AngularFireStorage) {

  }

  ngOnInit(): void {
    this.avatar = localStorage.getItem("AVATAR")
    this.fullname = localStorage.getItem("FULLNAME")
    this.currentId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      // this.id = param.get("id");
      this.statusService.findAll(this.currentId).subscribe((status) => {
        this.statuses = status;
        for (let i = 0; i < this.statuses[0].length; i++) {
          this.likeService.check(this.statuses[0][i].id, this.currentId).subscribe(data => {
            this.statuses[0][i].isLiked = data;
          }, error => (
            console.log("err", error)
          ))
        }
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
    this.statusService.findAllByOwnerId(this.currentId).subscribe((status) => {
      this.numberStatusOwner = status;
    })
    this.relationshipService.findAllFriendListByUserId(this.currentId).subscribe(data => {
      this.numberFriend = data;
      this.relationship = data;
    })
  }

  getStatus(id) {
    this.statusService.getById(id).subscribe(result => {
      this.statusz = result[0][0];
      for (let i = 0; i < result[1].length; i++) {
        this.imgs.push(result[1][i].image)
      }
      console.log(this.imgs)
    }, error => {
      console.log(error);
    })
  }

  resetValue() {
    this.imgs = [];
  }

  editStatus() {
    // @ts-ignore
    const status: Status = {
      content: this.statusForm.value.content,
      status: this.statusForm.value.status,
    }
    console.log(status);
    if (status.content == "" && this.imgs.length == 0) {

    } else {
      // @ts-ignore
      this.statusService.edit(this.statusz.id, status).subscribe((data) => {
        this.toast.success({detail: "Thông Báo", summary: "Sửa bài đăng thành công", duration: 3000})
        window.setTimeout(function(){location.reload()},1500)
        for (let item of this.imgs) {
          const images = {
            status: {
              id: data.id
            },
            image: item
          }
          this.imageService.save(images).subscribe(() => {
          });
        }
        this.statusForm.reset();
        this.imgs = []
        // this.reloadCurrentRoute()
      }, error => {
        console.log(error);
      })
    }
  }

  deleteImg(i: any) {
    this.imgs.splice(i, 1)
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  delete(id: any) {
    this.statusService.delete(id).subscribe(() => {
      this.toast.success({detail: "Thông Báo", summary: "Xóa bài đăng thành công", duration: 3000})
      this.reloadCurrentRoute()
    }, e => {
      this.toast.error({detail: "Thông Báo", summary: "Sửa bài đăng thất bại", duration: 3000})
      console.log(e);
    });
  }

  likeStatus(id: any, index) {
    this.likeService.likeStatus(id, this.currentId).subscribe(data => {
      this.likeStatuses = data
      this.statuses[0][index].isLiked = !this.statuses[0][index].isLiked
      if (this.statuses[0][index].isLiked == true) {
        this.statuses[2][index] += 1
      } else {
        this.statuses[2][index] -= 1
      }
    })
  }

  // upload ảnh
  async upload() {
    if (this.newSelectedImages.length !== 0) {
      for (let i = 0; i < this.newSelectedImages.length; i++) {
        let selectedImage = this.newSelectedImages[i];
        var n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this.storage.ref(filePath);
        await this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              console.log(url);
              this.imgs.push(url);
            });
          })
        ).subscribe(() => {
        });
      }
    }
  }

  // Chọn ảnh
  selectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.newSelectedImages = event.target.files;
      for (let i = 0; i < event.target.files.length; i++) {
        console.log(event.target.files[i])
        this.selectedImages.push(event.target.files[i]);
      }
      //bi bo? qua
      this.upload()
    } else {
      this.selectedImages = [];
    }
  }
}
