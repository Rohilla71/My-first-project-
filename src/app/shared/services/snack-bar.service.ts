import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackbar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  showSnackbarTopPosition(content, action) {
    this._snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

    showSnackbarBottomPosition(content, action) {
      this._snackBar.open(content, action, {
        duration: 2000,
        verticalPosition: "bottom", // Allowed values are  'top' | 'bottom'
        horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
    }
}
