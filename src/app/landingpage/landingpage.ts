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
  newQuestionType: 'text' | 'multiple-choice' = 'text';
  
  // Text question 
  newTextQuestion = '';

  // Multiple choice question 
  newMCQuestion: string = '';
  newMCOptions: { text: string }[] = [];
  newMCCorrectIndex: number | null = null;
  readonly maxOptions = 4;

  questions: any[] = []; 
  
  setQuestionType(type: 'text' | 'multiple-choice') {
    this.newQuestionType = type;

  if (type === 'multiple-choice') {
    this.newMCOptions = [
      { text: '' },
      { text: '' }
    ];
    this.newMCCorrectIndex = null;
    } else {
      this.newTextQuestion = '';
    }
  }

  addOption() {
    if (this.newMCOptions.length < this.maxOptions) {
      this.newMCOptions.push({ text: '' });
    }
  }

  optionInput = '';
  newOptions: string[] = [];
  submitted = false;

  constructor(private formDataService: FormDataService, private router: Router) {}

  addQuestion() {
  if (this.newQuestionType === 'text') {
      if (!this.newTextQuestion.trim()) return;

      const question: any = {
        question: this.newTextQuestion.trim(),
        type: this.newQuestionType,
        required: true
      };

      this.questions.push(question);

      // Reset inputs
      this.newTextQuestion = '';
      this.newOptions = [];
      this.optionInput = '';
      this.newQuestionType = 'text';

  } else if (this.newQuestionType === 'multiple-choice') {
    if (!this.newMCQuestion.trim()) {
      alert('Vänligen skriv en fråga');
      return;
    }

    const filledOptions = this.newMCOptions
    .map(opt => opt.text?.trim())
    .filter(text => text);

    if (filledOptions.length < 2) {
      alert('Vänligen lägg till minst två svaralternativ');
      return;
    }

    const question: any = {
      question: this.newMCQuestion.trim(),
      type: this.newQuestionType,
      required: true,
      options: filledOptions,
      correctIndex: this.newMCCorrectIndex,
    };

    this.questions.push(question);

    // Reset inputs
    this.newMCQuestion = '';
    this.newMCOptions = [];
    this.optionInput = '';
    this.newMCCorrectIndex = null;
  }
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
