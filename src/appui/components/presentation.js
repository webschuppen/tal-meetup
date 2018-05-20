define('meetup/appui/components/presentation', [
  'antie/widgets/component',
  'antie/widgets/carousel',
  'antie/widgets/carousel/keyhandlers/activatefirsthandler',
  'antie/events/keyevent',
  'meetup/appui/widgets/slide'
], (Component, Carousel, ActivateFirstHandler, KeyEvent, Slide) => {
  return Component.extend({
    init: function init() {
      init.base.call(this, 'my-component-id');

      this.onBeforeRender = this.onBeforeRender.bind(this);
      this.addEventListener('beforerender', this.onBeforeRender);

      this.addEventListener('keydown', evt => {
        if (evt.keyCode === KeyEvent.VK_BACK) {
          this.parentWidget.back();
        }
      });
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
            '• TAL ist ein Javascript Framework'
          ]
        },
        {
          title: 'Pros',
          items: [
            '• Eine Applikation für viele Geräte',
            '• Etabliertes Framework (seit mehr als 5 Jahren)',
            '• Viele vorbereitete Widgets',
            '• Viele vorbereitete Device Configs'
          ]
        },
        {
          title: 'Cons',
          items: [
            '• Nutzt intern AMD / requirejs',
            '• Teilweise sehr umständlich',
            '• Relativ kleine Community'
          ]
        }
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
