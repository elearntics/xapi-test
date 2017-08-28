import { QuestionEvent } from '../../constants/events/questions';
import Cookies from 'js-cookie';

let _selectOption, _submitQuestions;
export const Questions = {

  initialize(id, questions) {
    this.questions = questions;
    this.numQuestions = Object.keys(questions).length;
    this.form$ = document.getElementById(id);
    const userEmail = Cookies.get('elaio-email');

    if (this.form$ && userEmail) {
      const answers = Cookies.get('elaio-answers');
      const correctQuestions = Cookies.get('elaio-correct');
      const timesSubmitted = Cookies.get('elaio-submissions');

      this.questionList$ = document.getElementById(`${id}-list`);
      this.submitButton$ = document.getElementById(`${id}-button`);
      this.assertions$ = document.getElementById(`${id}-assertions`);
      this.submissions$ = document.getElementById(`${id}-submissions`);
      this.info$ = document.getElementById(`${id}-info`);

      this.correctQuestions = 0;
      this.timesSubmitted = 0;

      this.answers = answers ? JSON.parse(answers) : {};
      this.assertions$.innerText = correctQuestions ? correctQuestions : 0;
      this.submissions$.innerText = timesSubmitted ? timesSubmitted : 0;

      _buildQuestions.call(this);

      if (answers) {
        _checkAnswers.call(this);
      }

      this.form$.addEventListener('submit', (event) => {
        event.target.dispatchEvent(_submitQuestions);
        event.preventDefault();
        _checkAnswers.call(this);
      }, false);

      _selectOption = new CustomEvent(QuestionEvent.SELECT_OPTION, { detail: {
          questionsComponent: this
        }
      });

      _submitQuestions = new CustomEvent(QuestionEvent.SUBMIT_QUESTIONS, { detail: {
          questionsComponent: this
        }
      });
    }
  }
};

const _buildQuestions = function() {
  for (let question in this.questions) {
    _addRadioInputs.call(this, question);
  }
};

const _addRadioInputs = function(question) {
  const li$ = document.createElement('li');
  const label$ = document.createElement('label');

  label$.innerText = this.questions[question].title;
  label$.setAttribute('for', question);
  li$.appendChild(label$);

  this.questions[question].options.forEach((option) => {
    const input$ = document.createElement('input');
    const span$ = document.createElement('span');

    input$.setAttribute('type', 'radio');
    input$.setAttribute('name', question);
    input$.setAttribute('value', option.value);

    // Add user previous answer if present
    if (option.value === this.answers[question]) {
      input$.setAttribute('checked', true);
    }

    input$.addEventListener('change', (event) => {
      this.answers[question] = option.value;
      input$.dispatchEvent(_selectOption);
    }, false);

    input$.classList.add('eao-form-input');
    span$.classList.add('eao-radio-input');
    span$.innerText = option.text;
    span$.insertBefore(input$, span$.firstChild);

    li$.appendChild(span$);
  });

  this.questionList$.appendChild(li$);
};

const _checkAnswers = function() {
  let correctQuestions = 0, index = 0;
  this.timesSubmitted++;

  for (let question in this.questions) {
    if (this.answers[question] === this.questions[question].answer) {
      correctQuestions++;

      this.questionList$.childNodes[index].classList.add('eao-question-right');
      this.questionList$.childNodes[index].classList.remove('eao-question-wrong');
    } else {
      this.questionList$.childNodes[index].classList.add('eao-question-wrong');
      this.questionList$.childNodes[index].classList.remove('eao-question-right');
    }

    index++;
  }

  this.correctQuestions = correctQuestions;
  this.assertions$.innerText = `${correctQuestions}/${this.numQuestions}`;
  this.submissions$.innerText = this.timesSubmitted;

  this.info$.innerText = correctQuestions === this.numQuestions
    ? '🎉 ¡Muy bien! ¡Has acertado todas las preguntas! 🎉'
    : '👍 Puedes seguir intentándolo.';

  Cookies.set('elaio-answers', JSON.stringify(this.answers));
  Cookies.set('elaio-correct', this.correctQuestions);
  Cookies.set('elaio-submissions', this.timesSubmitted);
};
