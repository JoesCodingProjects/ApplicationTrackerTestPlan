'use strict';
var keycomb = require('./');
var assert = require('assert');

describe('keycomb(string)', function() {
  it('should return object', function() {
    assert.deepEqual({
      altKey: false,
      ctrlKey: false,
      shiftKey: false,
      keyCode: [81, 87, 69]
    }, keycomb('q+w+e'));

    assert.deepEqual({
      altKey: false,
      ctrlKey: true,
      shiftKey: false,
      keyCode: [67]
    }, keycomb('ctrl+c'));

    assert.deepEqual({
      altKey: true,
      ctrlKey: true,
      shiftKey: false,
      keyCode: [67, 77]
    }, keycomb('alt+ctrl+c+m'));

    assert.deepEqual({
      altKey: true,
      ctrlKey: true,
      shiftKey: true,
      keyCode: [67]
    }, keycomb('alt+ctrl+shift+c'));
  });
});

describe('keycomb(array)', function() {
  it('should return object', function() {
    assert.deepEqual({
      altKey: false,
      ctrlKey: false,
      shiftKey: false,
      keyCode: [81, 87, 69]
    }, keycomb(['q', 'w', 'e']));

    assert.deepEqual({
      altKey: false,
      ctrlKey: true,
      shiftKey: false,
      keyCode: [67]
    }, keycomb(['ctrl', 'c']));

    assert.deepEqual({
      altKey: true,
      ctrlKey: true,
      shiftKey: false,
      keyCode: [67, 77]
    }, keycomb(['alt', 'ctrl', 'c', 'm']));

    assert.deepEqual({
      altKey: true,
      ctrlKey: true,
      shiftKey: true,
      keyCode: [67]
    }, keycomb(['alt', 'ctrl', 'shift', 'c']));
  });
});

describe('keycomb(object)', function() {
  it('should return string', function() {
    assert.deepEqual(['q', 'w', 'e'], keycomb({
      altKey: false,
      ctrlKey: false,
      shiftKey: false,
      keyCode: [81, 87, 69]
    }));

    assert.deepEqual(['ctrl', 'c'], keycomb({
      altKey: false,
      ctrlKey: true,
      shiftKey: false,
      keyCode: [67]
    }));

    assert.deepEqual(['alt', 'ctrl', 'c', 'm'], keycomb({
      altKey: true,
      ctrlKey: true,
      shiftKey: false,
      keyCode: [67, 77]
    }));

    assert.deepEqual(['alt', 'ctrl', 'shift', 'c'], keycomb({
      altKey: true,
      ctrlKey: true,
      shiftKey: true,
      keyCode: [67]
    }));
  });
});
