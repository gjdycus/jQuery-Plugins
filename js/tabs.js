(function ($) {

$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.find('a').attr("data-content-tabs"));
  this.$activeTab = $(this.$contentTabs.find(".active"));

  this.$el.on("click", "a", this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function (e) {
  e.preventDefault();

  this.$activeTab.removeClass("active");
  $('.tabs').find('.active').removeClass('active');
  this.$activeTab.addClass("transitioning");

  var $newActiveLink = $(e.currentTarget);
  $newActiveLink.addClass("active");

  this.$activeTab.one('transitionend', this.activate.bind(this, $newActiveLink));
};

$.Tabs.prototype.activate = function ($newActiveLink) {
  this.$activeTab.removeClass("transitioning");
  this.$activeTab = $(this.$contentTabs.find($newActiveLink.attr("href")));
  this.$activeTab.addClass("active transitioning");
  var that = this;
  setTimeout(function () {
    that.$activeTab.removeClass("transitioning");
  }, 0);
};



$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

})(jQuery);
