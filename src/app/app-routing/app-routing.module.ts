import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from '../root/root.component';
import { ForgotPassComponent } from '../landing-page/authentication/forgot-pass/forgot-pass.component';
import { VerifyEmailComponent } from '../landing-page/authentication/verify-email/verify-email.component';
import { ResetPassComponent } from '../landing-page/authentication/reset-pass/reset-pass.component';
import { PlatformRootComponent } from '../platform/platform-root/platform-root.component';
import { DashboardComponent } from '../platform/dashboard/dashboard.component';
import { BooksComponent } from '../platform/books/books/books.component';
import { EmailNotVerifiedComponent } from '../platform/signup-flow/email-not-verified/email-not-verified.component';
import { AnswersComponent } from '../platform/answers/answers.component';
import { SigninSecondaryComponent } from '../landing-page/authentication/signin-secondary/signin-secondary.component';
import { SignupSecondaryComponent } from '../landing-page/authentication/signup-secondary/signup-secondary.component';
import { CreateStudentComponent } from '../platform/create-student/create-student.component';
import { SelectSubscriptionComponent } from '../platform/select-subscription/select-subscription.component';
import { BillingInformationComponent } from '../platform/billing-information/billing-information.component';
import { SelectBookComponent } from '../platform/select-book/select-book.component';
import { AboutEvolytesGameComponent } from '../platform/signup-flow/about-evolytes-game/about-evolytes-game.component';
import { AboutMonitorComponent } from '../platform/signup-flow/about-monitor/about-monitor.component';
import { AboutBookComponent } from '../platform/signup-flow/about-book/about-book.component';
import { BillingConfirmationComponent } from '../platform/signup-flow/billing-confirmation/billing-confirmation.component';
import { TcComponent } from '../landing-page/authentication/tc/tc.component';
import { PrivacyPolicyComponent } from '../landing-page/authentication/privacy-policy/privacy-policy.component';
import { EvoAdminRootComponent } from '../admin/evo-admin-root/evo-admin-root.component';
import { AdminUsersComponent } from '../admin/admin-users/admin-users.component';
import { AdminUserEditComponent } from '../admin/admin-users/admin-user-edit/admin-user-edit.component';
import { EvoAdminQuestionsComponent } from '../admin/evo-admin-questions/evo-admin-questions.component';
import { EvoAdminQEditComponent } from '../admin/evo-admin-questions/evo-admin-q-edit/evo-admin-q-edit.component';
import { AdminOrdersComponent } from '../admin/admin-orders/admin-orders.component';
import { AdminOrdersEditComponent } from '../admin/admin-orders/admin-orders-edit/admin-orders-edit.component';
import { EvoLandChooseLanguageComponent } from '../landing-page/Localization/evo-land-choose-language/evo-land-choose-language.component';
import { EvoAdminSchoolsComponent } from '../admin/evo-admin-schools/evo-admin-schools.component';
import { EvoAdminSchoolEditComponent } from '../admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-edit.component';
import {
  EvoAdminSchoolUserEditComponent
} from '../admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-user-edit/evo-admin-school-user-edit.component';
import {
  EvoAdminSchoolStudentEditComponent
} from '../admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-student-edit/evo-admin-school-student-edit.component';
import {
  EvoAdminSchoolUploadUsersComponent
} from '../admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-upload-users/evo-admin-school-upload-users.component';
import {
  EvoAdminSchoolUploadStudentsComponent
} from '../admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-upload-students/evo-admin-school-upload-students.component';
import { AdminPricingComponent } from '../admin/admin-pricing/admin-pricing.component';
import { EvoLandChooseCountryComponent } from '../landing-page/Localization/evo-land-choose-country/evo-land-choose-country.component';
import { AdminBooksComponent } from '../admin/admin-books/admin-books.component';
import { AdminBookEditComponent } from '../admin/admin-books/admin-book-edit/admin-book-edit.component';
import { AdminBookVersionEditComponent } from '../admin/admin-books/admin-book-version-edit/admin-book-version-edit.component';
import { AdminBookIntegrationEditComponent } from '../admin/admin-books/admin-book-integration-edit/admin-book-integration-edit.component';
import { PricingComponent } from '../landing-page/pages/pricing/pricing.component';
import { LandingComponent } from '../landing-page/pages/landing/landing.component';
import { SchoolsComponent } from '../landing-page/pages/schools/schools.component';
import { AboutUsComponent } from '../landing-page/pages/about-us/about-us.component';
import { ResearchComponent } from '../landing-page/pages/research/research.component';
import { FaqComponent } from '../landing-page/pages/faq/faq.component';
import { FeaturesComponent } from '../landing-page/pages/features/features.component';
import { ContactUsComponent } from '../landing-page/pages/contact-us/contact-us.component';
import { AdminObjectiveComponent } from '../admin/admin-objective/admin-objective.component';
import { AdminObjectiveEditComponent } from '../admin/admin-objective/admin-objective-edit/admin-objective-edit.component';
import { AdminSkillGroupComponent } from '../admin/admin-skill-group/admin-skill-group.component';
import { AdminSkillGroupEditComponent } from '../admin/admin-skill-group/admin-skill-group-edit/admin-skill-group-edit.component';
import { AdminStudentsComponent } from '../admin/admin-students/admin-students.component';
import { AdminStudentEditComponent } from '../admin/admin-students/admin-student-edit/admin-student-edit.component';
import { TeacherInitPassComponent } from '../landing-page/authentication/teacher-init-pass/teacher-init-pass.component';
import { SchoolAdminRootComponent } from '../platform/school-admin-root/school-admin-root.component';
import { SchoolAdminTeachersComponent } from '../platform/school-admin-root/school-admin-teachers/school-admin-teachers.component';
import { SchoolAdminStudentsComponent } from '../platform/school-admin-root/school-admin-students/school-admin-students.component';
import {
  SchoolAdminStudentsImportComponent
} from '../platform/school-admin-root/school-admin-students-import/school-admin-students-import.component';
import {
  TeacherInvitationSignupComponent
} from '../platform/accept-invitation/teacher-invitation-signup/teacher-invitation-signup.component';
import {
  SchoolAdminTeacherDetailComponent
} from '../platform/school-admin-root/school-admin-teachers/school-admin-teacher-detail/school-admin-teacher-detail.component';
import {
  SchoolAdminStudentDetailComponent
} from '../platform/school-admin-root/school-admin-students/school-admin-student-detail/school-admin-student-detail.component';
import { SchoolAdminGroupsComponent } from '../platform/school-admin-root/school-admin-groups/school-admin-groups.component';
import {
  SchoolAdminGroupDetailComponent
} from '../platform/school-admin-root/school-admin-groups/school-admin-group-detail/school-admin-group-detail.component';
import { GameComponent } from '../landing-page/pages/features/game/game.component';
import { BookComponent } from '../landing-page/pages/features/book/book.component';
import { MonitorComponent } from '../landing-page/pages/features/monitor/monitor.component';
import { VideosPageComponent } from '../platform/videos-page/videos-page.component';
import {SchoolAdminVideosPageComponent} from '../platform/school-admin-root/school-admin-videos-page/school-admin-videos-page.component';
import {SchoolAdminTeachersInvitationsComponent} from '../platform/school-admin-root/school-admin-teachers/school-admin-teachers-invitations/school-admin-teachers-invitations.component';
import {SchoolAdminTeachersInvitationImportComponent} from '../platform/school-admin-root/school-admin-teachers/school-admin-teachers-invitation-import/school-admin-teachers-invitation-import.component';
import {EvoAdminSchoolUploadUsersInvitationsComponent} from '../admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-upload-users-invitations/evo-admin-school-upload-users-invitations.component';
import { EvoAdminSchoolUsersInvitationsComponent } from '../admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-users-invitations/evo-admin-school-users-invitations.component';
import {BookDetailComponent} from '../platform/books/book-detail/book-detail.component';
import {NewSelectStudentComponent} from '../platform/new-select-student/new-select-student.component';
import { NewSettingsPageComponent } from '../platform/new-settings-page/new-settings-page.component';


