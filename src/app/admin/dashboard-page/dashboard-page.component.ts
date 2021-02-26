import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AlertService } from '../shared/alert.service';
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
  public loading: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.loading = true;
    this.postsService
      .getAll()
      .pipe(
        takeUntil(this.destroy),
        finalize(() => {
          this.loading = false;
        })
      )
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
        this.alert.danger('Пост был удален');
      });
  }
}
