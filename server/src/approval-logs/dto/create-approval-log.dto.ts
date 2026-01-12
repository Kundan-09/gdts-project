export class CreateApprovalLogDto {
  applicationId: number;
  actionByUserId: number;
  previousStatus: string;
  newStatus: string;
  remark?: string;
}
