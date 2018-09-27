var app = new Vue({
  el: '#app',
  data: {
    key: '',
    inputDirty: false,
    success: false,
    errorText: ''
  },
  methods: {
    onChange: function () {
      this.inputDirty = true;
      this.success = false;
    },
    sendNeo: function() {
      var response = grecaptcha.getResponse();
      if (this.isValid && response.length != 0) {
        var request = {
          address: this.key,
          'g-recaptcha-response': response
        }
        fetch('http://neo.mywish.io/api/request/', {
          method: 'post',
          body: JSON.stringify(request),
          headers: {
            "Content-Type": "application/json"
          },
        }).then(res => {
          this.key = '';
          this.inputDirty = false;
          if (!res.success) {
            this.errorText = 'Error'
          } else {
            this.success = true;
          }
        });
      }
    }
  },
  computed: {
    isValid: function() {
      return this.key && WAValidator.validate(this.key, 'NEO');
    }
  }
});
