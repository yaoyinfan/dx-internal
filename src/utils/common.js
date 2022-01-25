export function checkMenuPermissions(settings, permissions, arr) {
  // 此方法会将settings中的完全版permissions缩减成参数permissions中包含的，仅返回有权限的settings
  if (permissions) {
    for (let i = 0; i < settings.length; i++) {
      if (settings[i].permissions) {
        const sp = settings[i].permissions.filter((p) => {
          return permissions[p];
        });
        if (sp.length) {
          settings[i].permissions = sp;
          if (settings[i].children) {
            settings[i].children = checkMenuPermissions(
              settings[i].children,
              permissions,
              []
            );
          }
          arr.push(settings[i]);
        }
      } else {
        if (settings[i].noPermissions) {
          const nsp = settings[i].noPermissions.filter((p) => {
            return permissions[p];
          });
          if (nsp.length === 0) {
            arr.push(settings[i]);
          }
        } else {
          arr.push(settings[i]);
        }
      }
    }
  }
  return arr;
}

export function checkMenuProps(settings, obj, arrs) {
  for (let i = 0; i < settings.length; i++) {
    let nowItem = null;
    if (settings[i].statusProps) {
      const sp = settings[i].statusProps.filter((p) => {
        return obj[p];
      });
      if (sp.length) {
        nowItem = settings[i];
      }
    }
    if (!nowItem && settings[i].noStatusProps) {
      const nsp = settings[i].noStatusProps.filter((p) => {
        if (obj.hasOwnProperty(p)) {
          return !obj[p];
        }
        return false;
      });
      if (nsp.length) {
        nowItem = settings[i];
      }
    }
    if (!settings[i].noStatusProps && !settings[i].statusProps) {
      nowItem = settings[i];
    }
    if (nowItem) {
      arrs.push(nowItem);
    }
  }
  return arrs;
}

export function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
}
