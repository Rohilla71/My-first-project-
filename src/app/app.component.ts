import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {


  constructor(private authService: AuthService,private snackBar: MatSnackBar) {}
ngOnInit(): void {

  this.loadCurrentUser();
}

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.authService.loadCurrentUser(token).subscribe();
  }

  // openSnackBar(message: string, action: string) {
  //   //this.snackBar.open(message, action);
  // }
  // showSnackbar(content) {
  //   this.snackBar.open(content);
  // }
  // showSnackbarAction(content, action) {
  //   let snack = this.snackBar.open(content, action);
  //   snack.afterDismissed().subscribe(() => {
  //     console.log("This will be shown after snackbar disappeared");
  //   });
  //   snack.onAction().subscribe(() => {
  //     console.log("This will be called when snackbar button clicked");
  //   });
  // }
  // showSnackbarDuration(content, action, duration) {
  //   this.snackBar.open(content, action, duration);
  // }
  // showSnackbarTopPosition(content, action, duration) {
  //   this.snackBar.open(content, action, {
  //     duration: 2000,
  //     verticalPosition: "top", // Allowed values are  'top' | 'bottom'
  //     horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
  //   });
  // }
  // showSnackbarCssStyles(content, action, duration) {
  //   let sb = this.snackBar.open(content, action, {
  //     duration: duration,
  //     panelClass: ["custom-style"]
  //   });
  //   sb.onAction().subscribe(() => {
  //     sb.dismiss();
  //   });
  // }

  // showBasicComponent(message: string, panelClass: string) {
  //   this.snackBar.openFromComponent(BasicSnackbarComponent, {
  //     data: this.data,
  //     duration: 10000
  //   });
  // }
  // https://stackblitz.com/edit/angular-material-snackbar-example?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.ts
}


