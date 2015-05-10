(function() {
  var formatFormInput;

  formatFormInput = function(serializedArray) {
    var actual, dat, data, i, j, len, len1, multivalue, orig;
    orig = serializedArray;
    data = {};
    for (i = 0, len = orig.length; i < len; i++) {
      dat = orig[i];
      multivalue = 0;
      for (j = 0, len1 = orig.length; j < len1; j++) {
        actual = orig[j];
        if (dat.name === actual.name) {
          multivalue++;
        }
      }
      if (multivalue === 1 || (data[dat.name] == null)) {
        data[dat.name] = dat.value;
      } else {
        data[dat.name] += ', ' + dat.value;
      }
    }
    return data;
  };

  $(function() {
    var fancy;
    if (!Modernizr.touch) {
      $('a[href^=tel]').each(function() {
        var $this;
        $this = $(this);
        $this.parent().append($this.text());
        return $this.remove();
      });
      $("form.custom").submit(function(e) {
        var createHtmlApplication, self;
        self = $(this);
        if (self.data('sent') == null) {
          createHtmlApplication = function() {
            var data, s;
            data = formatFormInput(self.serializeArray());
            s = '<h2>Új jelentkezés,</h2>';
            s += '<p>Ember: ' + data['name'] + '</p>';
            s += '<p>Jön-e: ' + data['answer'] + '</p>';
            s += '<p>Üzenet: ' + data['comment'] + '</p>';
            return s + '<br />';
          };
          $.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
              key: "TqTx6i_IhHULoHB9zb43sw",
              message: {
                html: createHtmlApplication(),
                subject: "[ESKÜVŐ] Új jelentkezés",
                from_email: "salidani@gmail.com",
                from_name: "Oldal",
                to: [
                  {
                    email: "salidani@gmail.com",
                    name: "Dani"
                  }
                ]
              }
            },
            beforeSend: function() {
              return $('button', self).text('Küldés...');
            },
            complete: function() {
              return self.data('sent', 'sent');
            },
            success: function() {
              $('button', self).addClass('success');
              return $('button', self).text('Köszönjük!');
            },
            error: function(xhr) {
              $('button', self).addClass('alert');
              $('button', self).text('Valami gond van, inkább hívj fel minket!');
              return console.error(xhr);
            }
          });
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
    }
    fancy = $(".fancybox");
    if (fancy) {
      fancy.fancybox();
    }
    $("#gallery").owlCarousel({
      navigation: true,
      navigationText: ['Előző kép', 'Következő kép'],
      beforeInit: function(elem) {
        return elem.children().sort(function() {
          return Math.round(Math.random()) - 0.5;
        }).each(function() {
          return $(this).appendTo(elem);
        });
      },
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true
    });
    return this;
  });

}).call(this);
