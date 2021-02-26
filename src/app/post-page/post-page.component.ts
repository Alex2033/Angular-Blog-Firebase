import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from '../admin/shared/interfaces';
import { PostsService } from '../admin/shared/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  public post: Observable<Post>;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.post = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id']);
      })
    );
  }
}
