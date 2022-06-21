import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBar {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  displaySnackBar(message: string, action: string, config: MatSnackBarConfig<any>) {
    this.snackBar.open(message, action, config)
  }
}
