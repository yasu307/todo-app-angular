import { Observable, of } from "rxjs";
import { SnackBar } from "../views/utility/snack-bar";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
// エラーの処理
export class MyErrorHandler{

  constructor(
    private snackBar: SnackBar
  ){ }

  handleError<T>(operation = 'operation', altResult ?: T) {
    return (error: any): Observable<T> => {
      // error.messageが存在すればerror.messageを、存在しなければerrorをエラーメッセージとする
      const errorMessage = "message" in error ? JSON.stringify(error.message) : JSON.stringify(error)
      // toastを用いてユーザにエラーメッセージを表示する
      this.snackBar.displaySnackBar(`${operation} failed: ${errorMessage}`, '', { duration: 4000 })
      // 引数で受け取ったaltResultを返す
      return of(altResult as T);
    };
  }
}
