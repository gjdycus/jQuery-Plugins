(function ($) {
  var Thumbnail = function (el) {
    this.$el = $(el);
    this.$gutterImages = this.$el.find('.gutter-images');
    this.$images = this.$el.find('.gutter-images img');

    this.$activeImg = this.$images.first();
    this.activate(this.$activeImg);

    this.gutterIdx = 0;
    this.fillGutterImages();

    this.$gutterImages.on("click", "img", this.clickHandler.bind(this));
    this.$gutterImages.on("mouseenter", "img", this.mouseEnter.bind(this));
    this.$gutterImages.on("mouseleave", "img", this.mouseLeave.bind(this));
    this.$el.find('a').on("click", this.handleAnchor.bind(this));
  };

  Thumbnail.prototype.clickHandler = function (e) {
    var $nextImg = $(e.currentTarget);
    this.$activeImg = $nextImg;
    this.activate($nextImg);
  };

  Thumbnail.prototype.activate = function ($img) {
    var $imgClone = $img.clone();
    var $active = this.$el.find('div.active');
    $active.empty();
    $active.append($imgClone);
  };

  Thumbnail.prototype.mouseEnter = function (e) {
    this.activate($(e.currentTarget));
  };

  Thumbnail.prototype.mouseLeave = function () {
    this.activate(this.$activeImg);
  };

  Thumbnail.prototype.fillGutterImages = function () {
    this.$gutterImages.empty();
    for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
      this.$gutterImages.append($(this.$images[i]).clone());
    }
  };

  Thumbnail.prototype.handleAnchor = function(e) {
    if ($(e.currentTarget).text() === '&lt;') {
      this.gutterIdx -= 1;
    } else {
      this.gutterIdx += 1;
    }
    this.fillGutterImages();
  };

  $.fn.thumbnails = function () {
    return this.each(function() {
      new Thumbnail(this);
    });
  };
})(jQuery);
