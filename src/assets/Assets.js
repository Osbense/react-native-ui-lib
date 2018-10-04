import _ from 'lodash';

function assignProperties(a, b) {
  return Object.defineProperties(a, Object.getOwnPropertyDescriptors(b));
}

function ensurePath(obj, path) {
  let pointer = obj;

  const pathArray = path.split('.');
  const n = pathArray.length;

  for (let i = 0; i < n; i++) {
    const segment = pathArray[i];
    pointer[segment] = pointer[segment] || {};
    pointer = pointer[segment];
  }

  return pointer;
}

export class Assets {
  loadAssetsGroup(groupName, assets) {
    if (!_.isString(groupName)) {
      throw new Error('group name should be a string');
    }

    if (!_.isPlainObject(assets)) {
      throw new Error('assets should be a hash map or a function (for lazy access)');
    }

    if (groupName === '') {
      assignProperties(this, assets);
    } else {
      assignProperties(ensurePath(this, groupName), assets);
    }

    return this;
  }

  static merge(...assets) {
    return assets.reduce(assignProperties);
  }
}