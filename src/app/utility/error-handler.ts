import { Observable, of } from "rxjs";
import { SnackBar } from "../snack-bar";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
// エラーの処理
export class MyErrorHandler{

  constructor(
    private snackBar: SnackBar
  ){ }

  handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      // toastを使いエラーが発生したことをユーザに伝える
      this.snackBar.displaySnackBar(`${operation} failed: ${error.body.error}`, '', { duration: 4000 })

      // 引数で受け取ったresultを返す
      return of(result as T);
    };
  }
}