import { SchoolAdminLicenseComponent } from '../platform/school-admin-root/school-admin-license/school-admin-license.component';
import {AccountsSettingsComponent} from '../platform/new-settings-page/accounts-settings/accounts-settings.component';
import {AuthSettingsComponent} from '../platform/new-settings-page/auth-settings/auth-settings.component';
import {ProfileSettingsComponent} from '../platform/new-settings-page/profile-settings/profile-settings.component';
import {PasswordSettingsComponent} from '../platform/new-settings-page/password-settings/password-settings.component';
import {NewBillingSettingsComponent} from '../platform/new-settings-page/new-billing-settings/new-billing-settings.component';
const appRoutes: Routes = [
  { path: '', redirectTo: 'selectCountry', pathMatch: 'full' },
  { path: 'selectCountry', component: EvoLandChooseCountryComponent },
  { path: 'selectLanguage', component: EvoLandChooseLanguageComponent },
  {
    path: 'home', component: RootComponent, children: [
      { path: ':culture/landing', component: LandingComponent },
      { path: ':culture/signin', component: SigninSecondaryComponent },
      { path: ':culture/signup', component: SignupSecondaryComponent },
      { path: ':culture/forgotpass', component: ForgotPassComponent },
      { path: ':culture/tc', component: TcComponent },
      { path: ':culture/privacy', component: PrivacyPolicyComponent },
      { path: ':culture/verifyEmail', component: EmailNotVerifiedComponent },
      { path: ':culture/verifyEmail/:token', component: VerifyEmailComponent },
      { path: ':culture/resetpassword/:token', component: ResetPassComponent },
      { path: ':culture/initpassword/:token', component: TeacherInitPassComponent },
      { path: ':culture/pricing', component: PricingComponent },
      { path: ':culture/schools', component: SchoolsComponent },
      { path: ':culture/aboutUs', component: AboutUsComponent },
      { path: ':culture/research', component: ResearchComponent },
      { path: ':culture/faq', component: FaqComponent },
      {
        path: ':culture/features', component: FeaturesComponent, children: [
          { path: 'game', component: GameComponent },
          { path: 'books', component: BookComponent },
          { path: 'monitor', component: MonitorComponent }
        ]
      },
      { path: ':culture/contactUs', component: ContactUsComponent }
    ]
  },
  { path: 'inviteTeacher/:token', component: TeacherInvitationSignupComponent },
  { path: 'inviteTeacherV2/:token', component: TeacherInvitationSignupComponent },
  { path: 'selectstudent', component: NewSelectStudentComponent },
  { path: 'createstudent', component: CreateStudentComponent },
  { path: 'selectsub', component: SelectSubscriptionComponent },
  { path: 'selectbook', component: SelectBookComponent },
  { path: 'confirmpurch', component: BillingInformationComponent },
  { path: 'bookintro', component: AboutBookComponent },
  { path: 'gameintro', component: AboutEvolytesGameComponent },
  { path: 'monitorintro', component: AboutMonitorComponent },
  { path: 'thankpurchase', component: BillingConfirmationComponent },
  {
    path: 'platform', component: PlatformRootComponent, children: [
      { path: 'dash', component: DashboardComponent },
      { path: 'books', component: BooksComponent },
      { path: 'books/:bookVersion', component: BookDetailComponent },
      { path: 'answers', component: AnswersComponent },
      { path: 'settings', component: NewSettingsPageComponent, children: [
          { path: 'account', component: AccountsSettingsComponent },
          { path: 'auth', component: AuthSettingsComponent }
        ]
      },
      { path: 'videos', component: VideosPageComponent }
    ]
  },
  {
    path: 'schooladmin', component: SchoolAdminRootComponent, children: [
      { path: 'teachers', component: SchoolAdminTeachersComponent },
      { path: 'teachers/:teacherId', component: SchoolAdminTeacherDetailComponent },
      { path: 'students', component: SchoolAdminStudentsComponent },
      { path: 'students/:studentId', component: SchoolAdminStudentDetailComponent },
      { path: 'importStudents', component: SchoolAdminStudentsImportComponent },
      { path: 'videos', component: SchoolAdminVideosPageComponent },
      { path: 'groups', component: SchoolAdminGroupsComponent },
      { path: 'groups/:groupId', component: SchoolAdminGroupDetailComponent },
      { path: 'invitations', component: SchoolAdminTeachersInvitationsComponent },
      { path: 'importInvitations', component: SchoolAdminTeachersInvitationImportComponent },
      { path: 'licenses', component: SchoolAdminLicenseComponent }
    ]
  },
  {
    path: 'admin', component: EvoAdminRootComponent, children: [
      { path: 'users', component: AdminUsersComponent },
      { path: 'students', component: AdminStudentsComponent },
      { path: 'students/:studentId/edit', component: AdminStudentEditComponent },
      { path: 'users/:userId/edit', component: AdminUserEditComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'orders/:orderId', component: AdminOrdersEditComponent },
      { path: 'questions', component: EvoAdminQuestionsComponent },
      { path: 'questions/:questionId/edit', component: EvoAdminQEditComponent },
      { path: 'skillGroups', component: AdminSkillGroupComponent },
      { path: 'skillGroups/:skillGroupId/edit', component: AdminSkillGroupEditComponent },
      { path: 'skillGroups/create', component: AdminSkillGroupEditComponent },
      { path: 'questions/create', component: EvoAdminQEditComponent },
      { path: 'schools', component: EvoAdminSchoolsComponent },
      { path: 'schools/:schoolId/edit', component: EvoAdminSchoolEditComponent },
      { path: 'schools/create', component: EvoAdminSchoolEditComponent },
      { path: 'schools/:schoolId/users/create', component: EvoAdminSchoolUserEditComponent },
      { path: 'schools/:schoolId/users/import', component: EvoAdminSchoolUploadUsersComponent },
      { path: 'schools/:schoolId/users/:userId/edit', component: EvoAdminSchoolUserEditComponent },
      { path: 'schools/:schoolId/invitations', component: EvoAdminSchoolUsersInvitationsComponent },
      { path: 'schools/:schoolId/invitations/import', component: EvoAdminSchoolUploadUsersInvitationsComponent },
      { path: 'schools/:schoolId/students/create', component: EvoAdminSchoolStudentEditComponent },
      { path: 'schools/:schoolId/students/import', component: EvoAdminSchoolUploadStudentsComponent },
      { path: 'schools/:schoolId/students/:studentId/edit', component: EvoAdminSchoolStudentEditComponent },
      { path: 'pricing', component: AdminPricingComponent },
      { path: 'books', component: AdminBooksComponent },
      { path: 'books/create', component: AdminBookEditComponent },
      { path: 'books/:bookId/edit', component: AdminBookEditComponent },
      { path: 'books/:bookId/versions/create', component: AdminBookVersionEditComponent },
      { path: 'books/:bookId/versions/:versionId/edit', component: AdminBookVersionEditComponent },
      { path: 'books/:bookId/versions/:versionId/integrations/create', component: AdminBookIntegrationEditComponent },
      { path: 'books/:bookId/versions/:versionId/integrations/:integrationId/edit', component: AdminBookIntegrationEditComponent },
      { path: 'objectives', component: AdminObjectiveComponent },
      { path: 'objectives/:objectiveId', component: AdminObjectiveEditComponent },
      { path: 'objectives/create', component: AdminObjectiveEditComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'top', // Add options right here,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
