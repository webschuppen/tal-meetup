define('meetup/appui/components/meetup', [
  'antie/widgets/component',
  'antie/widgets/label',
  'antie/widgets/container',
  'antie/widgets/button'
], (Component, Label, Container, Button) =>
  Component.extend({
    init: function init() {
      init.base.call(this);

      this.onBeforerender = this.onBeforerender.bind(this);
      this.addEventListener('beforerender', this.onBeforerender);
    },

    onBeforerender: function onBeforerender(data) {
      this.appendChildWidget(
        render(
          <Container class="test">
            <Label>Text</Label>
            <Button
              onClick={evt => {
                console.log('test');
              }}
            />
          </Container>
        )
      );
    }
  }));
