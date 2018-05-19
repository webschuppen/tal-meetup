define('meetup/appui/components/start', [
  'antie/widgets/component',
  'antie/widgets/carousel',
  'antie/widgets/carousel/keyhandlers/activatefirsthandler',
  'meetup/appui/widgets/slide'
], (Component, Carousel, ActivateFirstHandler, Slide) => {
  return Component.extend({
    init: function init() {
      init.base.call(this, 'my-component-id');

      this.onBeforeRender = this.onBeforeRender.bind(this);
      this.addEventListener('beforerender', this.onBeforeRender);
    },

    onBeforeRender: function onBeforeRender() {
      let slideCarousel = new Carousel(
        'slides-carousel',
        Carousel.orientations.HORIZONTAL
      );

      const slides = [
        { title: 'Wow this is a slide' },
        { title: 'yay 🎉' },
        { title: 'I think it works' }
      ];
      const { width, height } = this.getCurrentApplication().getBestFitLayout();

      slideCarousel.autoCalculate(false);
      slideCarousel.setNormalisedAlignPoint(0);
      slideCarousel.setNormalisedWidgetAlignPoint(0);

      const handler = new ActivateFirstHandler();
      handler.setAnimationOptions({
        duration: 200,
        easing: 'linear',
        skipAnim: false
      });
      handler.attach(slideCarousel);

      slideCarousel = slides.reduce((acc, curr) => {
        acc.appendChildWidget(new Slide(curr));
        return acc;
      }, slideCarousel);
      slideCarousel.setWidgetLengths(width);
      slideCarousel.recalculate();

      this.appendChildWidget(slideCarousel);
    }
  });
});
