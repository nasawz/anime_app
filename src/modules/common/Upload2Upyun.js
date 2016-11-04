/*eslint-disable */

import map from "lodash/map";
const toplevelList = ['signature', 'policy', 'form_api_secret', 'endpoint', 'host'];

export default class Upload2Upyun {
  constructor(images = null, files = null) {
    this.configs = this.initDefaultConfigs();
    this.postIndex = 0;
    this.images = [];
    this.originImages = images;
    this.originFiles = files;
  }

  configUpalod(configs) {
    var self = this;
    map(configs, function(v, k) {
      if (toplevelList.indexOf(k) > -1)
        self.configs[k] = v;
      else
        self.configs.params[k] = v;
    });
  }

  upload(callback, progressCallback) {
    if (!window.JSON)
      throw new Error('JSON is required.');
    if (!window.FormData)
      throw new Error('FormData is required.');
    if (!window.XMLHttpRequest)
      throw new Error('XMLHttpRequest is required.');
    if (!callback || typeof (callback) !== 'function')
      throw new Error('Callback function is required.');

    var self = this;
    // console.log(this.originImages);
    // console.log(this.originFiles);
    if (this.originImages && this.originImages.length > 0 && !this.originFiles) {
      this.dataURLtoBlob(this.originImages[this.postIndex], function(blob) {
        self.doUpload(blob, callback, progressCallback)
        console.log('正在开始上传第1张...');
      });
    } else if (this.originFiles && this.originFiles.length > 0 && !this.originImages) {
      self.doUploadFile(this.originFiles[0], callback, progressCallback)
      console.log('file _ 正在开始上传第1张...');
    } else {
      return callback(null, []);
    }

  }
  doUploadFile(file, callback, progressCallback) {

    console.log('doUploadFile');
    var self = this;
    var req = new XMLHttpRequest();
    var data = file;
    var totalCount = self.originFiles.length;

    if (!self.configs.policy && !window.Base64)
      throw new Error('lib Base64 is required');
    if (!self.configs.signature && !window.md5)
      throw new Error('lib Md5 is required');


    var policy = self.configs.policy || window.Base64.encode(JSON.stringify(self.configs.params));
    var apiendpoint = self.configs.endpoint || 'http://v0.api.upyun.com/' + self.configs.params.bucket;
    var imageHost = self.configs.host || 'http://' + self.configs.params.bucket + '.b0.upaiyun.com';

    // data.append('file', file);

    // Append `policy` and create `signature`
    data.append('policy', policy);
    data.append('signature', self.configs.signature || window.md5(policy + '&' + self.configs.form_api_secret));


    // Open a request
    req.open('POST', apiendpoint, true);

    // Error event
    req.addEventListener('error', function(err) {
      return callback(err);
    }, false);

    // When server response
    req.addEventListener('load', function(result) {
      var statusCode = result.target.status;

      // Try to parse JSON
      if (statusCode !== 200)
        return callback(new Error(result.target.status), result.target);

      try {
        var image = JSON.parse(this.responseText);
        image.absUrl = imageHost + image.url;
        image.absUri = image.absUrl;

        self.images.push(image);
        if (self.postIndex < (self.originFiles.length - 1)) {
          self.postIndex++;
          var file = self.originFiles[self.postIndex];
          self.doUploadFile(file, callback, progressCallback)
          console.log('正在开始上传第' + (self.postIndex + 1) + '张...');
        } else {
          console.log('全部上传完成');
          return callback(null, self.images);
        }
      // return callback(null, result.target, image);
      } catch (err) {
        return callback(err);
      }
    }, false);

    // Upload progress monitor
    req.upload.addEventListener('progress', function(pe) {
      if (!pe.lengthComputable) return;
      progressCallback(Math.round(pe.loaded / pe.total * 100), Math.round((self.postIndex + 1) / totalCount * 100))
    // if (!self.events.uploading || typeof (self.events.uploading) !== 'function')
    //   return;
    // self.events.uploading(Math.round(pe.loaded / pe.total * 100));
    });

    // Send data to server
    req.send(data);
  }
  doUpload(blob, callback, progressCallback) {

    var self = this;
    var req = new XMLHttpRequest();
    var data = new FormData();
    var totalCount = self.originImages.length;

    if (!self.configs.policy && !window.Base64)
      throw new Error('lib Base64 is required');
    if (!self.configs.signature && !window.md5)
      throw new Error('lib Md5 is required');


    var policy = self.configs.policy || window.Base64.encode(JSON.stringify(self.configs.params));
    var apiendpoint = self.configs.endpoint || 'http://v0.api.upyun.com/' + self.configs.params.bucket;
    var imageHost = self.configs.host || 'http://' + self.configs.params.bucket + '.b0.upaiyun.com';

    data.append('file', blob, "image.png");

    // Append `policy` and create `signature`
    data.append('policy', policy);
    data.append('signature', self.configs.signature || window.md5(policy + '&' + self.configs.form_api_secret));


    // Open a request
    req.open('POST', apiendpoint, true);

    // Error event
    req.addEventListener('error', function(err) {
      return callback(err);
    }, false);

    // When server response
    req.addEventListener('load', function(result) {
      var statusCode = result.target.status;

      // Try to parse JSON
      if (statusCode !== 200)
        return callback(new Error(result.target.status), result.target);

      try {
        var image = JSON.parse(this.responseText);
        image.absUrl = imageHost + image.url;
        image.absUri = image.absUrl;

        self.images.push(image);
        if (self.postIndex < (self.originImages.length - 1)) {
          self.postIndex++;
          var blob = self.dataURLtoBlob(self.originImages[self.postIndex]);
          self.doUpload(blob, callback, progressCallback)
          console.log('正在开始上传第' + (self.postIndex + 1) + '张...');
        } else {
          console.log('全部上传完成');
          return callback(null, self.images);
        }
      // return callback(null, result.target, image);
      } catch (err) {
        return callback(err);
      }
    }, false);

    // Upload progress monitor
    req.upload.addEventListener('progress', function(pe) {
      if (!pe.lengthComputable) return;
      progressCallback(Math.round(pe.loaded / pe.total * 100), Math.round((self.postIndex + 1) / totalCount * 100))
    // if (!self.events.uploading || typeof (self.events.uploading) !== 'function')
    //   return;
    // self.events.uploading(Math.round(pe.loaded / pe.total * 100));
    });

    // Send data to server
    req.send(data);
  }

  initDefaultConfigs() {
    return {
      form_api_secret: '',
      params: {
        expiration: (new Date().getTime()) + 60,
        'save-key': '/{year}/{mon}/{day}/upload_{filemd5}{.suffix}',
        'allow-file-type': 'jpg,jpeg,gif,png'
      }
    };
  }

  dataURLtoBlob(dataurl, cb) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new Blob([u8arr], {
      type: mime
    });
    cb(blob)
  }

}
