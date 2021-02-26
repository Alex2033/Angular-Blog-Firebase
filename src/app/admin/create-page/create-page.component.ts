import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../shared/alert.service';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  public form: FormGroup;

  get title(): AbstractControl {
    return this.form.get('title');
  }

  get author(): AbstractControl {
    return this.form.get('author');
  }

  get text(): AbstractControl {
    return this.form.get('text');
  }

  constructor(
    private postsService: PostsService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.title.value,
      author: this.author.value,
      text: this.text.value,
      date: new Date(),
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.alert.success('Пост был создан');
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}
