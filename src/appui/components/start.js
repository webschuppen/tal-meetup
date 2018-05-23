define('meetup/appui/components/start', [
  'antie/widgets/component',
  'antie/widgets/button',
  'antie/widgets/image'
], (Component, Button, Image) =>
  Component.extend({
    init: function init() {
      init.base.call(this, 'startscreen');

      this.onBeforeRender = this.onBeforeRender.bind(this);
      this.addEventListener('beforerender', this.onBeforeRender);
    },

    onBeforeRender: function onBeforeRender() {
      const clickhandler = () => {
        this.getCurrentApplication().pushComponent(
          'maincontainer',
          'meetup/appui/components/presentation'
        );
      };

      this.appendChildWidget(
        render(
          <Button onClick={clickhandler}>
            <Image src="static/img/tal-logo.png" />
          </Button>
        )
      );
    }
  }));
