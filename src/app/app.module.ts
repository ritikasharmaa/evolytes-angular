import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandNavHeaderComponent } from './shared/land-nav-header/land-nav-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsletterService } from './services/newsletter.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { RootComponent } from './root/root.component';
import { ModalService } from './root/modal.service';
import { EvoInputComponent } from './shared/evo-input/evo-input.component';
import { ModalComponent } from './root/modal/modal.component';
import { ForgotPassComponent } from './landing-page/authentication/forgot-pass/forgot-pass.component';
import { VerifyEmailComponent } from './landing-page/authentication/verify-email/verify-email.component';
import { ResetPassComponent } from './landing-page/authentication/reset-pass/reset-pass.component';
import { PlatformRootComponent } from './platform/platform-root/platform-root.component';
import { DashboardComponent } from './platform/dashboard/dashboard.component';
import { EvoSidebarComponent } from './shared/evo-sidebar/evo-sidebar.component';
import { EvoHeaderComponent } from './shared/evo-header/evo-header.component';
import { EmailNotVerifiedComponent } from './platform/signup-flow/email-not-verified/email-not-verified.component';
import { EvoFooterComponent } from './shared/evo-footer/evo-footer.component';
import { AnswersComponent } from './platform/answers/answers.component';
import { EvoDropdownComponent } from './shared/evo-dropdown/evo-dropdown.component';
import { EvoLangDropdownComponent } from './shared/evo-lang-dropdown/evo-lang-dropdown.component';
import { EvoRecentActivityComponent } from './shared/evo-recent-activity/evo-recent-activity.component';
import { AnswerContainerComponent } from './shared/answer-container/answer-container.component';
import { AnswersListComponent } from './shared/answers-list/answers-list.component';
import { EvoInputDateComponent } from './shared/evo-input-date/evo-input-date.component';
import { DashProgressBarComponent } from './platform/dashboard/dash-progress-bar/dash-progress-bar.component';
import { SigninSecondaryComponent } from './landing-page/authentication/signin-secondary/signin-secondary.component';
import { SignupSecondaryComponent } from './landing-page/authentication/signup-secondary/signup-secondary.component';
import { EvoDecorationBackgroundSignupComponent } from './shared/evo-decoration-background-signup/evo-decoration-background-signup.component';
import { CreateStudentComponent } from './platform/create-student/create-student.component';
import { EvoProgressPointsComponent } from './shared/evo-progress-points/evo-progress-points.component';
import { SelectSubscriptionComponent } from './platform/select-subscription/select-subscription.component';
import { BillingInformationComponent } from './platform/billing-information/billing-information.component';
import { SelectBookComponent } from './platform/select-book/select-book.component';
import { SelectBookContainerComponent } from './platform/select-book/select-book-container/select-book-container.component';
import { EvoCheckmarkComponent } from './shared/evo-checkmark/evo-checkmark.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ThankYouPurchaseComponent } from './platform/signup-flow/thank-you-purchase/thank-you-purchase.component';
import { AboutBookComponent } from './platform/signup-flow/about-book/about-book.component';
import { AboutEvolytesGameComponent } from './platform/signup-flow/about-evolytes-game/about-evolytes-game.component';
import { AboutMonitorComponent } from './platform/signup-flow/about-monitor/about-monitor.component';
import { BillingConfirmationComponent } from './platform/signup-flow/billing-confirmation/billing-confirmation.component';
import { HamburgerButtonComponent } from './shared/hamburger-button/hamburger-button.component';
import { MobileMenuComponent } from './mobile/mobile-menu/mobile-menu.component';
import { TcComponent } from './landing-page/authentication/tc/tc.component';
import { PrivacyPolicyComponent } from './landing-page/authentication/privacy-policy/privacy-policy.component';
import { EvoAdminRootComponent } from './admin/evo-admin-root/evo-admin-root.component';
import { EvoAdminHeaderComponent } from './admin/evo-admin-header/evo-admin-header.component';
import { EvoAdminQuestionsComponent } from './admin/evo-admin-questions/evo-admin-questions.component';
import { EvoAdminSidebarComponent } from './admin/shared/evo-admin-sidebar/evo-admin-sidebar.component';
import { EvoAdminQEditComponent } from './admin/evo-admin-questions/evo-admin-q-edit/evo-admin-q-edit.component';
import { EvoCountNumbersComponent } from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-count-numbers/evo-count-numbers.component';
import {
  EvoCountMultipleNumbersComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-count-multiple-numbers/evo-count-multiple-numbers.component';
import {
  EvoSingleAdditionComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-single-addition/evo-single-addition.component';
import {
  EvoDoubleAdditionComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-double-addition/evo-double-addition.component';
import {
  EvoSingleAdditionNeededAmountComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-single-addition-needed-amount/evo-single-addition-needed-amount.component';
import {
  EvoSingleSubtractionComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-single-subtraction/evo-single-subtraction.component';
import {
  EvoDoubleSubtractionComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-double-subtraction/evo-double-subtraction.component';
import {
  EvoReusableRangeComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-reusable-range/evo-reusable-range.component';
import { EvoTranslatedInputComponent } from './shared/evo-translated-input/evo-translated-input.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EvoAdminUsersComponent } from './admin/evo-admin-users/evo-admin-users.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminOrdersEditComponent } from './admin/admin-orders/admin-orders-edit/admin-orders-edit.component';
import { EvoLandChooseLanguageComponent } from './landing-page/Localization/evo-land-choose-language/evo-land-choose-language.component';
import {
  EvoSizeComparisonNumbersComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-size-comparison-numbers/evo-size-comparison-numbers.component';
import {
  EvoSizeComparisonSymbolsComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-size-comparison-symbols/evo-size-comparison-symbols.component';
import {
  EvoSizeComparisonWordsComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-size-comparison-words/evo-size-comparison-words.component';
import {
  EvoRepeatedAdditionComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-repeated-addition/evo-repeated-addition.component';
import {
  EvoShapeNameFromImageComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-shape-name-from-image/evo-shape-name-from-image.component';
import {
  EvoShapeSingleDiscriminationCountComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-shape-single-discrimination-count/evo-shape-single-discrimination-count.component';
import { EvoShapeCountComponent } from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-shape-count/evo-shape-count.component';
import {
  EvoImagePatternSingleFillComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-image-pattern-single-fill/evo-image-pattern-single-fill.component';
import {
  EvoNumberPatternSingleFillComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-number-pattern-single-fill/evo-number-pattern-single-fill.component';
import { EvoListSelectorComponent } from './shared/evo-list-selector/evo-list-selector.component';
import { EvoAdminSchoolsComponent } from './admin/evo-admin-schools/evo-admin-schools.component';
import { EvoAdminSchoolEditComponent } from './admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-edit.component';
import {
  EvoAdminSchoolUserEditComponent
} from './admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-user-edit/evo-admin-school-user-edit.component';
import {
  EvoAdminSchoolStudentEditComponent
} from './admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-student-edit/evo-admin-school-student-edit.component';
import {
  EvoAdminUserSelectStudentComponent
} from './admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-user-edit/evo-admin-user-select-student/evo-admin-user-select-student.component';
import {
  EvoAdminSchoolUploadUsersComponent
} from './admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-upload-users/evo-admin-school-upload-users.component';
import {
  EvoAdminSchoolUploadStudentsComponent
} from './admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-upload-students/evo-admin-school-upload-students.component';
import { EvoUnitHouseComponent } from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-unit-house/evo-unit-house.component';
import {
  EvoSingleMultiplicationComponent
} from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-single-multiplication/evo-single-multiplication.component';
import { AdminSelectCountryComponent } from './admin/shared/admin-select-country/admin-select-country.component';
import { AdminPricingComponent } from './admin/admin-pricing/admin-pricing.component';
import { AdminMonthlyPricingComponent } from './admin/admin-pricing/admin-monthly-pricing/admin-monthly-pricing.component';
import { EvoLandChooseCountryComponent } from './landing-page/Localization/evo-land-choose-country/evo-land-choose-country.component';
import { EvoCountryChangeComponent } from './shared/evo-country-change/evo-country-change.component';
import { BookDashboardContainerComponent } from './platform/books/book-dashboard-container/book-dashboard-container.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { AdminBookEditComponent } from './admin/admin-books/admin-book-edit/admin-book-edit.component';
import { AdminBookVersionEditComponent } from './admin/admin-books/admin-book-version-edit/admin-book-version-edit.component';
import { AdminBookIntegrationEditComponent } from './admin/admin-books/admin-book-integration-edit/admin-book-integration-edit.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AdminSelectQuestionComponent } from './admin/shared/admin-select-question/admin-select-question.component';
// tslint:disable-next-line:max-line-length
import { EvoSingleSubtractionNeededAmountComponent } from './admin/evo-admin-questions/evo-admin-q-edit/models/evo-single-subtraction-needed-amount/evo-single-subtraction-needed-amount.component';
import { EvoPaginationComponent } from './shared/evo-pagination/evo-pagination.component';
import { EvoAdminSidebarFilterQuestionComponent } from './admin/evo-admin-questions/evo-admin-sidebar-filter-question/evo-admin-sidebar-filter-question.component';
import { EvoSelectMutlipleChoiceComponent } from './shared/evo-select-mutliple-choice/evo-select-mutliple-choice.component';
import { EvoMultipleSwitchComponent } from './shared/evo-multiple-switch/evo-multiple-switch.component';
import { EvoAutocompleteDropdownComponent } from './shared/evo-autocomplete-dropdown/evo-autocomplete-dropdown.component';
import { TeacherInitPassComponent } from './landing-page/authentication/teacher-init-pass/teacher-init-pass.component';
import { PricingComponent } from './landing-page/pages/pricing/pricing.component';
import { LandingComponent } from './landing-page/pages/landing/landing.component';
import { CarouselComponent } from './landing-page/pages/landing/carousel/carousel.component';
import { Land2NavHeaderComponent } from './landing-page/shared/land2-nav-header/land2-nav-header.component';
import { FooterComponent } from './landing-page/shared/footer/footer.component';
import { SchoolsComponent } from './landing-page/pages/schools/schools.component';
import { ShoolsCarouselComponent } from './landing-page/pages/schools/shools-carousel/shools-carousel.component';
import { AboutUsComponent } from './landing-page/pages/about-us/about-us.component';
import { ResearchComponent } from './landing-page/pages/research/research.component';
import { ChangeLangCountryComponent } from './landing-page/shared/change-lang-country/change-lang-country.component';
import { FaqComponent } from './landing-page/pages/faq/faq.component';
import { FeaturesComponent } from './landing-page/pages/features/features.component';
import { GameComponent } from './landing-page/pages/features/game/game.component';
import { BookComponent } from './landing-page/pages/features/book/book.component';
import { MonitorComponent } from './landing-page/pages/features/monitor/monitor.component';
import { ContactUsComponent } from './landing-page/pages/contact-us/contact-us.component';
import { AdminObjectiveComponent } from './admin/admin-objective/admin-objective.component';
import { AdminObjectiveEditComponent } from './admin/admin-objective/admin-objective-edit/admin-objective-edit.component';
import { AdminSkillGroupComponent } from './admin/admin-skill-group/admin-skill-group.component';
import { AdminSkillGroupEditComponent } from './admin/admin-skill-group/admin-skill-group-edit/admin-skill-group-edit.component';
import { AdminObjectiveByCountryComponent } from './admin/admin-objective/admin-objective-by-country/admin-objective-by-country.component';
// tslint:disable-next-line:max-line-length
import { AdminSidebarFilterSkillGroupComponent } from './admin/admin-skill-group/admin-sidebar-filter-skill-group/admin-sidebar-filter-skill-group.component';
import { AdminUserEditComponent } from './admin/admin-users/admin-user-edit/admin-user-edit.component';
import { AdminPassordValidationComponent } from './admin/admin-users/admin-passord-validation/admin-passord-validation.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminStudentEditComponent } from './admin/admin-students/admin-student-edit/admin-student-edit.component';
import { AdminUsersSidebarFilterComponent } from './admin/admin-users/admin-users-sidebar-filter/admin-users-sidebar-filter.component';
// tslint:disable-next-line:max-line-length
import { AdminStudentsSidebarFilterComponent } from './admin/admin-students/admin-students-sidebar-filter/admin-students-sidebar-filter.component';
// tslint:disable-next-line:max-line-length
import { EvoAdminSchoolsSidebarFilterComponent } from './admin/evo-admin-schools/evo-admin-schools-sidebar-filter/evo-admin-schools-sidebar-filter.component';
import { FeatureTabComponent } from './landing-page/pages/features/feature-tab/feature-tab.component';
import { TestimonialsComponent } from './landing-page/shared/testimonials/testimonials.component';
import { EasterEggComponent } from './landing-page/shared/easter-egg/easter-egg.component';
import { EggDirective } from './landing-page/shared/egg.directive';
import { SchoolAdminRootComponent } from './platform/school-admin-root/school-admin-root.component';
import { SchoolAdminHeaderComponent } from './platform/school-admin-root/school-admin-header/school-admin-header.component';
import { SchoolAdminSidebarComponent } from './platform/school-admin-root/school-admin-sidebar/school-admin-sidebar.component';
import { SchoolAdminTeachersComponent } from './platform/school-admin-root/school-admin-teachers/school-admin-teachers.component';
import { SchoolAdminStudentsComponent } from './platform/school-admin-root/school-admin-students/school-admin-students.component';
import { SchoolAdminStudentsImportComponent } from './platform/school-admin-root/school-admin-students-import/school-admin-students-import.component';
import { SchoolAdminTeacherDetailComponent } from './platform/school-admin-root/school-admin-teachers/school-admin-teacher-detail/school-admin-teacher-detail.component';
import { TeacherInvitationSignupComponent } from './platform/accept-invitation/teacher-invitation-signup/teacher-invitation-signup.component';
import { EvoCircleCheckmarkComponent } from './shared/evo-circle-checkmark/evo-circle-checkmark.component';
import { SchoolAdminStudentDetailComponent } from './platform/school-admin-root/school-admin-students/school-admin-student-detail/school-admin-student-detail.component';
import { BooksComponent } from './platform/books/books/books.component';
import { ChapterContainerComponent } from './shared/chapter-container/chapter-container.component';
import { BookContainerComponent } from './shared/book-container/book-container.component';
import { VideosPageComponent } from './platform/videos-page/videos-page.component';
import { VideoDetailComponent } from './shared/video-detail/video-detail.component';
import { SchoolAdminVideosPageComponent } from './platform/school-admin-root/school-admin-videos-page/school-admin-videos-page.component';
import { SchoolAdminGroupsComponent } from './platform/school-admin-root/school-admin-groups/school-admin-groups.component';
import { SchoolAdminGroupDetailComponent } from './platform/school-admin-root/school-admin-groups/school-admin-group-detail/school-admin-group-detail.component';
import { SchoolAdminTeachersInvitationImportComponent } from './platform/school-admin-root/school-admin-teachers/school-admin-teachers-invitation-import/school-admin-teachers-invitation-import.component';
import { AdminMobileMenuComponent } from './mobile/admin-mobile-menu/admin-mobile-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MobileSchoolAdminSidebarComponent } from './mobile/school-admin-root/mobile-school-admin-sidebar/mobile-school-admin-sidebar.component';
import { EvoAdminSchoolUploadUsersInvitationsComponent } from './admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-upload-users-invitations/evo-admin-school-upload-users-invitations.component';
import { EvoAdminSchoolUsersInvitationsComponent } from './admin/evo-admin-schools/evo-admin-school-edit/evo-admin-school-users-invitations/evo-admin-school-users-invitations.component';
import {
  SchoolAdminTeachersInvitationsComponent
} from './platform/school-admin-root/school-admin-teachers/school-admin-teachers-invitations/school-admin-teachers-invitations.component';
import { StudentProfileComponent } from './platform/student-profile/student-profile.component';
import { ActivityChartsComponent } from './platform/activity-charts/activity-charts.component';
import { SkillProgressChartComponent } from './platform/skill-progress-chart/skill-progress-chart.component';
import { NewSettingsPageComponent } from './platform/new-settings-page/new-settings-page.component';
import { SettingsBarComponent } from './platform/new-settings-page/settings-bar/settings-bar.component';
import { ProfileSettingsComponent } from './platform/new-settings-page/profile-settings/profile-settings.component';
import { PasswordSettingsComponent } from './platform/new-settings-page/password-settings/password-settings.component';
import { NewBillingSettingsComponent } from './platform/new-settings-page/new-billing-settings/new-billing-settings.component';
import { AuthSettingsComponent } from './platform/new-settings-page/auth-settings/auth-settings.component';
import { ManageSettingsButtonComponent } from './platform/new-settings-page/manage-settings-button/manage-settings-button.component';
import { ToggleSwitchComponent } from './shared/toggle-switch/toggle-switch.component';
import { AccountNameComponent } from './platform/account-name/account-name.component';
import { BookDetailComponent } from './platform/books/book-detail/book-detail.component';
import { BookInfosComponent } from './platform/books/book-infos/book-infos.component';
import { NewChapterComponent } from './shared/new-chapter/new-chapter.component';
import { AttemptContainerComponent } from './platform/books/attempt-container/attempt-container.component';
import { NewSelectStudentComponent } from './platform/new-select-student/new-select-student.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SchoolAdminLicenseComponent } from './platform/school-admin-root/school-admin-license/school-admin-license.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { CircleProgressBarComponent } from './shared/circle-progress-bar/circle-progress-bar.component';
import { UserSettingsModalComponent } from './platform/user-settings-modal/user-settings-modal.component';
import {CommonModalComponent} from './shared/common-modal/common-modal.component';
import {AccountsSettingsComponent} from './platform/new-settings-page/accounts-settings/accounts-settings.component';
import {SettingsStudentProfileComponent} from './platform/settings-student-profile/settings-student-profile.component';
import {EvoDatePickerComponent} from './shared/lm-date-picker/evo-date-picker.component';
import {EvoDatePickerInputComponent} from './shared/evo-date-picker-input/evo-date-picker-input.component';
import { PlatformAnswerFilterComponent } from './platform/platform-root/platform-answer-filter/platform-answer-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    PricingComponent,
    LandNavHeaderComponent,
    RootComponent,
    EvoInputComponent,
    ModalComponent,
    ForgotPassComponent,
    VerifyEmailComponent,
    ResetPassComponent,
    PlatformRootComponent,
    DashboardComponent,
    EvoSidebarComponent,
    EvoHeaderComponent,
    EmailNotVerifiedComponent,
    EvoFooterComponent,
    AnswersComponent,
    EvoDropdownComponent,
    EvoLangDropdownComponent,
    EvoRecentActivityComponent,
    AnswerContainerComponent,
    AnswersListComponent,
    EvoInputDateComponent,
    DashProgressBarComponent,
    SigninSecondaryComponent,
    SignupSecondaryComponent,
    EvoDecorationBackgroundSignupComponent,
    CreateStudentComponent,
    EvoProgressPointsComponent,
    SelectSubscriptionComponent,
    BillingInformationComponent,
    SelectBookComponent,
    SelectBookContainerComponent,
    EvoCheckmarkComponent,
    AdminUsersComponent,
    ThankYouPurchaseComponent,
    AboutBookComponent,
    AboutEvolytesGameComponent,
    AboutMonitorComponent,
    BillingConfirmationComponent,
    HamburgerButtonComponent,
    MobileMenuComponent,
    TcComponent,
    PrivacyPolicyComponent,
    EvoAdminSidebarComponent,
    AdminMobileMenuComponent,
    EvoAdminRootComponent,
    EvoAdminHeaderComponent,
    EvoAdminQuestionsComponent,
    EvoAdminQEditComponent,
    EvoCountNumbersComponent,
    EvoCountMultipleNumbersComponent,
    EvoSingleAdditionComponent,
    EvoDoubleAdditionComponent,
    EvoSingleAdditionNeededAmountComponent,
    EvoSingleSubtractionComponent,
    EvoDoubleSubtractionComponent,
    EvoReusableRangeComponent,
    EvoTranslatedInputComponent,
    EvoAdminUsersComponent,
    AdminOrdersComponent,
    AdminOrdersEditComponent,
    EvoLandChooseLanguageComponent,
    EvoSizeComparisonNumbersComponent,
    EvoSizeComparisonSymbolsComponent,
    EvoSizeComparisonWordsComponent,
    EvoRepeatedAdditionComponent,
    EvoShapeNameFromImageComponent,
    EvoShapeSingleDiscriminationCountComponent,
    EvoShapeCountComponent,
    EvoImagePatternSingleFillComponent,
    EvoNumberPatternSingleFillComponent,
    EvoListSelectorComponent,
    EvoAdminSchoolsComponent,
    EvoAdminSchoolEditComponent,
    EvoAdminSchoolUserEditComponent,
    EvoAdminSchoolStudentEditComponent,
    EvoAdminUserSelectStudentComponent,
    EvoAdminSchoolUploadUsersComponent,
    EvoAdminSchoolUploadStudentsComponent,
    EvoUnitHouseComponent,
    EvoSingleMultiplicationComponent,
    AdminSelectCountryComponent,
    AdminPricingComponent,
    AdminMonthlyPricingComponent,
    EvoLandChooseCountryComponent,
    EvoCountryChangeComponent,
    BookDashboardContainerComponent,
    AdminBooksComponent,
    AdminBookEditComponent,
    AdminBookVersionEditComponent,
    AdminBookIntegrationEditComponent,
    AdminSelectQuestionComponent,
    EvoSingleSubtractionNeededAmountComponent,
    AdminUserEditComponent,
    AdminPassordValidationComponent,
    AdminStudentsComponent,
    AdminStudentEditComponent,
    EvoPaginationComponent,
    EvoAdminSidebarFilterQuestionComponent,
    EvoSelectMutlipleChoiceComponent,
    EvoMultipleSwitchComponent,
    EvoAutocompleteDropdownComponent,
    TeacherInitPassComponent,
    PricingComponent,
    LandingComponent,
    CarouselComponent,
    Land2NavHeaderComponent,
    FooterComponent,
    SchoolsComponent,
    ShoolsCarouselComponent,
    AboutUsComponent,
    ResearchComponent,
    ChangeLangCountryComponent,
    FaqComponent,
    FeaturesComponent,
    GameComponent,
    BookComponent,
    MonitorComponent,
    ContactUsComponent,
    AdminSkillGroupComponent,
    AdminSkillGroupEditComponent,
    AdminObjectiveComponent,
    AdminObjectiveEditComponent,
    AdminObjectiveByCountryComponent,
    AdminSidebarFilterSkillGroupComponent,
    AdminUsersSidebarFilterComponent,
    AdminStudentsSidebarFilterComponent,
    EvoAdminSchoolsSidebarFilterComponent,
    FeatureTabComponent,
    TestimonialsComponent,
    EasterEggComponent,
    EggDirective,
    SchoolAdminRootComponent,
    SchoolAdminHeaderComponent,
    SchoolAdminSidebarComponent,
    SchoolAdminTeachersComponent,
    SchoolAdminStudentsComponent,
    SchoolAdminStudentsImportComponent,
    SchoolAdminTeacherDetailComponent,
    TeacherInvitationSignupComponent,
    EvoCircleCheckmarkComponent,
    SchoolAdminStudentDetailComponent,
    BooksComponent,
    ChapterContainerComponent,
    BookContainerComponent,
    VideosPageComponent,
    VideoDetailComponent,
    SchoolAdminVideosPageComponent,
    SchoolAdminGroupsComponent,
    SchoolAdminGroupDetailComponent,
    SchoolAdminTeachersInvitationsComponent,
    SchoolAdminTeachersInvitationImportComponent,
    MobileSchoolAdminSidebarComponent,
    EvoAdminSchoolUploadUsersInvitationsComponent,
    EvoAdminSchoolUsersInvitationsComponent,
    StudentProfileComponent,
    ActivityChartsComponent,
    SkillProgressChartComponent,
    NewSettingsPageComponent,
    SettingsBarComponent,
    ProfileSettingsComponent,
    PasswordSettingsComponent,
    NewBillingSettingsComponent,
    AuthSettingsComponent,
    ManageSettingsButtonComponent,
    ToggleSwitchComponent,
    AccountNameComponent,
    BookDetailComponent,
    BookInfosComponent,
    NewChapterComponent,
    AttemptContainerComponent,
    NewSelectStudentComponent,
    CircleProgressBarComponent,
    SchoolAdminLicenseComponent,
    DatepickerComponent,
    UserSettingsModalComponent,
    CommonModalComponent,
    AccountsSettingsComponent,
    SettingsStudentProfileComponent,
    EvoDatePickerComponent,
    EvoDatePickerInputComponent,
    PlatformAnswerFilterComponent
  ],
  // entryComponents: [
  //   CommonModalComponent
  // ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    ChartsModule,
    NgbModule,
    LayoutModule,
    // https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular6-app-with-ngx-translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [NewsletterService, ModalService],
  bootstrap: [AppComponent]
})

export class AppModule {

}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
