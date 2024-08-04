// src/Tools/mixIn.js
export default {
    methods: {
      openModal() {
        document.body.classList.add('modal-open');
      },
      closeModal() {
        document.body.classList.remove('modal-open');
      }
    }
  };