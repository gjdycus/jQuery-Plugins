(function ($) {

  $.Carousel = function(el) {
    this.$el = $(el);
    this.activeIdx = 0;

    this.transitioning = false;
    //use this.$el.find
    this.$el.find('li:first-child').addClass("active");

    this.$el.find('.slide-right').on('click', this.slide.bind(this, -1));
    this.$el.find('.slide-left').click(this.slide.bind(this, 1));
  };

  $.Carousel.prototype.slide = function (dir) {
    if (this.transitioning) {
      return;
    }

    this.transitioning = true;
    
    var fromDirection = (dir === 1 ? 'right' : 'left');
    var toDirection = (dir === -1 ? 'right' : 'left');

    var $prevEl = this.$el.find('li').eq(this.activeIdx);
    $prevEl.addClass(toDirection);

    this.activeIdx += dir;
    this.verifyIdx();

    var $nextEl = this.$el.find('li').eq(this.activeIdx);
    $nextEl.addClass("active " + fromDirection);

    var that = this;
    $prevEl.one('transitionend', function () {
      $prevEl.removeClass("active right left");
      that.transitioning = false;
    });

    setTimeout(function() {
      $nextEl.removeClass(fromDirection);
    }, 0);

  };

  $.Carousel.prototype.verifyIdx = function () {
    if (this.activeIdx >= this.$el.find('ul.items li').length) {
      this.activeIdx = 0;
    } else if (this.activeIdx < 0) {
      this.activeIdx = this.$el.find('ul.items li').length - 1;
    }
  };

  $.fn.carousel = function() {
    return this.each(function() {
      new $.Carousel(this);
    });
  };

})(jQuery);
