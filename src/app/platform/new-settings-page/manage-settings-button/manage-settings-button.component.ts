import {Component, Input, NgZone, OnInit} from '@angular/core';
import {StudentModel} from '../../../models/authentication/student.model';
import {SubscriptionModel} from '../../../models/subscription.model';
import {UserModel} from '../../../models/authentication/user.model';
import {ChargebeeService} from '../../../services/chargebee.service';
import {TranslateService} from '@ngx-translate/core';
import {ModalService} from '../../../root/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-settings-button',
  templateUrl: './manage-settings-button.component.html',
  styleUrls: ['./manage-settings-button.component.css']
})
export class ManageSettingsButtonComponent implements OnInit {

  @Input() student: StudentModel;

  SubscriptionStatusTypes = StudentModel.ChargebeeSubscriptionsStatusTypes;
  subscription: SubscriptionModel;
  Status = StudentModel.ChargebeeSubscriptionsStatusTypes;
  user = UserModel.getCurrent();

  cbInstance: any;

  constructor(private cbSv: ChargebeeService,
              private tSv: TranslateService,
              private ngZone: NgZone,
              private modalSv: ModalService,
              private router: Router) {
  }

  ngOnInit() {

    this.cbInstance = window['Chargebee'].getInstance();

  }

  /**
   * Only the account owner is billed for the student except if it is for a school then
   * a user should not own the student.
   */
  isAccountOwner(): boolean {

    const currStudent = this.student;
    const currUser = UserModel.getCurrent();
    if (currStudent) {

      console.log('current student creator: ' + currStudent._creator);
      console.log('user model: ' + UserModel.getCurrent()._id);
      console.log('current student billing status: ' + currStudent.billingStatus);

      console.log('current student is: ' + JSON.stringify(currStudent, null, 4));

      if (currStudent._creator === currUser._id && !currStudent.schoolId) {
        return true;
      }
    }

    return false;

  }

  getBillingStatus(): string {

    if (this.student) {

      return this.student.billingStatus;
    }

    return null;
  }

  onManageSubscriptionClicked() {

    // Implementation for portal sessions: https://www.chargebee.com/checkout-portal-docs/api-portal.html#integration-steps
    this.cbInstance.setPortalSession(() => {
      return this.cbSv.manageSubscriptionCheckout();
    });


    const cbPortal = this.cbInstance.createChargebeePortal();
    cbPortal.open({
      close: () => {
        // close callbacks
        // Update the student status if the user has changed their subscription.
        this.cbSv.updateStudentSubscriptionStatus().subscribe((student) => {
          StudentModel.setCurrent(student);
        });
      }
    });

  }

  onRenewClicked() {
    this.router.navigate(['selectsub'], {queryParams: {student: this.student._id}});
  }

}
