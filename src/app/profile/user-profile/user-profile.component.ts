import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-user-profile',
  // standalone: true,
  // imports: [CommonModule, MatModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  // userDataList:any;
  baseUrl = environment.ImgUrl;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = true;
  editable = false;
  userDataList;
  form;
  userImage = '';

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public dialog: MatDialog,
    public snackBarService: SnackBarService,
    public profileService: ProfileService
  ) {
    this.form = this.fb.group({
      id: 0,
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      displayName: ['', Validators.required],
      phone: ['', Validators.required],
      isActive: [false, Validators.required],
      profileImageURL: [''],
      socialMediaLink: [''],
    });

    // this.form.get('email').disabled();

    this.loadData();
  }

  loadData() {
    this.authService.getCurrentUserDetail().subscribe((p) => {
      this.userDataList = p.data;

      if (this.userDataList?.profileImageURL != null) {
        this.userImage = this.userDataList?.profileImageURL;
      } else {
        this.userImage = 'assets/images/avatars/avatar-27.jpg';
      }
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }

  edit(): void {
    this.editable = true;
    this.authService.getCurrentUserDetail().subscribe((p) => {
      this.userDataList = p.data;
      //this.snackBarService.openSnackbar("User details updated", "success");
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };

    if (this.userDataList) {
      this.checked = Boolean(this.userDataList?.isActive);
      this.form = this.fb.group({
        id: this.userDataList?.id,
        email: [this.userDataList?.email, Validators.required],
        firstName: [this.userDataList?.firstName, Validators.required],
        lastName: [this.userDataList?.lastName, Validators.required],
        displayName: [this.userDataList?.displayName, Validators.required],
        phone: [this.userDataList?.phone],
        isActive: [this.userDataList?.isActive, Validators.required],
        profileImageURL: [this.userDataList?.profileImageURL],
        socialMediaLink: [this.userDataList?.socialMediaLink],
      });
    }
  }

  Update() {
    this.profileService
      .UpdateUser(this.form.value.id, this.form.value)
      .subscribe((p) => {
        this.snackBarService.openSnackbar(
          'User updated successfully ',
          'success'
        );
        this.loadData();
      }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }

  uploadImage(file: any) {
    var file = file.target.files[0];
    this.profileService.UploadImage(file).subscribe((p) => {
      this.snackBarService.openSnackbar(
        'Profile updated successfully ',
        'success'
      );
      this.loadData();
    }),
      (error) => {
        this.snackBarService.openSnackbar(error.message, 'error');
      };
  }
  Reset() {
    this.form.reset();
  }

  close() {
    this.editable = false;
  }

  isactiveChange(val) {
    this.form.value.isActive = val?.checked;
  }
}
