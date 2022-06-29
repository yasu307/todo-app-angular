import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "To-do app"

  // ナビゲーションバーに表示するリンク
  links = {
    todo:     {title: 'todo',     link: '/todo/list'},
    category: {title: 'カテゴリ',  link: '/category/list'}
  } as const
  // linksを配列にした変数
  linkArray = Object.values(this.links)
  // 変数に格納されているリンクはナビゲーションバーで選択される（アンダーラインが引かれる）
  activeLink?: string

  constructor(
    private router: Router
  ){ }

  ngOnInit(): void {
    // 現在表示しているurlをactiveLinkに格納する
    // こうすることで直接/category/listなどを表示しても正しくアンダーラインが引かれる
    this.router.events.subscribe(
      (e) => {
        if(e instanceof NavigationEnd){
          this.activeLink = e.url
        }
      }
    );
  }
}
