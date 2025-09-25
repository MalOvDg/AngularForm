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

  answered = false;

  constructor(private formDataService: FormDataService, private router: Router) {}

  ngOnInit() {  //load from localStorage
    this.form = this.formDataService.form();
    console.log('Loaded form:', this.form);
  }

  get textQuestions() {
    return this.form?.questions?.filter(q => q.type === 'text') || [];
  }

  get multipleChoiceQuestions() {
    return this.form?.questions?.filter(q => q.type === 'multiple-choice') || [];
  }

  onSubmit() {
    //check that at least one questions is answered
    const answeredAny = Object.values(this.answers).some(answer => answer && answer.trim() !== '');

    if (!answeredAny) {
      alert('Svara på minst 1 fråga');
      return;
    }

    this.formDataService.markSubmitted();
    this.answered = true;
  }

  isSubmitted() {
    return this.form?.submitted;
  }

  resetForm() {
    this.form = null;
    localStorage.removeItem('app_form_data');
  }
}
