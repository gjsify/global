/*! (c) Andrea Giammarchi - ISC - https://github.com/WebReflection/gjs-require */

exports.default = (function (self) {'use strict';

  const { gi, system } = imports;

  const { GLib, Gio } = gi;
  const { File } = Gio;

  const DIR = GLib.get_current_dir();
  const PROGRAM = resolve(DIR, system.programInvocationName);

  let __dirname = getProgramDir(PROGRAM).get_path();
  let __filename = PROGRAM.get_path();

  Object.defineProperties(window, {
    __dirname: {get: () => __dirname},
    __filename: {get: () => __filename},
    global: {value: window},
  });

  function getProgramDir(programFile) {
    const info = programFile.query_info('standard::', Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS, null);
    if (info.get_is_symlink()) {
      const symlinkFile = programFile.get_parent().resolve_relative_path(info.get_symlink_target());
      return symlinkFile.get_parent();
    } else {
      return programFile.get_parent();
    }
  }

  function resolve(dir, file) {
    return File.new_for_path(dir).resolve_relative_path(file);
  }

  return window

}(this));
