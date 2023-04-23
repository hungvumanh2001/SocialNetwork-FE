import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.css']
})
export class ListFriendComponent implements OnInit {

  @Input()
  id: any
  @Input()
  listFriend: any = [];
  @Input()
  user: any
  @Input()
  currentId: any
  @Input()
  relationship: any
  @Input()
  listMutualFriend:any=[];
  constructor() {
  }

  ngOnInit(): void {

  }
}
