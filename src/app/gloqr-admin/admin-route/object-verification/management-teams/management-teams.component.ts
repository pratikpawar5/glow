import { Component, OnInit, Input } from '@angular/core';
import { SmeEntity, SMEItemsType } from '@models/sme';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SMEManagementTeam } from '@models/management-team';
import { ActivatedRoute } from '@angular/router';
import { TeamDetailDialogComponent } from './team-detail-dialog/team-detail-dialog.component';
import { GloqrAdminService } from 'app/gloqr-admin/gloqr-admin-services/gloqr-admin.service';

@Component({
  selector: 'app-management-teams',
  templateUrl: './management-teams.component.html',
  styleUrls: ['./management-teams.component.css']
})
export class ManagementTeamsComponent implements OnInit {


  smeEntities = new Array<SmeEntity>();
  smeTeams: Array<SMEManagementTeam>
  @Input()
  sUuid: string
  isSelect: boolean = false
  disableFlag: boolean = true;
  approveSelectedSize: any = 0;
  rejectSelectedSize: any = 0;
  name: string;
  showSpinner: boolean = true
  notFound: boolean
  showButton: boolean = true
  approveteamSMEfaceDialog: MatDialogRef<TeamDetailDialogComponent>

  constructor(private gloqrAdminService: GloqrAdminService, private matDialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {

    this.approveSelectedSize = 0
    this.rejectSelectedSize = 0
    this.gloqrAdminService.getSmeItems(this.sUuid, SMEItemsType.TEAM).subscribe(
      res => {
        if (res.error) {
          this.showSpinner = false
          this.notFound = true
        }
        else {
          this.smeTeams = res.data
          this.showSpinner = false
        }
      }
    )
  }

  onViewTeamDetail(smeTeam: SMEManagementTeam, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = smeTeam
    this.approveteamSMEfaceDialog = this.matDialog.open(TeamDetailDialogComponent, dialogConfig);
    this.approveteamSMEfaceDialog.afterClosed().subscribe(
      res => {

        if (res) {
          this.rejectSelectedSize = 0
          this.approveSelectedSize = 0
          if (res.state === 1) {
            smeTeam.isApprove = true
            smeTeam.isReject = false
          }

          if (res.state === 2) {
            smeTeam.isReject = true
            smeTeam.isApprove = false
          }

          let entityIndex: number = this.smeEntities.findIndex(entity => entity.id == res.id);
          if (entityIndex != -1) {
            this.smeEntities.splice(entityIndex, 1);
          }
          this.smeEntities.push(res)

          this.smeEntities.forEach(smeEntity => {
            let team: SMEManagementTeam = this.smeTeams.find(team => team.teamUuid === smeEntity.id)
            team.frontFeedBackMessage = smeEntity.feedbackMessage

            if (smeEntity.state == 2) {
              this.smeTeams[index].isSelected = true;
              ++this.rejectSelectedSize;
            }

            if (smeEntity.state == 1) {
              this.smeTeams[index].isSelected = true;
              ++this.approveSelectedSize;
            }

          })

        }
      }
    )
  }

  onSubmit() {
    {
      if (this.smeEntities.length > 0) {
        this.showButton = false
        this.gloqrAdminService.updateSmeItems(this.smeEntities, SMEItemsType.TEAM).subscribe(
          res => {
            this.smeEntities.forEach(smeEntity => {
              let index: number = this.smeTeams.findIndex(team => team.teamUuid === smeEntity.id)
              if (index != -1) {
                this.smeTeams.splice(index, 1);
                this.showButton = true
                this.smeEntities = []
                this.rejectSelectedSize = 0
                this.approveSelectedSize = 0
              }
            })

          }
        )
      }

    }
  }

}
