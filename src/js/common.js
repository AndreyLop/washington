
//  =====================================================================================================================
// Animation on scroll
var animateHTMLCtrl = (function() {
    var aniamteClass = 'animate',
    elems = document.querySelectorAll('.animate'),
    windowHeight = window.innerHeight,
    animatedElements;


    // Here debounce returns your passed functions and assigns them to new vars so that you can do removeEventListener
    var _debouncedScroll = debounce(_checkPosition, 100);
    var _debouncedInit = debounce(init, 100);

    // var _debouncedScroll = _checkPosition;
    // var _debouncedInit = init;

    // if to more elements to animate remove event listener from scroll
    function _checkForAnimatedElements() {
        elems = document.querySelectorAll('.animate');
        if(elems.length === 0 ) {
            window.removeEventListener('scroll', _debouncedScroll);
            window.removeEventListener('resize', _debouncedInit);
        }
    };

    function _addEventHandlers() {
      window.addEventListener('scroll', _debouncedScroll);
      window.addEventListener('resize', _debouncedInit);
    };
  
    function _checkPosition() {        
      for (var i = 0; i < elems.length; i++) {
        var posFromTop = elems[i].getBoundingClientRect().top;
        if (posFromTop - windowHeight <= -200) {
          elems[i].classList.remove(aniamteClass);
        }
      }
      _checkForAnimatedElements();
    };
    
    function init() {
        _addEventHandlers();
        _checkPosition();
    };

    setTimeout(_checkPosition, 500)

    return {
      init: init
    };
  
  })();

animateHTMLCtrl.init();
// Animation on scroll end
//  =====================================================================================================================
//  =====================================================================================================================
//tabs start
(function() {

  var activeTabClass = 'contacts__tab_active';
  var hiddenTabContentClas = 'contacts__tab-content__hidden';

  var NODES = {
      cTabs:document.querySelector('.contacts__tabs'),  
      cTab: document.querySelectorAll('.contacts__tab'),
      cTabContent: document.querySelectorAll('.contacts__tab-content')
  };

  function removeActiveClassFromTabs() {
      Array.prototype.forEach.call(NODES.cTab, function(node) {
          node.classList.remove(activeTabClass);
      });
  };

  function hideTabsContent() {
      Array.prototype.forEach.call(NODES.cTabContent, function(node) {
          node.classList.add(hiddenTabContentClas);
      });
  };

  if(NODES.cTabs) {
      NODES.cTabs.addEventListener('click', function(e) {
          if(Array.prototype.indexOf.call(e.target.classList)!==1) {
              removeActiveClassFromTabs();
              hideTabsContent();
              e.target.classList.add(activeTabClass);
              document.getElementById(e.target.dataset.tab).classList.remove(hiddenTabContentClas);
          };
      });
  }
  
})();
//tabs end
//  =====================================================================================================================

//  =====================================================================================================================
//fix nav during scroll
var navFixed = (function(){
    var header = document.querySelector('.header');
    var fixed = header.offsetTop;
    function isScrolled() {
        if(window.pageYOffset > fixed) {
            if(!header.classList.contains('header__fixed')) {
                header.classList.add('header__fixed');
            }
        } else {
            header.classList.remove('header__fixed');
        }
    };
    window.addEventListener('scroll' ,debounce(isScrolled,100));
})();
//  =====================================================================================================================

//  =====================================================================================================================
// Basic input constructor start
function Input(form, selector) {
  this.state = {
      valid: false,
      touched: false
  };
  this.type = 'basic';
  this.container = form.querySelector(selector);
  this.input = this.container.querySelector('input');
  this.requiredMessage = this.container.querySelector('.validation-error_required');
  this.validateInput = JSON.parse(this.input.dataset.required.toLowerCase()) || false;
  this.input.addEventListener('blur', (function() {
      this.state.touched = true;
      if(this.validateInput) {
          this.validateRequired();
      }

  }).bind(this));

  this.input.addEventListener('keyup', (function() {

      if(this.validateInput) {
          this.validateRequired();
      }

  }).bind(this));

};

Input.prototype.validateRequired = function() {
  if(this.input.value === '') {
      this.state.valid = false;
      this.showRequiredMessage();
  } else {
      this.hideRequiredMessage();
      if(this.type === 'basic') {
          this.state.valid = true;
      }
      return true;
  }
};

Input.prototype.showRequiredMessage = function() {
  this.addErrorClass();
  this.requiredMessage.style.display = 'block';
};
Input.prototype.hideRequiredMessage = function() {
  this.removeErrorClass();
  this.requiredMessage.style.display = 'none';
};
Input.prototype.addErrorClass = function() {
  this.input.classList.add('input__validation-error');
};
Input.prototype.removeErrorClass = function() {
  this.input.classList.remove('input__validation-error');
};

