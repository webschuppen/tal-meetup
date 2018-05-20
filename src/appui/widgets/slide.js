define('meetup/appui/widgets/slide', [
  'antie/widgets/button',
  'antie/widgets/label'
], (Button, Label) =>
  Button.extend({
    init: function init(props) {
      init.base.call(this);
      this.addClass('slide');
      console.log(props);

      this.appendChildWidget(
        render(
          <Label>
            <h1>{props.title}</h1>
            <ul>
              <li>One</li>
              <li>Two</li>
              <li>Three</li>
            </ul>
          </Label>
        )
      );
    }
  }));
