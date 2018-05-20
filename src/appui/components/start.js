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
        {
          title: 'Was ist TAL?',
          items: [
            '• TAL steht für TV Application Layer',
            '• Es wurde von der BBC für interne Zwecke entwickelt',
            '• TAL ist ein Javascript Framework',
            '• Es ermöglicht mit geringem Aufwand für viele Embedded-Devices zu entwickeln'
          ]
        },
        { title: 'yay 🎉', items: ['One', 'Two', 'Three', 'Four'] },
        { title: 'I think it works', items: ['One', 'Two', 'Three'] }
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
