define('meetup/appui/widgets/slide', [
  'antie/widgets/container',
  'antie/widgets/label',
  'meetup/appui/widgets/animatedverticallist'
], (Container, Label, AnimatedVerticalList) =>
  Container.extend({
    init: function init({ title, items, startEmpty = true }) {
      init.base.call(this);
      this.addClass('slide');

      const inner = render(<Container class="slide__inner" />);

      inner.appendChildWidget(
        render(
          <Label>
            <h1>{title}</h1>
          </Label>
        )
      );

      const list = new AnimatedVerticalList({
        items,
        startEmpty
      });
      inner.appendChildWidget(list);
      list.focus();

      this.appendChildWidget(inner);
    }
  }));
