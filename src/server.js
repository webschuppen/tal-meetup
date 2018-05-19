const express = require('express');
const app = express();
const TALFramework = require('tal');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const request = require('request');

const settings = {
  listenPort: process.env.PORT || 1337
};

// Setup mustache for view templating
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Use body parser
app.use(bodyParser.json());

app.get('/', function(req, res) {
  console.log(req.get('user-agent'));

  // Path to device configuration directory
  const configPath = 'node_modules/tal/config';
  const antie = new TALFramework(configPath);

  // Get normalised brand and model from url parameters
  const device_brand = antie.normaliseKeyNames(req.query.brand || 'default');
  const device_model = antie.normaliseKeyNames(req.query.model || 'webkit');

  // Load framework device config files, named BRAND-MODEL-default.json
  let device_configuration;

  try {
    device_configuration = antie.getConfigurationFromFilesystem(
      device_brand + '-' + device_model + '-default',
      '/devices'
    );
  } catch (e) {
    res.status(406).render('error', {
      exception: e
    });
    return;
  }

  // Substitute application_id wherever /%application%/ token is present in device configuration
  const application_id = 'meetup';
  device_configuration = device_configuration.replace(
    /%application%/g,
    application_id
  );

  const device_configuration_decoded = JSON.parse(device_configuration);

  res.render('index', {
    root_html_tag: antie.getRootHtmlTag(device_configuration_decoded),
    headers: antie.getDeviceHeaders(device_configuration_decoded),
    application_id: application_id,
    device_configuration: device_configuration,
    extra_body: antie.getDeviceBody(device_configuration_decoded),
    version: '0.0.1'
  });
});

app.use('/tal', express.static('node_modules/tal'));
app.use('/static', express.static('dist/static'));

app.listen(settings.listenPort, () => {
  console.log('meetup TAL app listening on port ' + settings.listenPort);
});
