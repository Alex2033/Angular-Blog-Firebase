import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  public posts: Observable<Post[]>;
  public searchStr: string = '';

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getAll();
  }

  remove(id: string): void {}
}
