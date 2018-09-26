var app = new Vue({
  el: '#app',
  data: {
    key: '',
    inputDirty: false
  },
  methods: {
    onChange: function () {
      this.inputDirty = true;
    },
    sendNeo: function() {
      var response = grecaptcha.getResponse();
      if (this.isValid && response.length != 0) {
        var request = {
          address: this.key,
          'g-recaptcha-responce': response
        }
        fetch('http://neo.mywish.io/', {
          method: 'post',
          body: JSON.stringify(request)
        }).then(res => {
          this.key = '';
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
