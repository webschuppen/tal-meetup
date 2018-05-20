define('meetup/appui/widgets/animatedverticallist', [
  'antie/widgets/verticallist'
], VerticalList =>
  VerticalList.extend({
    init: function init({
      id = 'animatedverticallist',
      itemFormatter,
      dataSource
    } = {}) {
      if (Array.isArray(dataSource)) {
        dataSource.unshift('');
      }

      init.base.call(this, id, itemFormatter, dataSource);
      this.addClass('avl');

      this.addEventListener('selecteditemchange', ({ index }) =>
        this.setVisibles(index)
      );

      this.addEventListener('databound', () => this.addItemClass());
    },

    setVisibles: function setVisibles(activeIndex) {
      this.getChildWidgets().forEach((item, index) => {
        if (index <= activeIndex) {
          item.addClass('avl__item--visible');
        } else {
          item.removeClass('avl__item--visible');
        }
      });
    },

    addItemClass: function addItemClass(className = 'avlItem') {
      this.getChildWidgets().forEach(item => {
        item.addClass('avl__item');
      });
    }
  }));
