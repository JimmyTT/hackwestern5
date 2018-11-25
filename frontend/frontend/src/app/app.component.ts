import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) {}


  current = 42;
  typical = 50;
  percentDiff = 19;
  lessBusy = true;

  openDialog(): void {
    const dialogRef = this.dialog.open(EmailModal, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result == true) {
        this.openSnackBar();
      }
    });


  }

  openSnackBar() {
    this.snackBar.open("Email alert confirmed", "Dismiss", {
      duration: 2000,
    });
  }

}

export class EmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'email-modal',
  templateUrl: 'email-modal.html',
  styleUrls: ['./app.component.scss']
})
export class EmailModal {

  constructor(
    public dialogRef: MatDialogRef<EmailModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new EmailErrorStateMatcher();

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  alertNum = 0;

}

export interface DialogData {
  animal: string;
  name: string;
}