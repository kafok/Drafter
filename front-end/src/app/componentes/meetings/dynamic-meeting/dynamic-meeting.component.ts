import { NgModule, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DynamicMeetingService } from '../../services/dynamic-meeting.service';


@Component({
  selector: 'dynamic-meeting',
  templateUrl: './dynamic-meeting.component.html',
  styleUrls: ['./dynamic-meeting.component.scss']
})
export class DynamicMeetingComponent implements OnInit {

  public meetingId :number;
  public meetingInfo:any={};
  public users:Array<any>;
  public isFinished:boolean;

  constructor(private userService: UserService, private router:Router, private activatedRoute:ActivatedRoute, private meetingService:DynamicMeetingService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.meetingId = params['id']});
    if(this.meetingId){
      this.meetingService.getMeetingInfo(this.meetingId).subscribe((res:any) =>{
        this.meetingInfo = res;
        if(this.meetingInfo.isFinished){
          this.router.navigate(['/minutes/'+this.meetingId]);
        }else{
          this.users = res.attendants;
        }
      });
    }
    

  } 

  finishMeeting(meetingId:number){
    this.meetingService.finish(meetingId);
    this.router.navigate(['/minutes/'+meetingId]);
  }

}
