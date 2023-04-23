import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {StatusService} from "../../../service/status.service";
import {finalize, Observable} from "rxjs";
import {ImageService} from "../../../service/image.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-status-create',
  templateUrl: './status-create.component.html',
  styleUrls: ['./status-create.component.css']
})
export class StatusCreateComponent implements OnInit {
  avatarCurrentUser = localStorage.getItem("AVATAR")
  statuz: any;
  selectedImages: any[] = [];
  imgs: string[] = [];
  newSelectedImages: [];
  fileInfos: Observable<any>;
  statusForm: FormGroup = new FormGroup({
    content: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(private statusService: StatusService,
              private imageService: ImageService,
              private storage: AngularFireStorage,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.statuz = {
      content: this.statusForm.value.content,
      status: this.statusForm.value.status,
      owner: {
        id: localStorage.getItem('ID'),
      }
    }
    if (this.statuz.content == "" && this.imgs.length == 0) {
    } else {
      if (this.statuz.status == 0) {
        this.statuz.status = 1
      }
      this.statusService.save(this.statuz).subscribe((data) => {
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
        this.imgs = [];
        // this.reloadCurrentRoute();
        location.reload();
      }, error => {
      });
    }
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
        this.selectedImages.push(event.target.files[i]);
      }
      this.upload()
    } else {
      this.selectedImages = [];
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
}
