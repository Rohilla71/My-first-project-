import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatModule } from '../appModules/mat.module';


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatModule,
  ]
})
export class ProfileModule { }
