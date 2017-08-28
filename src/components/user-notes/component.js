import Cookies from 'js-cookie';

export const UserNotes = {
  initialize(id) {
    this.notesTextarea$ = document.getElementById(`${id}-notes-textarea`);
    this.wordsTextarea$ = document.getElementById(`${id}-words-textarea`);

    if (this.notesTextarea$ && this.wordsTextarea$) {
      this.notesTextarea$.value = Cookies.get('elaio-notes') || null;
      this.wordsTextarea$.value = Cookies.get('elaio-words') || null;

      this.notesTextarea$.addEventListener('keyup', () => {
        Cookies.set('elaio-notes', this.notesTextarea$.value);
      }, false);

      this.wordsTextarea$.addEventListener('keyup', () => {
        Cookies.set('elaio-words', this.wordsTextarea$.value);
      }, false);
    }
  }
};