Input.prototype.validate = function() {
  if(this.validateInput) {
      this.validateRequired();
  } else {
      this.state.valid = true;
  }
};
// Basic input constructor end

// PhoneInput constructor start
function PhoneInput(form, selector) {
  Input.call(this,form, selector);
  var self = this;
  this.type = 'phone';
  this.invalidPhoneMessage = this.container.querySelector('.validation-error_phone-format');
  this.mask = new IMask(this.input, {
      mask: '+38(000)000-00-00'
  });
  if(this.container.querySelector('.js-input-phone__international')) {
    $(this.container.querySelector('.js-input-phone__international')).intlTelInput({
        initialCountry: 'UA',
        preferredCountries: ['UA', 'RU']
    });
    $(this.container.querySelector('.js-input-phone__international')).on("countrychange", function(e, countryData) {

        self.mask.value = '';
        self.mask.updateOptions({
            mask: countryData.dialCode + '(000)000-00-00'
        })
        
    });
  }

  this.mask.on('accept', (function() {
      this.state.valid = false;
      //this.showInvalidPhoneMessage();
  }).bind(this));

  this.mask.on('complete', (function() {
      if(this.validateRequired()) {
          this.state.valid = true;
          this.hideInvalidPhoneMessage();
      }
  }).bind(this));
};

PhoneInput.prototype = Object.create(Input.prototype);
PhoneInput.prototype.constructor = PhoneInput;
PhoneInput.prototype.showInvalidPhoneMessage = function() {
  this.addErrorClass();
  this.invalidPhoneMessage.style.display = 'block';
};
PhoneInput.prototype.hideInvalidPhoneMessage = function() {
  this.removeErrorClass();
  this.invalidPhoneMessage.style.display = 'none';
};
PhoneInput.prototype.validatePhoneNumber = function() {
  if(this.mask.mask.length !== this.mask.value.length) {
      this.state.valid = false;
      this.showInvalidPhoneMessage();
  } else {
      this.state.valid = true;
      this.hideInvalidPhoneMessage();
  }
};
PhoneInput.prototype.validate = function() {
  if(this.validateInput) {
      if(this.validateRequired()) {
          this.validatePhoneNumber();
      }
  } else {
      this.state.valid = true;
  }
};
// PhoneInput constructor end

// EmailInput constructor start
function EmailInput(form, selector) {
  Input.call(this, form, selector);
  this.type = 'email';
  this.invalidEmailMessage = this.container.querySelector('.validation-error_email-format');
};
EmailInput.prototype = Object.create(Input.prototype);
EmailInput.prototype.constructor = EmailInput;
EmailInput.prototype.showInvalidEmailMessage = function() {
  this.invalidEmailMessage.style.display = 'block';
};
EmailInput.prototype.hideInvalidEmailMessage = function() {
  this.invalidEmailMessage.style.display = 'none';
};
EmailInput.prototype.validateEmail = function() {
  if(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.input.value)) {
      this.state.valid = true;
      this.removeErrorClass();
      this.hideInvalidEmailMessage();
  } else {
      this.state.valid = false;
      this.addErrorClass();
      this.showInvalidEmailMessage();
  }
};
EmailInput.prototype.validate = function() {
  if(this.validateInput) {
      if(this.validateRequired()) {
          this.validateEmail();
      }
  } else {
      this.state.valid = true;
  }
};
// EmailInput constructor end
// MessageInput constructor start
function MessageInput(form, selector) {
  this.validateInput = false;
  this.state = {
      valid: true
  };
  this.type = 'message';
  this.container = form.querySelector(selector);
  this.input = this.container.querySelector('textarea');
}
MessageInput.prototype = Object.create(Input.prototype);
MessageInput.prototype.constructor = MessageInput;
// MessageInput constructor start

// Modal windows constructor start
function Modal(selector, timed) {
  this.container = document.querySelector(selector);
  this.closeBtn = this.container.querySelector('.modal__close-btn');
  this.timed = timed || false;
  var timer;

  // Bind closing function to object
  var boundClickDocument = clickOnDocument.bind(this);

  function clickOnDocument(e) {

      if(!this.container.contains(e.target) || e.target.parentNode===this.closeBtn) {
          this.hideModal();
          if(this.timed) {
              clearInterval(timer);
          }
          document.removeEventListener('click', boundClickDocument);
      }

  };

  this.showModal = function() {
      hideScrollBar();
      this.container.classList.add('modal__visible');
      if(this.timed) {
          timer = setTimeout((function() {
              this.hideModal();
          }).bind(this), 3000);
      }

      document.addEventListener('click', boundClickDocument);

  };

  this.hideModal = function() {
      if(!o2AppState.callbackOpen) {
          showScrollBar();
      }
      this.container.classList.remove('modal__visible');
  };
};
// Modal windows constructor end
// True as second argument means it will auto close after 3 seconds

