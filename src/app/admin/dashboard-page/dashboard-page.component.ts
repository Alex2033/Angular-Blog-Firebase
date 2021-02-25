import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[];
  public searchStr: string = '';

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postsService
      .getAll()
      .pipe(takeUntil(this.destroy))
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  remove(id: string): void {
    this.postsService
      .delete(id)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.posts = this.posts.filter((post) => post.id !== id);
      });
  }
}
