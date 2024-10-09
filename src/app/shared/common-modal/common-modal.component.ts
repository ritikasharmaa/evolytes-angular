import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LicenseFilter, SchoolLicenseModel } from 'src/app/models/school/school-license.model';
import { LicenseService } from 'src/app/services/license.service';
import { SchoolModel } from 'src/app/models/school/school.model';


@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.css']
})
export class CommonModalComponent implements OnInit {
  licenses: SchoolLicenseModel[] = [];
  licenseFilter = new LicenseFilter();
  school: SchoolModel = new SchoolModel();
  hasMoreData = true;
  createDate = '';
  expiresAt = '';

  constructor(private router: Router, private route: ActivatedRoute,
    private modalService: NgbModal, private licenseSv: LicenseService) { }


  openModal(content) {
    const modalRef = this.modalService.open(content, { size: 'lg' });
    this.licenseFilter.limit = 10;
    this.route.params.subscribe((params: Params) => {
      if (params.schoolId) {
        this.hasMoreData = true;
        this.licenseSv.getLicenseHistoryBySchoolId(params.schoolId, this.licenseFilter).subscribe((data) => {
          this.licenses = data;
          this.getDateFormat();
        });
      }
    });
  }
  ngOnInit() {
  }
  public hasData(): boolean {
    return (this.licenses != null && this.licenses.length > 0);
  }
  getDateFormat() {
    this.licenses.map((license) => {
      if (license.createdAt) {
        this.createDate = new Date(license.createdAt).toLocaleDateString('en-GB');
      }
      if (license.licenseExpiresAt) {
        this.expiresAt = new Date(license.licenseExpiresAt).toLocaleDateString('en-GB');
      }
    });
  }
  onFetchMoreUsers() {
    this.route.params.subscribe((params: Params) => {
      if (params.schoolId) {
        this.licenseFilter.skip = this.licenses.length;
        this.licenseSv.getLicenseHistoryBySchoolId(params.schoolId, this.licenseFilter).subscribe((data) => {
          if (data.length === 0) {
            this.hasMoreData = false;
          } else {
            this.hasMoreData = true;
          }
          this.licenses = this.licenses.concat(this.licenses);
        });

      }
    });
  }
}

