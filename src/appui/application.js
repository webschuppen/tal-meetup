define('meetup/appui/application', [
  'antie/application',
  'antie/widgets/container',
  'antie/storageprovider'
], (Application, Container, StorageProvider) =>
  Application.extend({
    init: function init(appDiv, styleDir, imgDir, callback) {
      init.base.call(this, appDiv, styleDir, imgDir, callback);

      // Sets the root widget of the application to be
      // an empty container
      this.setRootContainer = () => {
        const container = new Container();
        container.outputElement = appDiv;
        this.setRootWidget(container);
      };
    },

    run: function run() {
      this.getDevice().filteredLoggingMethods = {
        log: console.log,
        debug: console.log,
        info: console.log,
        warn: console.warn,
        error: console.error
      };

      this.setRootContainer();

      this.addComponentContainer(
        'maincontainer',
        'meetup/appui/components/start'
      );
    }
  }));
