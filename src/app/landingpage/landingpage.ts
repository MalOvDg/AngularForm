import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService, FormQuestion } from '../shared/form.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landingpage.html',
  styleUrl: './landingpage.css'
})
export class LandingPage {
  title = '';
  newQuestionText = '';
  newQuestionType: 'text' | 'multiple-choice' = 'text';
  optionInput = '';
  newOptions: string[] = [];
  questions: FormQuestion[] = [];
  submitted = false;

  constructor(private formDataService: FormDataService, private router: Router) {}

  addOption() {
    if (this.optionInput.trim()) {
      this.newOptions.push(this.optionInput.trim());
      this.optionInput = '';
    }
  }

  addQuestion() {
    if (!this.newQuestionText.trim()) return;

    const question: any = {
      question: this.newQuestionText.trim(),
      type: this.newQuestionType,
      required: true
    };

    if (this.newQuestionType === 'multiple-choice') {
      question.options = [...this.newOptions];
    }

    this.questions.push(question);

    // Reset inputs
    this.newQuestionText = '';
    this.newOptions = [];
    this.optionInput = '';
    this.newQuestionType = 'text';
  }

  submitForm() {
    const form = {
      title: this.title.trim(),
      questions: this.questions,
      submitted: false
    };

    console.log('Saving form:', form);  // Debug log

    this.formDataService.setForm(form);
    this.submitted = true;
  }
}