//var successModal = new Modal('.modal-success', false);


// Contacts form start
var contactsForm = (function() {

  function handleSubmit(formId) {

      var form = document.getElementById(formId);

      if(form) {
          // If forms has one of these it will instanciate instances of inputs
          var nameInput = form.querySelector('.js-input-name-container') ? new Input(form,'.js-input-name-container') : null;
          var phoneInput = form.querySelector('.js-input-phone-container') ? new PhoneInput(form, '.js-input-phone-container') : null;
          var emailInput = form.querySelector('.js-input-email-container') ? new EmailInput(form, '.js-input-email-container') : null;
          var messageInput = form.querySelector('.js-input-message-container') ? new MessageInput(form, '.js-input-message-container'): null;

          function createValidatorArray() {
              var arr = [];
              if(nameInput) {
                  arr.push(nameInput);
              }
              if(phoneInput) {
                  arr.push(phoneInput);
              }
              if(emailInput) {
                  arr.push(emailInput);
              }
              if(messageInput) {
                  if(messageInput.input.value.length > 0) {
                      arr.push(messageInput);
                  }
              }
              return arr;
          };

          form.addEventListener('submit', function(e) {
              e.preventDefault();
              var inputsArr = createValidatorArray();
              var data='';
              var secretInputs = {
                  type: form.querySelector('[name="typ"]'),
                  webad: form.querySelector('[name="webad"]'),
                  metka: form.querySelector('[name="metka"]'),
                  inn: form.querySelector('[name="inn"]'),
                  count: form.querySelector('[name="count"]')
              };
              inputsArr.forEach(function(inputInstance, index) {
                  if(index === 0) {
                      data += '' + inputInstance.input.name + '=' + encodeURIComponent(inputInstance.input.value);
                  } else {
                      data += '&' + inputInstance.input.name + '=' + encodeURIComponent(inputInstance.input.value);
                  }
                  inputInstance.validate();
              });

              for(var key in secretInputs) {
                  data+= '&' + key + '=' + encodeURIComponent(secretInputs[key].value);
              };

              var validForm = inputsArr.every(function(inputInstance) {
                  return inputInstance.state.valid;
              });

              if(validForm) {
                  var nOV = "/wp-content/themes/o2/forms/application.php";
                  var urObV = "http://"+window.location.hostname+nOV;

                  PostFormData(urObV, data, function(res) {
                      console.log(res);
                      //Call modal window which was instanciated before
                      successModal.showModal();
                      //Clear all filled inputs
                      inputsArr.forEach(function(inputInstance) {
                          inputInstance.input.value = '';
                      });
                  });
              }

          });

      };

  };
  // handleSubmit('callback-form');
  handleSubmit('contacts-form__callback-form');
  handleSubmit('contacts-form__email-form');
  // handleSubmit('location-page__contacts-page');

})();

// Contacts form end
//  =====================================================================================================================

//  =====================================================================================================================
// Info block hide/show start

// var infoBlock = (function() {
//     var infoBlockCon = document.querySelector('.js-info-block');
//     var infoBlockOpenHeight = null;
//     var infoBlockOpen = true;
//     infoBlockCon.addEventListener('click', function(e) {
//         if(e.target.classList.contains('js-info-block__close') || e.target.classList.contains('info-block__arrow')) {
//             for(var i = 0; i < this.children.length; i++) {
//                 if(this.children[i].classList.contains('info-block__text')) {
//                     if(infoBlockOpen) {
//                         infoBlockOpenHeight = this.children[i].clientHeight;
//                     } else {

//                     }
//                 }
//             }
//         }
//     });
// })();

var infoBlock = (function() {
    if(document.querySelector('.js-info-block')) {
        var infoBlockBtn = document.querySelector('.js-info-block__close');
        var infoBlockCon = document.querySelector('.js-info-block');
        var infoBlockOpen = true;
        infoBlockBtn.addEventListener('click', function(e) {
            if(infoBlockOpen) {
                infoBlockCon.classList.add('info-block__closed');
                infoBlockOpen = false;
            } else {
                infoBlockCon.classList.remove('info-block__closed');
                infoBlockOpen = true;
            }
        });
    }
})();


// Info block hide/show end
//  =====================================================================================================================
