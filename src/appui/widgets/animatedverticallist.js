define('meetup/appui/widgets/animatedverticallist', [
  'antie/widgets/container',
  'antie/widgets/button',
  'antie/widgets/label',
  'antie/widgets/verticallist'
], (Container, Button, Label, VerticalList) =>
  Container.extend({
    init: function init({ items, startEmpty = true } = {}) {
      if (!Array.isArray(items)) {
        throw new Error('items is not an array');
      }

      if (startEmpty) {
        items = ['', ...items];
      }

      init.base.call(this, 'animatedverticallist');

      this.addClass('avl');

      const handler = ({ index }) => this.setVisibles(index);

      this.appendChildWidget(
        render(
          <VerticalList
            ref={list => (this.list = list)}
            onSelectedItemChange={handler}
          >
            {items.map(item => (
              <Button class="avl__item">
                {typeof item === 'string' ? <Label>{item}</Label> : item}
              </Button>
            ))}
          </VerticalList>
        )
      );
    },

    setVisibles: function setVisibles(activeIndex) {
      this.list.getChildWidgets().forEach((item, index) => {
        if (index <= activeIndex) {
          item.addClass('avl__item--visible');
        } else {
          item.removeClass('avl__item--visible');
        }
      });
    }
  }));
