var responses = {
  601: 'You have exceeded the number of requests allowed in one day. Please try again tomorrow',
  602: 'You have exceeded the number of requests allowed in one day. Please try again tomorrow',
  603: 'An internal server error has occurred. Please, try again later',
  604: 'An internal server error has occurred. Please, try again later.'
}

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
        const self = this;
        fetch('http://neo.mywish.io/api/request/', {
          method: 'post',
          body: JSON.stringify(request),
          headers: {
            "Content-Type": "application/json"
          },
        }).then(function (res) {
          return res.json();
        }).then(function (data) {
          self.key = '';
          self.inputDirty = false;
          var responseErr = data.code;
          if (!data.success) {
            self.errorText = this.responses[responseErr];
          } else {
            self.success = true;
          }
        })
      }
    }
  },
  computed: {
    isValid: function() {
      return this.key && WAValidator.validate(this.key, 'NEO');
    }
  }
});
