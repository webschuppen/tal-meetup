define('meetup/appui/widgets/slide', [
  'antie/widgets/container',
  'antie/widgets/label',
  'meetup/appui/formatters/slidelistformatter',
  'meetup/appui/widgets/animatedverticallist'
], (Container, Label, SlideListFormatter, AnimatedVerticalList) =>
  Container.extend({
    init: function init({ title, items }) {
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
        dataSource: items,
        itemFormatter: new SlideListFormatter()
      });
      inner.appendChildWidget(list);
      list.focus();

      this.appendChildWidget(inner);
    }
  }));
