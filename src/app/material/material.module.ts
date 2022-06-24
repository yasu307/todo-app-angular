import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatCardModule } from '@angular/material/card'

export const modules = [
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatRadioModule,
  MatSnackBarModule,
  MatCardModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ],
})
export class MaterialModule { }
