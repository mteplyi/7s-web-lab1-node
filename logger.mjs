import fs from 'fs';

export default (path, template) => {
  const logFileDescriptor = fs.openSync(path, 'a');
  return (req, res, next) => {
    let message = template.replace(/\\n/gui, '\n');
    const props = {
      protocol: req.protocol,
      hostname: req.hostname,
      path: req.path,
      url: req.url,
      method: req.method,
    };
    if (req.hasOwnProperty('useragent')) {
      Object.assign(props, {
        browser: req.useragent.browser,
        platform: req.useragent.platform,
        os: req.useragent.os,
        version: req.useragent.version,
      });
    }
    for (const key in props) {
      message = message.replace(new RegExp(`\\$\\{${key}\\}`, 'gui'), props[key]);
    }
    fs.appendFile(logFileDescriptor, message, () => {});
    next();
  };
};
