'use strict';

var _ = require('lodash');  /* jshint ignore:line */
var Holodeck = require('../../../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('DocumentPermission', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.sync.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documents('ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documentPermissions('identity').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        documentSid: 'ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        identity: 'identity'
      };
      var url = _.template('https://sync.twilio.com/v1/Services/<%= serviceSid %>/Documents/<%= documentSid %>/Permissions/<%= identity %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'document_sid': 'ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'identity': 'identity',
          'read': true,
          'write': true,
          'manage': true,
          'url': 'https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Documents/ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Permissions/identity'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.sync.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documents('ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documentPermissions('identity').fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid remove request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.sync.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documents('ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documentPermissions('identity').remove();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        documentSid: 'ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        identity: 'identity'
      };
      var url = _.template('https://sync.twilio.com/v1/Services/<%= serviceSid %>/Documents/<%= documentSid %>/Permissions/<%= identity %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'DELETE',
        url: url
      }));
    }
  );
  it('should generate valid delete response',
    function() {
      var body = JSON.stringify(null);

      holodeck.mock(new Response(204, body));

      var promise = client.sync.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documents('ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documentPermissions('identity').remove();
      promise = promise.then(function(response) {
        expect(response).toBe(true);
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid list request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.sync.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documents('ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documentPermissions.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        documentSid: 'ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://sync.twilio.com/v1/Services/<%= serviceSid %>/Documents/<%= documentSid %>/Permissions')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_empty response',
    function() {
      var body = JSON.stringify({
          'permissions': [],
          'meta': {
              'first_page_url': 'https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Documents/sidOrUniqueName/Permissions?PageSize=50&Page=0',
              'key': 'permissions',
              'next_page_url': null,
              'page': 0,
              'page_size': 50,
              'previous_page_url': null,
              'url': 'https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Documents/sidOrUniqueName/Permissions?PageSize=50&Page=0'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.sync.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documents('ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documentPermissions.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid read_full response',
    function() {
      var body = JSON.stringify({
          'permissions': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'document_sid': 'ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'identity': 'identity',
                  'read': true,
                  'write': true,
                  'manage': true,
                  'url': 'https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Documents/ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Permissions/identity'
              }
          ],
          'meta': {
              'first_page_url': 'https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Documents/sidOrUniqueName/Permissions?PageSize=50&Page=0',
              'key': 'permissions',
              'next_page_url': null,
              'page': 0,
              'page_size': 50,
              'previous_page_url': null,
              'url': 'https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Documents/sidOrUniqueName/Permissions?PageSize=50&Page=0'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.sync.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documents('ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documentPermissions.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid update request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var opts = {
        read: true,
        write: true,
        manage: true
      };
      var promise = client.sync.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documents('ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documentPermissions('identity').update(opts);
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        documentSid: 'ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        identity: 'identity'
      };
      var url = _.template('https://sync.twilio.com/v1/Services/<%= serviceSid %>/Documents/<%= documentSid %>/Permissions/<%= identity %>')(solution);

      var values = {
        Read: true,
        Write: true,
        Manage: true,
      };
      holodeck.assertHasRequest(new Request({
          method: 'POST',
          url: url,
          data: values
      }));
    }
  );
  it('should generate valid update response',
    function() {
      var body = JSON.stringify({
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'document_sid': 'ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'identity': 'identity',
          'read': true,
          'write': true,
          'manage': true,
          'url': 'https://sync.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Documents/ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Permissions/identity'
      });

      holodeck.mock(new Response(200, body));

      var opts = {
        read: true,
        write: true,
        manage: true
      };
      var promise = client.sync.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documents('ETaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .documentPermissions('identity').update(opts);
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

