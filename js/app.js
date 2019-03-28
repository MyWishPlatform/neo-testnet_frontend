var responses = {
  en: {
      601: 'You have exceeded the number of requests allowed in one day. Please try again tomorrow.',
      602: 'You have exceeded the number of requests allowed in one day. Please try again tomorrow.',
      603: 'An internal server error has occurred. Please, try again later.',
      604: 'An internal server error has occurred. Please, try again later.'
  },
  zh: {
      601: '你已超出了每天所允许的限额。请明天再来。',
      602: '你已超出了每天所允许的限额。请明天再来。',
      603: '服务器响应错误。请等会儿再尝试。',
      604: '服务器响应错误。请等会儿再尝试。',
  }
}


var app = new Vue({
  el: '#app',
  data: {
    key: '',
    inputDirty: false,
    openedInstruction:  false,
    success: false,
    errorText: '',
    userLanguage: sessionStorage.getItem("lan")||(navigator.language||navigator.browserLanguage).split('-')[0]
  },
  methods: {
    onChange: function () {
      this.inputDirty = true;
      this.success = false;
      this.errorText = '';
    },
    changeLanguage: function(){
      var _lan = sessionStorage.getItem("lan")||(navigator.language||navigator.browserLanguage).split('-')[0];
      _lan ==="zh"? _lan = "en":_lan = "zh";
      sessionStorage.setItem("lan",_lan);
      this.userLanguage = _lan;
    },
    closeInstruction: function() {
      this.openedInstruction = false;
    },
    openInstruction: function() {
        this.openedInstruction = true;
    },
    sendNeo: function(currency) {
      const self = this;
      self.success = false;
      var response = grecaptcha.getResponse();
      if (this.isValid && response.length != 0) {
        var request = {
          address: this.key,
          'g-recaptcha-response': response,
          'asset': currency
        };
        fetch('/api/request/', {
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
            grecaptcha.reset();
            if (this.data.userLanguage === 'zh') {
                self.errorText = this.responses.zh[responseErr];
            } else {
                self.errorText = this.responses.en[responseErr];
            }
          } else {
            self.errorText = false;
            self.success = true;
          }
        })
      }
      else if (!this.inputDirty && !response) {
          console.log(1);
          console.log(this);
          if (this.userLanguage === 'zh') {
              this.errorText = "不正确的地址。请再次检查。";
          } else {
              this.errorText = "Invalid address. Please check your input.";
          }
      }
      else if (!response) {
          console.log(2);
          console.log(this);
            if (this.userLanguage === 'zh') {
                this.errorText = "请填写验证码以获取测试币。";
            } else {
                this.errorText = "Please complete the captcha to receive assets.";
            }
        } else if (!this.inputDirty) {
          console.log(3);
          console.log(this);
          if (this.userLanguage === 'zh') {
              this.errorText = "不正确的地址。请再次检查。";
          } else {
              this.errorText = "Invalid address. Please check your input.";
          }
      }
    }
  },
  computed: {
    isValid: function() {
      return this.key && WAValidator.validate(this.key, 'NEO');
    }
  }
});
