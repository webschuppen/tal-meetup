define('meetup/appui/formatters/slidelistformatter', [
  'antie/formatter',
  'antie/widgets/button',
  'antie/widgets/label'
], (Formatter, Button, Label) =>
  Formatter.extend({
    format: function format(iterator) {
      const item = iterator.next();

      return render(
        <Button>
          <Label>- {item}</Label>
        </Button>
      );
    }
  }));
