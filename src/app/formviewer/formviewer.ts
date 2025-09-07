import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormDataService } from '../shared/form.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formviewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formviewer.html',
  styleUrl: './formviewer.css'
})
export class FormViewer implements OnInit {
  form: ReturnType<FormDataService['form']> | null = null;
  answers: Record<string, string> = {};
  resetDone = false;

  constructor(private formDataService: FormDataService, private router: Router) {}

  ngOnInit() {  //load from localStorage
    this.form = this.formDataService.form();
    console.log('Loaded form:', this.form);
  }

  onSubmit() {
    this.formDataService.markSubmitted();
  }

  isSubmitted() {
    return this.form?.submitted;
  }

  resetForm() {
    this.form = null;
    localStorage.removeItem('app_form_data');
  }
}
