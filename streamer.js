const fs = require('fs');
const lame = require('lame');
const icy = require('icy');
const { PassThrough } = require('stream');

// Загрузить конфигурационный файл
const settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));

const input = fs.createReadStream(settings['input-file']);
const decoder = new lame.Decoder();
const output = new PassThrough();

input.pipe(decoder).pipe(output);

const options = {
  host: settings['host'],
  port: settings['port'],
  headers: {
    'Content-Type': settings['content-type'],
    'icy-name': settings['headers']['icy-name'],
    'icy-description': settings['headers']['icy-description'],
    'icy-genre': settings['headers']['icy-genre'],
    'icy-url': settings['headers']['icy-url'],
  },
};

icy.get(options, (res) => {
  console.log(`Connected to Icecast server: ${res.headers['icecast-name']}`);
});

output.pipe(icy.createStream(options, (res) => {
  console.log(`Stream connected: ${res}`);
}));
