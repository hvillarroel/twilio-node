'use strict';

var _ = require('lodash');  /* jshint ignore:line */
var Holodeck = require('../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('Sim', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.wireless.v1.sims('DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        sid: 'DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://wireless.twilio.com/v1/Sims/<%= sid %>')(solution);

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
          'unique_name': 'unique_name',
          'commands_callback_method': 'http_method',
          'commands_callback_url': 'http://www.example.com',
          'date_created': '2015-07-30T20:00:00Z',
          'date_updated': '2015-07-30T20:00:00Z',
          'friendly_name': 'friendly_name',
          'sms_fallback_method': 'http_method',
          'sms_fallback_url': 'http://www.example.com',
          'sms_method': 'http_method',
          'sms_url': 'http://www.example.com',
          'voice_fallback_method': 'http_method',
          'voice_fallback_url': 'http://www.example.com',
          'voice_method': 'http_method',
          'voice_url': 'http://www.example.com',
          'links': {
              'rate_plan': 'https://wireless.twilio.com/v1/RatePlans/WPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
              'usage_records': 'https://wireless.twilio.com/v1/Sims/DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UsageRecords'
          },
          'rate_plan_sid': 'WPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'sid': 'DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'iccid': 'iccid',
          'e_id': 'e_id',
          'status': 'new',
          'url': 'https://wireless.twilio.com/v1/Sims/DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.wireless.v1.sims('DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid list request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.wireless.v1.sims.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var url = 'https://wireless.twilio.com/v1/Sims';

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_empty response',
    function() {
      var body = JSON.stringify({
          'sims': [],
          'meta': {
              'first_page_url': 'https://wireless.twilio.com/v1/Sims?PageSize=50&Page=0',
              'key': 'sims',
              'next_page_url': null,
              'page': 0,
              'page_size': 50,
              'previous_page_url': null,
              'url': 'https://wireless.twilio.com/v1/Sims?PageSize=50&Page=0'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.wireless.v1.sims.list();
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
          'sims': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'unique_name': 'unique_name',
                  'commands_callback_method': 'http_method',
                  'commands_callback_url': 'http://www.example.com',
                  'date_created': '2015-07-30T20:00:00Z',
                  'date_updated': '2015-07-30T20:00:00Z',
                  'friendly_name': 'friendly_name',
                  'links': {
                      'rate_plan': 'https://wireless.twilio.com/v1/RatePlans/WPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                      'usage_records': 'https://wireless.twilio.com/v1/Sims/DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UsageRecords'
                  },
                  'rate_plan_sid': 'WPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'sid': 'DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'iccid': 'iccid',
                  'e_id': 'e_id',
                  'status': 'new',
                  'sms_fallback_method': 'http_method',
                  'sms_fallback_url': 'http://www.example.com',
                  'sms_method': 'http_method',
                  'sms_url': 'http://www.example.com',
                  'voice_fallback_method': 'http_method',
                  'voice_fallback_url': 'http://www.example.com',
                  'voice_method': 'http_method',
                  'voice_url': 'http://www.example.com',
                  'url': 'https://wireless.twilio.com/v1/Sims/DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ],
          'meta': {
              'first_page_url': 'https://wireless.twilio.com/v1/Sims?PageSize=50&Page=0',
              'key': 'sims',
              'next_page_url': null,
              'page': 0,
              'page_size': 50,
              'previous_page_url': null,
              'url': 'https://wireless.twilio.com/v1/Sims?PageSize=50&Page=0'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.wireless.v1.sims.list();
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

      var promise = client.wireless.v1.sims('DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').update();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        sid: 'DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://wireless.twilio.com/v1/Sims/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url
      }));
    }
  );
  it('should generate valid update response',
    function() {
      var body = JSON.stringify({
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'unique_name': 'unique_name',
          'commands_callback_method': 'http_method',
          'commands_callback_url': 'http://www.example.com',
          'date_created': '2015-07-30T20:00:00Z',
          'date_updated': '2015-07-30T20:00:00Z',
          'friendly_name': 'friendly_name',
          'links': {
              'rate_plan': 'https://wireless.twilio.com/v1/RatePlans/WPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
              'usage_records': 'https://wireless.twilio.com/v1/Sims/DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UsageRecords'
          },
          'rate_plan_sid': 'WPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'sid': 'DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'iccid': 'iccid',
          'e_id': 'e_id',
          'status': 'new',
          'sms_fallback_method': 'http_method',
          'sms_fallback_url': 'http://www.example.com',
          'sms_method': 'http_method',
          'sms_url': 'http://www.example.com',
          'voice_fallback_method': 'http_method',
          'voice_fallback_url': 'http://www.example.com',
          'voice_method': 'http_method',
          'voice_url': 'http://www.example.com',
          'url': 'https://wireless.twilio.com/v1/Sims/DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.wireless.v1.sims('DEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').update();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

