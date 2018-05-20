define('meetup/appui/widgets/animatedverticallist', [
  'antie/widgets/verticallist'
], VerticalList =>
  VerticalList.extend({
    init: function init({
      id = 'animatedverticallist',
      itemFormatter,
      dataSource
    } = {}) {
      init.base.call(this, id, itemFormatter, dataSource);
      this.addClass('avl');

      this.addEventListener('selecteditemchange', ({ index }) =>
        this.setVisibles(index)
      );
    },

    setVisibles: function setVisibles(index) {
      const childWidgets = this.getChildWidgets();

      for (let i = 0; i < childWidgets.length; i += 1) {
        if (i <= index) {
          childWidgets[i].addClass('visible');
        } else {
          childWidgets[i].removeClass('visible');
        }
      }
    }
  }));
