(function (deckyFrontendLib, React) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  var DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined
  };
  var IconContext = React__default["default"].createContext && React__default["default"].createContext(DefaultContext);

  var __assign = window && window.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __rest = window && window.__rest || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };
  function Tree2Element(tree) {
    return tree && tree.map(function (node, i) {
      return React__default["default"].createElement(node.tag, __assign({
        key: i
      }, node.attr), Tree2Element(node.child));
    });
  }
  function GenIcon(data) {
    // eslint-disable-next-line react/display-name
    return function (props) {
      return React__default["default"].createElement(IconBase, __assign({
        attr: __assign({}, data.attr)
      }, props), Tree2Element(data.child));
    };
  }
  function IconBase(props) {
    var elem = function (conf) {
      var attr = props.attr,
        size = props.size,
        title = props.title,
        svgProps = __rest(props, ["attr", "size", "title"]);
      var computedSize = size || conf.size || "1em";
      var className;
      if (conf.className) className = conf.className;
      if (props.className) className = (className ? className + " " : "") + props.className;
      return React__default["default"].createElement("svg", __assign({
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0"
      }, conf.attr, attr, svgProps, {
        className: className,
        style: __assign(__assign({
          color: props.color || conf.color
        }, conf.style), props.style),
        height: computedSize,
        width: computedSize,
        xmlns: "http://www.w3.org/2000/svg"
      }), title && React__default["default"].createElement("title", null, title), props.children);
    };
    return IconContext !== undefined ? React__default["default"].createElement(IconContext.Consumer, null, function (conf) {
      return elem(conf);
    }) : elem(DefaultContext);
  }

  // THIS FILE IS AUTO GENERATED
  function FaFan (props) {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M352.57 128c-28.09 0-54.09 4.52-77.06 12.86l12.41-123.11C289 7.31 279.81-1.18 269.33.13 189.63 10.13 128 77.64 128 159.43c0 28.09 4.52 54.09 12.86 77.06L17.75 224.08C7.31 223-1.18 232.19.13 242.67c10 79.7 77.51 141.33 159.3 141.33 28.09 0 54.09-4.52 77.06-12.86l-12.41 123.11c-1.05 10.43 8.11 18.93 18.59 17.62 79.7-10 141.33-77.51 141.33-159.3 0-28.09-4.52-54.09-12.86-77.06l123.11 12.41c10.44 1.05 18.93-8.11 17.62-18.59-10-79.7-77.51-141.33-159.3-141.33zM256 288a32 32 0 1 1 32-32 32 32 0 0 1-32 32z"}}]})(props);
  }

  // THIS FILE IS AUTO GENERATED
  function SiOnlyfans (props) {
    return GenIcon({"tag":"svg","attr":{"role":"img","viewBox":"0 0 24 24"},"child":[{"tag":"title","attr":{},"child":[]},{"tag":"path","attr":{"d":"M24 4.003h-4.015c-3.45 0-5.3.197-6.748 1.957a7.996 7.996 0 1 0 2.103 9.211c3.182-.231 5.39-2.134 6.085-5.173 0 0-2.399.585-4.43 0 4.018-.777 6.333-3.037 7.005-5.995zM5.61 11.999A2.391 2.391 0 0 1 9.28 9.97a2.966 2.966 0 0 1 2.998-2.528h.008c-.92 1.778-1.407 3.352-1.998 5.263A2.392 2.392 0 0 1 5.61 12Zm2.386-7.996a7.996 7.996 0 1 0 7.996 7.996 7.996 7.996 0 0 0-7.996-7.996Zm0 10.394A2.399 2.399 0 1 1 10.395 12a2.396 2.396 0 0 1-2.399 2.398Z"}}]})(props);
  }

  let wasm;

  const heap = new Array(128).fill(undefined);

  heap.push(undefined, null, true, false);

  function getObject(idx) { return heap[idx]; }

  let heap_next = heap.length;

  function dropObject(idx) {
      if (idx < 132) return;
      heap[idx] = heap_next;
      heap_next = idx;
  }

  function takeObject(idx) {
      const ret = getObject(idx);
      dropObject(idx);
      return ret;
  }

  let WASM_VECTOR_LEN = 0;

  let cachedUint8Memory0 = null;

  function getUint8Memory0() {
      if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
          cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
      }
      return cachedUint8Memory0;
  }

  const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

  const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
      ? function (arg, view) {
      return cachedTextEncoder.encodeInto(arg, view);
  }
      : function (arg, view) {
      const buf = cachedTextEncoder.encode(arg);
      view.set(buf);
      return {
          read: arg.length,
          written: buf.length
      };
  });

  function passStringToWasm0(arg, malloc, realloc) {

      if (realloc === undefined) {
          const buf = cachedTextEncoder.encode(arg);
          const ptr = malloc(buf.length, 1) >>> 0;
          getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
          WASM_VECTOR_LEN = buf.length;
          return ptr;
      }

      let len = arg.length;
      let ptr = malloc(len, 1) >>> 0;

      const mem = getUint8Memory0();

      let offset = 0;

      for (; offset < len; offset++) {
          const code = arg.charCodeAt(offset);
          if (code > 0x7F) break;
          mem[ptr + offset] = code;
      }

      if (offset !== len) {
          if (offset !== 0) {
              arg = arg.slice(offset);
          }
          ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
          const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
          const ret = encodeString(arg, view);

          offset += ret.written;
      }

      WASM_VECTOR_LEN = offset;
      return ptr;
  }

  function isLikeNone(x) {
      return x === undefined || x === null;
  }

  let cachedInt32Memory0 = null;

  function getInt32Memory0() {
      if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
          cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
      }
      return cachedInt32Memory0;
  }

  const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

  if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }
  function getStringFromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }

  function addHeapObject(obj) {
      if (heap_next === heap.length) heap.push(heap.length + 1);
      const idx = heap_next;
      heap_next = heap[idx];

      heap[idx] = obj;
      return idx;
  }

  function debugString(val) {
      // primitive types
      const type = typeof val;
      if (type == 'number' || type == 'boolean' || val == null) {
          return  `${val}`;
      }
      if (type == 'string') {
          return `"${val}"`;
      }
      if (type == 'symbol') {
          const description = val.description;
          if (description == null) {
              return 'Symbol';
          } else {
              return `Symbol(${description})`;
          }
      }
      if (type == 'function') {
          const name = val.name;
          if (typeof name == 'string' && name.length > 0) {
              return `Function(${name})`;
          } else {
              return 'Function';
          }
      }
      // objects
      if (Array.isArray(val)) {
          const length = val.length;
          let debug = '[';
          if (length > 0) {
              debug += debugString(val[0]);
          }
          for(let i = 1; i < length; i++) {
              debug += ', ' + debugString(val[i]);
          }
          debug += ']';
          return debug;
      }
      // Test for built-in
      const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
      let className;
      if (builtInMatches.length > 1) {
          className = builtInMatches[1];
      } else {
          // Failed to match the standard '[object ClassName]'
          return toString.call(val);
      }
      if (className == 'Object') {
          // we're a user defined class or Object
          // JSON.stringify avoids problems with cycles, and is generally much
          // easier than looping through ownProperties of `val`.
          try {
              return 'Object(' + JSON.stringify(val) + ')';
          } catch (_) {
              return 'Object';
          }
      }
      // errors
      if (val instanceof Error) {
          return `${val.name}: ${val.message}\n${val.stack}`;
      }
      // TODO we could test for more things here, like `Set`s and `Map`s.
      return className;
  }

  function makeMutClosure(arg0, arg1, dtor, f) {
      const state = { a: arg0, b: arg1, cnt: 1, dtor };
      const real = (...args) => {
          // First up with a closure we increment the internal reference
          // count. This ensures that the Rust closure environment won't
          // be deallocated while we're invoking it.
          state.cnt++;
          const a = state.a;
          state.a = 0;
          try {
              return f(a, state.b, ...args);
          } finally {
              if (--state.cnt === 0) {
                  wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

              } else {
                  state.a = a;
              }
          }
      };
      real.original = state;

      return real;
  }
  function __wbg_adapter_26(arg0, arg1) {
      wasm.__wbindgen_export_3(arg0, arg1);
  }

  function __wbg_adapter_29(arg0, arg1, arg2) {
      wasm.__wbindgen_export_4(arg0, arg1, addHeapObject(arg2));
  }

  function __wbg_adapter_36(arg0, arg1, arg2) {
      wasm.__wbindgen_export_5(arg0, arg1, addHeapObject(arg2));
  }

  /**
  * Get the targeted plugin framework, or "any" if unknown
  * @returns {string}
  */
  function target_usdpl() {
      let deferred1_0;
      let deferred1_1;
      try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.target_usdpl(retptr);
          var r0 = getInt32Memory0()[retptr / 4 + 0];
          var r1 = getInt32Memory0()[retptr / 4 + 1];
          deferred1_0 = r0;
          deferred1_1 = r1;
          return getStringFromWasm0(r0, r1);
      } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
          wasm.__wbindgen_export_6(deferred1_0, deferred1_1, 1);
      }
  }

  /**
  * Get the UDSPL front-end version
  * @returns {string}
  */
  function version_usdpl() {
      let deferred1_0;
      let deferred1_1;
      try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.version_usdpl(retptr);
          var r0 = getInt32Memory0()[retptr / 4 + 0];
          var r1 = getInt32Memory0()[retptr / 4 + 1];
          deferred1_0 = r0;
          deferred1_1 = r1;
          return getStringFromWasm0(r0, r1);
      } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
          wasm.__wbindgen_export_6(deferred1_0, deferred1_1, 1);
      }
  }

  function handleError(f, args) {
      try {
          return f.apply(this, args);
      } catch (e) {
          wasm.__wbindgen_export_7(addHeapObject(e));
      }
  }

  function getArrayU8FromWasm0(ptr, len) {
      ptr = ptr >>> 0;
      return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
  }
  function __wbg_adapter_131(arg0, arg1, arg2, arg3) {
      wasm.__wbindgen_export_8(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
  }

  /**
  */
  Object.freeze({ Trace:0,"0":"Trace",Debug:1,"1":"Debug",Info:2,"2":"Info",Warn:3,"3":"Warn",Error:4,"4":"Error", });
  /**
  */
  Object.freeze({ Trace:0,"0":"Trace",Debug:1,"1":"Debug",Info:2,"2":"Info",Warn:3,"3":"Warn",Error:4,"4":"Error", });
  /**
  * WASM/JS-compatible wrapper of the Rust nRPC service
  */
  class Fan {

      static __wrap(ptr) {
          ptr = ptr >>> 0;
          const obj = Object.create(Fan.prototype);
          obj.__wbg_ptr = ptr;

          return obj;
      }

      __destroy_into_raw() {
          const ptr = this.__wbg_ptr;
          this.__wbg_ptr = 0;

          return ptr;
      }

      free() {
          const ptr = this.__destroy_into_raw();
          wasm.__wbg_fan_free(ptr);
      }
      /**
      * @param {number} port
      */
      constructor(port) {
          const ret = wasm.fan_new(port);
          return Fan.__wrap(ret);
      }
      /**
      * @param {string} msg
      * @returns {Promise<string | undefined>}
      */
      echo(msg) {
          const ptr0 = passStringToWasm0(msg, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
          const len0 = WASM_VECTOR_LEN;
          const ret = wasm.fan_echo(this.__wbg_ptr, ptr0, len0);
          return takeObject(ret);
      }
      /**
      * @param {string} name
      * @returns {Promise<string | undefined>}
      */
      hello(name) {
          const ptr0 = passStringToWasm0(name, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
          const len0 = WASM_VECTOR_LEN;
          const ret = wasm.fan_hello(this.__wbg_ptr, ptr0, len0);
          return takeObject(ret);
      }
      /**
      * @param {boolean} ok
      * @returns {Promise<FanVersionMessage | undefined>}
      */
      version(ok) {
          const ret = wasm.fan_version(this.__wbg_ptr, ok);
          return takeObject(ret);
      }
      /**
      * @param {boolean} ok
      * @returns {Promise<string | undefined>}
      */
      version_str(ok) {
          const ret = wasm.fan_version_str(this.__wbg_ptr, ok);
          return takeObject(ret);
      }
      /**
      * @param {boolean} ok
      * @returns {Promise<string | undefined>}
      */
      name(ok) {
          const ret = wasm.fan_name(this.__wbg_ptr, ok);
          return takeObject(ret);
      }
      /**
      * @param {boolean} ok
      * @param {Function} callback
      * @returns {Promise<void>}
      */
      get_fan_rpm(ok, callback) {
          const ret = wasm.fan_get_fan_rpm(this.__wbg_ptr, ok, addHeapObject(callback));
          return takeObject(ret);
      }
      /**
      * @param {boolean} ok
      * @param {Function} callback
      * @returns {Promise<void>}
      */
      get_temperature(ok, callback) {
          const ret = wasm.fan_get_temperature(this.__wbg_ptr, ok, addHeapObject(callback));
          return takeObject(ret);
      }
      /**
      * @param {boolean} is_enabled
      * @returns {Promise<boolean | undefined>}
      */
      set_enable(is_enabled) {
          const ret = wasm.fan_set_enable(this.__wbg_ptr, is_enabled);
          return takeObject(ret);
      }
      /**
      * @param {boolean} ok
      * @returns {Promise<boolean | undefined>}
      */
      get_enable(ok) {
          const ret = wasm.fan_get_enable(this.__wbg_ptr, ok);
          return takeObject(ret);
      }
      /**
      * @param {boolean} is_enabled
      * @returns {Promise<boolean | undefined>}
      */
      set_interpolate(is_enabled) {
          const ret = wasm.fan_set_interpolate(this.__wbg_ptr, is_enabled);
          return takeObject(ret);
      }
      /**
      * @param {boolean} ok
      * @returns {Promise<boolean | undefined>}
      */
      get_interpolate(ok) {
          const ret = wasm.fan_get_interpolate(this.__wbg_ptr, ok);
          return takeObject(ret);
      }
      /**
      * @param {boolean} ok
      * @returns {Promise<Array<any> | undefined>}
      */
      get_curve_x(ok) {
          const ret = wasm.fan_get_curve_x(this.__wbg_ptr, ok);
          return takeObject(ret);
      }
      /**
      * @param {boolean} ok
      * @returns {Promise<Array<any> | undefined>}
      */
      get_curve_y(ok) {
          const ret = wasm.fan_get_curve_y(this.__wbg_ptr, ok);
          return takeObject(ret);
      }
      /**
      * @param {number} x
      * @param {number} y
      * @returns {Promise<boolean | undefined>}
      */
      add_curve_point(x, y) {
          const ret = wasm.fan_add_curve_point(this.__wbg_ptr, x, y);
          return takeObject(ret);
      }
      /**
      * @param {number} index
      * @returns {Promise<boolean | undefined>}
      */
      remove_curve_point(index) {
          const ret = wasm.fan_remove_curve_point(this.__wbg_ptr, index);
          return takeObject(ret);
      }
  }
  /**
  */
  class FanVersionMessage {

      static __wrap(ptr) {
          ptr = ptr >>> 0;
          const obj = Object.create(FanVersionMessage.prototype);
          obj.__wbg_ptr = ptr;

          return obj;
      }

      __destroy_into_raw() {
          const ptr = this.__wbg_ptr;
          this.__wbg_ptr = 0;

          return ptr;
      }

      free() {
          const ptr = this.__destroy_into_raw();
          wasm.__wbg_fanversionmessage_free(ptr);
      }
      /**
      * @returns {number}
      */
      get major() {
          const ret = wasm.__wbg_get_fanversionmessage_major(this.__wbg_ptr);
          return ret;
      }
      /**
      * @param {number} arg0
      */
      set major(arg0) {
          wasm.__wbg_set_fanversionmessage_major(this.__wbg_ptr, arg0);
      }
      /**
      * @returns {number}
      */
      get minor() {
          const ret = wasm.__wbg_get_fanversionmessage_minor(this.__wbg_ptr);
          return ret;
      }
      /**
      * @param {number} arg0
      */
      set minor(arg0) {
          wasm.__wbg_set_fanversionmessage_minor(this.__wbg_ptr, arg0);
      }
      /**
      * @returns {number}
      */
      get patch() {
          const ret = wasm.__wbg_get_fanversionmessage_patch(this.__wbg_ptr);
          return ret;
      }
      /**
      * @param {number} arg0
      */
      set patch(arg0) {
          wasm.__wbg_set_fanversionmessage_patch(this.__wbg_ptr, arg0);
      }
  }

  async function __wbg_load(module, imports) {
      if (typeof Response === 'function' && module instanceof Response) {
          if (typeof WebAssembly.instantiateStreaming === 'function') {
              try {
                  return await WebAssembly.instantiateStreaming(module, imports);

              } catch (e) {
                  if (module.headers.get('Content-Type') != 'application/wasm') {
                      console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                  } else {
                      throw e;
                  }
              }
          }

          const bytes = await module.arrayBuffer();
          return await WebAssembly.instantiate(bytes, imports);

      } else {
          const instance = await WebAssembly.instantiate(module, imports);

          if (instance instanceof WebAssembly.Instance) {
              return { instance, module };

          } else {
              return instance;
          }
      }
  }

  function __wbg_get_imports() {
      const imports = {};
      imports.wbg = {};
      imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
          takeObject(arg0);
      };
      imports.wbg.__wbindgen_is_undefined = function(arg0) {
          const ret = getObject(arg0) === undefined;
          return ret;
      };
      imports.wbg.__wbindgen_is_null = function(arg0) {
          const ret = getObject(arg0) === null;
          return ret;
      };
      imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
          const obj = getObject(arg1);
          const ret = typeof(obj) === 'string' ? obj : undefined;
          var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
          var len1 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len1;
          getInt32Memory0()[arg0 / 4 + 0] = ptr1;
      };
      imports.wbg.__wbg_fanversionmessage_new = function(arg0) {
          const ret = FanVersionMessage.__wrap(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
          const ret = getStringFromWasm0(arg0, arg1);
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_number_new = function(arg0) {
          const ret = arg0;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
          const ret = getObject(arg0);
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_cb_drop = function(arg0) {
          const obj = takeObject(arg0).original;
          if (obj.cnt-- == 1) {
              obj.a = 0;
              return true;
          }
          const ret = false;
          return ret;
      };
      imports.wbg.__wbg_addEventListener_5651108fc3ffeb6e = function() { return handleError(function (arg0, arg1, arg2, arg3) {
          getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
      }, arguments) };
      imports.wbg.__wbg_addEventListener_a5963e26cd7b176b = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
          getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3), getObject(arg4));
      }, arguments) };
      imports.wbg.__wbg_dispatchEvent_a622a6455be582eb = function() { return handleError(function (arg0, arg1) {
          const ret = getObject(arg0).dispatchEvent(getObject(arg1));
          return ret;
      }, arguments) };
      imports.wbg.__wbg_removeEventListener_5de660c02ed784e4 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
          getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
      }, arguments) };
      imports.wbg.__wbg_readyState_b25418fd198bf715 = function(arg0) {
          const ret = getObject(arg0).readyState;
          return ret;
      };
      imports.wbg.__wbg_setbinaryType_096c70c4a9d97499 = function(arg0, arg1) {
          getObject(arg0).binaryType = takeObject(arg1);
      };
      imports.wbg.__wbg_newwithstr_760c6ad916d29b3c = function() { return handleError(function (arg0, arg1, arg2, arg3) {
          const ret = new WebSocket(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_close_dfa389d8fddb52fc = function() { return handleError(function (arg0) {
          getObject(arg0).close();
      }, arguments) };
      imports.wbg.__wbg_send_280c8ab5d0df82de = function() { return handleError(function (arg0, arg1, arg2) {
          getObject(arg0).send(getStringFromWasm0(arg1, arg2));
      }, arguments) };
      imports.wbg.__wbg_send_1a008ea2eb3a1951 = function() { return handleError(function (arg0, arg1, arg2) {
          getObject(arg0).send(getArrayU8FromWasm0(arg1, arg2));
      }, arguments) };
      imports.wbg.__wbg_debug_9a6b3243fbbebb61 = function(arg0) {
          console.debug(getObject(arg0));
      };
      imports.wbg.__wbg_error_788ae33f81d3b84b = function(arg0) {
          console.error(getObject(arg0));
      };
      imports.wbg.__wbg_log_1d3ae0273d8f4f8a = function(arg0) {
          console.log(getObject(arg0));
      };
      imports.wbg.__wbg_warn_d60e832f9882c1b2 = function(arg0) {
          console.warn(getObject(arg0));
      };
      imports.wbg.__wbg_wasClean_74cf0c4d617e8bf5 = function(arg0) {
          const ret = getObject(arg0).wasClean;
          return ret;
      };
      imports.wbg.__wbg_code_858da7147ef5fb52 = function(arg0) {
          const ret = getObject(arg0).code;
          return ret;
      };
      imports.wbg.__wbg_reason_cab9df8d5ef57aa2 = function(arg0, arg1) {
          const ret = getObject(arg1).reason;
          const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
          const len1 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len1;
          getInt32Memory0()[arg0 / 4 + 0] = ptr1;
      };
      imports.wbg.__wbg_newwitheventinitdict_1f554ee93659ab92 = function() { return handleError(function (arg0, arg1, arg2) {
          const ret = new CloseEvent(getStringFromWasm0(arg0, arg1), getObject(arg2));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_data_ab99ae4a2e1e8bc9 = function(arg0) {
          const ret = getObject(arg0).data;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_new_898a68150f225f2e = function() {
          const ret = new Array();
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_new_56693dbed0c32988 = function() {
          const ret = new Map();
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_new_b51585de1b234aff = function() {
          const ret = new Object();
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_is_string = function(arg0) {
          const ret = typeof(getObject(arg0)) === 'string';
          return ret;
      };
      imports.wbg.__wbg_push_ca1c26067ef907ac = function(arg0, arg1) {
          const ret = getObject(arg0).push(getObject(arg1));
          return ret;
      };
      imports.wbg.__wbg_instanceof_ArrayBuffer_39ac22089b74fddb = function(arg0) {
          let result;
          try {
              result = getObject(arg0) instanceof ArrayBuffer;
          } catch {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbg_instanceof_Error_ab19e20608ea43c7 = function(arg0) {
          let result;
          try {
              result = getObject(arg0) instanceof Error;
          } catch {
              result = false;
          }
          const ret = result;
          return ret;
      };
      imports.wbg.__wbg_message_48bacc5ea57d74ee = function(arg0) {
          const ret = getObject(arg0).message;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_name_8f734cbbd6194153 = function(arg0) {
          const ret = getObject(arg0).name;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_toString_1c056108b87ba68b = function(arg0) {
          const ret = getObject(arg0).toString();
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_call_01734de55d61e11d = function() { return handleError(function (arg0, arg1, arg2) {
          const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      }, arguments) };
      imports.wbg.__wbg_set_bedc3d02d0f05eb0 = function(arg0, arg1, arg2) {
          const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_new_43f1b47c28813cbd = function(arg0, arg1) {
          try {
              var state0 = {a: arg0, b: arg1};
              var cb0 = (arg0, arg1) => {
                  const a = state0.a;
                  state0.a = 0;
                  try {
                      return __wbg_adapter_131(a, state0.b, arg0, arg1);
                  } finally {
                      state0.a = a;
                  }
              };
              const ret = new Promise(cb0);
              return addHeapObject(ret);
          } finally {
              state0.a = state0.b = 0;
          }
      };
      imports.wbg.__wbg_resolve_53698b95aaf7fcf8 = function(arg0) {
          const ret = Promise.resolve(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_then_f7e06ee3c11698eb = function(arg0, arg1) {
          const ret = getObject(arg0).then(getObject(arg1));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_buffer_085ec1f694018c4f = function(arg0) {
          const ret = getObject(arg0).buffer;
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_new_8125e318e6245eed = function(arg0) {
          const ret = new Uint8Array(getObject(arg0));
          return addHeapObject(ret);
      };
      imports.wbg.__wbg_set_5cf90238115182c3 = function(arg0, arg1, arg2) {
          getObject(arg0).set(getObject(arg1), arg2 >>> 0);
      };
      imports.wbg.__wbg_length_72e2208bbc0efc61 = function(arg0) {
          const ret = getObject(arg0).length;
          return ret;
      };
      imports.wbg.__wbg_set_092e06b0f9d71865 = function() { return handleError(function (arg0, arg1, arg2) {
          const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
          return ret;
      }, arguments) };
      imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
          const ret = debugString(getObject(arg1));
          const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
          const len1 = WASM_VECTOR_LEN;
          getInt32Memory0()[arg0 / 4 + 1] = len1;
          getInt32Memory0()[arg0 / 4 + 0] = ptr1;
      };
      imports.wbg.__wbindgen_throw = function(arg0, arg1) {
          throw new Error(getStringFromWasm0(arg0, arg1));
      };
      imports.wbg.__wbindgen_memory = function() {
          const ret = wasm.memory;
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_closure_wrapper481 = function(arg0, arg1, arg2) {
          const ret = makeMutClosure(arg0, arg1, 138, __wbg_adapter_26);
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_closure_wrapper483 = function(arg0, arg1, arg2) {
          const ret = makeMutClosure(arg0, arg1, 138, __wbg_adapter_29);
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_closure_wrapper485 = function(arg0, arg1, arg2) {
          const ret = makeMutClosure(arg0, arg1, 138, __wbg_adapter_29);
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_closure_wrapper487 = function(arg0, arg1, arg2) {
          const ret = makeMutClosure(arg0, arg1, 138, __wbg_adapter_29);
          return addHeapObject(ret);
      };
      imports.wbg.__wbindgen_closure_wrapper532 = function(arg0, arg1, arg2) {
          const ret = makeMutClosure(arg0, arg1, 155, __wbg_adapter_36);
          return addHeapObject(ret);
      };

      return imports;
  }

  function __wbg_finalize_init(instance, module) {
      wasm = instance.exports;
      __wbg_init.__wbindgen_wasm_module = module;
      cachedInt32Memory0 = null;
      cachedUint8Memory0 = null;


      return wasm;
  }

  async function __wbg_init(input) {
      if (wasm !== undefined) return wasm;

      if (typeof input === 'undefined') {
          input = new URL('fantastic_wasm_bg.wasm', (document.currentScript && document.currentScript.src || new URL('index.js', document.baseURI).href));
      }
      const imports = __wbg_get_imports();

      if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
          input = fetch(input);
      }

      const { instance, module } = await __wbg_load(await input, imports);

      return __wbg_finalize_init(instance, module);
  }


  // USDPL customization
  const encoded = "AGFzbQEAAAABuAEaYAF/AGACf38Bf2ADf39/AGACf38AYAN/f38Bf2ABfwF/YAR/f39/AGAFf39/f38AYAR/f39/AX9gAAF/YAAAYAV/f39/fwF/YAZ/f39/f38AYAF8AX9gAn9/AX5gB39/f39/f38Bf2ACfn8Bf2AJf39/f39/f39/AGADf3x8AX9gBn9/f39/fwF/YAV/f31/fwBgBH99f38AYAV/f3x/fwBgBH98f38AYAV/f35/fwBgBH9+f38AArMPOAN3YmcaX193YmluZGdlbl9vYmplY3RfZHJvcF9yZWYAAAN3YmcXX193YmluZGdlbl9pc191bmRlZmluZWQABQN3YmcSX193YmluZGdlbl9pc19udWxsAAUDd2JnFV9fd2JpbmRnZW5fc3RyaW5nX2dldAADA3diZxtfX3diZ19mYW52ZXJzaW9ubWVzc2FnZV9uZXcABQN3YmcVX193YmluZGdlbl9zdHJpbmdfbmV3AAEDd2JnFV9fd2JpbmRnZW5fbnVtYmVyX25ldwANA3diZxtfX3diaW5kZ2VuX29iamVjdF9jbG9uZV9yZWYABQN3YmcSX193YmluZGdlbl9jYl9kcm9wAAUDd2JnJ19fd2JnX2FkZEV2ZW50TGlzdGVuZXJfNTY1MTEwOGZjM2ZmZWI2ZQAGA3diZydfX3diZ19hZGRFdmVudExpc3RlbmVyX2E1OTYzZTI2Y2Q3YjE3NmIABwN3YmckX193YmdfZGlzcGF0Y2hFdmVudF9hNjIyYTY0NTViZTU4MmViAAEDd2JnKl9fd2JnX3JlbW92ZUV2ZW50TGlzdGVuZXJfNWRlNjYwYzAyZWQ3ODRlNAAGA3diZyFfX3diZ19yZWFkeVN0YXRlX2IyNTQxOGZkMTk4YmY3MTUABQN3YmckX193Ymdfc2V0YmluYXJ5VHlwZV8wOTZjNzBjNGE5ZDk3NDk5AAMDd2JnIV9fd2JnX25ld3dpdGhzdHJfNzYwYzZhZDkxNmQyOWIzYwAIA3diZxxfX3diZ19jbG9zZV9kZmEzODlkOGZkZGI1MmZjAAADd2JnG19fd2JnX3NlbmRfMjgwYzhhYjVkMGRmODJkZQACA3diZxtfX3diZ19zZW5kXzFhMDA4ZWEyZWIzYTE5NTEAAgN3YmccX193YmdfZGVidWdfOWE2YjMyNDNmYmJlYmI2MQAAA3diZxxfX3diZ19lcnJvcl83ODhhZTMzZjgxZDNiODRiAAADd2JnGl9fd2JnX2xvZ18xZDNhZTAyNzNkOGY0ZjhhAAADd2JnG19fd2JnX3dhcm5fZDYwZTgzMmY5ODgyYzFiMgAAA3diZx9fX3diZ193YXNDbGVhbl83NGNmMGM0ZDYxN2U4YmY1AAUDd2JnG19fd2JnX2NvZGVfODU4ZGE3MTQ3ZWY1ZmI1MgAFA3diZx1fX3diZ19yZWFzb25fY2FiOWRmOGQ1ZWY1N2FhMgADA3diZytfX3diZ19uZXd3aXRoZXZlbnRpbml0ZGljdF8xZjU1NGVlOTM2NTlhYjkyAAQDd2JnG19fd2JnX2RhdGFfYWI5OWFlNGEyZTFlOGJjOQAFA3diZxpfX3diZ19uZXdfODk4YTY4MTUwZjIyNWYyZQAJA3diZxpfX3diZ19uZXdfNTY2OTNkYmVkMGMzMjk4OAAJA3diZxpfX3diZ19uZXdfYjUxNTg1ZGUxYjIzNGFmZgAJA3diZxRfX3diaW5kZ2VuX2lzX3N0cmluZwAFA3diZxtfX3diZ19wdXNoX2NhMWMyNjA2N2VmOTA3YWMAAQN3YmctX193YmdfaW5zdGFuY2VvZl9BcnJheUJ1ZmZlcl8zOWFjMjIwODliNzRmZGRiAAUDd2JnJ19fd2JnX2luc3RhbmNlb2ZfRXJyb3JfYWIxOWUyMDYwOGVhNDNjNwAFA3diZx5fX3diZ19tZXNzYWdlXzQ4YmFjYzVlYTU3ZDc0ZWUABQN3YmcbX193YmdfbmFtZV84ZjczNGNiYmQ2MTk0MTUzAAUDd2JnH19fd2JnX3RvU3RyaW5nXzFjMDU2MTA4Yjg3YmE2OGIABQN3YmcbX193YmdfY2FsbF8wMTczNGRlNTVkNjFlMTFkAAQDd2JnGl9fd2JnX3NldF9iZWRjM2QwMmQwZjA1ZWIwAAQDd2JnGl9fd2JnX25ld180M2YxYjQ3YzI4ODEzY2JkAAEDd2JnHl9fd2JnX3Jlc29sdmVfNTM2OThiOTVhYWY3ZmNmOAAFA3diZxtfX3diZ190aGVuX2Y3ZTA2ZWUzYzExNjk4ZWIAAQN3YmcdX193YmdfYnVmZmVyXzA4NWVjMWY2OTQwMThjNGYABQN3YmcaX193YmdfbmV3XzgxMjVlMzE4ZTYyNDVlZWQABQN3YmcaX193Ymdfc2V0XzVjZjkwMjM4MTE1MTgyYzMAAgN3YmcdX193YmdfbGVuZ3RoXzcyZTIyMDhiYmMwZWZjNjEABQN3YmcaX193Ymdfc2V0XzA5MmUwNmIwZjlkNzE4NjUABAN3YmcXX193YmluZGdlbl9kZWJ1Z19zdHJpbmcAAwN3YmcQX193YmluZGdlbl90aHJvdwADA3diZxFfX3diaW5kZ2VuX21lbW9yeQAJA3diZx1fX3diaW5kZ2VuX2Nsb3N1cmVfd3JhcHBlcjQ4MQAEA3diZx1fX3diaW5kZ2VuX2Nsb3N1cmVfd3JhcHBlcjQ4MwAEA3diZx1fX3diaW5kZ2VuX2Nsb3N1cmVfd3JhcHBlcjQ4NQAEA3diZx1fX3diaW5kZ2VuX2Nsb3N1cmVfd3JhcHBlcjQ4NwAEA3diZx1fX3diaW5kZ2VuX2Nsb3N1cmVfd3JhcHBlcjUzMgAEA50DmwMBBQEBAQEBAQEBAQEBAQEBAQEBBAEEAgsAAgQDAAQCCggDDgMBAQMDAAMPAwEBEAEAAwEDAQEEAQQCAQIDAgIDAwMGDAYGAgIABgICAgICAgICAgICAgICBgYEBAICAgQDAwwAAAMCAAIDAwAFAgAAAwMBBgIGAwUABQcDAgAAAAICAgUDBgERAgMAAAMDAwMDAAABAAMAAwAAAwYEAwYGAwIAAwAAAgcAAAQBAQAFBQABCgMCAwMGAAYMAAYCAQUIAgYCDAAEAwQCAAAHAAQEAwQDAAEAAAAAAAYGBAQSAAsBAQoDAQEBAQEBAQEBAAAAAAADAQICAggBAQEDAwABAAAAAwMAAAAFAAAFAAMCAAMFBQIAAAMAAwAAAAUFBQAAAwcTAAEBAQgDBxQWCxgAAAAGAgICAwYDBAADAwIBAQQBAAUCCAACAQIBAQMEAQcBAQMDAQAGAwIDAAEAAwMDAQQBBQEBAQEFAAEBAQEBAQEBAQIBCgoDAQEBAQMBAQQEBAQFBQUABQMCBQIFAAAFAQAJAAAAAAEAAgMEBwFwAewB7AEFAwEAEQYJAX8BQYCAwAALB/wHLwZtZW1vcnkCAAdmYW5fbmV3ALsDCGZhbl9lY2hvAIYCCWZhbl9oZWxsbwCHAgtmYW5fdmVyc2lvbgCdAg9mYW5fdmVyc2lvbl9zdHIAngIIZmFuX25hbWUAnwIPZmFuX2dldF9mYW5fcnBtAJQCE2Zhbl9nZXRfdGVtcGVyYXR1cmUAlQIOZmFuX3NldF9lbmFibGUAoAIOZmFuX2dldF9lbmFibGUAoQITZmFuX3NldF9pbnRlcnBvbGF0ZQCiAhNmYW5fZ2V0X2ludGVycG9sYXRlAKMCD2Zhbl9nZXRfY3VydmVfeACkAg9mYW5fZ2V0X2N1cnZlX3kApQITZmFuX2FkZF9jdXJ2ZV9wb2ludACWAhZmYW5fcmVtb3ZlX2N1cnZlX3BvaW50ALECHF9fd2JnX2ZhbnZlcnNpb25tZXNzYWdlX2ZyZWUA3AIhX193YmdfZ2V0X2ZhbnZlcnNpb25tZXNzYWdlX21ham9yANQCIV9fd2JnX3NldF9mYW52ZXJzaW9ubWVzc2FnZV9tYWpvcgDIAiFfX3diZ19nZXRfZmFudmVyc2lvbm1lc3NhZ2VfbWlub3IAyQIhX193Ymdfc2V0X2ZhbnZlcnNpb25tZXNzYWdlX21pbm9yALsCIV9fd2JnX2dldF9mYW52ZXJzaW9ubWVzc2FnZV9wYXRjaADKAiFfX3diZ19zZXRfZmFudmVyc2lvbm1lc3NhZ2VfcGF0Y2gAvAIQdHJhbnNsYXRpb25zX25ldwC8Axl0cmFuc2xhdGlvbnNfZ2V0X2xhbmd1YWdlAIkCDGRldnRvb2xzX25ldwC9AwxkZXZ0b29sc19sb2cA+AETX193YmdfZGV2dG9vbHNfZnJlZQC+AxdfX3diZ190cmFuc2xhdGlvbnNfZnJlZQC+Aw5fX3diZ19mYW5fZnJlZQC+Awx0YXJnZXRfdXNkcGwAqQINdmVyc2lvbl91c2RwbADDAQlzZXRfdmFsdWUA4gEJZ2V0X3ZhbHVlAOQBAnRyAMABBHRyX24AvQETX193YmluZGdlbl9leHBvcnRfMACMAhNfX3diaW5kZ2VuX2V4cG9ydF8xALACE19fd2JpbmRnZW5fZXhwb3J0XzIBABNfX3diaW5kZ2VuX2V4cG9ydF8zAPQCE19fd2JpbmRnZW5fZXhwb3J0XzQA7AITX193YmluZGdlbl9leHBvcnRfNQDtAh9fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyAKADE19fd2JpbmRnZW5fZXhwb3J0XzYAgQMTX193YmluZGdlbl9l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ADYCuAEgAiAAQYIEajYCgAEgAkHNADYCfCACIAM2AnggAiACQfgAajYCwAEgAkG4AWpBBEHMscAAQScQgQELIAJBuAFqIgMgBEE8ELoDGiACQTBqIAMQvAEgAEH8AWogAikDMEIgiTcCACAAQQI2AuwBIAAgADYChAIgAEGAAmohBUEACyEDA0ACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAw4PAAECAwQFCAkKCxITGhsmJwsgAC0AggRBAk8NBSAALQCABEUNBkHgh8EAKAIAQQNLDSEMIgsgAEGQBGoiAyABEMsBQf8BcUEDRw0TQQkhA0EBDEULIAJBuAFqIAUgARD5ASACKAK4AUGEgICAeEYNISAAQQE6AIoEIABB/AJqIAJBuAFqQSQQugMhAyAAKAL8AkGDgICAeEcNIiAAQQE6AIEEDCgLIABBkARqIgMgARDLAUH/AXFBA0cNJUENIQNBAQxDCyACQbgBaiALKAIAIAEgCygCBCgCDBECACACKAK4AUEIRg0TIABBAToAjAQgACACKQO4ATcDYCAAQegAaiACQcABaikDADcDACAAQfAAaiACQcgBaikDADcDACAAKAJgQQdHDRQgAEEBOgCABAwbCyAAQagEaiIDIAEQywFB/wFxQQNGDScgAygCAARAIABBrARqEKYCCyAAQZAEahC3AQwaC0Hgh8EAKAIAQQNNDT0gAkHEAWpCATcCACACQQI2ArwBIAJBgLPAADYCuAEgAkHNADYCfCACIABBpAFqNgJ4IAIgAkH4AGo2AsABIAJBuAFqQQRBzLHAAEH7ABCBAQw9C0Hgh8EAKAIAIQMgAC0AgQQNDyADQQNLDScMKAsgAkG4AWohBiMAQUBqIgMkAAJAIABBkARqIgQoAgAiBwRAIAMgBygCACABIAcoAgQoAgwRAgACQCADKAIAQQhHBEAgA0EoaiADQQhqKQMANwIAIANBMGogA0EQaikDADcCACAEQQA2AgAgBkGEgICAeDYCACAGIAQoAgQ2AiAgAyADKQMANwIgIAYg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IAIpArgBIg03A3ggBEEIaiAMNwMAIAQgDTcDACAAQaAEaiAAQewBajYCAEEHIQMMEwsgBCADKQMANwMAIARBEGogBykDADcDACAEQQhqIAYpAwA3AwAgAkEANgKAASACQoCAgIAQNwJ4IAJB0AFqQbCswAA2AgAgAkEDOgDYASACQSA2AsgBIAJBADYC1AEgAkEANgLAASACQQA2ArgBIAIgAkH4AGo2AswBIAQgAkG4AWoQXA0VIAJBkAJqIAJBgAFqKAIAIgM2AgAgAiACKQJ4Igw3A4gCIABCATcDqAQgAEGwBGogDDcDACAAQbgEaiADNgIAIABBvARqIABBmAFqNgIAQQkhAwwSCyAAQQE6AIAECyAAIAA2AoQCIAAoAogCIQUCQCAAKAIwQQdGDQAgAC0AhARFDQAgAEEwahCoAgsgAEEAOgCEBAwLC0EHIQNBAQwRCyACQcQBakIANwIAIAJBATYCvAEgAkGMtMAANgK4ASACQeytwAA2AsABIAJBuAFqQQRBzLHAAEHAABCBAQsgAygCAEGDgICAeEcEQCAAQYECOwCFBCAAQQA6AIcEIABB2AJqIANBJBC6AxogACgC2AJBgoCAgHhGBEAgAEHcAmooAgBFBEAgAkEQakEZENIBIAIoAhAhBCACKAIUIgNBlLTAACkAADcAACADQRhqQay0wAAtAAA6AAAgA0EQakGktMAAKQAANwAAIANBCGpBnLTAACkAADcAACAAQaQEaiAAQZgBajYCACAAQaAEakEZNgIAIABBnARqIAM2AgAgACAENgKYBCAAQZQEakEANgIAIABBATYCkARBASEDDBALIABBADoAhgQgAkHQAGogAEHoAmooAgA2AgAgAiAAQeACaikCADcDSCACQbgBaiACQcgAahB5IABBATYCkAQgAEGkBGogAEGYAWo2AgAgAEGUBGogAikCuAE3AgAgAEGcBGogAkHAAWopAgA3AgBBCiEDDA8LIAQgA0EkELoDIAJBADYCgAEgAkKAgICAEDcCeCACQdABakGwrMAANgIAIAJBAzoA2AEgAkEgNgLIASACQQA2AtQBIAJBADYCwAEgAkEANgK4ASACIAJB+ABqNgLMASACQbgBahByDREgAkGQAmogAkGAAWooAgAiAzYCACACIAIpAngiDDcDiAIgAEIBNwK0BCAAQbwEaiAMNwIAIABBxARqIAM2AgAgAEHIBGogAEGYAWo2AgBBCyEDDA4LIABBAToAgQQLIAAgACgC1AI2AoQCIAAoAoACIQMgAkGIAWoiBCAAQfwBaiIGKAIANgIAIAJBgAFqIgUgAEH0AWopAgA3AwAgAiAAKQLsATcDeCACQbgBaiACQfgAaiADENkBIAIoArgBRQ0BIABBgAJqIQUgAkH4AGoiAyACQbgBaiIEQTwQugMaIAAgAxDVAjoAggQgBCADQTwQugMaIAJBCGogBBC8ASAGIAIpAwhCIIk3AgAgAEECNgLsAQJAIAAoArACQYOAgIB4Rg0AIAAtAIcERQ0AIABBsAJqENcCCyAAQQA6AIcEDAcLQQohA0EBDA0LIAQgAkHMAWopAgA3AwAgBSACQcQBaikCADcDACACIAIpArwBNwN4Qb+uwABBKyACQfgAakH8rsAAQbC0wAAQsgEACyACQcQBakIANwIAIAJBATYCvAEgAkHks8AANgK4ASACQeytwAA2AsABIAJBuAFqQQRBzLHAAEHmABCBAQsgBCgCAEEGRgRAIAJB8ABqIABBhAFqKQIANwMAIAIgAEH8AGopAgA3A2ggAkG8AWogAkHoAGoQ7QEgAkGAAWogAkHAAWopAgAiDDcDACACQQE2ArgBIAIgAikCuAEiDTcDeCADQQhqIAw3AwAgAyANNwMAIABBoARqIABB7AFqNgIAQQwhAwwJCyADIAQpAwA3AwAgA0EQaiAEQRBqKQMANwMAIANBCGogBEEIaikDADcDACACQQA2AoABIAJCgICAgBA3AnggAkHQAWpBsKzAADYCACACQQM6ANgBIAJBIDYCyAEgAkEANgLUASACQQA2AsABIAJBADYCuAEgAiACQfgAajYCzAEgAyACQbgBahBcRQRAIAJBkAJqIAJBgAFqKAIAIgM2AgAgAiACKQJ4Igw3A4gCIABCATcDqAQgAEGwBGogDDcDACAAQbgEaiADNgIAIABBvARqIABBmAFqNgIADAcLDAsLIAJBxAFqQgA3AgAgAkEBNgK8ASACQYy0wAA2ArgBIAJB7K3AADYCwAEgAkG4AWpBBEHMscAAQdQAEIEBCyADKAIAQYKAgIB4RgRAIABBpANqKAIARQRAIAJBKGpBGRDSASACKAIoIQQgAigCLCIDQZS0wAApAAA3AAAgA0EYakGstMAALQAAOgAAIANBEGpBpLTAACkAADcAACADQQhqQZy0wAApAAA3AAAgAEGkBGogAEGYAWo2AgAgAEGgBGpBGTYCACAAQZwEaiADNgIAIAAgBDYCmAQgAEEANgKUBCAAQQE2ApAEQQMhAwwICyAAQQA6AIkEIAJB4ABqIABBsANqKAIANgIAIAIgAEGoA2opAgA3A1ggAkG4AWogAkHYAGoQeSAAQQE2ApAEIABBpARqIABBmAFqNgIAIAAgAikCuAE3ApQEIABBnARqIAJBwAFqKQIANwIAQQ4hAwwHCyAEIANBJBC6AyACQQA2AoABIAJCgICAgBA3AnggAkHQAWpBsKzAADYCACACQQM6ANgBIAJBIDYCyAEgAkEANgLUASACQQA2AsABIAJBADYCuAEgAiACQfgAajYCzAEgAkG4AWoQckUEQCACQZACaiACQYABaigCACIDNgIAIAIgAikCeCIMNwOIAiAAQgE3ArQEIABBvARqIAw3AgAgAEHEBGogAzYCACAAQcgEaiAAQZgBajYCAEEPIQMMBwsMCQsgBCACQcwBaikCADcDACAFIAJBxAFqKQIANwMAIAIgAikCvAE3A3hBv67AAEErIAJB+ABqQfyuwABBhLXAABCyAQALQQAhAwwEC0ECIQMMAwtBBCEDDAILQQUhAwwBCwsgACgCgAIiASABKAIAIgFBAWs2AgAgAUEBRgRAIABBgAJqEIABCyAAQewBahDBAgsgABDHAiAAQaQBahDpAiAAQZgBahCmAUEBIQNBAAsgACADOgCNBCACQcACaiQADwtByKzAAEE3IAJBvwJqQYCtwABB3K3AABCyAQALwyQCCX8BfiMAQRBrIggkAAJAAkACQAJAAkACQAJAIABB9QFPBEAgAEHN/3tPDQcgAEELaiIAQXhxIQVBzIvBACgCACIJRQ0EQQAgBWshAwJ/QQAgBUGAAkkNABpBHyAFQf///wdLDQAaIAVBBiAAQQh2ZyIAa3ZBAXEgAEEBdGtBPmoLIgdBAnRBsIjBAGooAgAiAUUEQEEAIQAMAgtBACEAIAVBGSAHQQF2a0EAIAdBH0cbdCEEA0ACQCABKAIEQXhxIgYgBUkNACAGIAVrIgYgA08NACABIQIgBiIDDQBBACEDIAEhAAwECyABQRRqKAIAIgYgACAGIAEgBEEddkEEcWpBEGooAgAiAUcbIAAgBhshACAEQQF0IQQgAQ0ACwwBC0HIi8EAKAIAIgJBECAAQQtqQXhxIABBC0kbIgVBA3YiAHYiAUEDcQRAAkAgAUF/c0EBcSAAaiIBQQN0IgBBwInBAGoiBCAAQciJwQBqKAIAIgAoAggiA0cEQCADIAQ2AgwgBCADNgIIDAELQciLwQAgAkF+IAF3cTYCAAsgAEEIaiEDIAAgAUEDdCIBQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIEDAcLIAVB0IvBACgCAE0NAwJAAkAgAUUEQEHMi8EAKAIAIgBFDQYgAGhBAnRBsIjBAGooAgAiASgCBEF4cSAFayEDIAEhAgNAAkAgASgCECIADQAgAUEUaigCACIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACQRRqIgAoAgAiBBtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAAgAkEQaiAEGyEEA0AgBCEGIAEiAEEUaiIBIABBEGogASgCACIBGyEEIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNBCACIAIoAhxBAnRBsIjBAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0FDAQLIAEgADYCACAADQNBzIvBAEHMi8EAKAIAQX4gAigCHHdxNgIADAQLIAAoAgRBeHEgBWsiASADIAEgA0kiARshAyAAIAIgARshAiAAIQEMAAsACwJAQQIgAHQiBEEAIARrciABIAB0cWgiAUEDdCIAQcCJwQBqIgQgAEHIicEAaigCACIAKAIIIgNHBEAgAyAENgIMIAQgAzYCCAwBC0HIi8EAIAJBfiABd3E2AgALIAAgBUEDcjYCBCAAIAVqIgYgAUEDdCIBIAVrIgRBAXI2AgQgACABaiAENgIAQdCLwQAoAgAiAwRAIANBeHFBwInBAGohAUHYi8EAKAIAIQICf0HIi8EAKAIAIgVBASADQQN2dCIDcUUEQEHIi8EAIAMgBXI2AgAgAQwBCyABKAIICyEDIAEgAjYCCCADIAI2AgwgAiABNgIMIAIgAzYCCAsgAEEIaiEDQdiLwQAgBjYCAEHQi8EAIAQ2AgAMCAsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAJBFGooAgAiAUUNACAAQRRqIAE2AgAgASAANgIYCwJAAkAgA0EQTwRAIAIgBUEDcjYCBCACIAVqIgQgA0EBcjYCBCADIARqIAM2AgBB0IvBACgCACIGRQ0BIAZBeHFBwInBAGohAEHYi8EAKAIAIQECf0HIi8EAKAIAIgVBASAGQQN2dCIGcUUEQEHIi8EAIAUgBnI2AgAgAAwBCyAAKAIICyEGIAAgATYCCCAGIAE2AgwgASAANgIMIAEgBjYCCAwBCyACIAMgBWoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBC0HYi8EAIAQ2AgBB0IvBACADNgIACyACQQhqIQMMBgsgACACckUEQEEAIQJBAiAHdCIAQQAgAGtyIAlxIgBFDQMgAGhBAnRBsIjBAGooAgAhAAsgAEUNAQsDQCAAIAIgACgCBEF4cSIEIAVrIgYgA0kiBxshCSAAKAIQIgFFBEAgAEEUaigCACEBCyACIAkgBCAFSSIAGyECIAMgBiADIAcbIAAbIQMgASIADQALCyACRQ0AIAVB0IvBACgCACIATSADIAAgBWtPcQ0AIAIoAhghBwJAAkAgAiACKAIMIgBGBEAgAkEUQRAgAkEUaiIAKAIAIgQbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyAAIAJBEGogBBshBANAIAQhBiABIgBBFGoiASAAQRBqIAEoAgAiARshBCAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQIgAiACKAIcQQJ0QbCIwQBqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNAwwCCyABIAA2AgAgAA0BQcyLwQBBzIvBACgCAEF+IAIoAhx3cTYCAAwCCwJAAkACQAJAAkAgBUHQi8EAKAIAIgFLBEAgBUHUi8EAKAIAIgBPBEAgBUGvgARqQYCAfHEiAkEQdkAAIQAgCEEEaiIBQQA2AgggAUEAIAJBgIB8cSAAQX9GIgIbNgIEIAFBACAAQRB0IAIbNgIAIAgoAgQiAUUEQEEAIQMMCgsgCCgCDCEGQeCLwQAgCCgCCCIDQeCLwQAoAgBqIgA2AgBB5IvBAEHki8EAKAIAIgIgACAAIAJJGzYCAAJAAkBB3IvBACgCACICBEBBsInBACEAA0AgASAAKAIAIgQgACgCBCIHakYNAiAAKAIIIgANAAsMAgtB7IvBACgCACIAQQAgACABTRtFBEBB7IvBACABNgIAC0Hwi8EAQf8fNgIAQbyJwQAgBjYCAEG0icEAIAM2AgBBsInBACABNgIAQcyJwQBBwInBADYCAEHUicEAQciJwQA2AgBByInBAEHAicEANgIAQdyJwQBB0InBADYCAEHQicEAQciJwQA2AgBB5InBAEHYicEANgIAQdiJwQBB0InBADYCAEHsicEAQeCJwQA2AgBB4InBAEHYicEANgIAQfSJwQBB6InBADYCAEHoicEAQeCJwQA2AgBB/InBAEHwicEANgIAQfCJwQBB6InBADYCAEGEisEAQfiJwQA2AgBB+InBAEHwicEANgIAQYyKwQBBgIrBADYCAEGAisEAQfiJwQA2AgBBiIrBAEGAisEANgIAQZSKwQBBiIrBADYCAEGQisEAQYiKwQA2AgBBnIrBAEGQisEANgIAQZiKwQBBkIrBADYCAEGkisEAQZiKwQA2AgBBoIrBAEGYisEANgIAQayKwQBBoIrBADYCAEGoisEAQaCKwQA2AgBBtIrBAEGoisEANgIAQbCKwQBBqIrBADYCAEG8isEAQbCKwQA2AgBBuIrBAEGwisEANgIAQcSKwQBBuIrBADYCAEHAisEAQbiKwQA2AgBBzIrBAEHAisEANgIAQdSKwQBByIrBADYCAEHIisEAQcCKwQA2AgBB3IrBAEHQisEANgIAQdCKwQBByIrBADYCAEHkisEAQdiKwQA2AgBB2IrBAEHQisEANgIAQeyKwQBB4IrBADYCAEHgisEAQdiKwQA2AgBB9IrBAEHoisEANgIAQeiKwQBB4IrBADYCAEH8isEAQfCKwQA2AgBB8IrBAEHoisEANgIAQYSLwQBB+IrBADYCAEH4isEAQfCKwQA2AgBBjIvBAEGAi8EANgIAQYCLwQBB+IrBADYCAEGUi8EAQYiLwQA2AgBBiIvBAEGAi8EANgIAQZyLwQBBkIvBADYCAEGQi8EAQYiLwQA2AgBBpIvBAEGYi8EANgIAQZiLwQBBkIvBADYCAEGsi8EAQaCLwQA2AgBBoIvBAEGYi8EANgIAQbSLwQBBqIvBADYCAEGoi8EAQaCLwQA2AgBBvIvBAEGwi8EANgIAQbCLwQBBqIvBADYCAEHEi8EAQbiLwQA2AgBBuIvBAEGwi8EANgIAQdyLwQAgAUEPakF4cSIAQQhrIgI2AgBBwIvBAEG4i8EANgIAQdSLwQAgA0EoayIEIAEgAGtqQQhqIgA2AgAgAiAAQQFyNgIEIAEgBGpBKDYCBEHoi8EAQYCAgAE2AgAMCAsgAiAESSABIAJNcg0AIAAoAgwiBEEBcQ0AIARBAXYgBkYNAwtB7IvBAEHsi8EAKAIAIgAgASAAIAFJGzYCACABIANqIQRBsInBACEAAkACQANAIAQgACgCAEcEQCAAKAIIIgANAQwCCwsgACgCDCIHQQFxDQAgB0EBdiAGRg0BC0GwicEAIQADQAJAIAIgACgCACIETwRAIAQgACgCBGoiByACSw0BCyAAKAIIIQAMAQsLQdyLwQAgAUEPakF4cSIAQQhrIgQ2AgBB1IvBACADQShrIgkgASAAa2pBCGoiADYCACAEIABBAXI2AgQgASAJakEoNgIEQeiLwQBBgICAATYCACACIAdBIGtBeHFBCGsiACAAIAJBEGpJGyIEQRs2AgRBsInBACkCACEKIARBEGpBuInBACkCADcCACAEIAo3AghBvInBACAGNgIAQbSJwQAgAzYCAEGwicEAIAE2AgBBuInBACAEQQhqNgIAIARBHGohAANAIABBBzYCACAAQQRqIgAgB0kNAAsgAiAERg0HIAQgBCgCBEF+cTYCBCACIAQgAmsiAEEBcjYCBCAEIAA2AgAgAEGAAk8EQCACIAAQawwICyAAQXhxQcCJwQBqIQECf0HIi8EAKAIAIgRBASAAQQN2dCIAcUUEQEHIi8EAIAAgBHI2AgAgAQwBCyABKAIICyEAIAEgAjYCCCAAIAI2AgwgAiABNgIMIAIgADYCCAwHCyAAIAE2AgAgACAAKAIEIANqNgIEIAFBD2pBeHFBCGsiAiAFQQNyNgIEIARBD2pBeHFBCGsiAyACIAVqIgBrIQUgA0Hci8EAKAIARg0DIANB2IvBACgCAEYNBCADKAIEIgFBA3FBAUYEQCADIAFBeHEiARBjIAEgBWohBSABIANqIgMoAgQhAQsgAyABQX5xNgIEIAAgBUEBcjYCBCAAIAVqIAU2AgAgBUGAAk8EQCAAIAUQawwGCyAFQXhxQcCJwQBqIQECf0HIi8EAKAIAIgRBASAFQQN2dCIDcUUEQEHIi8EAIAMgBHI2AgAgAQwBCyABKAIICyEEIAEgADYCCCAEIAA2AgwgACABNgIMIAAgBDYCCAwFC0HUi8EAIAAgBWsiATYCAEHci8EAQdyLwQAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQgAEEIaiEDDAgLQdiLwQAoAgAhAAJAIAEgBWsiAkEPTQRAQdiLwQBBADYCAEHQi8EAQQA2AgAgACABQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAELQdCLwQAgAjYCAEHYi8EAIAAgBWoiBDYCACAEIAJBAXI2AgQgACABaiACNgIAIAAgBUEDcjYCBAsgAEEIaiEDDAcLIAAgAyAHajYCBEHci8EAQdyLwQAoAgAiAEEPakF4cSIBQQhrIgI2AgBB1IvBAEHUi8EAKAIAIANqIgQgACABa2pBCGoiATYCACACIAFBAXI2AgQgACAEakEoNgIEQeiLwQBBgICAATYCAAwDC0Hci8EAIAA2AgBB1IvBAEHUi8EAKAIAIAVqIgE2AgAgACABQQFyNgIEDAELQdiLwQAgADYCAEHQi8EAQdCLwQAoAgAgBWoiATYCACAAIAFBAXI2AgQgACABaiABNgIACyACQQhqIQMMAwtBACEDQdSLwQAoAgAiACAFTQ0CQdSLwQAgACAFayIBNgIAQdyLwQBB3IvBACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBCAAQQhqIQMMAgsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAJBFGooAgAiAUUNACAAQRRqIAE2AgAgASAANgIYCwJAIANBEE8EQCACIAVBA3I2AgQgAiAFaiIAIANBAXI2AgQgACADaiADNgIAIANBgAJPBEAgACADEGsMAgsgA0F4cUHAicEAaiEBAn9ByIvBACgCACIEQQEgA0EDdnQiA3FFBEBByIvBACADIARyNgIAIAEMAQsgASgCCAshBCABIAA2AgggBCAANgIMIAAgATYCDCAAIAQ2AggMAQsgAiADIAVqIgBBA3I2AgQgACACaiIAIAAoAgRBAXI2AgQLIAJBCGohAwsgCEEQaiQAIAML1BkCC38BfiMAQfABayICJAACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAC0A2AFBAWsOAxACAQALIAAgAEHoAGpB6AAQugMaCwJAAkACQAJAIAAtAGRBAWsOAw4EAAELIABBCGohCAJAIABBMGotAABBAWsOBAwEAw0ACyAAQSBqKAIAIQMgAEExai0AACEGIABBLGooAgAhBAwBCyACQdgAaiAAKAJYEIgCIAIoAlghBCAAIAIoAlw2AgQgACAENgIAIABBMGpBADoAACAAQSxqIAQ2AgAgAEEgaiAAKAJgIgM2AgAgAEExaiAAKAJcQQBHIgY6AAAgAEEIaiEICyAAQdcAaiAGOgAAIABB1gBqIgxBADoAACAAQdAAaiAENgIAIABBKGogAzYCACAAQSRqIAQ2AgAgAEE4aiELDAMLIABBOGohCyAAQdYAaiIMLQAAQQFrDgMGAAMBCwALIABB1wBqLQAAIQYgAEHQAGooAgAhBAsgAEHUAGoiBSAGOgAAQQAhBiAAQdUAaiIJQQA6AAAgAkHQAGpBABDSASACKAJUIQogAigCUCEDIAlBAToAACAAQUBrIAM2AgAgAEE8akEANgIAIAAgCjYCOCAAQcQAakEHQSAgA0EKdmdrIgMgA0EHTxtBAnRBAXI2AgAgAkHQAWogBSALELQBIAIoAtABDQIgAEEAOgBVIAAoAjghAyAAKAI8IQVBjN3AACEKIAAoAkQiCUEBcQRAIAJB8ABqIgYgAyAFIAAoAkAgCUEFdiIFENoCIAJBuAFqIAYQeSACIAU2AswBIAIoAsABIgYgBUkNCSACKAK8ASAFaiEDIAIoArgBIQogAigCxAEhCSAGIAVrIQULQYmHwQAtAAAaQRhBCBCJAyIGRQ0JIAYgCTYCECAGIAU2AgwgBiADNgIIIAYgCjYCBCAGQQY2AgAgAkHIAGogBEGZicAAQQlBoonAAEEDQYiLwABBCyAGEL8BIAIoAkghBCAAQcwAaiACKAJMIgY2AgAgAEHIAGogBDYCAAwBCyAAQcwAaigCACEGIABByABqKAIAIQQLIAJB0AFqIAQgASAGKAIMEQIAIAIoAtABIgZBB0cNAkEDIQQgDEEDOgAADA0LIAJB2AFqKAIAIQQgAigC1AEhBQwJC0HghcAAQSNBlIvAABCBAgALIAJBoAFqIgMgAkHkAWooAgA2AgAgAiACKQLcATcDmAEgAigC2AEhBCACKALUASEFIABByABqEMcCIAZBBkYEQEGJh8EALQAAGkEIQQQQiQMiA0UNBiADIAQ2AgQgAyAFNgIAQaSLwAAhBEEGIQYMCQsgAkGwAWogAygCADYCACACIAIpA5gBNwOoAQwHC0HghcAAQSNBzJDAABCBAgALIABBOGooAgAhB0EBIQQMBwtB4IXAAEEjQeCOwAAQgQIACyACQYwBakEBNgIAIAJB3AFqQgI3AgAgAkECNgLUASACQayGwAA2AtABIAJBATYChAEgAiAGNgLsASACIAJBgAFqNgLYASACIAJB7AFqNgKIASACIAJBzAFqNgKAASACQdABakGQh8AAEJwCAAtBCEEYELQDAAtBBEEIELQDAAtB4IXAAEEjQciFwAAQgQIACyAAQdUAai0AAARAIAsQiwILIAUhAwsgAEGAAjsAVSACQegAaiACQbABaigCACIFNgIAIAIgAikDqAEiDTcDYCAAQRBqIAQ2AgAgAEEMaiADNgIAIAAgBjYCCCAAQRRqIA03AgAgAEEcaiAFNgIAIAZBBkYEQCAAQUBrIAQ2AgAgAEE8aiADNgIAQQAhBAwBCyACQZABaiAIQRBqKQMANwMAIAJBiAFqIAhBCGopAwA3AwAgAiAIKQMANwOAAUHgh8EAKAIARQ0CIAJBxAFqQQI2AgAgAkHcAWpCAjcCACACQQI2AtQBIAJB+JDAADYC0AEgAkEDNgK8ASACQQ02AnQgAkGMicAANgJwIAIgAkG4AWo2AtgBIAIgAkGAAWo2AsABIAIgAkHwAGo2ArgBIAJB0AFqQQFByI7AAEHpBhCBAQwCCwNAAkAgBEUEQCAAQThqIABBPGoiBzYCAAwBCyACQdABaiAHKAIAIAEgBygCBCgCDBECAAJAAkACQAJAAkAgAigC0AEiA0EIRwRAIAJB+ABqIAJB4AFqKQMANwMAIAIgAikD2AE3A3AgAigC1AEhBQJAAkACQCADQQZrDgIBAAILIABBPGoQxwIMDAsgAkGAATYCzAEgAiAFuBAGNgLsASACQUBrIABBKGogAkHMAWogAkHsAWoQ7wEgAigCRCEDAkACQAJAAkAgAigCQEUEQCACIAM2AmAgAxABQQFGBEAgAigCYBACQQFGDQoLIAIgAkHgAGo2ApgBIAJBKGogAigCYBADIAIoAigiBUUNASACKAIsIQMgAiAFNgLUASACIAM2AtgBIAIgAzYC0AEgAkEgaiACQdABahCPAyACQYABaiACKAIgIAIoAiQQ/AIgAigCgAFBgICAgHhGDQEgAkHAAWogAkGIAWooAgA2AgAgAiACKQKAATcDuAEMAgsgAiADNgJgIAIgAkHgAGo2ApgBIAJBOGogAxADIAIoAjgiBUUNAiACKAI8IQMgAiAFNgLUASACIAM2AtgBIAIgAzYC0AEgAkEwaiACQdABahCPAyACQYABaiACKAIwIAIoAjQQ/AIgAigCgAFBgICAgHhGDQIgAkHAAWogAkGIAWooAgA2AgAgAiACKQKAATcDuAEMAwsgAkHcAWpCATcCACACQQE2AtQBIAJBvJHAADYC0AEgAkEENgKsASACIAJBqAFqNgLYASACIAJBmAFqNgKoASACQbgBaiACQdABahBeC0Hgh8EAKAIAQQJLDQQMBQsgAkHcAWpCATcCACACQQE2AtQBIAJBvJHAADYC0AEgAkEENgKsASACIAJBqAFqNgLYASACIAJBmAFqNgKoASACQbgBaiACQdABahBeC0Hgh8EAKAIABEAgAkGMAWpBBTYCACACQdwBakICNwIAIAJBAjYC1AEgAkH4kMAANgLQASACQQM2AoQBIAJBDTYCrAEgAkGMicAANgKoASACIAJBgAFqNgLYASACIAJBuAFqNgKIASACIAJBqAFqNgKAASACQdABakEBQciOwABB3gYQgQELIAJBuAFqEOkCIAIoAmAiA0GEAUkNBSADEAAMBQsgAkGQAWogAkH4AGopAwA3AwAgAiAFNgKEASACIAM2AoABIAIgAikDcDcDiAFB4IfBACgCAARAIAJBxAFqQQI2AgAgAkHcAWpCAjcCACACQQI2AtQBIAJB+JDAADYC0AEgAkEDNgK8ASACQQ02AqwBIAJBjInAADYCqAEgAiACQbgBajYC2AEgAiACQYABajYCwAEgAiACQagBajYCuAEgAkHQAWpBAUHIjsAAQcEGEIEBCyACQYABahC3AQwFC0EEIQQMBwsgAkGMAWpBBTYCACACQdwBakICNwIAIAJBAjYC1AEgAkGskcAANgLQASACQQM2AoQBIAJBDTYCrAEgAkGMicAANgKoASACIAJBgAFqNgLYASACIAJBuAFqNgKIASACIAJBqAFqNgKAASACQdABakEDQciOwABB1gYQgQELIAJBuAFqEOkCCyACKAJgIgNBhAFJDQAgAxAACyAC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TwRAIAEQAAsgAigCwAEiAUGEAU8EQCABEAALIAIoAmgiAUGEAUkNACABEAALIAAoAtABIgFBhAFPBEAgARAAC0EBIQdBACEEIAAoAtQBIgFBhAFJDQIgARAADAILQZmbwABBFRCvAwALQZmbwABBFRCvAwALIAAgBzoA2AEgAkHgAWokACAEC8YZAg9/BH4jAEHAAWsiAiQAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAAtAOABQQFrDgMRAgEACyAAQQhqIABB9ABqQewAELoDGgsCQAJAAkACQCAAQfAAai0AAEEBaw4DEAQAAQsgAEEcaiEMAkAgAEHsAGotAABBAWsOAw8EAwALIABBKGooAgAhAwwBCyACQThqIAAoAggQiAIgAigCOCEDIABBGGogAigCPDYCACAAQRRqIAM2AgAgAEEMaigCACEGIAIgAEEQaigCACIHNgKoASACIAY2AqQBIAIgBzYCoAEgAkEwaiACQaABahCPAyACQUBrIAIoAjAgAigCNBD8AiAAQewAakEAOgAAIABBKGogAzYCACAAQSRqIAJByABqKAIANgIAIABBHGoiDCACKQNANwIACyAAQSxqIAM2AgAgAEEwaiIKIAwpAgA3AgAgAEHcAGpBADoAACAAQTxqIAM2AgAgAEE4aiAMQQhqKAIANgIADAMLIABBMGohCiAAQdwAai0AAEEBaw4ECAADBQELAAsgAEE8aigCACEDC0EAIQYgAEHdAGoiB0EAOgAAIABBQGsiCSAKKQIANwIAIABByABqIApBCGooAgA2AgAgAkEoakEAENIBIAIoAiwhCyACKAIoIQQgB0EBOgAAIABB1ABqIAQ2AgAgAEHQAGpBADYCACAAQcwAaiIHIAs2AgAgAEHYAGpBB0EgIARBCnZnayIEIARBB08bQQJ0QQFyNgIAIAJBoAFqIAkgBxClASACKAKgAQ0DIABBADoAXSAAKAJMIQYgACgCUCEHQYzdwAAhCyAAKAJYIglBAXEEQCACQYABaiIEIAYgByAAKAJUIAlBBXYiBxDaAiACQYwBaiAEEHkgAiAHNgKcASACKAKUASIEIAdJDQ4gAigCkAEgB2ohBiACKAKMASELIAIoApgBIQkgBCAHayEHC0GJh8EALQAAGkEYQQgQiQMiBEUNDiAEIAk2AhAgBCAHNgIMIAQgBjYCCCAEIAs2AgQgBEEGNgIAIAJBIGogA0GZicAAQQlBoonAAEEDQaWJwABBBCAEEL8BIAIoAiAhAyAAQeQAaiACKAIkIgQ2AgAgAEHgAGogAzYCAAwBCyAAQeQAaigCACEEIABB4ABqKAIAIQMLIAJBoAFqIAMgASAEKAIMEQIAIAIoAqABIgZBB0YNCCACKQOwASESIAIoAqwBIQcgAigCqAEhBCACKAKkASEDIABB4ABqEMcCIAZBBkcNAiAAIAM2AmQgAEHoAGogBDYCACAAIABB5ABqNgJgCyACQaABaiAAQeAAaiABEPUCIAIoAqABIgZBCEYNA0EBIQRBACEHIAZBB0YiD0UNBAwNCyACQagBaigCACEEIAIoAqQBIQMLIABB3QBqLQAARQ0KIABBzABqEIsCDAoLQeCFwABBI0GYisAAEIECAAtBBAwECyACKQOwASESIAIoAqwBIQcgAigCqAEhBCACKAKkASEDIAZBBkYEQCACIBI+AnwgAiAHNgJ4IAIgBDYCdCACIAM2AnAgAkGgAWohCSMAQSBrIgYkACAGQQxqIg5BADYCACAGQoCAgIAQNwIEIAZBBGohECMAQeAAayIDJAAgAyACQfAAaiILNgIMAkACQANAIAMoAgwiASgCCCIFRQRAQQAhAQwDCwJAAkACQAJAIAEoAgQiASwAACIIQQBIBEAgBUEKSw0BIAEgBWpBAWssAABBAE4NASADQUBrIANBDGoQnQEgAygCQARAIAMoAkQhAQwICyADKQNIIREMAgsgCK1C/wGDIREgA0EMakEBEKIBDAILIAhB/wFxIAEsAAEiCEH/AXFBB3RqQYABayEFIANBDGoCfwJAAkACQAJAAkACQAJAAkAgCEEASARAIAUgASwAAiIIQf8BcUEOdGpBgIABayEFIAhBAE4NAiAFIAEsAAMiCEH/AXFBFXRqQYCAgAFrIQUgCEEATg0DIAVBgICAgAFrrSERIAEsAAQiBUEATg0EIAVB/wFxIAEsAAUiCEH/AXFBB3RqQYABayEFIAhBAE4NBSAFIAEsAAYiCEH/AXFBDnRqQYCAAWshBSAIQQBODQYgBSABLAAHIghB/wFxQRV0akGAgIABayEFIAhBAE4NByABLAAIIgitQv8BgyETIAVBgICAgAFrrUIchiARfCERIAhBAE4NCCABMQAJIhRCAloNASARIBNCOIZ8IBRCP4Z8QoCAgICAgICAgH99IRFBCgwJCyAFrSERQQIMCAtBmJnAAEEOEJkCIQEMDQsgBa0hEUEDDAYLIAWtIRFBBAwFCyAFrUL/AYNCHIYgEXwhEUEFDAQLIAWtQhyGIBF8IRFBBgwDCyAFrUIchiARfCERQQcMAgsgBa1CHIYgEXwhEUEIDAELIBNCOIYgEXwhEUEJCxCiAQsgAyARNwMQIBFC/////w9WDQELIAMgEUIHgyITNwMoIBNCBloNAiARpyINQQhJBEBB6JjAAEEUEJkCIQEMBAsgE6chASADQQxqIQgjAEEQayIFJAACfyANQQN2Ig1BAUYEQEEAIAEgECAIENQBIgFFDQEaIAUgATYCDCAFQQxqQciZwABBC0HTmcAAQQMQ3wEgBSgCDAwBCyABIA0gCEHkABBYCyEBIAVBEGokACABRQ0BDAMLCyADQcwAakIBNwIAIANBATYCRCADQZCZwAA2AkAgA0HHADYCOCADIANBNGo2AkggAyADQRBqNgI0IANBHGoiASADQUBrEF4gARD3ASEBDAELIANBzABqQgE3AgAgA0EBNgJEIANBwJnAADYCQCADQccANgJcIAMgA0HYAGo2AkggAyADQShqNgJYIANBNGoiASADQUBrEF4gARD3ASEBCyADQeAAaiQAIAZBGGogDigCADYCACAGIAYpAgQ3AxACQCABRQRAIAkgBikCBDcCACAJQQhqIA4oAgA2AgAMAQsgCUGAgICAeDYCACAJIAE2AgQgBkEQahDpAgsgC0EMaiALKAIEIAsoAgggCygCACgCCBECACAGQSBqJAAgAigCoAEiA0GAgICAeEcEQCACKAKoASEHIAIoAqQBIQQMCgtBASEGIAIoAqQBIQMLIABB5ABqEMcCDAcLQeCFwABBI0HgjcAAEIECAAtB4IXAAEEjQeCOwAAQgQIAC0EDCzoAXEEDIQMgAEEDOgBsIABBAzoAcEEBIQoMCQtB4IXAAEEjQciFwAAQgQIACyACQeQAakEBNgIAIAJBrAFqQgI3AgAgAkECNgKkASACQayGwAA2AqABIAJBATYCXCACIAQ2ArwBIAIgAkHYAGo2AqgBIAIgAkG8AWo2AmAgAiACQZwBajYCWCACQaABakGQh8AAEJwCAAtBCEEYELQDAAsgAEEAOgBdIABBQGsQ6QIgAEEBOgBcIAoQkQIMAQsgAEHkAGoQxwIgAEHdAGpBADoAACAAQUBrEOkCIABBAToAXCAKEJECIA9FDQFBBSEGQgAhEgsgAiASNwNoIAIgBzYCZCACIAQ2AmAgAiADNgJcIAIgBjYCWEHgh8EAKAIARQ0BIAJBmAFqQQI2AgAgAkGsAWpCAjcCACACQQI2AqQBIAJBjI7AADYCoAEgAkEDNgKQASACQQ02AnQgAkGMicAANgJwIAIgAkGMAWo2AqgBIAIgAkHYAGo2ApQBIAIgAkHwAGo2AowBIAJBoAFqQQFByI7AAEHqBRCBAQwBCyAErSAHrUIghoQhEgwBCyACQdgAahC3AUGAgICAeCEDC0EBIQogAEEBOgBsIAIgEjcCUCACIAM2AkwgDBDYAiACQRhqIAJBzABqEM0BIAIoAhwhASACKAIYIQYgAEEYaigCACIDIAMoAgBBAWs2AgAgAEEBOgBwQQMhAwJAAkACQCAGDgMAAQMBCyACIAE2AlggAkGAATYCoAEgAkEQaiAAIAJBoAFqIAJB2ABqEO8BIAIoAhANAyACKAIUIgFBhAFPBEAgARAACyACKAKgASIBQYQBTwRAIAEQAAsgAigCWCIBQYQBSQ0BIAEQAAwBCyACIAE2AlggAkGAATYCoAEgAkEIaiAAQQRqIAJBoAFqIAJB2ABqEO8BIAIoAggNAyACKAIMIgFBhAFPBEAgARAACyACKAKgASIBQYQBTwRAIAEQAAsgAigCWCIBQYQBSQ0AIAEQAAsgACgCACIBQYQBTwRAIAEQAAtBASEDQQAhCiAAKAIEIgFBhAFJDQAgARAACyAAIAM6AOABIAJBwAFqJAAgCg8LQZmbwABBFRCvAwALQZmbwABBFRCvAwALxhkCD38EfiMAQcABayICJAACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAAJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAC0A4AFBAWsOAxECAQALIABBCGogAEH0AGpB7AAQugMaCwJAAkACQAJAIABB8ABqLQAAQQFrDgMQBAABCyAAQRxqIQwCQCAAQewAai0AAEEBaw4DDwQDAAsgAEEoaigCACEDDAELIAJBOGogACgCCBCIAiACKAI4IQMgAEEYaiACKAI8NgIAIABBFGogAzYCACAAQQxqKAIAIQYgAiAAQRBqKAIAIgc2AqgBIAIgBjYCpAEgAiAHNgKgASACQTBqIAJBoAFqEI8DIAJBQGsgAigCMCACKAI0EPwCIABB7ABqQQA6AAAgAEEoaiADNgIAIABBJGogAkHIAGooAgA2AgAgAEEcaiIMIAIpA0A3AgALIABBLGogAzYCACAAQTBqIgogDCkCADcCACAAQdwAakEAOgAAIABBPGogAzYCACAAQThqIAxBCGooAgA2AgAMAwsgAEEwaiEKIABB3ABqLQAAQQFrDgQIAAMFAQsACyAAQTxqKAIAIQMLQQAhBiAAQd0AaiIHQQA6AAAgAEFAayIJIAopAgA3AgAgAEHIAGogCkEIaigCADYCACACQShqQQAQ0gEgAigCLCELIAIoAighBCAHQQE6AAAgAEHUAGogBDYCACAAQdAAakEANgIAIABBzABqIgcgCzYCACAAQdgAakEHQSAgBEEKdmdrIgQgBEEHTxtBAnRBAXI2AgAgAkGgAWogCSAHEKUBIAIoAqABDQMgAEEAOgBdIAAoAkwhBiAAKAJQIQdBjN3AACELIAAoAlgiCUEBcQRAIAJBgAFqIgQgBiAHIAAoAlQgCUEFdiIHENoCIAJBjAFqIAQQeSACIAc2ApwBIAIoApQBIgQgB0kNDiACKAKQASAHaiEGIAIoAowBIQsgAigCmAEhCSAEIAdrIQcLQYmHwQAtAAAaQRhBCBCJAyIERQ0OIAQgCTYCECAEIAc2AgwgBCAGNgIIIAQgCzYCBCAEQQY2AgAgAkEgaiADQZmJwABBCUGiicAAQQNBqIrAAEEFIAQQvwEgAigCICEDIABB5ABqIAIoAiQiBDYCACAAQeAAaiADNgIADAELIABB5ABqKAIAIQQgAEHgAGooAgAhAwsgAkGgAWogAyABIAQoAgwRAgAgAigCoAEiBkEHRg0IIAIpA7ABIRIgAigCrAEhByACKAKoASEEIAIoAqQBIQMgAEHgAGoQxwIgBkEGRw0CIAAgAzYCZCAAQegAaiAENgIAIAAgAEHkAGo2AmALIAJBoAFqIABB4ABqIAEQ9QIgAigCoAEiBkEIRg0DQQEhBEEAIQcgBkEHRiIPRQ0EDA0LIAJBqAFqKAIAIQQgAigCpAEhAwsgAEHdAGotAABFDQogAEHMAGoQiwIMCgtB4IXAAEEjQbCKwAAQgQIAC0EEDAQLIAIpA7ABIRIgAigCrAEhByACKAKoASEEIAIoAqQBIQMgBkEGRgRAIAIgEj4CfCACIAc2AnggAiAENgJ0IAIgAzYCcCACQaABaiEJIwBBIGsiBiQAIAZBDGoiDkEANgIAIAZCgICAgBA3AgQgBkEEaiEQIwBB4ABrIgMkACADIAJB8ABqIgs2AgwCQAJAA0AgAygCDCIBKAIIIgVFBEBBACEBDAMLAkACQAJAAkAgASgCBCIBLAAAIghBAEgEQCAFQQpLDQEgASAFakEBaywAAEEATg0BIANBQGsgA0EMahCdASADKAJABEAgAygCRCEBDAgLIAMpA0ghEQwCCyAIrUL/AYMhESADQQxqQQEQogEMAgsgCEH/AXEgASwAASIIQf8BcUEHdGpBgAFrIQUgA0EMagJ/AkACQAJAAkACQAJAAkACQCAIQQBIBEAgBSABLAACIghB/wFxQQ50akGAgAFrIQUgCEEATg0CIAUgASwAAyIIQf8BcUEVdGpBgICAAWshBSAIQQBODQMgBUGAgICAAWutIREgASwABCIFQQBODQQgBUH/AXEgASwABSIIQf8BcUEHdGpBgAFrIQUgCEEATg0FIAUgASwABiIIQf8BcUEOdGpBgIABayEFIAhBAE4NBiAFIAEsAAciCEH/AXFBFXRqQYCAgAFrIQUgCEEATg0HIAEsAAgiCK1C/wGDIRMgBUGAgICAAWutQhyGIBF8IREgCEEATg0IIAExAAkiFEICWg0BIBEgE0I4hnwgFEI/hnxCgICAgICAgICAf30hEUEKDAkLIAWtIRFBAgwIC0GYmcAAQQ4QmQIhAQwNCyAFrSERQQMMBgsgBa0hEUEEDAULIAWtQv8Bg0IchiARfCERQQUMBAsgBa1CHIYgEXwhEUEGDAMLIAWtQhyGIBF8IRFBBwwCCyAFrUIchiARfCERQQgMAQsgE0I4hiARfCERQQkLEKIBCyADIBE3AxAgEUL/////D1YNAQsgAyARQgeDIhM3AyggE0IGWg0CIBGnIg1BCEkEQEHomMAAQRQQmQIhAQwECyATpyEBIANBDGohCCMAQRBrIgUkAAJ/IA1BA3YiDUEBRgRAQQAgASAQIAgQ1AEiAUUNARogBSABNgIMIAVBDGpB5ZnAAEENQfKZwABBBhDfASAFKAIMDAELIAEgDSAIQeQAEFgLIQEgBUEQaiQAIAFFDQEMAwsLIANBzABqQgE3AgAgA0EBNgJEIANBkJnAADYCQCADQccANgI4IAMgA0E0ajYCSCADIANBEGo2AjQgA0EcaiIBIANBQGsQXiABEPcBIQEMAQsgA0HMAGpCATcCACADQQE2AkQgA0HAmcAANgJAIANBxwA2AlwgAyADQdgAajYCSCADIANBKGo2AlggA0E0aiIBIANBQGsQXiABEPcBIQELIANB4ABqJAAgBkEYaiAOKAIANgIAIAYgBikCBDcDEAJAIAFFBEAgCSAGKQIENwIAIAlBCGogDigCADYCAAwBCyAJQYCAgIB4NgIAIAkgATYCBCAGQRBqEOkCCyALQQxqIAsoAgQgCygCCCALKAIAKAIIEQIAIAZBIGokACACKAKgASIDQYCAgIB4RwRAIAIoAqgBIQcgAigCpAEhBAwKC0EBIQYgAigCpAEhAwsgAEHkAGoQxwIMBwtB4IXAAEEjQfCOwAAQgQIAC0HghcAAQSNB4I7AABCBAgALQQMLOgBcQQMhAyAAQQM6AGwgAEEDOgBwQQEhCgwJC0HghcAAQSNByIXAABCBAgALIAJB5ABqQQE2AgAgAkGsAWpCAjcCACACQQI2AqQBIAJBrIbAADYCoAEgAkEBNgJcIAIgBDYCvAEgAiACQdgAajYCqAEgAiACQbwBajYCYCACIAJBnAFqNgJYIAJBoAFqQZCHwAAQnAIAC0EIQRgQtAMACyAAQQA6AF0gAEFAaxDpAiAAQQE6AFwgChCRAgwBCyAAQeQAahDHAiAAQd0AakEAOgAAIABBQGsQ6QIgAEEBOgBcIAoQkQIgD0UNAUEFIQZCACESCyACIBI3A2ggAiAHNgJkIAIgBDYCYCACIAM2AlwgAiAGNgJYQeCHwQAoAgBFDQEgAkGYAWpBAjYCACACQawBakICNwIAIAJBAjYCpAEgAkGUj8AANgKgASACQQM2ApABIAJBDTYCdCACQYyJwAA2AnAgAiACQYwBajYCqAEgAiACQdgAajYClAEgAiACQfAAajYCjAEgAkGgAWpBAUHIjsAAQfsFEIEBDAELIAStIAetQiCGhCESDAELIAJB2ABqELcBQYCAgIB4IQMLQQEhCiAAQQE6AGwgAiASNwJQIAIgAzYCTCAMENgCIAJBGGogAkHMAGoQzQEgAigCHCEBIAIoAhghBiAAQRhqKAIAIgMgAygCAEEBazYCACAAQQE6AHBBAyEDAkACQAJAIAYOAwABAwELIAIgATYCWCACQYABNgKgASACQRBqIAAgAkGgAWogAkHYAGoQ7wEgAigCEA0DIAIoAhQiAUGEAU8EQCABEAALIAIoAqABIgFBhAFPBEAgARAACyACKAJYIgFBhAFJDQEgARAADAELIAIgATYCWCACQYABNgKgASACQQhqIABBBGogAkGgAWogAkHYAGoQ7wEgAigCCA0DIAIoAgwiAUGEAU8EQCABEAALIAIoAqABIgFBhAFPBEAgARAACyACKAJYIgFBhAFJDQAgARAACyAAKAIAIgFBhAFPBEAgARAAC0EBIQNBACEKIAAoAgQiAUGEAUkNACABEAALIAAgAzoA4AEgAkHAAWokACAKDwtBmZvAAEEVEK8DAAtBmZvAAEEVEK8DAAv9MwIifwZ+IwBB0AFrIgIkAAJAAkACQAJAAkACQAJAAkACfwJAAkACfwJAAn8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAALQDgAUEBaw4DFgIBAAsgAEEIaiAAQfQAakHsABC6AxoLAkACQAJAAkAgAEHwAGotAABBAWsOAxcEAAELIABBHGohGgJAIABB7ABqIh0tAABBAWsOAxIEAwALIABBKGooAgAhAwwBCyACQShqIAAoAggQiAIgAigCKCEDIABBGGogAigCLDYCACAAQRRqIAM2AgAgAEEMaigCACEFIAIgAEEQaigCACIGNgKAASACIAU2AnwgAiAGNgJ4IAJBIGogAkH4AGoQjwMgAkEwaiACKAIgIAIoAiQQ/AIgAEHsAGoiHUEAOgAAIABBKGogAzYCACAAQSRqIAJBOGooAgA2AgAgAEEcaiIaIAIpAzA3AgALIABBLGogAzYCACAAQTBqIhUgGikCADcCACAAQdwAaiIQQQA6AAAgAEE8aiADNgIAIABBOGogGkEIaigCADYCAAwDCyAAQTBqIRUgAEHcAGoiEC0AAEEBaw4ECAADBQELAAsgAEE8aigCACEDCyAAQd0AaiINQQA6AAAgAEFAayIFIBUpAgA3AgAgAEHIAGogFUEIaigCADYCACACQRhqQQAQ0gEgAigCHCEIIAIo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cSIBakF3Rg0AIAMoAgAgAWsQUAsLIBtBDGogGygCBCAbKAIIIBsoAgAoAggRAgAgEUHQAGokACACKAJ4IgVFDQEgAikDkAEhJSACKAKMASEMIAIoAogBIQsgAigChAEhAyACKAJ8IQEgAigCgAELIQQgAEHkAGoQxwIgAEHdAGpBADoAACAAQUBrEOkCIABBAToAXCAVEJECIAVFDQogAiAlNwNYIAIgDDYCVCACIAs2AlAgAiADNgJMIAIgBDYCSCACIAE2AkQgAiAFNgJAQQEhAyMAQfAAayIBJAAgARAdNgIMIAFBEGohBkEAIQQgAkFAayIFKAIMIQggBSgCACINKQMAISUCfiAFKAIEIgVFBEBBACEMQQEhEEIADAELQQAhDAJAIAVBAWoiEK1CGH4iJEIgiKcNACAFICSnIgRqQQlqIgUgBEkgBUH5////B09yDQBBCCEMCyAFrSANIARrrUIghoQLISQgBiAMNgIgIAYgCDYCGCAGIA02AhAgBkEkaiAkNwIAIAYgDSAQajYCDCAGIA1BCGo2AgggBiAlQn+FQoCBgoSIkKDAgH+DNwMAAkAgASgCKCILBEAgASkDECElIAEoAhghDCABKAIgIQQDQAJAICVQBEADQCAEQcABayEEIAwpAwAgDEEIaiEMQn+FQoCBgoSIkKDAgH+DIiVQDQALIAEgBDYCICABIAw2AhggASAlQgF9ICWDIiQ3AxAgC0EBayELDAELIAEgJUIBfSAlgyIkNwMQIAtBAWshCyAERQ0DCyAEICV6p0EDdkFobGpBGGsiBUEEaikCACElIAUoAgAhBiABQcgAaiINIAVBFGooAgA2AgAgASAFQQxqKQIANwNAIAZBgICAgHhGDQIgAUHgAGoiBSANKAIANgIAIAEgBjYCTCABIAEpA0A3A1ggASAlNwJQICWnICVCIIinEAUhBiABQcwAahDpAiABIAY2AmggASgCXCAFKAIAEAUhBSABQdgAahDpAiABIAU2AmwgAUEMaigCACABQegAaigCACABQewAaigCABAnIgVBhAFPBEAgBRAACyABKAJsIgVBhAFPBEAgBRAACyABKAJoIgVBhAFPBEAgBRAACyAkISUgCw0ACwtBACELCyABIAs2AigCQCABQRBqIgQoAhhFDQADQCAEEK8BIQUgBCAEKAIYQQFrIgY2Ahgg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AgAgAEE0aiADNgIADAELIABBOGooAgAhBSAAQTRqKAIAIQMLIAJBgAFqIAMgASAFKAIMEQIAIAIoAoABIgZBB0YNDSACKQOQASESIAIoAowBIQkgAigCiAEhBSACKAKEASEDIABBNGoQxwIgBkEGRw0CIAAgAzYCOCAAQTxqIAU2AgAgACAAQThqNgI0CyACQYABaiAAQTRqIAEQ9QIgAigCgAEiBkEIRg0DIAZBB0YiD0UNBEEAIQlBAQwFCyACQYgBaigCACEFIAIoAoQBIQMLIABBMWoiCC0AAEUNBiAKEIsCDAYLQeCFwABBI0HkisAAEIECAAtBBAwJCyACKQOQASESIAIoAowBIQkgAigCiAEhBSACKAKEASIBIAZBBkcNAhogAiASPgJcIAIgCTYCWCACIAU2AlQgAiABNgJQIAJBgAFqIQgjAEEgayIGJAAgBkEMaiIOQQA2AgAgBkKAgICAEDcCBCAGQQRqIRAjAEHgAGsiAyQAIAMgAkHQAGoiCzYCDAJAAkADQCADKAIMIgEoAggiBEUEQEEAIQEMAwsCQAJAAkACQCABKAIEIgEsAAAiB0EASARAIARBCksNASABIARqQQFrLAAAQQBODQEgA0FAayADQQxqEJ0BIAMoAkAEQCADKAJEIQEMCAsgAykDSCERDAILIAetQv8BgyERIANBDGpBARCiAQwCCyAHQf8BcSABLAABIgdB/wFxQQd0akGAAWshBCADQQxqAn8CQAJAAkACQAJAAkACQAJAIAdBAEgEQCAEIAEsAAIiB0H/AXFBDnRqQYCAAWshBCAHQQBODQIgBCABLAADIgdB/wFxQRV0akGAgIABayEEIAdBAE4NAyAEQYCAgIABa60hESABLAAEIgRBAE4NBCAEQf8BcSABLAAFIgdB/wFxQQd0akGAAWshBCAHQQBODQUgBCABLAAGIgdB/wFxQQ50akGAgAFrIQQgB0EATg0GIAQgASwAByIHQf8BcUEVdGpBgICAAWshBCAHQQBODQcgASwACCIHrUL/AYMhEyAEQYCAgIABa61CHIYgEXwhESAHQQBODQggATEACSIUQgJaDQEgESATQjiGfCAUQj+GfEKAgICAgICAgIB/fSERQQoMCQsgBK0hEUECDAgLQZiZwABBDhCZAiEBDA0LIAStIRFBAwwGCyAErSERQQQMBQsgBK1C/wGDQhyGIBF8IRFBBQwECyAErUIchiARfCERQQYMAwsgBK1CHIYgEXwhEUEHDAILIAStQhyGIBF8IRFBCAwBCyATQjiGIBF8IRFBCQsQogELIAMgETcDECARQv////8PVg0BCyADIBFCB4MiEzcDKCATQgZaDQIgEaciDUEISQRAQeiYwABBFBCZAiEBDAQLIBOnIQEgA0EMaiEHIwBBEGsiBCQAAn8gDUEDdiINQQFGBEBBACABIBAgBxDUASIBRQ0BGiAEIAE2AgwgBEEMakGcmsAAQRVBsZrAAEEHEN8BIAQoAgwMAQsgASANIAdB5AAQWAshASAEQRBqJAAgAUUNAQwDCwsgA0HMAGpCATcCACADQQE2AkQgA0GQmcAANgJAIANBxwA2AjggAyADQTRqNgJIIAMgA0EQajYCNCADQRxqIgEgA0FAaxBeIAEQ9wEhAQwBCyADQcwAakIBNwIAIANBATYCRCADQcCZwAA2AkAgA0HHADYCXCADIANB2ABqNgJIIAMgA0EoajYCWCADQTRqIgEgA0FAaxBeIAEQ9wEhAQsgA0HgAGokACAGQRhqIA4oAgA2AgAgBiAGKQIENwMQAkAgAUUEQCAIIAYpAgQ3AgAgCEEIaiAOKAIANgIADAELIAhBgICAgHg2AgAgCCABNgIEIAZBEGoQ6QILIAtBDGogCygCBCALKAIIIAsoAgAoAggRAgAgBkEgaiQAIAIoAoABIgNBgICAgHhGDQEgAigCiAEhCSACKAKEAQshBSAAQThqEMcCIABBMWpBgAI7AAAgChC4AiAPRQ0FQQUhBkIAIRIMAwtBASEGIAIoAoQBCyEDIABBOGoQxwIgAEExaiEICyAIQQA6AAAgDEEBOgAAIAoQuAILIAIgEjcDSCACIAk2AkQgAiAFNgJAIAIgAzYCPCACIAY2AjhB4IfBACgCAEUNCCACQfgAakECNgIAIAJBjAFqQgI3AgAgAkECNgKEASACQYiQwAA2AoABIAJBAzYCcCACQQ02AlQgAkGMicAANgJQIAIgAkHsAGo2AogBIAIgAkE4ajYCdCACIAJB0ABqNgJsIAJBgAFqQQFByI7AAEGgBhCBAQwIC0HghcAAQSNB4I7AABCBAgALIAWtIAmtQiCGhCESDAcLQQMLIQEgDCABOgAAIAtBAzoAAEECIQNBAwwGCyACQcQAakEBNgIAIAJBjAFqQgI3AgAgAkECNgKEASACQayGwAA2AoABIAJBATYCPCACIAY2ApwBIAIgAkE4ajYCiAEgAiACQZwBajYCQCACIAJB/ABqNgI4IAJBgAFqQZCHwAAQnAIAC0EIQRgQtAMAC0HghcAAQSNB3I/AABCBAgALQeCFwABBI0HIhcAAEIECAAsgAkE4ahC3AUGAgICAeCEDCyAAQQE6AEQgAiASNwKEASACIAM2AoABIAJBGGogAkGAAWoQzQEgAigCHCEGIAIoAhghAyAAQRRqKAIAIgEgASgCAEEBazYCAEEBCzoASEEDIQoCQAJAAkAgA0ECRiIBDQAgAEEIahCNAgJAIANFBEAgAiAGNgI4IAJBgAE2AoABIAJBCGogACACQYABaiACQThqEO8BIAIoAggNAyACKAIMIgNBhAFPBEAgAxAACyACKAKAASIDQYQBTwRAIAMQAAsgAigCOCIDQYQBSQ0BIAMQAAwBCyACIAY2AjggAkGAATYCgAEgAkEQaiAAQQRqIAJBgAFqIAJBOGoQ7wEgAigCEA0DIAIoAhQiA0GEAU8EQCADEAALIAIoAoABIgNBhAFPBEAgAxAACyACKAI4IgNBhAFJDQAgAxAACyAAKAIAIgNBhAFPBEAgAxAAC0EBIQogACgCBCIDQYQBSQ0AIAMQAAsgACAKOgCQASACQaABaiQAIAEPC0GZm8AAQRUQrwMAC0GZm8AAQRUQrwMAC6cYAg9/BH4jAEGgAWsiAiQAIAACfwJAAkACQAJAAkACQAJ/AkACQAJAAkACQAJ/AkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAAtAJABQQFrDgMZAgEACyAAQQhqIABBzABqQcQAELoDGgsCQAJAAkACQCAAQcgAai0AAEEBaw4DFAQAAQsCQCAAQcQAaiILLQAAQQFrDgMaBAMACyAAQcUAai0AACEFIABBQGsoAgAhAwwBCyACQTBqIAAoAggQiAIgAigCMCEDIABBFGogAigCNDYCACAAQRBqIAM2AgAgAEHEAGoiC0EAOgAAIABBQGsgAzYCACAAQcUAaiAAQQxqKAIAQQBHIgU6AAALIABBM2ogBToAACAAQTJqIgxBADoAACAAQSxqIAM2AgAgAEEYaiADNgIAIABBHGohCgwDCyAAQRxqIQogAEEyaiIMLQAAQQFrDgQIAAMFAQsACyAAQTNqLQAAIQUgAEEsaigCACEDCyAAQTBqIgkgBToAACAAQTFqIghBADoAACACQShqQQAQ0gEgAigCLCEEIAIoAighBSAIQQE6AAAgAEEkaiAFNgIAIABBIGpBADYCACAAIAQ2AhwgAEEoakEHQSAgBUEKdmdrIgUgBUEHTxtBAnRBAXI2AgAgAkGAAWogCSAKELQBIAIoAoABDQMgAEEAOgAxIAAoAhwhBiAAKAIgIQlBjN3AACEEIAAoAigiCEEBcQRAIAJB4ABqIgQgBiAJIAAoAiQgCEEFdiIFENoCIAJB7ABqIAQQeSACIAU2AnwgAigCdCIGIAVJDRIgBiAFayEJIAIoAmwhBCACKAJ4IQggAigCcCAFaiEGC0GJh8EALQAAGkEYQQgQiQMiBUUNEiAFIAg2AhAgBSAJNgIMIAUgBjYCCCAFIAQ2AgQgBUEGNgIAIAJBIGogA0GZicAAQQlBoonAAEEDQfSKwABBBCAFEL8BIAIoAiAhAyAAQThqIAIoAiQiBTYCACAAQTRqIAM2AgAMAQsgAEE4aigCACEFIABBNGooAgAhAwsgAkGAAWogAyABIAUoAgwRAgAgAigCgAEiBkEHRg0NIAIpA5ABIRIgAigCjAEhCSACKAKIASEFIAIoAoQBIQMgAEE0ahDHAiAGQQZHDQIgACADNgI4IABBPGogBTYCACAAIABBOGo2AjQLIAJBgAFqIABBNGogARD1AiACKAKAASIGQQhGDQMgBkEHRiIPRQ0EQQAhCUEBDAULIAJBiAFqKAIAIQUgAigChAEhAwsgAEExaiIILQAARQ0GIAoQiwIMBgtB4IXAAEEjQfiKwAAQgQIAC0EEDAkLIAIpA5ABIRIgAigCjAEhCSACKAKIASEFIAIoAoQBIgEgBkEGRw0CGiACIBI+AlwgAiAJNgJYIAIgBTYCVCACIAE2AlAgAkGAAWohCCMAQSBrIgYkACAGQQxqIg5BADYCACAGQoCAgIAQNwIEIAZBBGohECMAQeAAayIDJAAgAyACQdAAaiILNgIMAkACQANAIAMoAgwiASgCCCIERQRAQQAhAQwDCwJAAkACQAJAIAEoAgQiASwAACIHQQBIBEAgBEEKSw0BIAEgBGpBAWssAABBAE4NASADQUBrIANBDGoQnQEgAygCQARAIAMoAkQhAQwICyADKQNIIREMAgsgB61C/wGDIREgA0EMakEBEKIBDAILIAdB/wFxIAEsAAEiB0H/AXFBB3RqQYABayEEIANBDGoCfwJAAkACQAJAAkACQAJAAkAgB0EASARAIAQgASwAAiIHQf8BcUEOdGpBgIABayEEIAdBAE4NAiAEIAEsAAMiB0H/AXFBFXRqQYCAgAFrIQQgB0EATg0DIARBgICAgAFrrSERIAEsAAQiBEEATg0EIARB/wFxIAEsAAUiB0H/AXFBB3RqQYABayEEIAdBAE4NBSAEIAEsAAYiB0H/AXFBDnRqQYCAAWshBCAHQQBODQYgBCABLAAHIgdB/wFxQRV0akGAgIABayEEIAdBAE4NByABLAAIIgetQv8BgyETIARBgICAgAFrrUIchiARfCERIAdBAE4NCCABMQAJIhRCAloNASARIBNCOIZ8IBRCP4Z8QoCAgICAgICAgH99IRFBCgwJCyAErSERQQIMCAtBmJnAAEEOEJkCIQEMDQsgBK0hEUEDDAYLIAStIRFBBAwFCyAErUL/AYNCHIYgEXwhEUEFDAQLIAStQhyGIBF8IRFBBgwDCyAErUIchiARfCERQQcMAgsgBK1CHIYgEXwhEUEIDAELIBNCOIYgEXwhEUEJCxCiAQsgAyARNwMQIBFC/////w9WDQELIAMgEUIHgyITNwMoIBNCBloNAiARpyINQQhJBEBB6JjAAEEUEJkCIQEMBAsgE6chASADQQxqIQcjAEEQayIEJAACfyANQQN2Ig1BAUYEQEEAIAEgECAHENQBIgFFDQEaIAQgATYCDCAEQQxqQdaZwABBC0HhmcAAQQQQ3wEgBCgCDAwBCyABIA0gB0HkABBYCyEBIARBEGokACABRQ0BDAMLCyADQcwAakIBNwIAIANBATYCRCADQZCZwAA2AkAgA0HHADYCOCADIANBNGo2AkggAyADQRBqNgI0IANBHGoiASADQUBrEF4gARD3ASEBDAELIANBzABqQgE3AgAgA0EBNgJEIANBwJnAADYCQCADQccANgJcIAMgA0HYAGo2AkggAyADQShqNgJYIANBNGoiASADQUBrEF4gARD3ASEBCyADQeAAaiQAIAZBGGogDigCADYCACAGIAYpAgQ3AxACQCABRQRAIAggBikCBDcCACAIQQhqIA4oAgA2AgAM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akGQh8AAEJwCAAtBCEEYELQDAAtB4IXAAEEjQbySwAAQgQIAC0HghcAAQSNByIXAABCBAgALIABBOGoQxwIgAEExakGAAjsAACAGELgCIANBB0cNAUEFIQNCACEMQQEhBUEAIQdBAAshASACIAw3AzggAiAHNgI0IAIgBTYCMCACIAQ6ACwgAiADNgIoIAIgATsALSACIAFBEHY6AC9B4IfBACgCAEUNASACQegAakECNgIAIAJB/ABqQgI3AgAgAkECNgJ0IAJB6JLAADYCcCACQQM2AmAgAkENNgJEIAJBjInAADYCQCACIAJB3ABqNgJ4IAIgAkEoajYCZCACIAJBQGs2AlwgAkHwAGpBAUHIjsAAQbMHEIEBDAELIApBAToAAEGCAUGDASAEQQFxGwwBCyACQShqELcBIApBAToAAEGAAQshBSAAQRRqKAIAIgEgASgCAEEBazYCAEEBIQZBAAshASAAIAY6AEhBAyEGAkACQAJAIAFBAkYiBA0AIABBCGoQjQICQCABRQRAIAIgBTYCKCACQYABNgJwIAIgACACQfAAaiACQShqEO8BIAIoAgANAyACKAIEIgFBhAFPBEAgARAACyACKAJwIgFBhAFPBEAgARAACyACKAIoIgFBhAFJDQEgARAADAELIAIgBTYCKCACQYABNgJwIAJBCGogAEEEaiACQfAAaiACQShqEO8BIAIoAggNAyACKAIMIgFBhAFPBEAgARAACyACKAJwIgFBhAFPBEAgARAACyACKAIoIgFBhAFJDQAgARAACyAAKAIAIgFBhAFPBEAgARAAC0EBIQYgACgCBCIBQYQBSQ0AIAEQAAsgACAGOgCQASACQZABaiQAIAQPC0GZm8AAQRUQrwMAC0GZm8AAQRUQrwMAC5UYAhB/BH4jAEGgAWsiAiQAAkACQAJAAkACQAJAAn8CfwJAAkACQAJAAkACQAJ/AkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAAtAJABQQFrDgMbAgEACyAAQQhqIABBzABqQcQAELoDGgsCQAJAAkACQCAAQcgAai0AAEEBaw4DFAQAAQsCQCAAQcQAaiIMLQAAQQFrDgMcBAMACyAAQcUAai0AACEEIABBQGsoAgAhAwwBCyACQSBqIAAoAggQiAIgAigCICEDIABBFGogAigCJDYCACAA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6MAAai0AADoACyADIAFBEHZBD3FB9OjAAGotAAA6AAogAyABQRR2QQ9xQfTowABqLQAAOgAJIAFBAXJnQQJ2QQJrIgFBC08NASADQQZqIAFqIgJBkIDBAC8AADsAACACQQJqQZKAwQAtAAA6AAAgACADKQEGNwAAIABBCGogA0EOai8BADsAACAAQQo6AAsgACABOgAKDAMLIANBCGpBADoAACADQQA7AQYgA0H9ADoADyADIAFBD3FB9OjAAGotAAA6AA4gAyABQQR2QQ9xQfTowABqLQAAOgANIAMgAUEIdkEPcUH06MAAai0AADoADCADIAFBDHZBD3FB9OjAAGotAAA6AAsgAyABQRB2QQ9xQfTowABqLQAAOgAKIAMgAUEUdkEPcUH06MAAai0AADoACSABQQFyZ0ECdkECayIBQQtPDQEgA0EGaiABaiICQZCAwQAvAAA7AAAgAkECakGSgMEALQAAOgAAIAAgAykBBjcAACAAQQhqIANBDmovAQA7AAAgAEEKOgALIAAgAToACgwCCyABQQpBgIDBABC4AQALIAFBCkGAgMEAELgBAAsgA0EQaiQAC7gFAQh/QStBgIDEACAAKAIcIghBAXEiBhshDCAEIAZqIQYCQCAIQQRxRQRAQQAhAQwBCwJAIAJBEE8EQCABIAIQTCEFDAELIAJFBEAMAQsgAkEDcSEJAkAgAkEESQRADAELIAJBfHEhCgNAIAUgASAHaiILLAAAQb9/SmogC0EBaiwAAEG/f0pqIAtBAmosAABBv39KaiALQQNqLAAAQb9/SmohBSAKIAdBBGoiB0cNAAsLIAlFDQAgASAHaiEHA0AgBSAHLAAAQb9/SmohBSAHQQFqIQcgCUEBayIJDQALCyAFIAZqIQYLAkACQCAAKAIARQRAQQEhBSAAKAIUIgYgACgCGCIAIAwgASACEJgCDQEMAgsgBiAAKAIEIgdPBEBBASEFIAAoAhQiBiAAKAIYIgAgDCABIAIQmAINAQwCCyAIQQhxBEAgACgCECEIIABBMDYCECAALQAgIQpBASEFIABBAToAICAAKAIUIgkgACgCGCILIAwgASACEJgCDQEgByAGa0EBaiEFAkADQCAFQQFrIgVFDQEgCUEwIAsoAhARAQBFDQALQQEPC0EBIQUgCSADIAQgCygCDBEEAA0BIAAgCjoAICAA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IARBADYCGAwBCyAEIAY2AhwgBEEBNgIYIAQgACgCBDYCFAsgBEEIaiACIAUgBEEUahCRASAEKAIMIQIgBCgCCEUEQCAAIAU2AgAgACACNgIEDAILIAJBgYCAgHhGDQEgAkUNACACIARBEGooAgAQtAMACxCbAgALIARBIGokACAAKAIIIQILIAAgAkEBajYCCCAAKAIEIAJqIAE6AAAMAgsgAyABQT9xQYABcjoADSADIAFBBnZBwAFyOgAMQQILIQEgASAAKAIAIAAoAggiAmtLBEAgACACIAEQfiAAKAIIIQILIAAoAgQgAmogA0EMaiABELoDGiAAIAEgAmo2AggLIANBEGokAEEAC74CAgV/AX4jAEEwayIEJABBJyECAkAgAEKQzgBUBEAgACEHDAELA0AgBEEJaiACaiIDQQRrIAAgAEKQzgCAIgdCkM4Afn2nIgVB//8DcUHkAG4iBkEBdEHC7MAAai8AADsAACADQQJrIAUgBkHkAGxrQf//A3FBAXRBwuzAAGovAAA7AAAgAkEEayECIABC/8HXL1YgByEADQALCyAHpyIDQeMASwRAIAJBAmsiAiAEQQlqaiAHpyIDIANB//8DcUHkAG4iA0HkAGxrQf//A3FBAXRBwuzAAGovAAA7AAALAkAgA0EKTwRAIAJBAmsiAiAEQQlqaiADQQF0QcLswABqLwAAOwAADAELIAJBAWsiAiAEQQlqaiADQTBqOgAACyABQaDowABBACAEQQlqIAJqQScgAmsQTyAEQTBqJAALtAIBA38jAEGAAWsiBCQAAkACQAJ/AkAgASgCHCICQRBxRQRAIAJBIHENASAANQIAIAEQZgwCCyAAKAIAIQBBACECA0AgAiAEakH/AGpBMEHXACAAQQ9xIgNBCkkbIANqOgAAIAJBAWshAiAAQRBJIABBBHYhAEUNAAsgAkGAAWoiAEGAAUsNAiABQcDswABBAiACIARqQYABakEAIAJrEE8MAQsgACgCACEAQQAhAgNAIAIgBGpB/wBqQTBBNyAAQQ9xIgNBCkkbIANqOgAAIAJBAWshAiAAQRBJIABBBHYhAEUNAAsgAkGAAWoiAEGAAUsNAiABQcDswABBAiACIARqQYABakEAIAJrEE8LIARBgAFqJAAPCyAAQYABQbDswAAQuAEACyAAQYABQbDswAAQuAEAC5ADAQV/IwBBEGsiAyQAIABBADoAFAJAAkAgACgCACIBQf////8HSQRAAkAgAEEQaigCACIFRQ0AIAENAgNAIABBfzYCACAAKAIQIgFFBEAgAEEANgIADAILIAAgAUEBazYCECAAKAIIIAAoAgwiAkECdGooAgAhASAAQQA2AgAgACACQQFqIgIgACgCBCIEQQAgAiAETxtrNgIMIAMgATYCCCABKAIIDQQgAUF/NgIIIAEgAUEMaiICKAIAIgQEfyABQRxqQQA6AAAgAyABQRRqNgIMIAQgA0EMaiABQRBqKAIAKAIMEQEARQRAIAIQ/QEgAkEANgIACyABKAIIQQFqBUEACzYCCCADQQhqELABIAVBAWsiBUUNASAAKAIARQ0ACwwCCyADQRBqJAAPCyMAQTBrIgAkACAAQRhqQgE3AgAgAEEBNgIQIABB1OnAADYCDCAAQeABNgIoIAAgAEEkajYCFCAAIABBL2o2AiQgAEEMakGM1cAAEJwCAAtBnNXAABDwAQALQdDWwAAQ8AEAC90CAQR/IwBBEGsiBCQAIAAgACgCCCICQQEgAhs2AggCQAJ/AkACQCACDgMBAwADCyABKAIEIQIgASgCAEEIagwBCwJAAkAgACgCACIFRQRAIAEoAgQhAiABKAIAIQMMAQsgASgCACEDIAAoAgQiAiABKAIEIgFHBEAgASECDAELIAUoAgAgAygCAEcNACAFKAIEIAMoAgRHDQAgBSgCCCADKAIIRw0AIAUoAgwgAygCDEYNAQsgBEEIaiACIAMoAgARAwAgBCgCDCEBIAQoAgghAiAAKAIAIgMEQCAAKAIEIAMoAgwRAAALIAAgATYCBCAAIAI2AgALIABBACAAKAIIIgEgAUEBRiIBGzYCCCABDQEgACgCACEBIABBADYCACABRQRAQYziwABBK0Gs48AAEIECAAsgACgCBCECIABBADYCCCABQQRqCyEAIAIgACgCABEAAAsgBEEQaiQAC7kCAQV/IwBBIGsiAiQAAkAgAC0ACAR/IAJBDGogACgCBEEIahDEASACKAIMDQEgAkEUai0AACEEAkACQCACKAIQIgNBDGotAAAiBUUEQCAAQQA6AAggBA0CQayIwQAoAgBB/////wdxRQ0CEMoDRQ0BDAILIAEEfyACIAEoAgAiACgCBCAAKAIAKAIAEQMAIAIoAgQhACACKAIABUEACyEBIAMoAgQiBgRAIANBCGooAgAgBigCDBEAAAsgAyABNgIEIANBCGogADYCACAEDQFBrIjBACgCAEH/////B3FFDQEQygMNAQsgA0EBOgABCyADQQA6AAAgBUEARwVBAAsgAkEgaiQADwsgAiACKAIQNgIYIAIgAkEUai0AADoAHEG/rsAAQSsgAkEYakHsrsAAQdyqwAAQsgEAC7YCAQR/IABCADcCECAAAn9BACABQYACSQ0AGkEfIAFB////B0sNABogAUEGIAFBCHZnIgNrdkEBcSADQQF0a0E+agsiAjYCHCACQQJ0QbCIwQBqIQQCQEHMi8EAKAIAIgVBASACdCIDcUUEQEHMi8EAIAMgBXI2AgAgBCAANgIAIAAgBDYCGAwBCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEEA0AgAyAEQR12QQRxakEQaiIFKAIAIgJFDQIgBEEBdCEEIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAFIAA2AgAgACADNgIYCyAAIAA2AgwgACAANgIIC7gCAQd/IwBBEGsiAiQAQQEhBwJAAkAgASgCFCIEQScgAUEYaigCACgCECIFEQEADQAgAiAAKAIAQYECEE4CQCACLQAAQYABRgRAIAJBCGohBkGAASEDA0ACQCADQYABRwRAIAItAAoiACACLQALTw0EIAIgAEEBajoACiAAQQpPDQYgACACai0AACEBDAELQQAhAyAGQQA2AgAgAigCBCEBIAJCADcDAAsgBCABIAURAQBFDQALDAILQQogAi0ACiIBIAFBCk0bIQAgAi0ACyIDIAEgASADSRshBgNAIAEgBkYNASACIAFBAWoiAzoACiAAIAFGDQMgASACaiEIIAMhASAEIAgtAAAgBREBAEUNAAsMAQsgBEEnIAURAQAhBwsgAkEQaiQAIAcPCyAAQQpBlIDBABC5AQALoQIBAn8jAEEQayICJAACQAJ/AkAgAUGAAU8EQCACQQA2AgwgAUGAEEkNASABQYCABEkEQCACIAFBP3FBgAFyOgAOIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDDAMLIAIgAUE/cUGAAXI6AA8gAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANIAIgAUESdkEHcUHwAXI6AAxBBAwCCyAAKAIIIgMgACgCAEYEfyAAIAMQ7gEgACgCCAUgAwsgACgCBGogAToAACAAIAAoAghBAWo2AggMAgsgAiABQT9xQYABcjoADSACIAFBBnZBwAFyOgAMQQILIQEgACACQQxqIgAgACABahD1AQsgAkEQaiQAQQALxAICBH8BfiMAQUBqIgMkACAAKAIAIQUgAAJ/QQEgAC0ACA0AGiAAKAIEIgQoAhwiBkEEcUUEQEEBIAQoAhRB+OvAAEGP7MAAIAUbQQJBASAFGyAEQRhqKAIAKAIMEQQADQEaIAEgBCACKAIMEQEADAELIAVFBEBBASAEKAIUQZDswABBAiAEQRhqKAIAKAIMEQQADQEaIAQoAhwhBgsgA0EBOgAbIANBNGpB3OvAADYCACADIAQpAhQ3AgwgAyADQRtqNgIUIAMgBCkCCDcCJCAEKQIAIQcgAyAGNgI4IAMgBCgCEDYCLCADIAQtACA6ADwgAyAHNwIcIAMgA0EMajYCMEEBIAEgA0EcaiACKAIMEQEADQAaIAMoAjBB+uvAAEECIAMoAjQoAgwRBAALOgAIIAAgBUEBajYCACADQUBrJAAgAAuYAgECfyMAQRBrIgIkAAJAIAAgAkEMagJ/AkAgAUGAAU8EQCACQQA2AgwgAUGAEEkNASABQYCABEkEQCACIAFBP3FBgAFyOgAOIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDDAMLIAIgAUE/cUGAAXI6AA8gAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANIAIgAUESdkEHcUHwAXI6AAxBBAwCCyAAKAIIIgMgACgCAEYEfyAAIAMQ7gEgACgCCAUgAwsgACgCBGogAToAACAAIAAoAghBAWo2AggMAgsgAiABQT9xQYABcjoADSACIAFBBnZBwAFyOgAMQQILEJADCyACQRBqJABBAAvhAwMDfwF8AX4jAEFAaiIDJAACQAJAIABB/wFxIgRBAkcEQCADIAA6AAsgA0EBOgAKIARBAUcNASADQgA3AxhBASADQRhqIAIQkwEiAA0CIAMrAxghBiABKAIIIgAgASgCAEYEQCABIAAQ6wEgASgCCCEACyABKAIEIABBA3RqIAY5AwAgASABKAIIQQFqNgIIQQAhAAwCCyMAQRBrIgQkACAEIAIQUwJAAkAgBCgCAEUEQCAEKQMIIgcgAhDCAyIArVYNASACEMIDIAAgB6drIgVLBEADQCAEQgA3AwBBASAEIAIQkwEiAA0EIAQrAwAhBiABKAIIIgAgASgCAEYEQCABIAAQ6wEgASgCCCEACyABKAIEIABBA3RqIAY5AwAgASABKAIIQQFqNgIIIAIQwgMgBUsNAAsLQQAhACACEMIDIAVGDQJBoKTAAEEZEJkCIQAMAgsgBCgCBCEADAELQbmkwABBEBCZAiEACyAEQRBqJAAMAQsgA0E8akHKADYCACADQSRqQgI3AgAgA0EDNgIcIANBqKXAADYCGCADQcoANgI0IAMgA0EwajYCICADIANBCmo2AjggAyADQQtqNgIwIANBDGoiACADQRhqEF4gABD3ASEACyADQUBrJAAgAAudBwEKfyMAQTBrIgUkAAJAAkACQAJAAkAgASgCAEECRg0AIAVBDGohBiMAQTBrIgMkACADQQxqIQQgASgCECEHIwBBMGsiCSQAAkAgBygCAEECRwRAIAlBEGohCgNAIAlBDGohCAJAIAdBEGogAhBkIgsEQCALKAIAIgwoAghFDQkgCCAMQQxqIAcgAhB8IAsQgwIMAQsgCEGDgICAeDYCAAwACyAJKAIMIghBgoCAgHhHBEAgCEGDgICAeEcEQCAEIAopAgA3AgQgBEEcaiAKQRhqKQIANwIAIARBFGogCkEQaikCADcCACAEQQxqIApBCGopAgA3AgALIAQgCDYCAAwDCyAHKAIAQQJHDQALCyAEQYKAgIB4NgIACyAJQTBqJAACQAJAAkACQAJAIAMoAgwiBEH+////B2oOAgACAQsgASgCACEEIAFBAjYCACAEQQJGDQIgBxDoAiAHIAQ2AgAgBkGCgICAeDYCACAHIAEpAgQ3AgQgB0EMaiABQQxqKAIANgIADAMLIAYgAykCEDcCBCAGQRxqIANBKGopAgA3AgAgBkEUaiADQSBqKQIANwIAIAZBDGogA0EYaikCADcCAAsgBiAENgIADAELQbvAwABBHEG4wcAAEN4BAAsgA0EwaiQAIAUoAgwiA0H+////B2oOAgACAQsgBUEMaiEDIAEoAhAhBCMAQTBrIgEkAAJAAkACQCAEQRBqIAIQZCIGBEAgBigCACIHKAIIRQ0HIAFBDGogB0EMaiAEIAIQfAJAIAEoAgwiAkH+////B2oOAgADAgsgBigCACgCCEUNByADQYKAgIB4NgIAIAYQgwIMAwsgA0GDgICAeDYCAAwCCyADIAEpAhA3AgQgA0EcaiABQShqKQIANwIAIANBFGogAUEgaikCADcCACADQQxqIAFBGGopAgA3AgALIAMgAjYCACAGEIMCDAALIAFBMGokAAJAAkACQCAFKAIMIgFB/v///wdqDgIAAgELIABBgoCAgHg2AgAMBAsgACAFKQIQNwIEIABBHGogBUEoaikCADcCACAAQRRqIAVBIGopAgA3AgAgAEEMaiAFQRhqKQIANwIACyAAIAE2AgAMAgsgACAFKQIQNwIEIABBHGogBUEoaikCADcCACAAQRRqIAVBIGopAgA3AgAgAEEMaiAFQRhqKQIANwIACyAAIAM2AgALIAVBMGokAA8LQZSuwABBK0HIqcAAEIECAAuPAgECfyMAQTBrIgIkAAJ/AkACQAJAQQIgACgCAEGAgICAeHMiAyADQQJPG0EBaw4CAQIACyACQSRqQgA3AgAgAkEBNgIcIAJBrNLAADYCGCACQfzQwAA2AiAgASACQRhqEIMDDAILIAJBEGpBkAE2AgAgAkEkakICNwIAIAJBAjYCHCACQdjSwAA2AhggAiAAQQRqNgIMIAJByQA2AgggAiAAQRBqNgIEIAIgAkEEajYCICABIAJBGGoQgwMMAQsgAiAANgIUIAJBJGpCATcCACACQQE2AhwgAkHo0sAANgIYIAJBkQE2AgggAiACQQRqNgIgIAIgAkEUajYCBCABIAJBGGoQgwMLIAJBMGokAAvLAQIDfwF+IwBBEGsiBCQAAkACQAJAIAGtIAKtfiIGQiCIpw0AIAanIgFBB2oiAyABSQ0AIAIgA0F4cSIDakEIaiIBIANJDQAgAUH4////B00NAQsQ6gEgACAEKQMANwIEIABBADYCAAwBCyABBH9BiYfBAC0AABogAUEIEIkDBUEICyIFBEAgAEEANgIMIAAgAkEBayIBNgIEIAAgAyAFajYCACAAIAEgAkEDdkEHbCABQQhJGzYCCAwBC0EIIAEQtAMACyAEQRBqJAAL1AQCC38CfiMAQTBrIgQkAAJAIAEoAgAiCUUEQCAAQQQ2AgAMAQsgBEEEaiEHIAlBCGohCiMAQSBrIgIkAANAIAJBDGohBSMAQRBrIggkAAJAAkACQCAKKAIEIgMoAhQiBgRAIAogBjYCBCADKAIAQQRHDQEgBigCACILQQRGDQIgBkEENgIAIAhBCGoiDCAGQQxqKQIANwMAIAggBikCBDcDAAJAAn8CQAJAIAMoAgBBAWsOAgABAwsgA0EEagwBCyADQQhqCxDpAgsgAxBQIAUgCzYCACAFIAgpAwA3AgQgBUEMaiAMKQMANwIADAMLIAooAgAgA0cEQCAFQQU2AgAMAwsgBUEENgIADAILQezNwABBKUH4zsAAEIECAAtBiM/AAEEpQbTPwAAQgQIACyAIQRBqJAAgAigCDCIDQQNrQQAgA0EGcUEERhsiA0ECRg0ACwJAIANBAUYEQCAHQQQ2AgAMAQsgByACKQIMNwIAIAdBEGogAkEcaigCADYCACAHQQhqIAJBFGopAgA3AgALIAJBIGokACAEKAIEQQRHBEAgACAEKQIEIg03AgAgBEEoaiAEQRRqKAIAIgE2AgAgBEEgaiAEQQxqKQIAIg43AwAgAEEIaiAONwIAIABBEGogATYCACAJQRBqIgAgACgCAEEBazYCACAEIA03AxgMAQsgCUEQaigCAARAIABBBTYCAAwBCwJAIAEoAgAiAkUNACACIAIoAgAiAkEBazYCACACQQFHDQAgARDaAQsgAEEENgIAIAFBADYCAAsgBEEwaiQAC58LAgl/A34jAEHQAGsiBCQAIARBOGogASACEP8CAkAgBCgCOCIBQQhHBEAgBEEYaiICIARBzABqIgYoAgA2AgAgBEEQaiAEQcQAaiIHKQIANwMAIAQgBCkCPDcDCAJAIAFBB0YEQCAEQQc2AiAMAQsgByAEQRBqKQMANwIAIAYgAigCADYCACAEIAE2AjggBCAEKQMINwI8IARBIGohByMAQSBrIgYkACAEQThqIgJBBGohAQJAIAIoAgAiCEEGRgRAIAZBCGogAUEIaikCADcDACAGIAEpAgA3AwAjAEEQayIIJAAgCEIANwMIIAZBEGoiCgJ/IAhBCGohCyMAQeAAayICJAAgAiAGNgIMAkACQANAIAIoAgwiASgCCCIDRQRAQQAhAQwDCwJAAkACQAJAIAEoAgQiASwAACIFQQBIBEAgA0EKSw0BIAEgA2pBAWssAABBAE4NASACQUBrIAJBDGoQnQEgAigCQARAIAIoAkQhAQwICyACKQNIIQwMAgsgBa1C/wGDIQwgAkEMakEBEKIBDAILIAVB/wFxIAEsAAEiBUH/AXFBB3RqQYABayEDIAJBDGoCfwJAAkACQAJAAkACQAJAAkAgBUEASARAIAMgASwAAiIFQf8BcUEOdGpBgIABayEDIAVBAE4NAiADIAEsAAMiBUH/AXFBFXRqQYCAgAFrIQMgBUEATg0DIANBgICAgAFrrSEMIAEsAAQiA0EATg0EIANB/wFxIAEsAAUiBUH/AXFBB3RqQYABayEDIAVBAE4NBSADIAEsAAYiBUH/AXFBDnRqQYCAAWshAyAFQQBODQYgAyABLAAHIgVB/wFxQRV0akGAgIABayEDIAVBAE4NByABLAAIIgWtQv8BgyENIANBgICAgAFrrUIchiAMfCEMIAVBAE4NCCABMQAJIg5CAloNASAMIA1COIZ8IA5CP4Z8QoCAgICAgICAgH99IQxBCgwJCyADrSEMQQIMCAtBmJnAAEEOEJkCIQEMDQsgA60hDEEDDAYLIAOtIQxBBAwFCyADrUL/AYNCHIYgDHwhDEEFDAQLIAOtQhyGIAx8IQxBBgwDCyADrUIchiAMfCEMQQcMAgsgA61CHIYgDHwhDEEIDAELIA1COIYgDHwhDEEJCxCiAQsgAiAMNwMQIAxC/////w9WDQELIAIgDEIHgyINNwMoIA1CBloNAiAMpyIJQQhJBEBB6JjAAEEUEJkCIQEMBAsgDachASACQQxqIQUjAEEQayIDJAACfyAJQQN2IglBAUYEQEEAIAEgCyAFEJMBIgFFDQEaIAMgATYCDCADQQxqQcWawABBEkHXmsAAQQsQ3wEgAygCDAwBCyABIAkgBUHkABBYCyEBIANBEGokACABRQ0BDAMLCyACQcwAakIBNwIAIAJBATYCRCACQZCZwAA2AkAgAkHHADYCOCACIAJBNGo2AkggAiACQRBqNgI0IAJBHGoiASACQUBrEF4gARD3ASEBDAELIAJBzABqQgE3AgAgAkEBNgJEIAJBwJnAADYCQCACQccANgJcIAIgAkHYAGo2AkggAiACQShqNgJYIAJBNGoiASACQUBrEF4gARD3ASEBCyACQeAAaiQAIAFFBEAgCiAIKwMIOQMIQQAMAQsgCiABNgIEQQELNgIAIAZBDGogBigCBCAGKAIIIAYoAgAoAggRAgAgCEEQaiQAIAcCfyAGKAIQRQRAIAcgBisDGDkDCEEGDAELIAcgBigCFDYCBEEBCzYCAAwBCyACKAIUIQIgByAINgIAIAcgAjYCFCAHIAEpAgA3AgQgB0EMaiABQQhqKQIANwIACyAGQSBqJAALIAAgBCkDIDcDACAAQRBqIARBMGopAwA3AwAgAEEIaiAEQShqKQMANwMADAELIABBCDYCAAsgBEHQAGokAAuoCwILfwN+IwBB0ABrIgQkACAEQThqIAEgAhD/AgJAIAQoAjgiAUEIRwRAIARBGGoiAiAEQcwAaiIGKAIANgIAIARBEGogBEHEAGoiBykCADcDACAEIAQpAjw3AwgCQCABQQdGBEAgBEEHNgIgDAELIAcgBEEQaikDADcCACAGIAIoAgA2AgAgBCABNgI4IAQgBCkDCDcCPCAEQSBqIQcjAEEgayIGJAAgBEE4aiICQQRqIQECQCACKAIAIghBBkYEQCAGQRBqIAFBCGopAgA3AwAgBiABKQIANwMIIAZBGGohCiMAQRBrIggkACAIQQA2AgwgCEEMaiEMIwBB4ABrIgIkACACIAZBCGoiCTYCDAJAAkADQCACKAIMIgEoAggiA0UEQEEAIQEMAwsCQAJAAkACQCABKAIEIgEsAAAiBUEASARAIANBCksNASABIANqQQFrLAAAQQBODQEgAkFAayACQQxqEJ0BIAIoAkAEQCACKAJEIQEMCAsgAikDSCEODAILIAWtQv8BgyEOIAJBDGpBARCiAQwCCyAFQf8BcSABLAABIgVB/wFxQQd0akGAAWshAyACQQxqAn8CQAJAAkACQAJAAkACQAJAIAVBAEgEQCADIAEsAAIiBUH/AXFBDnRqQYCAAWshAyAFQQBODQIgAyABLAADIgVB/wFxQRV0akGAgIABayEDIAVBAE4NAyADQYCAgIABa60hDiABLAAEIgNBAE4NBCADQf8BcSABLAAFIgVB/wFxQQd0akGAAWshAyAFQQBODQUgAyABLAAGIgVB/wFxQQ50akGAgAFrIQMgBUEATg0GIAMgASwAByIFQf8BcUEVdGpBgICAAWshAyAFQQBODQcgASwACCIFrUL/AYMhDyADQYCAgIABa61CHIYgDnwhDiAFQQBODQggATEACSIQQgJaDQEgDiAPQjiGfCAQQj+GfEKAgICAgICAgIB/fSEOQQoMCQsgA60hDkECDAgLQZiZwABBDhCZAiEBDA0LIAOtIQ5BAwwGCyADrSEOQQQMBQsgA61C/wGDQhyGIA58IQ5BBQwECyADrUIchiAOfCEOQQYMAwsgA61CHIYgDnwhDkEHDAILIAOtQhyGIA58IQ5BCAwBCyAPQjiGIA58IQ5BCQsQogELIAIgDjcDECAOQv////8PVg0BCyACIA5CB4MiDzcDKCAPQgZaDQIgDqciC0EISQRAQeiYwABBFBCZAiEBDAQLIA+nIQEgAkEMaiEFIwBBEGsiAyQAAn8gC0EDdiILQQFGBEBBACABIAwgBRCXASIBRQ0BGiADIAE2AgwgA0EMakG4msAAQQpBwprAAEEDEN8BIAMoAgwMAQsgASALIAVB5AAQWAshASADQRBqJAAgAUUNAQwDCwsgAkHMAGpCATcCACACQQE2AkQgAkGQmcAANgJAIAJBxwA2AjggAiACQTRqNgJIIAIgAkEQajYCNCACQRxqIgEgAkFAaxBeIAEQ9wEhAQwBCyACQcwAakIBNwIAIAJBATYCRCACQcCZwAA2AkAgAkHHADYCXCACIAJB2ABqNgJIIAIgAkEoajYCWCACQTRqIgEgAkFAaxBeIAEQ9wEhAQsgAkHgAGokAAJAIAFFBEAgCiAIKAIMNgIEDAELIAogATYCBEEBIQ0LIAogDTYCACAJQQxqIAkoAgQgCSgCCCAJKAIAKAIIEQIAIAhBEGokACAHAn8gBigCGEUEQCAHIAYoAhw2AgRBBgwBCyAHIAYoAhw2AgRBAQs2AgAMAQsgAigCFCECIAcgCDYCACAHIAI2AhQgByABKQIANwIEIAdBDGogAUEIaikCADcCAAsgBkEgaiQACyAAIAQpAyA3AwAgAEEQaiAEQTBqKQMANwMAIABBCGogBEEoaikDADcDAAwBCyAAQQg2AgALIARB0ABqJAAL+AECA38BfiMAQTBrIgIkACABKAIAQYCAgIB4RgRAIAEoAgwhAyACQSxqIgRBADYCACACQoCAgIAQNwIkIAJBJGpB6OPAACADEFIaIAJBIGogBCgCACIDNgIAIAIgAikCJCIFNwMYIAFBCGogAzYCACABIAU3AgALIAEpAgAhBSABQoCAgIAQNwIAIAJBEGoiAyABQQhqIgEoAgA2AgAgAUEANgIAQYmHwQAtAAAaIAIgBTcDCEEMQQQQiQMiAUUEQEEEQQwQtAMACyABIAIpAwg3AgAgAUEIaiADKAIANgIAIABBlOXAADYCBCAAIAE2AgAgAkEwaiQAC5wGAQt/IwBBMGsiBSQAAkAgASgCACIIRQRAIABBADYCAAwBCyAFQQxqIQkgCEEIaiECIwBBIGsiBCQAA0AgBEEMaiEKIwBBEGsiByQAAkACQAJAIAIoAgQiAygCFCIGBEAgAiAGNgIEIAMoAgANASAGKAIARQ0CQQAhCyAGQQA2AgAgB0EIaiIMIAZBDGopAgA3AwAgByAGKQIENwMAAkAgAygCAEUNACADKAIEIgYEQCADQRBqIANBCGooAgAgA0EMaigCACAGKAIIEQIADAELIANBCGoQ6QILIAMQUCAKQQxqIAwpAwA3AgAgCiAHKQMANwIEDAMLQQFBAiADIAIoAgBGGyELDAILQbS9wABBKUHAvsAAEIECAAtB0L7AAEEpQfy+wAAQgQIACyAKIAs2AgAgB0EQaiQAIAQoAgwiA0ECRg0ACyAJAn8gA0EBRwRAIAkgBCkCEDcCBCAJQQxqIARBGGopAgA3AgBBAQwBC0EACzYCACAEQSBqJAAgAAJ/IAUoAgwEQCAFQShqIgMgBUEYaikCADcDACAFIAUpAhA3AyAjAEEgayICJAACQAJAAkAgASgCACIBRQ0AIAFBEGohAQNAIAIgARChASACKAIAIgRBAkYNAAsgBEEBRg0AIAIgAigCBCIBNgIIIAJBDGogAUEIahDEASACKAIMDQEgAkEUai0AACEEIAIoAhAiAUEEahDTAgJAIAQNAEGsiMEAKAIAQf////8HcUUNABDKAw0AIAFBAToAAQsgAUEAOgAAIAIoAggiASABKAIAIgFBAWs2AgAgAUEBRw0AIAJBCGoQ5QELIAJBIGokAAwBCyACIAIoAhA2AhggAiACQRRqLQAAOgAcQb+uwABBKyACQRhqQeyuwABBvKrAABCyAQALIAAgBSkDIDcCBCAAQQxqIAMpAwA3AgAgCEEcaiIAIAAoAgBBAWs2AgBBAQwBC0ECIAhBHGooAgANABoCQCABKAIAIgBFDQAgACAAKAIAIgBBAWs2AgAgAEEBRw0AIAEQzgELIAFBADYCAEEACzYCAAsgBUEwaiQAC/MBAQR/IwBBEGsiAyQAIAEoAgQhBAJAAkAgASgCCCIFIAEoAgAiAkcEQEGJh8EALQAAGkEMQQQQiQMiAUUNAiABQQE2AgggASACNgIEIAEgBDYCAEHI28AAIQIMAQsgAyACNgIMIAMgBDYCCCADIAI2AgQgA0EEahDcASADKAIMIgVFBEBBsNrAACECQQAhBUHo2cAAIQRBACEBDAELQZzbwAAhAiADKAIIIgRBAXEEQCAEIQEMAQsgBEEBciEBQZDbwAAhAgsgACABNgIMIAAgBTYCCCAAIAQ2AgQgACACNgIAIANBEGokAA8LQQRBDBC0AwALzQEAAkACQCABBEAgAkEASA0BAkACQAJ/IAMoAgQEQCADQQhqKAIAIgFFBEAgAkUEQEEBIQEMBAtBiYfBAC0AABogAkEBEIkDDAILIAMoAgAgAUEBIAIQ/QIMAQsgAkUEQEEBIQEMAgtBiYfBAC0AABogAkEBEIkDCyIBRQ0BCyAAIAE2AgQgAEEIaiACNgIAIABBADYCAA8LIABBATYCBAwCCyAAQQA2AgQMAQsgAEEANgIEIABBATYCAA8LIABBCGogAjYCACAAQQE2AgALhAIBAn8jAEEgayIGJABBrIjBAEGsiMEAKAIAIgdBAWo2AgACQAJAIAdBAEgNAEH4i8EALQAADQBB+IvBAEEBOgAAQfSLwQBB9IvBACgCAEEBajYCACAGIAU6AB0gBiAEOgAcIAYgAzYCGCAGIAI2AhQgBkHc5cAANgIQIAZBvOPAADYCDEGciMEAKAIAIgJBAEgNAEGciMEAIAJBAWo2AgBBnIjBAEGkiMEAKAIABH8gBiAAIAEoAhARAwAgBiAGKQMANwIMQaSIwQAoAgAgBkEMakGoiMEAKAIAKAIUEQMAQZyIwQAoAgBBAWsFIAILNgIAQfiLwQBBADoAACAEDQELAAsAC6UFAQZ/IwBBMGsiBCQAAkAgAigCACIGQQJGBEAgAEGCgICAeDYCAAwBCyMAQRBrIgUkAAJAAkAgBEEMaiABQTRqEMQDQf//A3EEf0GCgICAeAUgBUEIaiADKAIAIgMoAgQgAygCACgCABEDACABKAIAIgMoAggNASAFKAIMIQggBSgCCCEJIANBfzYCCCADQQxqKAIAIgcEfyADQRBqKAIAIAcoAgwRAAAgAygCCEEBagVBAAshByADIAk2AgwgAyAHNgIIIANBEGogCDYCAEGDgICAeAs2AgAgBUEQaiQADAELQYzNwAAQ8AEACwJAAkACQCAEKAIMIgNB/v///wdqDgIAAgELIAJBAjYCACAEQRhqIAJBDGooAgA2AgAgBCAGNgIMIAQgAikCBDcCECMAQSBrIgIkACABQTRqIQMCfyAEQQxqIgEoAgBFBEAgAkEYaiABQQxqKAIAIgU2AgAgAiABKQIENwMQIAIoAhQhBiMAQRBrIgEkACADKAIAIAYgBRARIAFBCGoQ0gIgASgCDCEDIAIgASgCCDYCACACIAM2AgQgAUEQaiQAIAIoAgAhAyACKAIEDAELIAJBGGogAUEMaigCACIFNgIAIAIgASkCBDcDECACKAIUIQYjAEEQayIBJAAgAygCACAGIAUQEiABQQhqENICIAEoAgwhAyACQQhqIgUgASgCCDYCACAFIAM2AgQgAUEQaiQAIAIoAgghAyACKAIMCyEBIAJBEGoQ6QICQCADRQRAIABBgoCAgHg2AgAMAQsgACABEM8BCyACQSBqJAAMAgsgACAEKQIQNwIEIABBHGogBEEoaikCADcCACAAQRRqIARBIGopAgA3AgAgAEEMaiAEQRhqKQIANwIACyAAIAM2AgALIARBMGokAAvFAQECfyMAQSBrIgQkAAJAIAIgA2oiAyACSQ0AQQggASgCACICQQF0IgUgAyADIAVJGyIDIANBCE0bIgNBf3NBH3YhBQJAIAJFBEAgBEEANgIYDAELIAQgAjYCHCAEQQE2AhggBCABKAIENgIUCyAEQQhqIAUgAyAEQRRqEJABIAQoAgwhBSAEKAIIBEAgBEEQaigCACEDDAELIAEgAzYCACABIAU2AgRBgYCAgHghBQsgACADNgIEIAAgBTYCACAEQSBqJAALywEBAn8jAEEgayIDJAACQAJAIAEgASACaiIBSw0AQQggACgCACICQQF0IgQgASABIARJGyIBIAFBCE0bIgRBf3NBH3YhAQJAIAJFBEAgA0EANgIYDAELIAMgAjYCHCADQQE2AhggAyAAKAIENgIUCyADQQhqIAEgBCADQRRqEJEBIAMoAgwhASADKAIIRQRAIAAgBDYCACAAIAE2AgQMAgsgAUGBgICAeEYNASABRQ0AIAEgA0EQaigCABC0AwAL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AAogAyAAOgALAn8gAEH/AXFFBEAgA0EYaiACEFMgAygCGEUEQCABIAMpAyA+AgBBAAwCCyADKAIcDAELIANBPGpBygA2AgAgA0EkakICNwIAIANBAzYCHCADQailwAA2AhggA0HKADYCNCADIANBMGo2AiAgAyADQQpqNgI4IAMgA0ELajYCMCADQQxqIgAgA0EYahBeIAAQ9wELIANBQGskAAuMAgEFfyMAQUBqIgIkACACIAE2AgQgAkEEaiIDKAIAEBghBSMAQSBrIgEkACABQQhqIAMoAgAQGSABKAIIIQQgASABKAIMIgY2AhwgASAENgIYIAEgBjYCFCABQRRqIgQQ3QEgASAEKQIENwMAIAJBCGogASgCACABKAIEEPwCIAFBIGokACADKAIAEBdBAEchASACQThqIAJBEGooAgA2AgAgAkE+aiABOgAAIAJBPGogBTsBACACIAIpAwg3AjAgAkEBNgIsIAJBFGoiASAAIAJBLGoiAxCsASABELYCIAJBAzYCLCABIAAgAxCsASABELYCIAIoAgQiAEGEAU8EQCAAEAALIAJBQGskAAu1AQEDfyMAQUBqIgIkACAAKAIAIQMgAiAAKAIENgIQIAIgAzYCDCADKAIIRQRAIANBDGooAgAhACADQv////8PNwIIIAMgAAR/IANBEGooAgAgACgCBBEAACADKAIIQQFqBSAECzYCCCACQQA2AiwgAkEUaiIEIAJBEGoiACACQSxqEKwBIAQQtgIgAUGEAU8EQCABEAALIAJBDGoQ4QEgABC2ASACQUBrJAAPC0GIzMAAEPABAAu1AQEBf0GJh8EALQAAGgJAQQxBBBCJAyIGBEAgBkECNgIIIAYgAzYCACAGIAQgA2sgBWo2AgQgASAGIAEoAgAiASABIAJGIgIbNgIAIAIEQCAAIAY2AgwgACAFNgIIIAAgBDYCBCAAQcjbwAA2AgAPCyABIAEoAggiAkEBajYCCCACQQBIDQEgACABNgIMIAAgBTYCCCAAIAQ2AgQgAEHI28AANgIAIAYQUA8LQQRBDBC0AwALAAu7AQEBfwJAAkACQAJAIAAtAOABDgQAAwMBAwsgAEHcAWotAABBA0YEQCAAQYgBahDYAiAAQYQBaigCACIBIAEoAgBBAWs2AgALIAAoAgAiAUGEAU8EQCABEAALIAAoAgQiAEGDAUsNAQwCCyAAQfAAai0AAEEDRgRAIABBHGoQ2AIgAEEYaigCACIBIAEoAgBBAWs2AgALIAAoAgAiAUGEAU8EQCABEAALIAAoAgQiAEGDAU0NAQsgABAACwu7AQEBfwJAAkACQAJAIAAtAIACDgQAAwMBAwsgAEH8AWotAABBA0YEQCAAQZwBahDMAiAAQZgBaigCACIBIAEoAgBBAWs2AgALIAAoAgAiAUGEAU8EQCABEAALIAAoAgQiAEGDAUsNAQwCCyAAQYABai0AAEEDRgRAIABBIGoQzAIgAEEcaigCACIBIAEoAgBBAWs2AgALIAAoAgAiAUGEAU8EQCABEAALIAAoAgQiAEGDAU0NAQsgABAACwuWAgIHfwF+QQogARDCAyICIAJBCk8bQQdsIQQgASgCACEFQQAhAQJAA0AgASAERgRAIABB+KTAAEEOEJkCNgIEQQEhAQwCCyMAQRBrIgIkACACIAU2AgwCQCACQQxqEMIDBEAgAigCDCIDKAIIIgYNAUEAQQBBgJ3AABC5AQALQcicwABBJ0HwnMAAEIECAAsgAygCBCIHLQAAIAMgBkEBazYCCCADIAdBAWo2AgQgAkEQaiQAIgKtQv8AgyABQT9xrYYgCYQhCSABQQdqIQEgAsBBAEgNAAsCQCABQcYARgRAQQEhASACQf8BcUEBSw0BCyAAIAk3AwhBACEBDAELIABB+KTAAEEOEJkCNgIECyAAIAE2AgAL9gMBBX8jAEEwayIEJAAgBEEYaiEFIwBBMGsiAyQAIANBDGogARB4AkACQAJAIAMoAgwiBkECRwRAIANBKGoiByADQRhqKQIANwMAIAMgAykCEDcDICAGRQRAAkAgASgCACICRQ0AIAIgAigCACICQQFrNgIAIAJBAUcNACABEM4BCyABQQA2AgALIAUgAykDIDcCBCAFIAY2AgAgBUEMaiAHKQMANwIADAELIAEoAgAiBkUNASAGQSRqIAIoAgAQaSAFIAEQeAsgA0EwaiQADAELQZSuwABBK0GAsMAAEIECAAsCQCAEKAIYIgFBAkcEQCAEQRBqIARBJGopAgA3AwAgBCAEKQIcNwMIAkAgAUUEQCAEQQc2AhgMAQsgBEEYaiEBIARBCGoiA0EEaiECAkAgAygCACIDBEAgASADNgIEIAFBBjYCACABQQhqIAIpAgA3AgAgAUEQaiACQQhqKAIANgIADAELQYmHwQAtAAAaQQxBBBCJAyIDBEAgAUHsusAANgIIIAEgAzYCBCABQQQ2AgAgAyACKQIANwIAIANBCGogAkEIaigCADYCAAwBC0EEQQwQtAMACwsgACAEKQMYNwMAIABBEGogBEEoaikDADcDACAAQQhqIARBIGopAwA3AwAMAQsgAEEINgIACyAEQTBqJAALuAEBAX8CQAJAAkACQCAALQDYAQ4EAAMDAQMLIABBzAFqLQAAQQNGBEAgAEHwAGoQzAEgAEHsAGooAgAiASABKAIAQQFrNgIACyAAKALQASIBQYQBTwRAIAEQAAsgACgC1AEiAEGDAUsNAQwCCyAALQBkQQNGBEAgAEEIahDMASAAKAIEIgEgASgCAEEBazYCAAsgACgC0AEiAUGEAU8EQCABEAALIAAoAtQBIgBBgwFNDQELIAAQAAsLiQECAX4BfyAAQQN0QQJyIgCtIQMgAEGAAU8EQANAIAIgA6dBgH9yENACIANC//8AViADQgeIIQMNAAsLIAIgA6cQ0AIgASgCCCIErSEDIARBgAFPBEADQCACIAOnQYB/chDQAiADQv//AFYgA0IHiCEDDQALCyACIAOnENACIAIgASgCBCAEEKsDC60BAQR/AkACQAJAIAEoAgQiAygCACICBEAgASACNgIEIAMoAgQNASACKAIEIgFFDQIgAkEANgIEAkAgA0EEaiIEKAIAIgJFDQAgAiACKAIAIgJBAWs2AgAgAkEBRw0AIAQQ5QELIAMQUAwDC0EBQQIgAyABKAIARhshBQwCC0G0vcAAQSlBwL7AABCBAgALQdC+wABBKUH8vsAAEIECAAsgACABNgIEIAAgBTYCAAukAQECfyMAQTBrIgIkACAAKAIAIQAgAiABNgIAIAEgACgCCCIDSwRAIAJBKGpByAA2AgAgAkEQakICNwIAIAJBAjYCCCACQbidwAA2AgQgAkHIADYCICACIAM2AiwgAiACQRxqNgIMIAIgAkEsajYCJCACIAI2AhwgAkEEakGcnsAAEJwCAAsgACADIAFrNgIIIAAgACgCBCABajYCBCACQTBqJAALpAIBA38jAEFAaiIBJAAgAUEBOgALIAFBADYCFCABQoCAgIAQNwIMIAFBMGpBsKzAADYCACABQQM6ADggAUEgNgIoIAFBADYCNCABQQA2AiAgAUEANgIYIAEgAUEMajYCLCABQRhqIQMjAEEgayICJAACfyABQQtqLQAARQRAIAJBFGpCADcCACACQQE2AgwgAkHMwcAANgIIIAJByMHAADYCECADIAJBCGoQgwMMAQsgAkEUakIANwIAIAJBATYCDCACQdzBwAA2AgggAkHIwcAANgIQIAMgAkEIahCDAwsgAkEgaiQABEBByKzAAEE3IAFBP2pBgK3AAEHcrcAAELIBAAsgACABKQIMNwIAIABBCGogAUEUaigCADYCACABQUBrJAALjAEBBX8jAEEQayIBJAAgARAcNgIIIAAoAgQhAiAAKAIAIAAoAggiAARAIABBA3QhAyACIQADQCABIAArAwAQBjYCDCABQQhqKAIAIAFBDGooAgAQIBogASgCDCIFQYQBTwRAIAUQAAsgAEEIaiEAIANBCGsiAw0ACwsEQCACEFALIAEoAgggAUEQaiQAC7MBAQJ/IwBBEGsiAyQAIAMgAjYCDEEAIQIgASgCBCABKAIIIgRB6JjAAEEAEOACRQRAIAQgBEEBcmdBH3NBCWxByQBqQQZ2akEBaiECCyADQQxqEJsDIQQgAAJ/IANBDGoQmwMgAk8EQCADKAIMIQAgASgCBCABKAIIQeiYwABBABDgAkUEQEEBIAEgABCgAQtBAAwBCyAAIAI2AgQgAEEIaiAENgIAQQELNgIAIANBEGokAAugAQEBfwJAIAAtAAhBAkYNACAAKAIAQSBqIgEgASgCACIBQQFrNgIAIAFBAUYEQCAAKAIAIgFBHGooAgBBAEgEQCABIAEoAhxB/////wdxNgIcCyABQSRqEIUCCyAAKAIAIgEgASgCACIBQQFrNgIAIAFBAUYEQCAAEM4BCyAAKAIEIgEgASgCACIBQQFrNgIAIAFBAUcNACAAQQRqEOUBCwulAQECfyMAQSBrIgEkAAJAIAAoAgAiAkUNACACQRBqKAIAQQBIBEAgAiACKAIQQf////8HcTYCEAsgACgCAEUNAANAAkAgAUEMaiAAEHQCQAJAAkAgASgCDEEEaw4CAQACCyAAKAIAIgJFDQIgAkEQaigCAA0BCyABQQxqELYCDAMLIAFBDGoQtgIMAQsLQfzQwABBK0Go0cAAEIECAAsgAUEgaiQAC+4BAQN/IwBBIGsiAyQAIANCADcCCCADQQE6ABwgA0EIahDnASICIAIoAgBBAWoiBDYCAAJAIAQEQCACKAIIDQEgAkF/NgIIIAJBDGoiBBD9ASACQRhqIAJBCGo2AgAgAkEUakHA1sAANgIAIAJBEGogATYCACAEIAA2AgAgAkEANgIIIwBBEGsiACQAIAAgAjYCCAJAQQBBvNbAACgCABEFACIBBEAgASACEMEBIABBEGokAAwBCyAAQQhqELABQfDSwABBxgAgAEEPakG408AAQZjUwAAQsgEACyADQSBqJAAPCwALQazWwAAQ8AEAC5MBAQR/IwBBMGsiAyQAIAAoAgAiAigCCEUEQCACQQxqKAIAIQUgAkL/////DzcCCCACIAUEfyACQRBqKAIAIAUoAgQRAAAgAigCCEEBagUgBAs2AgggA0EANgIcIANBBGoiBCAAQQRqIANBHGoQrAEgBBC2AiABQYQBTwRAIAEQAAsgA0EwaiQADwtBiMzAABDwAQALlAEBAX8jAEFAaiICJAAgAkIANwM4IAJBOGogACgCABAwIAJBGGpCATcCACACIAIoAjwiADYCNCACIAIoAjg2AjAgAiAANgIsIAJBxgE2AiggAkECNgIQIAJB7OHAADYCDCACIAJBLGo2AiQgAiACQSRqNgIUIAEgAkEMahCDAyACKAIsBEAgAigCMBBQCyACQUBrJAALjgEBA38jAEEQayIFJAAgAUEAIAEoAggiBCAEQQFGIgQbNgIIAkAgBEUEQCAFQQhqIAMQ0gEgBSgCCCEEIAUoAgwgAiADELoDIQIgARDRAiAAIAI2AgQMAQsgASgCBCEEIAEoAgAhBiABEFAgACAGIAIgAxC4AzYCBAsgACAENgIAIAAgAzYCCCAFQRBqJAALmAIBB38jAEEQayIEJAACQAJAIAEoAgAiBQRAIARBCGohBiABKAIAIgdBEGooAgAhAQJAAkADQCABQQBOBEBBACEBDAMLIAFB/////wdxIghB/////wdGDQEgByAIQf////8HayAHKAIQIgMgASADRiIJGzYCECADIQEgCUUNAAtBASEBIAhBAWohAwwBC0HEz8AAQcYAQezQwAAQywIACyAGIAM2AgQgBiABNgIAIAQoAggNAQsgAEEBOgAUIAAgAikCADcCACAAQRBqIAJBEGooAgA2AgAgAEEIaiACQQhqKQIANwIADAELIAIQ5gEhASAFKAIIIAUgATYCCCABNgIUIAVBGGoQhQIgAEEENgIACyAEQRBqJAALkgEBA38jAEEQayIEJAACQCABKAIAIgEoAhBBAUcEQCAEQQhqIAMQ0gEgBCgCCCEGIAQoAgwiBSACIAMQugMaIAEQlwIMAQsgAUEANgIIIAEoAgAhBiABKAIEIQUgAUKAgICAEDcCACABEJcCIAUgAiADELgDGgsgACADNgIIIAAgBTYCBCAAIAY2AgAgBEEQaiQAC48BAgN/AX4jAEEgayICJAAgASgCAEGAgICAeEYEQCABKAIMIQMgAkEcaiIEQQA2AgAgAkKAgICAEDcCFCACQRRqQejjwAAgAxBSGiACQRBqIAQoAgAiAzYCACACIAIpAhQiBTcDCCABQQhqIAM2AgAgASAFNwIACyAAQZTlwAA2AgQgACABNgIAIAJBIGokAAt/AgF+An8CQCAAKQMAIgFQRQRAIAAoAhAhAgwBCyAAKAIQIQIgACgCCCEDA0AgAkHAAWshAiADKQMAIANBCGohA0J/hUKAgYKEiJCgwIB/gyIBUA0ACyAAIAI2AhAgACADNgIICyAAIAFCAX0gAYM3AwAgAiABeqdBA3ZBaGxqC30BAn8gACgCACIAIAAoAgBBAWsiATYCAAJAIAENACAAQQxqKAIAIgEEQCABIABBEGooAgAiAigCABEAACACKAIEBEAgAigCCBogARBQCyAAQRhqKAIAIABBFGooAgAoAgwRAAALIAAgACgCBEEBayIBNgIEIAENACAAEFALC30BAn8jAEEQayIBJAAgAUGA38AAQQQQBTYCCCABQYIBNgIMIAEgACABQQhqIAFBDGoQ1wEgASgCDCICQYQBTwRAIAIQAAsgASgCCCICQYQBTwRAIAIQAAsCQCABLQAARQ0AIAEoAgQiAkGEAUkNACACEAALIAFBEGokACAAC4ABAQF/IwBBQGoiBSQAIAUgATYCDCAFIAA2AgggBSADNgIUIAUgAjYCECAFQSRqQgI3AgAgBUE8akHhATYCACAFQQI2AhwgBUHM68AANgIYIAVB4gE2AjQgBSAFQTBqNgIgIAUgBUEQajYCOCAFIAVBCGo2AjAgBUEYaiAEEJwCAAuIAQECfyMAQSBrIgIkACACQQhqIAEoAgAQAwJAIAIoAggiAwRAIAIoAgwhASACIAM2AhggAiABNgIcIAIgATYCFCACQRRqEN0BIAIoAhwiAUGAgICAeEcNAQtBsODAAEEVEK8DAAsgAigCGCEDIAAgATYCCCAAIAM2AgQgACABNgIAIAJBIGokAAt8AQN/IwBBEGsiAyQAIAMgAjYCDCABLQAAIQJBASEBIANBDGoQmwMhBAJAIANBDGoQmwMgAkEBdCIFTwRAQQAhASACRQ0BIAMoAgwiBEEIENACIAQgAhDQAgwBCyAAIAU2AgQgAEEIaiAENgIACyAAIAE2AgAgA0EQaiQAC3UBAn8jAEEQayIBJAAgASAAKAIAIgA2AgwgACgCCEUEQCAAQQxqKAIAIQIgAEL/////DzcCCCAAIAIEfyAAQRBqKAIAIAIoAgQRAAAgACgCCEEBagVBAAs2AgggAUEMahDhASABQRBqJAAPC0H4y8AAEPABAAt0AQJ/AkAgACgCACIBRQ0AIAFBFGoiAiACKAIAIgJBAWs2AgAgAkEBRgRAIAFBEGooAgBBAEgEQCABIAEoAhBB/////wdxNgIQCyABQRhqEIUCCyAAKAIAIgEgASgCACIBQQFrNgIAIAFBAUcNACAAENoBCwt2AQF/AkACQAJAIAAoAgBBAWsOBAACAgECCyAAKAIEIgAoAgxBgICAgHhHBEAgAEEMahDpAgsgACgCAARAIAAoAgQQUAsgABBQDAELIAAoAgQiASAAQQhqKAIAIgAoAgARAAAgACgCBEUNACAAKAIIGiABEFALC28BAX8jAEEwayIDJAAgAyAANgIAIAMgATYCBCADQRRqQgI3AgAgA0EsakHMADYCACADQQI2AgwgA0Ho7sAANgIIIANBzAA2AiQgAyADQSBqNgIQIAMgA0EEajYCKCADIAM2AiAgA0EIaiACEJwCAAtvAQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakICNwIAIANBLGpBzAA2AgAgA0ECNgIMIANBqOrAADYCCCADQcwANgIkIAMgA0EgajYCECADIAM2AiggAyADQQRqNgIgIANBCGogAhCcAgALbwEBfyMAQTBrIgMkACADIAA2AgAgAyABNgIEIANBFGpCAjcCACADQSxqQcwANgIAIANBAjYCDCADQbzvwAA2AgggA0HMADYCJCADIANBIGo2AhAgAyADQQRqNgIoIAMgAzYCICADQQhqIAIQnAIAC3MBA38gACgCACIBQRRqKAIAIQACQAJAA0AgAEH/////A0YNASABIABBAWogASgCFCICIAAgAkYiAxs2AhQgAiEAIANFDQALIAEgASgCACIAQQFqNgIAIABBAEgNASABDwtBuNHAAEE1QfDRwAAQywIACwALcgEBf0GJh8EALQAAGgJAQcwAQQQQiQMiAgRAIAJBATYCCCACQoGAgIAQNwIAIAJBDGogAUE8ELoDGiACQQA2AkggAiACKAIAIgFBAWo2AgAgAUEASA0BIAAgAjYCBCAAIAI2AgAPC0EEQcwAELQDAAsAC9wDAgp/BH4jAEEwayIEJAAgBCACNgIoIAQgATYCJCAEIAI2AiAgBEEIaiAEQSBqIgIQjwMgBEEUaiIBIAQoAgggBCgCDBD8AgJAAkBBuIfBACgCAARAQcSHwQAoAgBFDQFByIfBACABEFohDkG4h8EAKAIAIgdBGGshCUG8h8EAKAIAIgggDqdxIQUgDkIZiEL/AINCgYKEiJCgwIABfiEQA0AgBSAHaikAACIPIBCFIg5Cf4UgDkKBgoSIkKDAgAF9g0KAgYKEiJCgwIB/gyEOIAEoAgghCiABKAIEIQsDQCAOUARAIA8gD0IBhoNCgIGChIiQoMCAf4NQRQ0EIAUgBkEIaiIGaiAIcSEFDAILIA56IREgDkIBfSAOgyEOIAsgCiAJQQAgEadBA3YgBWogCHFrIgxBGGxqIg0oAgQgDSgCCBDgAkUNAAsLIAMgByAMQRhsaiIFQQRrKAIATwRAIAIgASkCADcCACACQQhqIAFBCGooAgA2AgAMAwsgAiAFQQhrKAIAIANBDGxqEMUBIAEQ6QIMAgtBlK7AAEErQdC7wAAQgQIACyACIAEpAgA3AgAgAkEIaiABQQhqKAIANgIACyAEIAIQjwMgACAEKQMANwMAIARBMGokAAtpAQF/IwBBIGsiAiQAAn9BASAAIAEQZw0AGiACQRRqQgA3AgAgAkEBNgIMIAJB7OjAADYCCCACQaDowAA2AhBBASABKAIUIAFBGGooAgAgAkEIahBSDQAaIABBBGogARBnCyACQSBqJAALfAEBf0GJh8EALQAAGkEoQQQQiQMiCUUEQEEEQSgQtAMACyAJQQA6ACQgCSAHNgIgIAkgBjYCHCAJIAU2AhggCSAENgIUIAkgAzYCECAJIAI2AgwgCUHAh8AANgIIIAkgCDYCBCAJIAE2AgAgAEG0ucAANgIEIAAgCTYCAAvUAwIKfwR+IwBBMGsiAyQAIAMgAjYCKCADIAE2AiQgAyACNgIgIANBCGogA0EgaiICEI8DIANBFGoiASADKAIIIAMoAgwQ/AICQAJAQbiHwQAoAgAEQEHEh8EAKAIARQ0BQciHwQAgARBaIQ1BuIfBACgCACIGQRhrIQhBvIfBACgCACIHIA2ncSEEIA1CGYhC/wCDQoGChIiQoMCAAX4hDwNAIAQgBmopAAAiDiAPhSINQn+FIA1CgYKEiJCgwIABfYNCgIGChIiQoMCAf4MhDSABKAIIIQkgASgCBCEKA0AgDVAEQCAOIA5CAYaDQoCBgoSIkKDAgH+DUEUNBCAEIAVBCGoiBWogB3EhBAwCCyANeiEQIA1CAX0gDYMhDSAKIAkgCEEAIBCnQQN2IARqIAdxayILQRhsaiIMKAIEIAwoAggQ4AJFDQALCyAGIAtBGGxqIgRBBGsoAgBFBEAgAiABKQIANwIAIAJBCGogAUEIaigCADYCAAwDCyACIARBCGsoAgAQxQEgARDpAgwCC0GUrsAAQStBwLvAABCBAgALIAIgASkCADcCACACQQhqIAFBCGooAgA2AgALIAMgAhCPAyAAIAMpAwA3AwAgA0EwaiQAC9gEAQp/IAAoAgAiCSgCCEUEQCAJQX82AgggCUEMaiIDKAIMIgIgAygCACIERgRAQQAhAiADKAIAIQcjAEEQayILJAAgC0EIaiEIIwBBIGsiBSQAAkAgByAHQQFqIgZLDQBBBCADKAIAIgpBAXQiAiAGIAIgBksbIgIgAkEETRsiBkECdCEEIAZBgICAgAJJQQJ0IQICQCAKRQRAIAVBADYCGAwBCyAFQQQ2AhggBSAKQQJ0NgIcIAUgAygCBDYCFAsgBUEIaiACIAQgBUEUahCQASAFKAIMIQIgBSgCCARAIAVBEGooAgAhBgwBCyADIAY2AgAgAyACNgIEQYGAgIB4IQILIAggBjYCBCAIIAI2AgAgBUEgaiQAAkACQCALKAIIIgJBgYCAgHhHBEAgAkUNASACIAsoAgwQtAMACyALQRBqJAAMAQsQmwIACyADKAIIIgogByADKAIMIgJrSwRAAkAgByAKayIIIAIgCGsiBEsgAygCACICIAdrIARPcUUEQCADKAIEIgQgAiAIayICQQJ0aiAEIApBAnRqIAhBAnQQuAMaIAMgAjYCCAwBCyADKAIEIgIgB0ECdGogAiAEQQJ0ELoDGgsLIAMoAgAhBCADKAIMIQILIAMoAgQgAygCCCACaiICIARBACACIARPG2tBAnRqIAE2AgAgAyADKAIMQQFqNgIMIAlBHGoiAy0AACEBIANBAToAACAJIAkoAghBAWo2AggCQCABDQAgAEEQaigCACAAQQRqKAIIECoiAEGEAUkNACAAEAALDwtBrNXAABDwAQALcgEBfwJAAkACQAJAIAAtAJABDgQAAwMBAwsgAEHMAGoQjQIgACgCACIBQYQBTwRAIAEQAAsgACgCBCIAQYMBSw0BDAILIABBCGoQjQIgACgCACIBQYQBTwRAIAEQAAsgACgCBCIAQYMBTQ0BCyAAEAALC3ABA38jAEEgayIBJAAgAUEIakEGENIBIAEoAgghAyABKAIMIgJBmLvAACgAADYAACACQQRqQZy7wAAvAAA7AAAgAUEGNgIYIAEgAjYCFCABIAM2AhAgASABQRBqEI8DIAAgASkDADcDACABQSBqJAALjAQBAn8jAEEgayICJAAgAS0AACEDIAFBAToAACACIAM6AAcgAwRAIAJCADcCFCACQbi/wAA2AhAgAkEBNgIMIAJBsL/AADYCCCMAQRBrIgEkACABQYy/wAA2AgwgASACQQdqNgIIIwBB8ABrIgAkACAAQfzhwAA2AgwgACABQQhqNgIIIABB/OHAADYCFCAAIAFBDGo2AhAgAEG46sAANgIYIABBAjYCHAJAIAJBCGoiASgCAEUEQCAAQcwAakHhATYCACAAQcQAakHhATYCACAAQeQAakIDNwIAIABBAzYCXCAAQfTqwAA2AlggAEHiATYCPCAAIABBOGo2AmAgACAAQRBqNgJIIAAgAEEIajYCQAwBCyAAQTBqIAFBEGopAgA3AwAgAEEoaiABQQhqKQIANwMAIAAgASkCADcDICAAQeQAakIENwIAIABB1ABqQeEBNgIAIABBzABqQeEBNgIAIABBxABqQeMBNgIAIABBBDYCXCAAQajrwAA2AlggAEHiATYCPCAAIABBOGo2AmAgACAAQRBqNgJQIAAgAEEIajYCSCAAIABBIGo2AkALIAAgAEEYajYCOCAAQdgAakGgwMAAEJwCAAtBACEDQayI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AyELIAIgARBqDQAgACgCACAAQQA2AgBFDQEgBUEIaiAAQQxqKQIANwMAIAUgACkCBDcDAEECIQsgACgCFCEGIwBBMGsiBCQAQQIhDAJAAkAgBi0ACEECRgRAIARBCGogBUEIaikCADcDACAEQQE6ABAgBCAFKQIANwMADAELAkAgBkEAEGoEQCAEQQA6ABAgBCAFKQIANwIAIARBCGogBUEIaikCADcCAAwBCyMAQSBrIgckACAGKAIAIghBHGooAgAhAgJAAkADQCACQQBOBEBBACECDAMLIAJB/////wdxIglB/////wdGDQEgCCAJQf////8HayAIKAIcIgMgAiADRiIKGzYCHCADIQIgCkUNAAtBASECIAlBAWohAwwBC0HsqsAAQcYAQbSrwAAQywIACyAHIAM2AgQgByACNgIAAkAgBygCAEUEQCAEQQE6ABAgBCAFKQIANwIAIARBCGogBUEIaikCADcCAAwBCyAHKAIEIAYoAgAiAkEYaigCAEsEQCMAQSBrIgIkACACQQxqIAYoAgQiCEEIahDEAQJAAkAgAigCDEUEQCACQRRqLQAAIQkgAigCECIDKAIEIgoEQCADQQhqKAIAIAooAgwRAAALIANBADYCBCADQQxqQQE6AAACQCAJDQBBrIjBACgCAEH/////B3FFDQAQygMNACADQQE6AAELIANBADoAACAIIAgoAgAiA0EBajYCACADQQBIDQEgBigCACEDIAgQwwIhCCADQRBqIgkoAgAgCSAINgIAIAg2AgAgBiADQRxqKAIAQR92OgAIIAJBIGokAAwCCyACIAIoAhA2AhggAiACQRRqLQAAOgAcQb+uwABBKyACQRhqQeyuwABBxKvAABCyAQALAAsgBigCACECCyAHQRhqIAVBCGopAgA3AgAgB0EBNgIMIAcgBSkCADcCECAHQQxqEOYBIQMgAigCCCACIAM2AgggAzYCFCACQSRqEIUCIARBAjoAEAsgB0EgaiQACyAELQAQQQJGDQELIARBIGogBEEIaikDADcDACAEQShqIARBEGooAgAiDDYCACAEIAQpAwA3AxggBEEYahCmAgsgBEEwaiQAIAxB/wFxIgJBAkYNACACQQBHIQsLIAVBEGokACALDAELQbvAwABBHEG4wcAAEN4BAAsiAkH/AXEiA0ECaw4CAAECCwJAIAAoAhQiAC0ACEECRg0AIAAoAgBBHGooAgBBAE4NAEEDIQIgACABEGoNAQtBAiECCyACDwsgA0EARwtsAAJAAkACQAJAAkACQCAALQAoDgUABQUBAgULIAAoAhgiAEGDAU0NBAwDCyAAQc4Aai0AAEEDRw0BIABBQGsQxwIgAEHNAGpBADoAAAwBCyAAQTRqEMcCCyAAKAIgIgBBgwFNDQELIAAQAAsLYgECfyMAQRBrIgIkAEGAASEDIAEoAgBBgICAgHhHBEAgAkEIaiABQQhqKAIAIgM2AgAgAiABKQIANwMAIAIoAgQgAxAFIQMgAhDpAgsgACADNgIEIABBADYCACACQRBqJAAL8wEBA38gACgCACIBQQhqKAIEIgIEQANAIAIiACgCFCECAkAgACgCAEUNACAAKAIEIgMEQCAAQRBqIABBCGooAgAgAEEMaigCACADKAIIEQIADAELIABBCGoQ6QILIAAQUCACDQALCyABQRBqKAIEIgAEQANAIAAiAigCACEAAkAgAigCBCIDRQ0AIAMgAygCACIDQQFrNgIAIANBAUcNACACQQRqEOUBCyACEFAgAA0ACwsgAUEkaigCACIABEAgAUEoaigCACAAKAIMEQAACwJAIAFBf0YNACABIAEoAgQiAEEBazYCBCAAQQFHDQAgARBQCwukAgEEfyMAQUBqIgIkACMAQRBrIgMkACADIAE2AgAgAygCABAiQQBHIQEgAygCACEFAkAgAQRAIwBBEGsiBCQAIAQgBTYCDCACIARBDGoiASgCABAkEKsCIAJBDGogASgCABAjEKsCIAJBGGogASgCABAlEKsCIAQoAgwiAUGEAU8EQCABEAALIARBEGokAAwBCyADIAUQBxCrAiACQRBqIAU2AgAgAkGAgICAeDYCACACQQxqIANBCGooAgA2AgAgAiADKQMANwIECyADQRBqJAAgAigCAEGAgICAeEYEQCACQTBqQgA3AgAgAkEBNgIoIAJBlMnAADYCJCACIAJBPGo2AiwgAkEkakH0ycAAEJwCAAsgACACQSQQugMaIAJBQGskAAvtAQEGfyAAKAIAIgAgACgCAEEBayIBNgIAAkAgAQ0AAkAgAEEMaiIGIgEoAgwiA0UNACABKAIEIQQgASgCACICIAEoAggiASACQQAgASACTxtrIgEgA2ogAyACIAFrIgJL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NwIEIAUgBjYCACAFQQxqIAgpAwA3AgAMAQsgBCgCACIGRQ0BIAZBGGogAigCABBpIAUgBBB0CyADQTBqJAAMAQtB/NDAAEErQYDSwAAQgQIACwJAAkACQAJAAkACQCABKAIMIgNBBUcEQCABQShqIgIgAUEYaikCADcDACABIAEpAhA3AyAgA0EBaw4EAwQFAQILIABBhICAgHg2AgAMBQsgAEGDgICAeDYCAAwECyAAQYCAgIB4NgIADAMLIAAgASkDIDcCBCAAQYGAgIB4NgIAIABBDGogAikDADcCAAwCCyAAIAEpAyA3AgQgAEGCgICAeDYCACAAQQxqIAIpAwA3AgAMAQsgAEGDgICAeDYCAAsgAUEwaiQAIAcQgwIPCyAAQYSAgIB4NgIADwtBlK7AAEErQcipwAAQgQIAC0EAIAEoAgAiAUEBcQRAIAEgAiADELgDIQEgACADNgIIIAAgATYCBCAAIAIgA2ogAWs2AgAPCyAAIAEgAiADEKsBC0ABAX8jAEEQayIDJAAgASAAayACakEASARAQejZwABBKyADQQ9qQZTawABBqNvAABCyAQALIAAQUCADQRBqJAALSQEBfyMAQRBrIgYkACABKAIAIAIgAyAEKAIAIAUoAgAQCiAGQQhqENICIAYoAgwhASAAIAYoAgg2AgAgACABNgIEIAZBEGokAAtCAQJ/IAAoAgAiAQRAIAEgACgCBCICKAIAEQAAIAIoAgQEQCACKAIIGiABEFALIABBDGooAgAgACgCCCgCDBEAAAsLQgEBfyACIAAoAgAgACgCCCIDa0sEQCAAIAMgAhB+IAAoAgghAwsgACgCBCADaiABIAIQugMaIAAgAiADajYCCEEAC08BAn9BiYfBAC0AABogASgCBCECIAEoAgAhA0EIQQQQiQMiAUUEQEEEQQgQtAMACyABIAI2AgQgASADNgIAIABBpOXAADYCBCAAIAE2AgALQgEBfyACIAAoAgAgACgCCCIDa0sEQCAAIAMgAhB/IAAoAgghAwsgACgCBCADaiABIAIQugMaIAAgAiADajYCCEEAC0gBAX8jAEEgayIDJAAgA0EMakIANwIAIANBATYCBCADQaDowAA2AgggAyABNgIcIAMgADYCGCADIANBGGo2AgAgAyACEJwCAAs/AQF/IAAoAgAiAUEHRwRAIAFBBkYEQCAAQRBqIABBCGooAgAgAEEMaigCACAAKAIEKAIIEQIADwsgABC3AQsLTwEBfyAAKAIAQcgAaiIBKAIAIQAgAUEANgIAAkACQAJAIAAOAgACAQtBuKjAAEEWQdCowAAQywIACyAAKAIEIAAoAgAoAgQRAAAgABBQCwtEAQF/IwBBEGsiBSQAIAEoAgAgAiADIAQoAgAQCSAFQQhqENICIAUoAgwhASAAIAUoAgg2AgAgACABNgIEIAVBEGokAAtHAQF/IAAgACgCCCIBQQJyNgIIAkAgAQ0AIAAoAgAhASAAQQA2AgAgACAAKAIIQX1xNgIIIAFFDQAgACgCBCABKAIEEQAACwuRAQEBfyMAQfAAayIDJAAgA0EMaiACNgIAIANBADoAbCADIAE2AgggAyAANgIEIwBB8ABrIgAkACAAIANBBGpB7AAQugMiACAANgJsIABB7ABqQbiCwAAQyAMgAC0AaEEDRgRAIABBFGoQ2AIgAEEQaigCACICIAIoAgBBAWs2AgALIABB8ABqJAAgA0HwAGokAAuRAQEBfyMAQfAAayIDJAAgA0EMaiACNgIAIANBADoAbCADIAE2AgggAyAANgIEIwBB8ABrIgAkACAAIANBBGpB7AAQugMiACAANgJsIABB7ABqQZCCwAAQyAMgAC0AaEEDRgRAIABBFGoQ2AIgAEEQaigCACICIAIoAgBBAWs2AgALIABB8ABqJAAgA0HwAGokAAs8AQF/AkAgAQRAIAEoAgAiAkF/Rg0BIAEgAkEBajYCACAAIAE2AgQgACABQQRqNgIADwsQrQMACxCuAwALkQEBAX8jAEHwAGsiAyQAIANBDGogAjYCACADQQA6AGwgAyABNgIIIAMgADYCBCMAQfAAayIAJAAgACADQQRqQewAELoDIgAgADYCbCAAQewAakGkgsAAEMgDIAAtAGhBA0YEQCAAQRRqENgCIABBEGooAgAiAiACKAIAQQFrNgIACyAAQfAAaiQAIANB8ABqJAALPAEBfyMAQRBrIgIkACACIAAoAgAiADYCDCAAQQhqEGggAUGEAU8EQCABEAALIAJBDGoQ0AEgAkEQaiQACzQBAX8CQCAAKAIMIgFBAXEEQCABQQV2IgEgACgCCGpFDQEgACgCACABaxBQDwsgARCXAgsLOAACQCABaUEBR0GAgICAeCABayAASXINACAABEBBiYfBAC0AABogACABEIkDIgFFDQELIAEPCwALOAAgAC0AQEEDRgRAIABBPGotAABBA0YEQCAAQRRqELgCCyAAQQxqKAIAIgAgACgCAEEBazYCAAsLOgAgAC0AhAFBA0YEQCAAQfgAai0AAEEDRgRAIABBKGoQuQILIABBFGooAgAiACAAKAIAQQFrNgIACws5ACAALQBMQQNGBEAgAEHIAGotAABBA0YEQCAAQRxqELoCCyAAQQxqKAIAIgAgACgCAEEBazYCAAsLQwACQAJAAkACQAJAIAAtADQOBQMEBAABBAsgAEE4ahDHAgwBCyAAQTxqEMcCCyAAQQA6ADUgAEEUaiEACyAAEOkCCwtDAAJAAkACQAJAAkAgAC0ALA4FAwQEAAEECyAAQTBqEMcCDAELIABBNGoQxwILIABBADoALSAAQRBqIQALIAAQ6QILC0ABAX8gASgCACIBIAEoAggiBEEBajYCCCAEQQBIBEAACyAAIAE2AgwgACADNgIIIAAgAjYCBCAAQcjbwAA2AgALQAEBfyABKAIAIgEgASgCECIEQQFqNgIQIARBAEgEQAALIAAgATYCDCAAIAM2AgggACACNgIEIABBjN3AADYCAAuLAQEBfyMAQfAAayIDJAAgA0EAOgBsIAMgAjYCaCADIAE2AmQgAyAANgJgIwBB8ABrIgAkACAAIANBCGpB6AAQugMiACAANgJsIABB7ABqQdCEwAAQyAMgAC0AZEEDRgRAIABBCGoQzAEgACgCBCICIAIoAgBBAWs2AgALIABB8ABqJAAgA0HwAGokAAuLAQEBfyMAQfAAayIDJAAgA0EAOgBsIAMgAjYCaCADIAE2AmQgAyAANgJgIwBB8ABrIgAkACAAIANBCGpB6AAQugMiACAANgJsIABB7ABqQbyEwAAQyAMgAC0AZEEDRgRAIABBCGoQzAEgACgCBCICIAIoAgBBAWs2AgALIABB8ABqJAAgA0HwAGokAAt6AQJ/IwBBkAFrIgMkACADQQA6AIwBIAMgAjkDECADIAE5AwggAyAANgKIASMAQZABayIAJAAgACADQQhqQYgBELoDIgAgADYCjAEgAEGMAWpB4ILAABDIAyAALQCEAUEERwRAIAAQjgILIABBkAFqJAAgA0GQAWokAAsuAQF/IAAgACgCECIBQQFrNgIQIAFBAUYEQCAAKAIABEAgACgCBBBQCyAAEFALCzkAAkACfyACQYCAxABHBEBBASAAIAIgASgCEBEBAA0BGgsgAw0BQQALDwsgACADIAQgASgCDBEEAAtOAQF/QYmHwQAtAAAaQRhBBBCJAyICRQRAQQRBGBC0AwALIAIgATYCFCACIAA2AhAgAkKAgICAgICAgIB/NwIIIAJCgICAgMAANwIAIAIL5wEBAn8jAEEQayIAJAAgAEEEaiICIAEoAhRBgLzAAEEMIAFBGGooAgAoAgwRBAA6AAggAiABNgIEIAJBADoACSACQQA2AgACfyACQZC8wABBmLzAABBuIgEtAAgiAkEARyABKAIAIgNFDQAaAkAgAkUEQCABKAIEIQIgA0EBRw0BIAEtAAlFDQEgAi0AHEEEcQ0BIAIoAhRBkuzAAEEBIAJBGGooAgAoAgwRBABFDQELIAFBAToACEEBDAELIAEgAigCFEHm6MAAQQEgAkEYaigCACgCDBEEACIBOgAIIAELIABBEGokAAtAAQF/IwBBIGsiACQAIABBFGpCADcCACAAQQE2AgwgAEGc58AANgIIIABBzObAADYCECAAQQhqQaTnwAAQnAIAC7YCAQJ/IwBBIGsiAiQAIAJBATsBHCACIAE2AhggAiAANgIUIAJB5OnAADYCECACQaDowAA2AgwjAEEQayIBJAAgAkEMaiIAKAIIIgJFBEBBvOPAAEErQYTlwAAQgQIACyABIAAoAgw2AgwgASAANgIIIAEgAjYCBCMAQRBrIgAkACABQQRqIgEoAgAiAkEMaigCACEDAkACfwJAAkAgAigCBA4CAAEDCyADDQJBACECQbzjwAAMAQsgAw0BIAIoAgAiAygCBCECIAMoAgALIQMgACACNgIEIAAgAzYCACAAQbTlwAAgASgCBCIAKAIIIAEoAgggAC0AECAALQAREHsACyAAIAI2AgwgAEGAgICAeDYCACAAQcjlwAAgASgCBCIAKAIIIAEoAgggAC0AECAALQAREHsAC3gBAX8jAEHQAGsiAiQAIAJBADoATCACIAE2AhAgAiAANgIMIwBB0ABrIgAkACAAQQhqIgEgAkEMakHEABC6AxogACABNgJMIABBzABqQbCDwAAQyAMgAC0ASEEERwRAIABBCGoQjQILIABB0ABqJAAgAkHQAGokAAt4AQF/IwBB0ABrIgIkACACQQA6AEwgAiABNgIQIAIgADYCDCMAQdAAayIAJAAgAEEIaiIBIAJBDGpBxAAQugMaIAAgATYCTCAAQcwAakGAhMAAEMgDIAAtAEhBBEcEQCAAQQhqEI0CCyAAQdAAaiQAIAJB0ABqJAALeAEBfyMAQdAAayICJAAgAkEAOgBMIAIgATYCECACIAA2AgwjAEHQAGsiACQAIABBCGoiASACQQxqQcQAELoDGiAAIAE2AkwgAEHMAGpBnIPAABDIAyAALQBIQQRHBEAgAEEIahCNAgsgAEHQAGokACACQdAAaiQAC3gBAX8jAEHQAGsiAiQAIAJBADoATCACIAE2AhAgAiAANgIMIwBB0ABrIgAkACAAQQhqIgEgAkEMakHEABC6AxogACABNgJMIABBzABqQfSCwAAQyAMgAC0ASEEERwRAIABBCGoQjQILIABB0ABqJAAgAkHQAGokAAt4AQF/IwBB0ABrIgIkACACQQA6AEwgAiABNgIQIAIgADYCDCMAQdAAayIAJAAgAEEIaiIBIAJBDGpBxAAQugMaIAAgATYCTCAAQcwAakHsg8AAEMgDIAAtAEhBBEcEQCAAQQhqEI0CCyAAQdAAaiQAIAJB0ABqJAALeAEBfyMAQdAAayICJAAgAkEAOgBMIAIgATYCECACIAA2AgwjAEHQAGsiACQAIABBCGoiASACQQxqQcQAELoDGiAAIAE2AkwgAEHMAGpBlITAABDIAyAALQBIQQRHBEAgAEEIahCNAgsgAEHQAGokACACQdAAaiQAC3gBAX8jAEHQAGsiAiQAIAJBADoATCACIAE2AhAgAiAANgIMIwBB0ABrIgAkACAAQQhqIgEgAkEMakHEABC6AxogACABNgJMIABBzABqQcSDwAAQyAMgAC0ASEEERwRAIABBCGoQjQILIABB0ABqJAAgAkHQAGokAAt4AQF/IwBB0ABrIgIkACACQQA6AEwgAiABNgIQIAIgADYCDCMAQdAAayIAJAAgAEEIaiIBIAJBDGpBxAAQugMaIAAgATYCTCAAQcwAakGohMAAEMgDIAAtAEhBBEcEQCAAQQhqEI0CCyAAQdAAaiQAIAJB0ABqJAALeAEBfyMAQdAAayICJAAgAkEAOgBMIAIgATYCECACIAA2AgwjAEHQAGsiACQAIABBCGoiASACQQxqQcQAELoDGiAAIAE2AkwgAEHMAGpBzILAABDIAyAALQBIQQRHBEAgAEEIahCNAgsgAEHQAGokACACQdAAaiQACy4BAX8gACgCACIBBEAgAEEMaiAAKAIEIAAoAgggASgCCBECAA8LIABBBGoQ6QILNgEBfwJAAkACQEECIAAoAgBBgICAgHhzIgEgAUECTxsOAgECAAsgABDNAgsPCyAAQQRqEOkCCzMAIAAoAgBBBkYEQCAAQRBqIABBCGooAgAgAEEMaigCACAAKAIEKAIIEQIADwsgABC3AQsyAQJ/IwBBIGsiASQAIAFBEGoiAhCjASABQQhqIAIQjwMgACABKQMINwMAIAFBIGokAAs3AQF/AkAgACgCCBAIRQ0AIAAoAgAiASAAKAIEIgAoAgARAAAgACgCBEUNACAAKAIIGiABEFALCzIBAX8jAEEQayICJAAgAiABNgIMIAAgAkEMahCzASABQYQBTwRAIAEQAAsgAkEQaiQAC7kCAQN/IAEoAhwiAkEQcUUEQCACQSBxRQRAIAAgARCdAw8LQQAhAiMAQYABayIDJAAgACgCACEAA0AgAiADakH/AGpBMEE3IABBD3EiBEEKSRsgBGo6AAAgAkEBayECIABBEEkgAEEEdiEARQ0ACyACQYABaiIAQYABSwRAIABBgAFBsOzAABC4AQALIAFBwOzAAEECIAIgA2pBgAFqQQAgAmsQTyADQYABaiQADwtBACECIwBBgAFrIgMkACAAKAIAIQADQCACIANqQf8AakEwQdcAIABBD3EiBEEKSRsgBGo6AAAgAkEBayECIABBEEkgAEEEdiEARQ0ACyACQYABaiIAQYABSwRAIABBgAFBsOzAABC4AQALIAFBwOzAAEECIAIgA2pBgAFqQQAgAmsQTyADQYABaiQACzMAIAAgASkDADcDACABQQc2AgAgAEEQaiABQRBqKQMANwMAIABBCGogAUEIaikDADcDAAtZAQF/IwBBEGsiAyQAIAMgAjYCDCADIAE2AgggA0EIaiEBIANBDGohAgJAIAAoAgAiAEEBcQRAIABBfnEgASgCACACKAIAEPsBDAELIAAQ0QILIANBEGokAAtWAQF/IwBBEGsiAyQAIAMgAjYCDCADIAE2AgggA0EIaiEBIANBDGohAgJAIAAoAgAiAEEBcQRAIAAgASgCACACKAIA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BEEIELQDAAsgASAAOwEEIAFBADYCACABCy0BAX8gACgCECIBIAEoAgAiAUEBazYCACABQQFGBEAgAEEQahCAAQsgABDoAgstAQF/IAAQwQIgACgCFCIBIAEoAgAiAUEBazYCACABQQFGBEAgAEEUahCAAQsLMgEBf0GJh8EALQAAGkEIQQQQiQMiAUUEQEEEQQgQtAMACyABIAA2AgQgAUEANgIAIAELKwEBfyAAKAIABEAgABDQASAAKAIQIgFBhAFPBEAgARAACyAAQQRqEKoCCwswAQF/IAFBCGsiAiACKAIAQQFqIgI2AgAgAkUEQAALIAAgATYCBCAAQcDWwAA2AgALMAAgASgCFCACQQsgAUEYaigCACgCDBEEACECIABBADoABSAAIAI6AAQgACABNgIACyoBAX8gACgCACIBIAAoAgQiACgCABEAACAAKAIEBEAgACgCCBogARBQCwsoAAJAIAAEQCAAKAIADQEgAEEANgIAIAAgATYCBA8LEK0DAAsQrgMACyUAAkAgAARAIAAoAgBBf0YNASAAQQhqKAIADwsQrQMACxCuAwALJQACQCAABEAgACgCAEF/Rg0BIABBDGooAgAPCxCtAwALEK4DAAtSAQF/IwBBEGsiAyQAIAMgAjYCDCADIAE2AgggAyAANgIEIwBBEGsiACQAIAAgA0EEaiIBKQIANwIIIABBCGpB7N7AAEEAIAEoAghBAUEAEHsACygAAkACQAJAIAAtAFwOBAACAgECCyAAQQRqEOkCDwsgAEEYahCQAgsLFwAgABDpAiAAQQxqEOkCIABBGGoQ6QILJgACQCAARQ0AIAAgASgCABEAACABKAIERQ0AIAEoAggaIAAQUAsLJgEBfyMAQRBrIgEkACABIABBCGs2AgwgAUEMahCwASABQRBqJAALJwEBfyMAQRBrIgIkACACIAE6AA8gACACQQ9qQQEQqwMgAkEQaiQAC1sBAX8gACAAKAIIIgFBAWs2AgggAUEBRgRAIwBBEGsiASQAIAAoAgRBAEgEQEHo2cAAQSsgAUEPakGU2sAAQbjbwAAQsgEACyAAKAIAEFAgAUEQaiQAIAAQUAsLOgECf0GQiMEALQAAIQFBkIjBAEEAOgAAQZSIwQAoAgAhAkGUiMEAQQA2AgAgACACNgIEIAAgATYCAAsrAQF/IABBADoACCAAKAIAIQEgAEEANgIAIAEEQCAAKAIEIAEoAgQRAAALCyIAAkAgAARAIAAoAgBBf0YNASAAKAIEDwsQrQMACxCuAwALKQAgAEE0ahDEAyIAQf//A3FBBE8EQEGJysAAQShBmMzAABCBAgALIAALIgEBfyAAKAIYRQRAQQAPCyAAEK8BIAAgACgCGEEBazYCGAsfACAAKAIAQYKAgIB4RgRAIABBCGoQ6QIPCyAAEKcCCyUAAkACQAJAIAAtAFAOBAACAgECCyAAEOkCDwsgAEEUahCRAgsLIgAgAEEBNgIEIABBCGogASgCAEEHRyIBNgIAIAAgATYCAAsgACAAIAIgBGo2AgggACABIARrNgIEIAAgAyAEajYCAAslACAARQRAQcXgwABBMhCvAwALIAAgAiADIAQgBSABKAIQEQsAC4YBAQN/IwBBEGsiAiQAIAJBBGohAyMAQRBrIgEkAAJAAkAgAARAIAAoAgANASAAQQA2AgAgAUEIaiAAQQhqKQIANwMAIAEgACkCADcDACADIAEpAgQ3AgAgA0EIaiABQQxqKAIANgIAIAAQUCABQRBqJAAMAgsQrQMACxCuAwALIAJBEGokAAslACABIAAtAABBAnQiAEGsp8AAaigCACAAQZSnwABqKAIAEPgCCyUAIAEgAC0AAEECdCIAQfC7wABqKAIAIABB4LvAAGooAgAQ+AILJAAgASAAKAIAQQN0IgBBmMLAAGooAgAgAEGcwsAAaigCABBLC1MBAn8gASADRgR/QQAhAwJAIAFFDQADQCAALQAAIgQgAi0AACIFRgRAIABBAWohACACQQFqIQIgAUEBayIBDQEMAgsLIAQgBWshAwsgAwVBAQtFCyABAX8gASAAKAIAIAAoAggiAmtLBEAgACACIAEQ7AELCyMAIABFBEBBxeDAAEEyEK8DAAsgACACIAMgBCABKAIQEQYACyMAIABFBEBBxeDAAEEyEK8DAAsgACACIAMgBCABKAIQERUACyMAIABFBEBBxeDAAEEyEK8DAAsgACACIAMgBCABKAIQERcACyMAIABFBEBBxeDAAEEyEK8DAAsgACACIAMgBCABKAIQEQgACyMAIABFBEBBxeDAAEEyEK8DAAsgACACIAMgBCABKAIQERkACx8AIAAoAgBBgICAgHhyQYCAgIB4RwRAIAAoAgQQUAsLFQAgACgCAEECRwRAIABBBGoQ6QILCxEAIAAoAgAEQCAAKAIEEFALCyEAIABFBEBBxeDAAEEyEK8DAAsgACACIAMgASgCEBECAAsfACAARQRAQcTHwABBMhCvAwALIAAgAiABKAIQEQMACx8AIABFBEBBus3AAEEyEK8DAAsgACACIAEoAhARAwALHwAgAEUEQEHg1sAAQTIQrwMACyAAIAIgASgCEBEDAAsZACAAKAIAQQhqEGggAUGEAU8EQCABEAALCyEAIABBADYCDCAAIAM2AgggACACNgIEIABBsNrAADYCAAsdACABKAIARQRAAAsgAEGg3cAANgIEIAAgATYCAAsfACAARQRAQcXgwABBMhCvAwALIAAgAiABKAIQEQEACw8AIAAQ6QIgAEEMahDpAgsdACAARQRAQcTHwABBMhCvAwALIAAgASgCEBEAAAsdACAARQRAQbrNwABBMhCvAwALIAAgASgCEBEAAAsbACAAIAEoAgAiACgCACACIAAoAgQoAgwRAgALHAAgASgCFEGE6cAAQQsgAUEYaigCACgCDBEEAAscACABKAIUQY/pwABBDiABQRhqKAIAKAIMEQQACxkAIAAoAhQgASACIABBGGooAgAoAgwRBAALGQAgACgCACIAKAIAIAEgACgCBCgCEBEBAAsUACAAKAIAIgBBhAFPBEAgABAACwvYAwIGfwF+QeSHwQAoAgBFBEAjAEEwayIBJAACQCAABEAgACkCACEHIABBADYCACABQShqIgMgAEEQaigCADYCACABQSBqIgIgAEEIaikCADcDACABIAc3AxggB6cEQCABQRBqIAMoAgA2AgAgAUEIaiACKQMANwMAIAEgASkDGDcDAAwCCyABQRhqEMQCCyMAQSBrIgAkACAAQRxqQQA6AAAgAEIANwIUIABBBDYCECAAQgA3AgggAEEIaiICEOcBIQMgAEGAATYCCCACKAIAECkhBSADIAMoAgBBAWoiAjYCAAJAIAIEQEGJh8EALQAAGkEEQQQQiQMiAkUEQEEEQQQQtAMACyACIAM2AgAgAkGU18AAQZkBEDchBiABQQRqIgRBlNfAADYCBCAEIAI2AgAgBCAGNgIIIAEgBTYCECABIAM2AgAgACgCCCIDQYQBTwRAIAMQAAsgAEEgaiQADAELAAsLQeSHwQApAgAhB0Hkh8EAIAEp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AADaAAAAFQBB4IXAAAuDIWBhc3luYyBmbmAgcmVzdW1lZCBhZnRlciBjb21wbGV0aW9uAGNhbm5vdCBhZHZhbmNlIHBhc3QgYHJlbWFpbmluZ2A6ICA8PSAAAAAEAxAAIQAAACUDEAAEAAAAL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9ieXRlcy0xLjQuMC9zcmMvYnl0ZXMucnMAPAMQAFMAAAAlAgAACQAAAHVzZHBsLkRldlRvb2xzdXNkcGxEZXZUb29sc2xvZwAAQAAAABgAAAAIAAAAQQAAAEIAAAAvcGx1Z2luL3NyYy9ydXN0L3RhcmdldC93YXNtMzItdW5rbm93bi11bmtub3duL3JlbGVhc2UvYnVpbGQvZmFudGFzdGljLXdhc20tOGZlZTYzZGJhMzA2YmZmYy9vdXQvdXNkcGwucnMAAADUAxAAaQAAAEsAAAAyAAAAdXNkcGwuVHJhbnNsYXRpb25zVHJhbnNsYXRpb25zZ2V0X2xhbmd1YWdlAADUAxAAaQAAAEwBAAA+AAAAZmFudGFzdGljLkZhbmZhbnRhc3RpY0ZhbmVjaG8vcGx1Z2luL3NyYy9ydXN0L3RhcmdldC93YXNtMzItdW5rbm93bi11bmtub3duL3JlbGVhc2UvYnVpbGQvZmFudGFzdGljLXdhc20tOGZlZTYzZGJhMzA2YmZmYy9vdXQvZmFudGFzdGljLnJzAACpBBAAbQAAAHYAAAA4AAAAaGVsbG8AAACpBBAAbQAAAIoAAAA6AAAAdmVyc2lvbgCpBBAAbQAAAJ4AAAA7AAAAdmVyc2lvbl9zdHIAqQQQAG0AAACyAAAAQgAAAG5hbWWpBBAAbQAAAMYAAAA4AAAAZ2V0X2Zhbl9ycG0AqQQQAG0AAADaAAAAWAAAAEMAAAAIAAAABAAAAEQAAABFAAAAZ2V0X3RlbXBlcmF0dXJlAKkEEABtAAAA8gAAAAsAAABDAAAACAAAAAQAAABGAAAARQAAAHNldF9lbmFibGUAAKkEEABtAAAABwEAAD4AAABnZXRfZW5hYmxlAACpBBAAbQAAABsBAAA+AAAAc2V0X2ludGVycG9sYXRlAKkEEABtAAAALwEAAD4AAABnZXRfaW50ZXJwb2xhdGUAqQQQAG0AAABDAQAAPgAAAGdldF9jdXJ2ZV94AKkEEABtAAAAVwEAADoAAABnZXRfY3VydmVfeQCpBBAAbQAAAGsBAAA6AAAAYWRkX2N1cnZlX3BvaW50AKkEEABtAAAAfwEAADIAAAByZW1vdmVfY3VydmVfcG9pbnQAAKkEEABtAAAAkwEAADIAAACpBBAAbQAAAOICAABNAAAAc2VydmljZTp8bWV0aG9kOmVjaG98ZXJyb3I6APAGEAAIAAAA+AYQABMAAABmYW50YXN0aWNfd2FzbTo6c2VydmljZXM6OmZhbnRhc3RpYzo6anNfZmFuABwHEAArAAAAHAcQACsAAACpBBAAbQAAAKkEEABtAAAA2AIAAAUAAACpBBAAbQAAAPMCAABRAAAAfG1ldGhvZDpoZWxsb3xlcnJvcjrwBhAACAAAAIAHEAAUAAAAqQQQAG0AAAAEAwAAUAAAAHxtZXRob2Q6dmVyc2lvbnxlcnJvcjoAAPAGEAAIAAAAtAcQABYAAACpBBAAbQAAABgDAAAzAAAAfG1ldGhvZDp2ZXJzaW9uX3N0cnxlcnJvcjoAAPAGEAAIAAAA7AcQABoAAACpBBAAbQAAACkDAABKAAAAfG1ldGhvZDpuYW1lfGVycm9yOgDwBhAACAAAACgIEAATAAAAqQQQAG0AAAA6AwAATwAAAHxtZXRob2Q6Z2V0X2Zhbl9ycG18ZXJyb3I6AADwBhAACAAAAFwIEAAaAAAAfG1ldGhvZDpnZXRfZmFuX3JwbXxjYWxsYmFjayByZXN1bHQ68AYQAAgAAACICBAAJAAAAAQDEAAAAAAAqQQQAG0AAABxAwAAUwAAAHxtZXRob2Q6Z2V0X3RlbXBlcmF0dXJlfGVycm9yOgAA8AYQAAgAAADUCBAAHgAAAHxtZXRob2Q6Z2V0X3RlbXBlcmF0dXJlfGNhbGxiYWNrIHJlc3VsdDrwBhAACAAAAAQJEAAoAAAAqQQQAG0AAACrAwAALwAAAHxtZXRob2Q6c2V0X2VuYWJsZXxlcnJvcjoAAADwBhAACAAAAEwJEAAZAAAAqQQQAG0AAAC8AwAAVgAAAHxtZXRob2Q6Z2V0X2VuYWJsZXxlcnJvcjoAAADwBhAACAAAAIgJEAAZAAAAqQQQAG0AAADQAwAALwAAAHxtZXRob2Q6c2V0X2ludGVycG9sYXRlfGVycm9yOgAA8AYQAAgAAADECRAAHgAAAKkEEABtAAAA5AMAAC8AAAB8bWV0aG9kOmdldF9pbnRlcnBvbGF0ZXxlcnJvcjoAAPAGEAAIAAAABAoQAB4AAACpBBAAbQAAAPUDAABTAAAAfG1ldGhvZDpnZXRfY3VydmVfeHxlcnJvcjoAAPAGEAAIAAAARAoQABoAAACpBBAAbQAAAAYEAABTAAAAfG1ldGhvZDpnZXRfY3VydmVfeXxlcnJvcjoAAPAGEAAIAAAAgAoQABoAAACpBBAAbQAAABcEAABVAAAAfG1ldGhvZDphZGRfY3VydmVfcG9pbnR8ZXJyb3I6AADwBhAACAAAALwKEAAeAAAAqQQQAG0AAAArBAAAVAAAAHxtZXRob2Q6cmVtb3ZlX2N1cnZlX3BvaW50fGVycm9yOgAAAPAGEAAIAAAA/AoQACEAAADUAxAAaQAAAO0BAAA4AAAAfG1ldGhvZDpnZXRfbGFuZ3VhZ2V8ZXJyb3I6APAGEAAIAAAAQAsQABsAAABmYW50YXN0aWNfd2FzbTo6c2VydmljZXM6OnVzZHBsOjpqc190cmFuc2xhdGlvbnNsCxAAMAAAAGwLEAAwAAAA1AMQAGkAAADUAxAAaQAAAN4BAAAFAAAA1AMQAGkAAAAOAQAAKAAAAHxtZXRob2Q6bG9nfGVycm9yOgAA8AYQAAgAAADUCxAAEgAAAGZhbnRhc3RpY193YXNtOjpzZXJ2aWNlczo6dXNkcGw6OmpzX2RldnRvb2xz+AsQACwAAAD4CxAALAAAANQDEABpAAAA1AMQAGkAAAAAAQAABQAAAGludmFsaWQgZW51bSB2YWx1ZSBwYXNzZWQAAABpbnZhbGlkIHRhZyB2YWx1ZTogMGludmFsaWQga2V5IHZhbHVlOiAAfAwQABMAAABpbnZhbGlkIHZhcmludGludmFsaWQgd2lyZSB0eXBlIHZhbHVlOiAApgwQABkAAABFY2hvTWVzc2FnZW1zZ05hbWVNZXNzYWdlbmFtZUhlbGxvUmVzcG9uc2VwaHJhc2VFbXB0eW9rVmVyc2lvbk1lc3NhZ2VtYWpvcm1pbm9ycGF0Y2hWZXJzaW9uRGlzcGxheU1lc3NhZ2VkaXNwbGF5UnBtTWVzc2FnZXJwbVRlbXBlcmF0dXJlTWVzc2FnZXRlbXBlcmF0dXJlRW5hYmxlbWVudE1lc3NhZ2Vpc19lbmFibGVkeHlDdXJ2ZU1lc3NhZ2VYQ3VydmVNZXNzYWdlWWB1bndyYXBfdGhyb3dgIGZhaWxlZGFzc2VydGlvbiBmYWlsZWQ6IHNlbGYucmVtYWluaW5nKCkgPj0gZHN0LmxlbigpL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9ieXRlcy0xLjQuMC9zcmMvYnVmL2J1Zl9pbXBsLnJzAN0NEABaAAAA/gAAAAkAAABhc3NlcnRpb24gZmFpbGVkOiBzZWxmLnJlbWFpbmluZygpID49IDEA3Q0QAFoAAAAhAQAACQAAAN0NEABaAAAAIgEAABMAAABjYW5ub3QgYWR2YW5jZSBwYXN0IGByZW1haW5pbmdgOiAgPD0gAAAAkA4QACEAAACxDhAABAAAAC9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvYnl0ZXMtMS40LjAvc3JjL2J5dGVzLnJzAMgOEABTAAAAJQIAAAkAAAAvcm9vdC8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL2J5dGVzLTEuNC4wL3NyYy9idWYvdGFrZS5yc2Fzc2VydGlvbiBmYWlsZWQ6IGNudCA8PSBzZWxmLmxpbWl0AAAALA8QAFYAAACPAAAACQAAAC9wbHVnaW4vc3JjL3J1c3QvdGFyZ2V0L3dhc20zMi11bmtub3duLXVua25vd24vcmVsZWFzZS9idWlsZC9mYW50YXN0aWMtd2FzbS04ZmVlNjNkYmEzMDZiZmZjL291dC91c2RwbC5ycy9wbHVnaW4vc3JjL3J1c3QvdGFyZ2V0L3dhc20zMi11bmtub3duLXVua25vd24vcmVsZWFzZS9idWlsZC9mYW50YXN0aWMtd2FzbS04ZmVlNjNkYmEzMDZiZmZjL291dC9mYW50YXN0aWMucnNJbml0aWFsaXplZCB3cyBzZXJ2aWNlIEZhbiBvbiBwb3J0IAAAAI4QEAAjAAAAZmFudGFzdGljX3dhc206OnNlcnZpY2VzOjpmYW50YXN0aWM6OmpzX2ZhbgC8EBAAKwAAALwQEAArAAAAIRAQAG0AAABJbml0aWFsaXplZCB3cyBzZXJ2aWNlIFRyYW5zbGF0aW9ucyBvbiBwb3J0IAAREAAsAAAAZmFudGFzdGljX3dhc206OnNlcnZpY2VzOjp1c2RwbDo6anNfdHJhbnNsYXRpb25zNBEQADAAAAA0ERAAMAAAALgPEABpAAAASW5pdGlhbGl6ZWQgd3Mgc2VydmljZSBEZXZUb29scyBvbiBwb3J0IHwREAAoAAAAZmFudGFzdGljX3dhc206OnNlcnZpY2VzOjp1c2RwbDo6anNfZGV2dG9vbHOsERAALAAAAKwREAAsAAAAuA8QAGkAAABpbnZhbGlkIHRhZyB2YWx1ZTogMGludmFsaWQga2V5IHZhbHVlOiAABBIQABMAAABkZWxpbWl0ZWQgbGVuZ3RoIGV4Y2VlZGVkYnVmZmVyIHVuZGVyZmxvd3VuZXhwZWN0ZWQgZW5kIGdyb3VwIHRhZ3JlY3Vyc2lvbiBsaW1pdCByZWFjaGVkaW52YWxpZCB2YXJpbnRpbnZhbGlkIHdpcmUgdHlwZTogIChleHBlY3RlZCApAAAAhhIQABMAAACZEhAACwAAAKQSEAABAAAAaW52YWxpZCBzdHJpbmcgdmFsdWU6IGRhdGEgaXMgbm90IFVURi04IGVuY29kZWRWYXJpbnRTaXh0eUZvdXJCaXRMZW5ndGhEZWxpbWl0ZWRTdGFydEdyb3VwRW5kR3JvdXBUaGlydHlUd29CaXQAAEsAAABpbnZhbGlkIHdpcmUgdHlwZSB2YWx1ZTogAAAANBMQABkAAAD//////////1gTEABB8KbAAAuzBUVtcHR5b2tUcmFuc2xhdGlvbnNSZXBseXRyYW5zbGF0aW9ucwYAAAAMAAAADwAAAAoAAAAIAAAADAAAAO8SEAD1EhAAARMQABATEAAaExAAIhMQAC9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvZnV0dXJlcy11dGlsLTAuMy4yOC9zcmMvbG9jay9iaWxvY2sucnMAAADEExAAYQAAAL8AAAAbAAAAaW52YWxpZCB1bmxvY2tlZCBzdGF0ZQAAxBMQAGEAAACvAAAAEgAAAGZ1dHVyZXM6IHRyeV91bndyYXAgZmFpbGVkIGluIEJpTG9jazxUPjo6cmV1bml0ZcQTEABhAAAAowAAABIAAABpbnZhbGlkIHN0YXRlOiAAoBQQAA8AAADEExAAYQAAAIQAAAAbAAAAxBMQAGEAAAD9AAAASgAAAC9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvZnV0dXJlcy1jaGFubmVsLTAuMy4yOC9zcmMvbXBzYy9tb2QucnMAAADYFBAAYQAAAAsEAAAdAAAA2BQQAGEAAADLAwAAHQAAANgUEABhAAAAlgIAADQAAABidWZmZXIgc3BhY2UgZXhoYXVzdGVkOyBzZW5kaW5nIHRoaXMgbWVzc2FnZXMgd291bGQgb3ZlcmZsb3cgdGhlIHN0YXRlAADYFBAAYQAAADsCAAANAAAA2BQQAGEAAABNAgAANgAAAHJlcXVlc3RlZCBidWZmZXIgc2l6ZSB0b28gbGFyZ2UA2BQQAGEAAABgAQAABQAAAFIAAABwAgAACAAAAFMAAABUAAAA//////////8YFhAAQbCswAALnERVAAAADAAAAAQAAABWAAAAVwAAAFgAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5AFkAAAAAAAAAAQAAAFoAAAAvcnVzdGMvMDdkY2E0ODlhYzJkOTMzYzc4ZDNjNTE1OGUzZjQzYmVlZmViMDJjZS9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAkBYQAEsAAAAzCgAADgAAAGRlc2NyaXB0aW9uKCkgaXMgZGVwcmVjYXRlZDsgdXNlIERpc3BsYXljYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlY2FsbGVkIGBSZXN1bHQ6OnVud3JhcCgpYCBvbiBhbiBgRXJyYCB2YWx1ZQAAWwAAAAgAAAAEAAAAXAAAAF0AAAAYAAAABAAAAF4AAABFcnJvckNvbm5lY3RpbmdPcGVuQ2xvc2luZ0Nsb3NlZNgUEABhAAAATQQAAEYAAABhc3NlcnRpb24gZmFpbGVkOiBzZWxmLnN0YXRlLmxvYWQoU2VxQ3N0KS5pc19udWxsKCkAxBMQAGEAAADFAAAACQAAANgUEABhAAAAMQQAACUAAAB1c2RwbC1ucnBjd3Mgb3BlbmVkIHN1Y2Nlc3NmdWxseSB3aXRoIHVybCBgYBoYEAAhAAAAOxgQAAEAAAB1c2RwbF9mcm9udDo6Y2xpZW50X2hhbmRsZXIvcm9vdC8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL3VzZHBsLWZyb250LTAuMTEuMC9zcmMvY2xpZW50X2hhbmRsZXIucnMAAEwYEAAbAAAATBgQABsAAABnGBAAYwAAAHdzIHdpdGggdXJsIGBgIGluaXRpYWwgc3RhdGU6IAAA5BgQAA0AAADxGBAAEQAAAHdzIG9wZW4gZXJyb3I6IAAUGRAADwAAAGcYEABjAAAAGAAAAJ8AAAAAAAAAYGFzeW5jIGZuYCByZXN1bWVkIGFmdGVyIGNvbXBsZXRpb24AZxgQAGMAAABzAAAAMQAAAGAgaGFzIGNsb3NlZOQYEAANAAAAdBkQAAwAAABJbnB1dCBhbmQgb3V0cHV0IHN0cmVhbXMgYXJlIGJvdGggYWxpdmUAkBkQACcAAABHb3QgbWVzc2FnZSB0byBzZW5kIG92ZXIgd2Vic29ja2V0AADAGRAAIgAAAFJlY2VpdmVkIG1lc3NhZ2UgZnJvbSB3ZWJzb2NrZXQA7BkQAB8AAABNZXNzYWdlOjpUZXh0IG5vdCBhbGxvd2VkAAAAZxgQAGMAAABLAAAAOQAAAE91dHB1dCBzdHJlYW0gaXMgY29tcGxldGUAAABAGhAAGQAAAElucHV0IHN0cmVhbSBpcyBjb21wbGV0ZWQaEAAYAAAAZxgQAGMAAABeAAAAMQAAAEVycm9yIG1lc3NhZ2U6IACUGhAADwAAAFtdKCkgAAAArBoQAAEAAACtGhAAAgAAAK8aEAACAAAAOgAAAOwWEAAAAAAAzBoQAAEAAABsaW5lPwAAAAMAAABfAAAABAAAAAQAAABgAAAAYQAAAGIAAABpbml0X3VzZHBsKCkgbG9nIGNvbmZpZ3VyZWQABBsQABsAAAB1c2RwbF9mcm9udC9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvdXNkcGwtZnJvbnQtMC4xMS4wL3NyYy9saWIucnMAKBsQAAsAAAAoGxAACwAAADMbEABYAAAAVVNEUEwgaW5pdCBzdWNjZWVkZWQ6IAAApBsQABYAAABVU0RQTCBpbml0IHdhcyByZS1hdHRlbXB0ZWQAxBsQABsAAABGYWlsZWQgdG8gc2V0dXAgVVNEUEwgbG9nZ2VyOiAAAOgbEAAeAAAAdXNkcGwtZnJvbnQgdjAuMTEuMCAoR1BMLTMuMC1vbmx5KSBmb3IgIGJ5IE5Hbml1cyA8bmduaXVzbmVzc0BnbWFpbC5jb20+LCBtb3JlOiBodHRwczovL2dpdC5uZ25pLnVzL05HLVNELVBsdWdpbnMvdXNkcGwtcnMAABAcEAAnAAAANxwQAFMAAABFcnJvclN0cl8AAAAEAAAABAAAAGMAAABkAAAAKAAAAAQAAABlAAAAd3M6Ly91c2RwbC13cy0ubG9jYWxob3N0Oi8uAMQcEAAOAAAA0hwQAAsAAADdHBAAAQAAAN4cEAABAAAA3RwQAAEAAABkb2luZyBzZW5kL3JlY2VpdmUgb24gd3MgdXJsIGAAAAgdEAAeAAAAOxgQAAEAAABmAAAABAAAAAQAAABnAAAAaAAAAGcYEABjAAAAmgAAAEYAAABVAAAADAAAAAQAAABpAAAAVQAAAAwAAAAEAAAAagAAAGkAAABcHRAAawAAAGwAAABtAAAAawAAAG4AAAAwLjExLjAAADMbEABYAAAAYAAAAA4AAAAzGxAAWAAAAGwAAAAOAAAAMxsQAFgAAAB2AAAAQAAAADMbEABYAAAAhAAAAEAAAAAKAAAABAAAAAcAAAAGAAAAkRcQAJsXEACfFxAAphcQAFJldW5pdGVFcnJvci4uLgAMHhAAAwAAAG8AAAAIAAAABAAAAHAAAAAvcm9vdC8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL2Z1dHVyZXMtdXRpbC0wLjMuMjgvc3JjL2Z1dHVyZS9zZWxlY3QucnNjYW5ub3QgcG9sbCBTZWxlY3QgdHdpY2UAKB4QAGMAAABwAAAAKgAAAGFzc2VydGlvbiBmYWlsZWQ6ICgqdGFpbCkudmFsdWUuaXNfbm9uZSgpL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9mdXR1cmVzLWNoYW5uZWwtMC4zLjI4L3NyYy9tcHNjL3F1ZXVlLnJz3R4QAGMAAAB5AAAADQAAAGFzc2VydGlvbiBmYWlsZWQ6ICgqbmV4dCkudmFsdWUuaXNfc29tZSgpAAAA3R4QAGMAAAB6AAAADQAAAABjYW5ub3QgcmVjdXJzaXZlbHkgYWNxdWlyZSBtdXRleAAAAI0fEAAgAAAAL3J1c3RjLzA3ZGNhNDg5YWMyZDkzM2M3OGQzYzUxNThlM2Y0M2JlZWZlYjAyY2UvbGlicmFyeS9zdGQvc3JjL3N5cy93YXNtLy4uL3Vuc3VwcG9ydGVkL2xvY2tzL211dGV4LnJzAAC4HxAAZgAAABQAAAAJAAAAUG9pc29uRXJyb3Jwb2xsZWQgRmVlZCBhZnRlciBjb21wbGV0aW9uL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9mdXR1cmVzLXV0aWwtMC4zLjI4L3NyYy9zaW5rL2ZlZWQucnMAAFcgEABfAAAAJwAAACUAAABhbnkAyCAQAAMAAABkZWNreQAAANQgEAAFAAAAcQAAAAAAAAABAAAAcgAAAHMAAAB0AAAAT0ZGRVJST1JXQVJOSU5GT0RFQlVHVFJBQ0UAAPwgEAADAAAA/yAQAAUAAAAEIRAABAAAAAghEAAEAAAADCEQAAUAAAARIRAABQAAAGF0dGVtcHRlZCB0byBzZXQgYSBsb2dnZXIgYWZ0ZXIgdGhlIGxvZ2dpbmcgc3lzdGVtIHdhcyBhbHJlYWR5IGluaXRpYWxpemVkAABrZXktdmFsdWUgc3VwcG9ydCBpcyBleHBlcmltZW50YWwgYW5kIG11c3QgYmUgZW5hYmxlZCB1c2luZyB0aGUgYGt2X3Vuc3RhYmxlYCBmZWF0dXJlL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9sb2ctMC40LjIwL3NyYy9fX3ByaXZhdGVfYXBpLnJzAOkhEABaAAAAEQAAAAkAAABFbmNvZGUgZXJyb3I6IAAAVCIQAA4AAABEZWNvZGUgZXJyb3I6IAAAbCIQAA4AAABNZXRob2Qgbm90IGZvdW5kIGVycm9yAACEIhAAFgAAAFNlcnZpY2Ugbm90IGZvdW5kIGVycm9yAKQiEAAXAAAATWV0aG9kIGVycm9yOiAAAMQiEAAOAAAAU3RyZWFtIGxlbmd0aCBlcnJvcjogd2FudGVkICwgZ290IAAA3CIQABwAAAD4IhAABgAAAGZhaWxlZCB0byBkZWNvZGUgUHJvdG9idWYgbWVzc2FnZTogLjogAAAQIxAAAAAAADMjEAABAAAANCMQAAIAAABmYWlsZWQgdG8gZW5jb2RlIFByb3RvYnVmIG1lc3NhZ2U7IGluc3VmZmljaWVudCBidWZmZXIgY2FwYWNpdHkgKHJlcXVpcmVkOiAsIHJlbWFpbmluZzogKQAAAFAjEABLAAAAmyMQAA0AAACoIxAAAQAAAGNsb3N1cmUgaW52b2tlZCByZWN1cnNpdmVseSBvciBhZnRlciBiZWluZyBkcm9wcGVkY2FsbGVkIGBSZXN1bHQ6OnVud3JhcCgpYCBvbiBhbiBgRXJyYCB2YWx1ZQAAAHsAAAAEAAAABAAAAHoAAABpbnRlcm5hbCBlcnJvcjogZW50ZXJlZCB1bnJlYWNoYWJsZSBjb2RlOiBKc1ZhbHVlIHBhc3NlZCBpcyBub3QgYW4gRXJyb3IgdHlwZSAtLSB0aGlzIGlzIGEgYnVnAAA0JBAAXgAAAC9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvZ2xvby1uZXQtMC40LjAvc3JjL2Vycm9yLnJzAACcJBAAVgAAACgAAAAXAAAAZXJyb3JpbnRlcm5hbCBlcnJvcjogZW50ZXJlZCB1bnJlYWNoYWJsZSBjb2RlAAAAfAAAAAQAAAAEAAAAfQAAAH4AAABvcGVufwAAAAQAAAAEAAAAgAAAAIEAAABtZXNzYWdlAIIAAAAIAAAABAAAAIMAAACEAAAAfwAAAAQAAAAEAAAAhQAAAIYAAABjbG9zZS9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvZ2xvby1uZXQtMC40LjAvc3JjL3dlYnNvY2tldC9mdXR1cmVzLnJzAJUlEABiAAAAhAAAACwAAACVJRAAYgAAAKAAAAAsAAAAlSUQAGIAAADiAAAAEgAAAGludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGU6IG1lc3NhZ2UgZXZlbnQsIHJlY2VpdmVkIFVua25vd246IAAoJhAASwAAAJUlEABiAAAAAAEAAAkAAACVJRAAYgAAAAoBAAAeAAAAlSUQAGIAAAA7AQAAGQAAAGNsaWVudCBkcm9wcGVkY2xvc3VyZSBpbnZva2VkIHJlY3Vyc2l2ZWx5IG9yIGFmdGVyIGJlaW5nIGRyb3BwZWRhc3NlcnRpb24gZmFpbGVkOiAoKnRhaWwpLnZhbHVlLmlzX25vbmUoKS9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvZnV0dXJlcy1jaGFubmVsLTAuMy4yOC9zcmMvbXBzYy9xdWV1ZS5ycxUnEABjAAAAeQAAAA0AAABhc3NlcnRpb24gZmFpbGVkOiAoKm5leHQpLnZhbHVlLmlzX3NvbWUoKQAAABUnEABjAAAAegAAAA0AAABidWZmZXIgc3BhY2UgZXhoYXVzdGVkOyBzZW5kaW5nIHRoaXMgbWVzc2FnZXMgd291bGQgb3ZlcmZsb3cgdGhlIHN0YXRlL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9mdXR1cmVzLWNoYW5uZWwtMC4zLjI4L3NyYy9tcHNjL21vZC5ycwAKKBAAYQAAALgBAAANAAAAY2FsbGVkIGBPcHRpb246OnVud3JhcCgpYCBvbiBhIGBOb25lYCB2YWx1ZQAKKBAAYQAAAOUEAABGAAAAY2Fubm90IGNsb25lIGBTZW5kZXJgIC0tIHRvbyBtYW55IG91dHN0YW5kaW5nIHNlbmRlcnMAAAAKKBAAYQAAAGUDAAARAAAACigQAGEAAADJBAAAJQAAAFdlYlNvY2tldCBjb25uZWN0aW9uIGZhaWxlZAAQKRAAGwAAAFdlYlNvY2tldCBDbG9zZWQ6IGNvZGU6ICwgcmVhc29uOiAAADQpEAAYAAAATCkQAAoAAAB8KBAAAAAAAGNhbm5vdCBhY2Nlc3MgYSBUaHJlYWQgTG9jYWwgU3RvcmFnZSB2YWx1ZSBkdXJpbmcgb3IgYWZ0ZXIgZGVzdHJ1Y3Rpb24AAJIAAAAAAAAAAQAAAJMAAAAvcnVzdGMvMDdkY2E0ODlhYzJkOTMzYzc4ZDNjNTE1OGUzZjQzYmVlZmViMDJjZS9saWJyYXJ5L3N0ZC9zcmMvdGhyZWFkL2xvY2FsLnJzAMgpEABPAAAA9gAAABoAAAAvcm9vdC8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL3dhc20tYmluZGdlbi1mdXR1cmVzLTAuNC4zNy9zcmMvcXVldWUucnMAKCoQAGMAAAAaAAAALgAAACgqEABjAAAAHQAAACkAAAAoKhAAYwAAADIAAAAaAAAAL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi93YXNtLWJpbmRnZW4tZnV0dXJlcy0wLjQuMzcvc3JjL3Rhc2svc2luZ2xldGhyZWFkLnJzALwqEABvAAAAIQAAABUAAACUAAAAlQAAAJYAAACXAAAAmAAAALwqEABvAAAAVQAAACUAAABjbG9zdXJlIGludm9rZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgYmVpbmcgZHJvcHBlZAAAnAAAAAQAAAAEAAAAnQAAAJ4AAABjYW5ub3QgYWNjZXNzIGEgVGhyZWFkIExvY2FsIFN0b3JhZ2UgdmFsdWUgZHVyaW5nIG9yIGFmdGVyIGRlc3RydWN0aW9uAACfAAAAAAAAAAEAAACTAAAAL3J1c3RjLzA3ZGNhNDg5YWMyZDkzM2M3OGQzYzUxNThlM2Y0M2JlZWZlYjAyY2UvbGlicmFyeS9zdGQvc3JjL3RocmVhZC9sb2NhbC5ycwAALBAATwAAAPYAAAAaAAAAVHJpZWQgdG8gc2hyaW5rIHRvIGEgbGFyZ2VyIGNhcGFjaXR5YCwQACQAAAAvcnVzdGMvMDdkY2E0ODlhYzJkOTMzYzc4ZDNjNTE1OGUzZjQzYmVlZmViMDJjZS9saWJyYXJ5L2FsbG9jL3NyYy9yYXdfdmVjLnJzjCwQAEwAAADPAQAACQAAAGNhbGxlZCBgUmVzdWx0Ojp1bndyYXAoKWAgb24gYW4gYEVycmAgdmFsdWUAoAAAAAAAAAABAAAAoQAAAExheW91dEVycm9yAKIAAACjAAAApAAAAC9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvYnl0ZXMtMS40LjAvc3JjL2J5dGVzLnJzAKUAAACmAAAApwAAAKgAAACpAAAAqgAAADwtEABTAAAAAwQAADIAAAA8LRAAUwAAABEEAABJAAAAqwAAAKwAAACtAAAAL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9ieXRlcy0xLjQuMC9zcmMvYnl0ZXNfbXV0LnJzb3ZlcmZsb3cA1C0QAFcAAACJAgAANwAAANQtEABXAAAAtQIAADgAAABuZXdfbGVuID0gOyBjYXBhY2l0eSA9IABULhAACgAAAF4uEAANAAAA1C0QAFcAAABCBAAACQAAAK4AAACvAAAAsAAAAJguEAAAAAAAsgAAAAgAAAAEAAAAswAAAGJsb2JhcnJheWJ1ZmZlcmF0dGVtcHRlZCB0byBjb252ZXJ0IGludmFsaWQgQmluYXJ5VHlwZSBpbnRvIEpTVmFsdWUvcm9vdC8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL3dlYi1zeXMtMC4zLjY0L3NyYy9mZWF0dXJlcy9nZW5fQmluYXJ5VHlwZS5ycwDzLhAAaAAAAAQAAAABAAAAtAAAAAgAAAAEAAAAtQAAALYAAABvbmNlY29kZXJlYXNvbgAAtwAAAAwAAAAEAAAAuAAAALkAAABYAAAAVHJpZWQgdG8gc2hyaW5rIHRvIGEgbGFyZ2VyIGNhcGFjaXR5qC8QACQAAAAvcnVzdGMvMDdkY2E0ODlhYzJkOTMzYzc4ZDNjNTE1OGUzZjQzYmVlZmViMDJjZS9saWJyYXJ5L2FsbG9jL3NyYy9yYXdfdmVjLnJz1C8QAEwAAADPAQAACQAAAGB1bndyYXBfdGhyb3dgIGZhaWxlZGNsb3N1cmUgaW52b2tlZCByZWN1cnNpdmVseSBvciBhZnRlciBiZWluZyBkcm9wcGVkbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdEpzVmFsdWUoKQAA4TAQAAgAAADpMBAAAQAAAMcAAAAEAAAABAAAAMgAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9mdXR1cmVzLWNvcmUtMC4zLjI4L3NyYy90YXNrL19faW50ZXJuYWwvYXRvbWljX3dha2VyLnJzAAAANzEQAHIAAAA2AQAARAAAAGNhbGxlZCBgT3B0aW9uOjp1bndyYXAoKWAgb24gYSBgTm9uZWAgdmFsdWUAygAAAAwAAAAEAAAAywAAAMwAAADNAAAAQWNjZXNzRXJyb3JtZW1vcnkgYWxsb2NhdGlvbiBvZiAgYnl0ZXMgZmFpbGVkAAAACzIQABUAAAAgMhAADQAAAGxpYnJhcnkvc3RkL3NyYy9hbGxvYy5yc0AyEAAYAAAAYgEAAAkAAABsaWJyYXJ5L3N0ZC9zcmMvcGFuaWNraW5nLnJzaDIQABwAAACEAgAAHgAAAMoAAAAMAAAABAAAAM4AAADPAAAACAAAAAQAAADQAAAAzwAAAAgAAAAEAAAA0QAAANIAAADTAAAAEAAAAAQAAADUAAAA1QAAANYAAAAAAAAAAQAAANcAAABIYXNoIHRhYmxlIGNhcGFjaXR5IG92ZXJmbG937DIQABwAAAAvcnVzdC9kZXBzL2hhc2hicm93bi0wLjE0LjMvc3JjL3Jhdy9tb2QucnMAABAzEAAqAAAAVgAAACgAAABFcnJvcgAAANgAAAAMAAAABAAAANkAAADaAAAA2wAAAGxpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMucnNjYXBhY2l0eSBvdmVyZmxvdwAAAIgzEAARAAAAbDMQABwAAAA7AgAABQAAAGEgZm9ybWF0dGluZyB0cmFpdCBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvcgDcAAAAAAAAAAEAAADdAAAAbGlicmFyeS9hbGxvYy9zcmMvZm10LnJz+DMQABgAAABkAgAAIAAAAGxpYnJhcnkvY29yZS9zcmMvZm10L21vZC5yc2NhbGxlZCBgT3B0aW9uOjp1bndyYXAoKWAgb24gYSBgTm9uZWAgdmFsdWUpLi4AAABnNBAAAgAAADAxMjM0NTY3ODlhYmNkZWZCb3Jyb3dFcnJvckJvcnJvd011dEVycm9yYWxyZWFkeSBib3Jyb3dlZDogAJ00EAASAAAAYWxyZWFkeSBtdXRhYmx5IGJvcnJvd2VkOiAAALg0EAAaAAAAIDQQAAAAAADmAAAAAAAAAAEAAADnAAAAaW5kZXggb3V0IG9mIGJvdW5kczogdGhlIGxlbiBpcyAgYnV0IHRoZSBpbmRleCBpcyAAAPQ0EAAgAAAAFDUQABIAAAA9PSE9bWF0Y2hlc2Fzc2VydGlvbiBgbGVmdCAgcmlnaHRgIGZhaWxlZAogIGxlZnQ6IAogcmlnaHQ6IABDNRAAEAAAAFM1EAAXAAAAajUQAAkAAAAgcmlnaHRgIGZhaWxlZDogCiAgbGVmdDogAAAAQzUQABAAAACMNRAAEAAAAJw1EAAJAAAAajUQAAkAAAA6IAAAIDQQAAAAAADINRAAAgAAAOgAAAAMAAAABAAAAOkAAADqAAAA6wAAACAgICAsICwKIHsgLi4gfSwgLi4gfS4uCn0gfSgoCixsaWJyYXJ5L2NvcmUvc3JjL2ZtdC9udW0ucnMAABM2EAAbAAAAaQAAABcAAAAweDAwMDEwMjAzMDQwNTA2MDcwODA5MTAxMTEyMTMxNDE1MTYxNzE4MTkyMDIxMjIyMzI0MjUyNjI3MjgyOTMwMzEzMjMzMzQzNTM2MzczODM5NDA0MTQyNDM0NDQ1NDY0NzQ4NDk1MDUxNTI1MzU0NTU1NjU3NTg1OTYwNjE2MjYzNjQ2NTY2Njc2ODY5NzA3MTcyNzM3NDc1NzY3Nzc4Nzk4MDgxODI4Mzg0ODU4Njg3ODg4OTkwOTE5MjkzOTQ5NTk2OTc5ODk5ZmFsc2V0cnVlACA0EAAbAAAANQkAABoAAAAgNBAAGwAAAC4JAAAiAAAAcmFuZ2Ugc3RhcnQgaW5kZXggIG91dCBvZiByYW5nZSBmb3Igc2xpY2Ugb2YgbGVuZ3RoIDQ3EAASAAAARjcQACIAAAByYW5nZSBlbmQgaW5kZXggeDcQABAAAABGNxAA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";

  function asciiToBinary(str) {
    if (typeof atob === 'function') {
      return atob(str)
    } else {
      return new Buffer(str, 'base64').toString('binary');
    }
  }

  function decode() {
    var binaryString =  asciiToBinary(encoded);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return (async function() {
      return new Response(bytes.buffer, {
          status: 200,
          statusText: 'OK',
          headers: {
              'Content-Type': 'application/wasm'
          }
      });
    })();
  }

  function init_embedded() {
      return __wbg_init(decode())
  }

  //import {init_usdpl, target_usdpl, init_embedded, call_backend} from "usdpl-front";
  //@ts-ignore
  //const Fan = {};
  const USDPL_PORT = 44444;
  var FAN_CLIENT = undefined;
  // Utility
  function resolve(promise, setter) {
      (async function () {
          let data = await promise;
          if (data != null) {
              console.debug("Got resolved", data);
              setter(data);
          }
          else {
              console.warn("Resolve failed:", data);
          }
      })();
  }
  async function initBackend() {
      // init usdpl
      await init_embedded();
      FAN_CLIENT = new Fan(USDPL_PORT);
      console.log("FANTASTIC: USDPL started for framework: " + target_usdpl());
      //setReady(true);
  }
  // Back-end functions
  async function setEnabled(value) {
      return (await FAN_CLIENT.set_enable(value)) ?? value;
      //return (await call_backend("set_enable", [value]))[0];
  }
  async function getEnabled() {
      return (await FAN_CLIENT.get_enable(true)) ?? false;
  }
  async function setInterpolate(value) {
      return (await FAN_CLIENT.set_interpolate(value)) ?? value;
      //return (await call_backend("set_interpolate", [value]))[0];
  }
  async function getInterpolate() {
      return (await FAN_CLIENT.get_interpolate(true)) ?? false;
      //return (await call_backend("get_interpolate", []))[0];
  }
  async function getVersion() {
      return (await FAN_CLIENT.version_str(true)) ?? "version";
      //return (await call_backend("version", []))[0];
  }
  async function getName() {
      return (await FAN_CLIENT.name(true)) ?? "broken";
      //return (await call_backend("name", []))[0];
  }
  async function getCurve() {
      var x_s = (await FAN_CLIENT.get_curve_x(true)) ?? [];
      var y_s = (await FAN_CLIENT.get_curve_y(true)) ?? [];
      let result = [];
      for (let i = 0; i < x_s.length && i < y_s.length; i++) {
          result.push({
              x: x_s[i],
              y: y_s[i],
          });
      }
      return result;
  }
  async function addCurvePoint(point) {
      await FAN_CLIENT.add_curve_point(point.x, point.y);
      return getCurve();
  }
  async function removeCurvePoint(index) {
      await FAN_CLIENT.remove_curve_point(index);
      return getCurve();
      //return (await call_backend("remove_curve_point", [index]))[0];
  }
  async function getFanRpm(callback) {
      return (await FAN_CLIENT.get_fan_rpm(true, callback));
  }
  async function getTemperature(callback) {
      return (await FAN_CLIENT.get_temperature(true, callback));
  }

  // from https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
  const Canvas = (props) => {
      const { draw, options, ...rest } = props;
      //const { context, ...moreConfig } = options;
      const canvasRef = useCanvas(draw);
      return window.SP_REACT.createElement("canvas", { ref: canvasRef, ...rest });
  };
  const useCanvas = (draw) => {
      const canvasRef = React.useRef(null);
      React.useEffect(() => {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          let frameCount = 0;
          let animationFrameId;
          const render = () => {
              frameCount++;
              draw(context, frameCount);
              animationFrameId = window.requestAnimationFrame(render);
          };
          render();
          return () => {
              window.cancelAnimationFrame(animationFrameId);
          };
      }, [draw]);
      return canvasRef;
  };

  const POINT_SIZE = 32;
  var periodicHook = null;
  var usdplReady = false;
  var name = "";
  var version = "";
  var curve_backup = [];
  var tempCache = -1337;
  var setTemperature_display = (_) => { };
  var fanRpmCache = -273;
  var setFanRpm_display = (_) => { };
  var manualSpeedTimer = null;
  var manualSpeedSeq = 0;
  const Content = ({ serverAPI }) => {
      // const [result, setResult] = useState<number | undefined>();
      // const onClick = async () => {
      //   const result = await serverAPI.callPluginMethod<AddMethodArgs, number>(
      //     "add",
      //     {
      //       left: 2,
      //       right: 2,
      //     }
      //   );
      //   if (result.success) {
      //     setResult(result.result);
      //   }
      // };
      const [enabledGlobal, setEnableInternal] = React.useState(false);
      const [interpolGlobal, setInterpol] = React.useState(false);
      const [_serverApiGlobal, setServerApi] = React.useState(serverAPI);
      const [firstTime, setFirstTime] = React.useState(true);
      const [curveGlobal, setCurve_internal] = React.useState(curve_backup);
      const [manualSpeedGlobal, setManualSpeedState] = React.useState(0);
      const setCurve = (value) => {
          setCurve_internal(value);
          curve_backup = value;
          if (value.length > 0) {
              const flat = value.every((point) => Math.abs(point.y - value[0].y) < 0.005);
              const speed = flat
                  ? value[0].y
                  : value.reduce((sum, point) => sum + point.y, 0) / value.length;
              setManualSpeedState(Math.round(speed * 100));
          }
      };
      const setManualSpeed = (value) => {
          setManualSpeedState(value);
          if (!enabledGlobal) {
              setEnable(true);
              resolve(setEnabled(true), setEnable);
          }
          const seq = ++manualSpeedSeq;
          if (manualSpeedTimer != null) {
              clearTimeout(manualSpeedTimer);
          }
          manualSpeedTimer = setTimeout(async () => {
              if (seq !== manualSpeedSeq) {
                  return;
              }
              let current = await getCurve();
              while (current.length > 0) {
                  current = await removeCurvePoint(0);
                  if (seq !== manualSpeedSeq) {
                      return;
                  }
              }
              current = await addCurvePoint({ x: 0, y: value / 100 });
              if (seq !== manualSpeedSeq) {
                  return;
              }
              current = await addCurvePoint({ x: 1, y: value / 100 });
              if (seq !== manualSpeedSeq) {
                  return;
              }
              setCurve(current);
          }, 150);
      };
      const [temperatureGlobal, setTemperature] = React.useState(tempCache);
      const [fanRpmGlobal, setFanRpm] = React.useState(fanRpmCache);
      setTemperature_display = (x) => {
          setTemperature(x);
          tempCache = x;
      };
      setFanRpm_display = (x) => {
          setFanRpm(x);
          fanRpmCache = x;
      };
      function setEnable(enable) {
          setEnableInternal(enable);
      }
      function onClickCanvas(e) {
          //console.log("[FANTASTIC] canvas click", e);
          const realEvent = e.nativeEvent;
          //console.log("Canvas click @ (" + realEvent.layerX.toString() + ", " + realEvent.layerY.toString() + ")");
          const target = e.currentTarget;
          //console.log("[FANTASTIC] Target dimensions " + target.width.toString() + "x" + target.height.toString());
          var clickX = realEvent.offsetX;
          var clickY = realEvent.offsetY;
          //console.debug("[FANTASTIC] curve click:", clickX, clickY);
          for (let i = 0; i < curveGlobal.length; i++) {
              const curvePoint = curveGlobal[i];
              const pointX = curvePoint.x * target.width;
              const pointY = (1 - curvePoint.y) * target.height;
              if (pointX + POINT_SIZE > clickX
                  && pointX - POINT_SIZE < clickX
                  && pointY + POINT_SIZE > clickY
                  && pointY - POINT_SIZE < clickY) {
                  //console.log("Clicked on point " + i.toString());
                  resolve(removeCurvePoint(i), setCurve);
                  return;
              }
          }
          //console.log("Adding new point");
          const curvePoint = { x: clickX / target.width, y: 1 - (clickY / target.height) };
          resolve(addCurvePoint(curvePoint), setCurve);
      }
      function drawCanvas(ctx, frameCount) {
          if (frameCount % 100 > 1) {
              return;
          }
          const width = ctx.canvas.width;
          const height = ctx.canvas.height;
          ctx.strokeStyle = "#1a9fff";
          ctx.fillStyle = "#1a9fff";
          ctx.lineWidth = 2;
          ctx.lineJoin = "round";
          //ctx.beginPath();
          ctx.clearRect(0, 0, width, height);
          /*ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
          ctx.moveTo(110, 75);
          ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
          ctx.moveTo(65, 65);
          ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
          ctx.moveTo(95, 65);
          ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye*/
          //ctx.beginPath();
          //ctx.moveTo(0, height);
          // graph helper lines
          ctx.beginPath();
          ctx.strokeStyle = "#093455";
          //ctx.fillStyle = "#093455";
          const totalLines = 7;
          const lineDistance = 1 / (totalLines + 1);
          for (let i = 1; i <= totalLines; i++) {
              ctx.moveTo(lineDistance * i * width, 0);
              ctx.lineTo(lineDistance * i * width, height);
              ctx.moveTo(0, lineDistance * i * height);
              ctx.lineTo(width, lineDistance * i * height);
          }
          ctx.stroke();
          //ctx.fill();
          ctx.beginPath();
          ctx.strokeStyle = "#1a9fff";
          ctx.fillStyle = "#1a9fff";
          // axis labels
          ctx.textAlign = "center";
          ctx.rotate(-Math.PI / 2);
          ctx.fillText("Fan RPM", -height / 2, 12); // Y axis is rotated 90 degrees
          ctx.rotate(Math.PI / 2);
          ctx.fillText("Temperature", width / 2, height - 4);
          // graph data labels
          ctx.textAlign = "start"; // default
          ctx.fillText("0", 2, height - 2);
          ctx.fillText("100%", 2, 9);
          ctx.textAlign = "right";
          ctx.fillText("100°C", width - 2, height - 2);
          ctx.moveTo(0, height);
          if (interpolGlobal) {
              //ctx.beginPath();
              for (let i = 0; i < curveGlobal.length; i++) {
                  const canvasHeight = (1 - curveGlobal[i].y) * height;
                  const canvasWidth = curveGlobal[i].x * width;
                  ctx.lineTo(canvasWidth, canvasHeight);
                  ctx.moveTo(canvasWidth, canvasHeight);
                  ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
                  ctx.moveTo(canvasWidth, canvasHeight);
              }
              ctx.lineTo(width, 0);
              //ctx.moveTo(width, 0);
          }
          else {
              //ctx.beginPath();
              for (let i = 0; i < curveGlobal.length - 1; i++) {
                  const canvasHeight = (1 - curveGlobal[i].y) * height;
                  const canvasWidth = curveGlobal[i].x * width;
                  const canvasHeight2 = (1 - curveGlobal[i + 1].y) * height;
                  const canvasWidth2 = curveGlobal[i + 1].x * width;
                  //ctx.lineTo(canvasWidth, canvasHeight);
                  ctx.moveTo(canvasWidth, canvasHeight);
                  ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
                  ctx.moveTo(canvasWidth, canvasHeight);
                  ctx.lineTo(canvasWidth2, canvasHeight);
                  ctx.moveTo(canvasWidth2, canvasHeight);
                  ctx.lineTo(canvasWidth2, canvasHeight2);
              }
              if (curveGlobal.length != 0) {
                  const i = curveGlobal.length - 1;
                  const canvasHeight = (1 - curveGlobal[i].y) * height;
                  const canvasWidth = curveGlobal[i].x * width;
                  //ctx.lineTo(width, 0);
                  ctx.moveTo(canvasWidth, canvasHeight);
                  ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
                  ctx.moveTo(canvasWidth, canvasHeight);
                  ctx.lineTo(width, canvasHeight);
                  //ctx.moveTo(width, canvasHeight);
                  //ctx.lineTo(width, 0);
                  const canvasHeight2 = (1 - curveGlobal[0].y) * height;
                  const canvasWidth2 = curveGlobal[0].x * width;
                  ctx.moveTo(canvasWidth2, canvasHeight2);
                  ctx.lineTo(canvasWidth2, height);
              }
              //ctx.moveTo(width, 0);
          }
          ctx.stroke();
          ctx.fill();
          console.debug("Rendered fan graph canvas frame", frameCount);
          //console.debug("Drew canvas with " + curveGlobal.length.toString() + " points; " + width.toString() + "x" + height.toString());
          //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          //ctx.fillStyle = '#000000';
          //ctx.beginPath();
          //ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
          //ctx.fill();
      }
      if (firstTime) {
          setFirstTime(false);
          setServerApi(serverAPI);
          resolve(getEnabled(), setEnable);
          resolve(getInterpolate(), setInterpol);
          resolve(getCurve(), setCurve);
          resolve(getTemperature(setTemperature_display), (_) => { });
          resolve(getFanRpm(setFanRpm_display), (_) => { });
          /*periodicHook = setInterval(function() {
              backend.resolve(backend.getTemperature(), setTemperature);
              backend.resolve(backend.getFanRpm(), setFanRpm);
          }, 1000);*/
      }
      if (!usdplReady) {
          return (window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: "Loading..." }, "If you can read this, something probably went wrong :(")));
      }
      // TODO handle clicking on fan curve nodes
      return (window.SP_REACT.createElement(deckyFrontendLib.PanelSection, null,
          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: "Current Fan Speed" }, fanRpmGlobal.toFixed(0) + " RPM")),
          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: "Current Temperature" }, temperatureGlobal.toFixed(1) + " °C")),
          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
              window.SP_REACT.createElement(deckyFrontendLib.SliderField, { label: "Fan Speed", description: "Manual flat curve; overrides temperature control", value: manualSpeedGlobal, min: 0, max: 100, step: 1, showValue: true, onChange: setManualSpeed })),
          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
              window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { label: "Custom Fan Curve", description: "Overrides the BC-250 host fan curve", checked: enabledGlobal, onChange: (value) => {
                      resolve(setEnabled(value), setEnable);
                  } })),
          enabledGlobal &&
              window.SP_REACT.createElement("div", { className: deckyFrontendLib.staticClasses.PanelSectionTitle }, "Fan"),
          enabledGlobal &&
              window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                  window.SP_REACT.createElement(Canvas, { draw: drawCanvas, width: 268, height: 200, style: {
                          "width": "268px",
                          "height": "200px",
                          "padding": "0px",
                          "border": "1px solid #1a9fff",
                          //"position":"relative",
                          "background-color": "#1a1f2c",
                          "border-radius": "4px",
                          //"margin":"auto",
                      }, onClick: (e) => onClickCanvas(e) })),
          enabledGlobal &&
              window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                  window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { label: "Linear Interpolation", description: "Pretends a straight line connects points", checked: interpolGlobal, onChange: (value) => {
                          resolve(setInterpolate(value), setInterpol);
                      } })),
          window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: name, onClick: () => { deckyFrontendLib.Navigation.NavigateToExternalWeb("https://github.com/Naster17/steam-headless-bc250/releases"); } }, "v" + version)),
          (version?.includes("alpha") || version?.includes("beta")) && window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: "USDPL", onClick: () => { deckyFrontendLib.Navigation.NavigateToExternalWeb("https://git.ngni.us/NG-SD-Plugins/usdpl-rs"); } },
                  "v",
                  version_usdpl()))));
  };
  (async function () {
      if (!usdplReady) {
          await initBackend();
          usdplReady = true;
          getEnabled();
          name = await getName();
          version = await getVersion();
      }
  })();
  var index = deckyFrontendLib.definePlugin((serverApi) => {
      let ico = window.SP_REACT.createElement(FaFan, null);
      let now = new Date();
      if (now.getDate() == 1 && now.getMonth() == 3) {
          ico = window.SP_REACT.createElement(SiOnlyfans, null);
      }
      return {
          title: window.SP_REACT.createElement("div", { className: deckyFrontendLib.staticClasses.Title }, "Fantastic BC250"),
          content: window.SP_REACT.createElement(Content, { serverAPI: serverApi }),
          icon: ico,
          onDismount() {
              clearInterval(periodicHook);
              clearTimeout(manualSpeedTimer);
          },
      };
  });

  return index;

})(DFL, SP_REACT);
