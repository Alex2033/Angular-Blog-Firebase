import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Post } from '../shared/interfaces';

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

  constructor() {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
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
  }
}
