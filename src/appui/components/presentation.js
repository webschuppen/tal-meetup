define('meetup/appui/components/presentation', [
  'antie/widgets/component',
  'antie/widgets/carousel',
  'antie/widgets/carousel/keyhandlers/activatefirsthandler',
  'antie/widgets/image',
  'antie/widgets/label',
  'antie/events/keyevent',
  'meetup/appui/widgets/slide'
], (
  Component,
  Carousel,
  ActivateFirstHandler,
  Image,
  Label,
  KeyEvent,
  Slide
) => {
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
            '• Tal ist Open Source mit der Apache-2.0 Lizenz',
            '• Es wurde von der BBC für interne Zwecke entwickelt',
            '• TAL ist ein JavaScript Framework'
          ]
        },
        {
          title: 'Pros',
          items: [
            '• "One Application - multiple devices"',
            '• Etabliertes Framework (seit mehr als 5 Jahren)',
            '• Viele vorbereitete Widgets',
            '• Viele vorbereitete Device Configs',
            '• Navigation durch verschachtelte Widget-Struktur',
            <Image
              src="https://bbc.github.io/tal/img/spatial_diagram_2.gif"
              class="spatial"
            />
          ]
        },
        {
          title: 'Cons',
          items: [
            '• Nutzt intern AMD / requirejs',
            '• Teilweise sehr umständlich',
            '• Relativ kleine Community (aber wachsend)'
          ]
        },
        {
          title: 'Wie wir es einsetzen',
          items: [
            '• NodeJS server',
            '• Device configuration aus URL Parametern auslesen',
            '• Config per mustache in den DOM rendern',
            '• TAL clientseitig per requirejs initialisieren',
            '• TAL liest device config ein und lädt Gerätespezifische Module nach (bzw. bindet gewisse Keyhandler)'
          ]
        },
        {
          title: '"Component Lifecycle"',
          items: [
            <Label>
              Verschiedene Events, welche im Lebenszyklus einer Komponente
              gefeuert werden. <br />
              Events können per addEventListener an der Komponente aufgefangen
              und behandelt werden.
            </Label>,
            '• load (einmalig)',
            '• beforerender',
            '• beforeshow',
            '• aftershow',
            '• beforehide',
            '• afterhide'
          ],
          startEmpty: false
        },
        {
          title: 'Der Mediaplayer',
          items: [
            '• HTML5 Video / Audio',
            '• Formate abhängig von Device !!',
            '• Steuerung frei definierbar (nichts vorgegeben)',
            '• Durch zusätzliche Widgets unterstützt (Progress)'
          ]
        },
        {
          title: 'Links',
          items: [
            '• https://bbc.github.io/tal/',
            '• https://github.com/lionralfs/tal-jsx',
            <Label class="presentationlink">
              • https://github.com/webschuppen/tal-meetup
            </Label>
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
