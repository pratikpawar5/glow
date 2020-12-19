import { Component, OnInit } from '@angular/core';
import { SMEManagementTeam } from '@models/management-team';
import { SMEItemStatus, SmeEntity, SMEItemsType } from '@models/sme';
import { SmeAdminServiceService } from 'app/sme-admin/sme-admin-service/sme-admin-service.service';
import { SmeService } from '@services/sme/sme.service';
import { PageTitleService } from '@services/page-title/page-title.service';
import { TokenService } from '@services/token/token.service';
import { TeamDelete, DeleteObject, ObjectType } from '@models/common-delete';
import { SnackBarService } from '@services/common/snack-bar.service';
import { DeleteObjectsComponent } from 'app/shared/components/delete-objects/delete-objects.component';
import { DialogService } from '@services/mat-dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
declare var ga: Function;

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.css']
})
export class AdminTeamComponent implements OnInit {

  edit: boolean = false
  delete: boolean = false
  smeManagementTeam: Array<SMEManagementTeam>
  disablePublishButton: boolean = true;
  disableDeactiveButton: boolean = true;
  map = new Map<string, SMEItemStatus>();
  selectedTeamSize: any = 0
  status: string = 'active'
  status1: string = 'deactive'
  publishTeamButton: boolean = true
  showSpinner: boolean = true
  notFound: boolean
  sUuid:string
  showButton: boolean = true

  constructor(private smeAdminServiceService: SmeAdminServiceService,private smeService:SmeService, 
    private snackBar: SnackBarService, private dialog: DialogService,private matDialog:MatDialog,
    private pageTitleService: PageTitleService,private token:TokenService,router:Router) { 
      ga('set', 'page', router.url);
      ga('send', 'pageview');
    }

  ngOnInit() {
    this.pageTitleService.updateTitle('Management Team | Admin')
    this.selectedTeamSize = 0;
    this.getTeamofSME(this.status)
    this.sUuid=this.token.getSmeId();
  }
  getTeamofSME(status: string) {
    this.smeService.smeManagementTeam(status).subscribe(
      res => {
        if(res.error)
        {
          this.showSpinner = false
          this.notFound = true
        }
        else{
          this.smeManagementTeam = res.data
          this.showSpinner = false
        }
      }
    )
  }
  onActive() {
    this.edit = false
    this.delete = false
    this.selectedTeamSize = 0
    this.publishTeamButton = true
    this.disableDeactiveButton = true
    this.map.clear()
    this.smeManagementTeam = undefined
    this.getTeamofSME(this.status)
    this.notFound = false

  }

  onInActive() {
    this.edit = true
    this.delete = true
    this.selectedTeamSize = 0
    this.publishTeamButton = false
    this.disablePublishButton = true
    this.map.clear()
    this.smeManagementTeam = undefined
    this.getTeamofSME(this.status1)
    this.notFound = false

  }


  onclickCheckbox(teamUuid: string, active: boolean) {
    if (!this.map.has(teamUuid)) {
      if (active) {
        this.map.set(teamUuid, SMEItemStatus.ACTIVE);
      }
      else {
        this.map.set(teamUuid, SMEItemStatus.DEACTIVE);
      }

    } else {
      this.map.delete(teamUuid)
    }
    this.selectedTeamSize = this.map.size
    if (this.map.size > 0) {
      this.disablePublishButton = false
      this.disableDeactiveButton = false
    } else {
      this.disablePublishButton = true
      this.disableDeactiveButton = true
    }
  }


  onClickDeactive() {
    this.showButton = false
    let publishDataArr = new Array<SmeEntity>();

    this.map.forEach((itemStatus: SMEItemStatus, teamUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = teamUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);

    });
    this.smeAdminServiceService.publishSmeInfo(publishDataArr, SMEItemsType.TEAM).subscribe(
      res => {
        if(res.error)
        {
          this.showButton = true

        }
        else{
          this.snackBar.open('Deactivate Successfully')
          this.map.clear()
          this.disableDeactiveButton = true
          this.showButton = true

          this.onActive()
        }
      }
    )
  }

  onClickPublish() {
    this.showButton = false
    let publishDataArr = new Array<SmeEntity>();

    this.map.forEach((itemStatus: SMEItemStatus, teamUuid: string) => {
      let smeItem = new SmeEntity();
      smeItem.id = teamUuid;
      smeItem.smeAction = itemStatus;
      publishDataArr.push(smeItem);

    });
    this.smeAdminServiceService.publishSmeInfo(publishDataArr, SMEItemsType.TEAM).subscribe(
      res => {
        if(res.error)
        {
          this.showButton = true

        }
        else{
          this.snackBar.open('Publish Data Successfully')
          this.map.clear()
          this.disablePublishButton = true
          this.showButton = true

          this.onInActive()
        }
      },
    )
  }
  onDelete(teamUuid: SMEManagementTeam, index) {
    let removeTeam = new TeamDelete();
    removeTeam.teamUuid = teamUuid.teamUuid;
    removeTeam.fullName = teamUuid.fullName

    let deleteObj: DeleteObject<any> = {
      type: ObjectType.TEAM,
      uuid: null,
      cirlceObjects: removeTeam

    }
    let ref = this.matDialog.open(DeleteObjectsComponent,this.dialog.getDeleteDialogConfig(deleteObj))
    ref.afterClosed().subscribe(
      res => {
        if (res) {
          this.smeManagementTeam.splice(index, 1)
        }
      }
    )
  }
  addNewTeamClick() {
    let url = '/my-sme/'+this.sUuid+'/add-management-team'
    window.open(url, '_blank')
  }
  viewAllTeamClick() {
    let url = '/my-sme/'+this.sUuid+'/management-teams'
    window.open(url, '_blank')
  }
}
