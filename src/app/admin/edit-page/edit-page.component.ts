import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public post: Post = {} as Post;
  public submitted: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  get title(): AbstractControl {
    return this.form.get('title');
  }

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.getCurrentRoute();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getCurrentRoute(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params['id']);
        }),
        takeUntil(this.destroy)
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.buildForm(post);
      });
  }

  buildForm(post: Post): void {
    this.form = new FormGroup({
      title: new FormControl(post.title, Validators.required),
      text: new FormControl(post.text, Validators.required),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.postsService
      .update({
        ...this.post,
        text: this.form.value.text,
        title: this.title.value,
      })
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.submitted = false;
      });
  }
}
