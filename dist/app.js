webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(5);
	var browser_1 = __webpack_require__(183);
	var router_1 = __webpack_require__(246);
	var common_dom_1 = __webpack_require__(207);
	var app_1 = __webpack_require__(276);
	var angular2_modal_1 = __webpack_require__(1);
	function main() {
	    return browser_1.bootstrap(app_1.App, [
	        router_1.ROUTER_PROVIDERS,
	        core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
	        core_1.provide(angular2_modal_1.ModalConfig, { useValue: new angular2_modal_1.ModalConfig('lg', true, 81) }),
	        common_dom_1.ELEMENT_PROBE_PROVIDERS
	    ])
	        .catch(function (err) { return console.error(err); });
	}
	document.addEventListener('DOMContentLoaded', main);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(3));
	__export(__webpack_require__(4));
	__export(__webpack_require__(117));
	__export(__webpack_require__(118));
	__export(__webpack_require__(119));
	__export(__webpack_require__(128));
	__export(__webpack_require__(120));
	__export(__webpack_require__(125));
	__export(__webpack_require__(127));
	__export(__webpack_require__(123));
	__export(__webpack_require__(132));
	__export(__webpack_require__(182));


/***/ },

/***/ 3:
/***/ function(module, exports) {

	"use strict";
	var ICustomModal = (function () {
	    function ICustomModal() {
	    }
	    return ICustomModal;
	}());
	exports.ICustomModal = ICustomModal;


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var _defaultConfig;
	var ModalConfig = (function () {
	    function ModalConfig(size, isBlocking, keyboard, dialogClass) {
	        if (size === void 0) { size = undefined; }
	        if (isBlocking === void 0) { isBlocking = null; }
	        if (keyboard === void 0) { keyboard = undefined; }
	        if (dialogClass === void 0) { dialogClass = undefined; }
	        this.size = size;
	        this.isBlocking = isBlocking;
	        this.keyboard = keyboard;
	        this.dialogClass = dialogClass;
	    }
	    ModalConfig.makeValid = function (config, defaultConfig) {
	        defaultConfig = (defaultConfig) ? defaultConfig : _defaultConfig;
	        if (!config.size)
	            config.size = defaultConfig.size;
	        if (config.isBlocking !== false)
	            config.isBlocking = true;
	        if (config.keyboard === null) {
	            config.keyboard = [];
	        }
	        else if (typeof config.keyboard === 'number') {
	            config.keyboard = [config.keyboard];
	        }
	        else if (!Array.isArray(config.keyboard)) {
	            config.keyboard = defaultConfig.keyboard;
	        }
	        if (!config.dialogClass) {
	            config.dialogClass = defaultConfig.dialogClass;
	        }
	        return config;
	    };
	    ModalConfig.prototype.supportsKey = function (keyCode) {
	        return this.keyboard.indexOf(keyCode) > -1;
	    };
	    ModalConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [String, Boolean, Object, String])
	    ], ModalConfig);
	    return ModalConfig;
	}());
	exports.ModalConfig = ModalConfig;
	_defaultConfig = new ModalConfig('lg', true, [27], 'modal-dialog');


/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var async_1 = __webpack_require__(50);
	var ModalDialogInstance = (function () {
	    function ModalDialogInstance(config) {
	        this.config = config;
	        this._resultDefered = async_1.PromiseWrapper.completer();
	    }
	    Object.defineProperty(ModalDialogInstance.prototype, "backdropRef", {
	        set: function (value) {
	            this._backdropRef = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ModalDialogInstance.prototype, "bootstrapRef", {
	        set: function (value) {
	            this._bootstrapRef = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ModalDialogInstance.prototype, "result", {
	        get: function () {
	            return this._resultDefered.promise;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ModalDialogInstance.prototype.close = function (result) {
	        if (result === void 0) { result = null; }
	        if (this.contentRef.instance.beforeClose &&
	            this.contentRef.instance.beforeClose() === true)
	            return;
	        this.dispose();
	        this._resultDefered.resolve(result);
	    };
	    ModalDialogInstance.prototype.dismiss = function () {
	        if (this.contentRef.instance.beforeDismiss &&
	            this.contentRef.instance.beforeDismiss() === true)
	            return;
	        this.dispose();
	        this._resultDefered.reject();
	    };
	    ModalDialogInstance.prototype.dispose = function () {
	        this._bootstrapRef.dispose();
	        this._backdropRef.dispose();
	        this.contentRef.dispose();
	    };
	    return ModalDialogInstance;
	}());
	exports.ModalDialogInstance = ModalDialogInstance;


/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ModalDialogInstance_1 = __webpack_require__(117);
	var ModalBackdrop = (function () {
	    function ModalBackdrop(dialog) {
	        if (!dialog.inElement) {
	            this.position = this.width = this.height = null;
	            this.top = this.left = this.right = this.bottom = null;
	        }
	        else {
	            this.position = 'absolute';
	            this.height = '100%';
	            this.width = '100%';
	            this.top = this.left = this.right = this.bottom = '0';
	        }
	    }
	    ModalBackdrop = __decorate([
	        core_1.Component({
	            selector: 'modal-backdrop',
	            host: {
	                '[style.position]': 'position',
	                '[style.height]': 'height',
	                '[style.width]': 'width',
	                '[style.top]': 'top',
	                '[style.left]': 'left',
	                '[style.right]': 'right',
	                '[style.bottom]': 'bottom'
	            },
	            template: '<div [style.position]="position" class="in modal-backdrop" #modalBackdrop></div>'
	        }), 
	        __metadata('design:paramtypes', [ModalDialogInstance_1.ModalDialogInstance])
	    ], ModalBackdrop);
	    return ModalBackdrop;
	}());
	exports.ModalBackdrop = ModalBackdrop;


/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ModalDialogInstance_1 = __webpack_require__(117);
	var Modal_1 = __webpack_require__(120);
	var BootstrapModalContainer = (function () {
	    function BootstrapModalContainer(dialogInstance, modal) {
	        this.modal = modal;
	        this.dialogInstance = dialogInstance;
	        if (!dialogInstance.inElement) {
	            this.position = null;
	        }
	        else {
	            this.position = 'absolute';
	        }
	    }
	    BootstrapModalContainer.prototype.onContainerClick = function ($event) {
	        $event.stopPropagation();
	    };
	    BootstrapModalContainer.prototype.onClick = function () {
	        return !this.dialogInstance.config.isBlocking && this.dialogInstance.dismiss();
	    };
	    BootstrapModalContainer.prototype.documentKeypress = function (event) {
	        if (this.modal.stackPosition(this.dialogInstance) !== this.modal.stackLength - 1)
	            return;
	        if (this.dialogInstance.config.supportsKey(event.keyCode)) {
	            this.dialogInstance.dismiss();
	        }
	    };
	    BootstrapModalContainer = __decorate([
	        core_1.Component({
	            selector: 'bootstrap-modal',
	            providers: [Modal_1.Modal],
	            host: {
	                'tabindex': '0',
	                'role': 'dialog',
	                'class': 'in modal',
	                'style': 'display: block',
	                '[style.position]': 'position',
	                '(body:keydown)': 'documentKeypress($event)',
	                '(click)': 'onClick()'
	            },
	            template: "<div [ngClass]=\"dialogInstance.config.dialogClass\"\n          [class.modal-lg]=\"dialogInstance.config.size == 'lg'\"\n          [class.modal-sm]=\"dialogInstance.config.size == 'sm'\">\n         <div class=\"modal-content\" (click)=\"onContainerClick($event)\" style=\"display: block\">\n            <div style=\"display: none\" #modalDialog></div>\n         </div>\n    </div>"
	        }), 
	        __metadata('design:paramtypes', [ModalDialogInstance_1.ModalDialogInstance, Modal_1.Modal])
	    ], BootstrapModalContainer);
	    return BootstrapModalContainer;
	}());
	exports.BootstrapModalContainer = BootstrapModalContainer;


/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(5);
	var ModalInstanceStack_1 = __webpack_require__(121);
	var ModalConfig_1 = __webpack_require__(4);
	var ModalDialogInstance_1 = __webpack_require__(117);
	var modalBackdrop_1 = __webpack_require__(118);
	var bootstrapModalContainer_1 = __webpack_require__(119);
	var presets_1 = __webpack_require__(123);
	var _stack = new ModalInstanceStack_1.ModalInstanceStack();
	var Modal = (function () {
	    function Modal(componentLoader, appRef, defaultConfig) {
	        this.componentLoader = componentLoader;
	        this.appRef = appRef;
	        Object.defineProperty(this, 'config', {
	            configurable: false,
	            enumerable: true,
	            value: (defaultConfig) ? ModalConfig_1.ModalConfig.makeValid(defaultConfig) : new ModalConfig_1.ModalConfig(),
	            writable: false
	        });
	    }
	    Modal.prototype.alert = function () {
	        return new presets_1.OneButtonPreset(this, { isBlocking: false });
	    };
	    Modal.prototype.prompt = function () {
	        return new presets_1.OneButtonPreset(this, { isBlocking: true, keyboard: null });
	    };
	    Modal.prototype.confirm = function () {
	        return new presets_1.TwoButtonPreset(this, { isBlocking: true, keyboard: null });
	    };
	    Modal.prototype.open = function (componentType, bindings, config) {
	        var elementRef = this.appRef._rootComponents[0].location;
	        return this.openInside(componentType, elementRef, null, bindings, config);
	    };
	    Modal.prototype.openInside = function (componentType, elementRef, anchorName, bindings, config) {
	        var _this = this;
	        config = (config) ? ModalConfig_1.ModalConfig.makeValid(config, this.config) : this.config;
	        var dialog = new ModalDialogInstance_1.ModalDialogInstance(config);
	        dialog.inElement = !!anchorName;
	        var dialogBindings = core_1.Injector.resolve([core_1.provide(ModalDialogInstance_1.ModalDialogInstance, { useValue: dialog })]);
	        return this.createBackdrop(elementRef, dialogBindings, anchorName)
	            .then(function (backdropRef) {
	            dialog.backdropRef = backdropRef;
	            var modalDataBindings = core_1.Injector.resolve([core_1.provide(ModalDialogInstance_1.ModalDialogInstance, { useValue: dialog })]).concat(bindings);
	            return _this.componentLoader.loadIntoLocation(bootstrapModalContainer_1.BootstrapModalContainer, backdropRef.location, 'modalBackdrop', dialogBindings)
	                .then(function (bootstrapRef) {
	                dialog.bootstrapRef = bootstrapRef;
	                return _this.componentLoader.loadIntoLocation(componentType, bootstrapRef.location, 'modalDialog', modalDataBindings)
	                    .then(function (contentRef) {
	                    dialog.contentRef = contentRef;
	                    _stack.pushManaged(dialog);
	                    return dialog;
	                });
	            });
	        });
	    };
	    Modal.prototype.stackPosition = function (mInstande) {
	        return _stack.indexOf(mInstande);
	    };
	    Object.defineProperty(Modal.prototype, "stackLength", {
	        get: function () {
	            return _stack.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Modal.prototype.createBackdrop = function (elementRef, bindings, anchorName) {
	        return (!anchorName) ?
	            this.componentLoader.loadNextToLocation(modalBackdrop_1.ModalBackdrop, elementRef, bindings) :
	            this.componentLoader.loadIntoLocation(modalBackdrop_1.ModalBackdrop, elementRef, anchorName, bindings);
	    };
	    Modal = __decorate([
	        core_1.Injectable(),
	        __param(2, core_1.Optional()), 
	        __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ApplicationRef, ModalConfig_1.ModalConfig])
	    ], Modal);
	    return Modal;
	}());
	exports.Modal = Modal;


/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var dom_adapter_1 = __webpack_require__(122);
	var ModalInstanceStack = (function () {
	    function ModalInstanceStack() {
	        this._stack = [];
	    }
	    ModalInstanceStack.prototype.push = function (mInstance) {
	        var idx = this._stack.indexOf(mInstance);
	        if (idx === -1)
	            this._stack.push(mInstance);
	        if (dom_adapter_1.DOM && this._stack.length === 1) {
	            dom_adapter_1.DOM.addClass(dom_adapter_1.DOM.query('body'), 'modal-open');
	        }
	    };
	    ModalInstanceStack.prototype.pushManaged = function (mInstance) {
	        var _this = this;
	        this.push(mInstance);
	        mInstance.result
	            .then(function () { return _this.remove(mInstance); })
	            .catch(function () { return _this.remove(mInstance); });
	    };
	    ModalInstanceStack.prototype.pop = function () {
	        this._stack.pop();
	    };
	    ModalInstanceStack.prototype.remove = function (mInstance) {
	        var idx = this._stack.indexOf(mInstance);
	        if (idx > -1)
	            this._stack.splice(idx, 1);
	        if (dom_adapter_1.DOM && this._stack.length === 0) {
	            dom_adapter_1.DOM.removeClass(dom_adapter_1.DOM.query('body'), 'modal-open');
	        }
	    };
	    ModalInstanceStack.prototype.index = function (index) {
	        return this._stack[index];
	    };
	    ModalInstanceStack.prototype.indexOf = function (mInstance) {
	        return this._stack.indexOf(mInstance);
	    };
	    Object.defineProperty(ModalInstanceStack.prototype, "length", {
	        get: function () {
	            return this._stack.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ModalInstanceStack;
	}());
	exports.ModalInstanceStack = ModalInstanceStack;


/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(124));
	__export(__webpack_require__(126));
	var OneButtonPreset_1 = __webpack_require__(130);
	exports.OneButtonPreset = OneButtonPreset_1.OneButtonPreset;
	var TwoButtonPreset_1 = __webpack_require__(131);
	exports.TwoButtonPreset = TwoButtonPreset_1.TwoButtonPreset;


/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Modal_1 = __webpack_require__(120);
	var ModalConfig_1 = __webpack_require__(4);
	var FluentAssign_1 = __webpack_require__(125);
	var ModalAwarePreset = (function (_super) {
	    __extends(ModalAwarePreset, _super);
	    function ModalAwarePreset(defaultValues, initialSetters) {
	        if (defaultValues === void 0) { defaultValues = undefined; }
	        if (initialSetters === void 0) { initialSetters = undefined; }
	        _super.call(this, defaultValues, initialSetters);
	        FluentAssign_1.setAssignMethod(this, 'modal', true);
	        FluentAssign_1.setAssignMethod(this, 'component', true);
	        FluentAssign_1.setAssignMethod(this, 'bindings', true);
	        FluentAssign_1.setAssignMethod(this, 'size');
	        FluentAssign_1.setAssignMethod(this, 'isBlocking');
	        FluentAssign_1.setAssignMethod(this, 'keyboard');
	        FluentAssign_1.setAssignMethod(this, 'dialogClass');
	    }
	    ModalAwarePreset.prototype.open = function (inside) {
	        var config = this.toJSON();
	        if (!(config.modal instanceof Modal_1.Modal)) {
	            return Promise.reject(new Error('Configuration Error: modal service not set.'));
	        }
	        if (typeof config.bindings !== 'function') {
	            return Promise.reject(new Error('Configuration Error: bindings not set.'));
	        }
	        if (inside) {
	            return config.modal.openInside(config.component, inside.elementRef, inside.anchorName, config.bindings(config), new ModalConfig_1.ModalConfig(config.size, config.isBlocking, config.keyboard));
	        }
	        else {
	            return config.modal.open(config.component, config.bindings(config), new ModalConfig_1.ModalConfig(config.size, config.isBlocking, config.keyboard, config.dialogClass));
	        }
	    };
	    return ModalAwarePreset;
	}(FluentAssign_1.FluentAssign));
	exports.ModalAwarePreset = ModalAwarePreset;


/***/ },

/***/ 125:
/***/ function(module, exports) {

	"use strict";
	var PRIVATE_PREFIX = '$$';
	var RESERVED_REGEX = /^(\$\$).*/;
	function validateMethodName(name) {
	    if (!name) {
	        throw new Error("Illegal method name. Empty method name is not allowed");
	    }
	    else if (name in this) {
	        throw new Error("A member name '" + name + "' already defined.");
	    }
	}
	function getAssignedPropertyNames(subject) {
	    return Object.getOwnPropertyNames(subject)
	        .filter(function (name) { return RESERVED_REGEX.test(name); })
	        .map(function (name) { return name.substr(2); });
	}
	function privateKey(name) {
	    return PRIVATE_PREFIX + name;
	}
	function setAssignMethod(obj, propertyName, writeOnce) {
	    if (writeOnce === void 0) { writeOnce = false; }
	    validateMethodName.call(obj, propertyName);
	    Object.defineProperty(obj, propertyName, {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: function (value) {
	            var key = privateKey(propertyName);
	            if (writeOnce && this.hasOwnProperty(key)) {
	                throw new Error("Overriding config property '" + propertyName + "' is not allowed.");
	            }
	            this[key] = value;
	            return this;
	        }
	    });
	}
	exports.setAssignMethod = setAssignMethod;
	var FluentAssignFactory = (function () {
	    function FluentAssignFactory(fluentAssign) {
	        this._fluentAssign =
	            fluentAssign instanceof FluentAssign ? fluentAssign : new FluentAssign();
	    }
	    FluentAssignFactory.prototype.setMethod = function (name, defaultValue) {
	        if (defaultValue === void 0) { defaultValue = undefined; }
	        setAssignMethod(this._fluentAssign, name);
	        if (defaultValue !== undefined) {
	            this._fluentAssign[name](defaultValue);
	        }
	        return this;
	    };
	    Object.defineProperty(FluentAssignFactory.prototype, "fluentAssign", {
	        get: function () {
	            return this._fluentAssign;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return FluentAssignFactory;
	}());
	exports.FluentAssignFactory = FluentAssignFactory;
	var FluentAssign = (function () {
	    function FluentAssign(defaultValues, initialSetters) {
	        var _this = this;
	        if (defaultValues === void 0) { defaultValues = undefined; }
	        if (initialSetters === void 0) { initialSetters = undefined; }
	        if (defaultValues) {
	            Object.getOwnPropertyNames(defaultValues)
	                .forEach(function (name) { return _this[privateKey(name)] = defaultValues[name]; });
	        }
	        if (Array.isArray(initialSetters)) {
	            initialSetters.forEach(function (name) { return setAssignMethod(_this, name); });
	        }
	    }
	    FluentAssign.compose = function (defaultValues, initialSetters) {
	        if (defaultValues === void 0) { defaultValues = undefined; }
	        if (initialSetters === void 0) { initialSetters = undefined; }
	        return FluentAssign.composeWith(new FluentAssign(defaultValues, initialSetters));
	    };
	    FluentAssign.composeWith = function (fluentAssign) {
	        return new FluentAssignFactory(fluentAssign);
	    };
	    FluentAssign.prototype.toJSON = function () {
	        var _this = this;
	        return getAssignedPropertyNames(this)
	            .reduce(function (obj, name) {
	            obj[name] = _this[privateKey(name)];
	            return obj;
	        }, {});
	    };
	    return FluentAssign;
	}());
	exports.FluentAssign = FluentAssign;


/***/ },

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ModalAwarePreset_1 = __webpack_require__(124);
	var MessageModal_1 = __webpack_require__(127);
	var Utils_1 = __webpack_require__(129);
	var DEFAULT_CONFIG_VALUES = {
	    component: MessageModal_1.MessageModal,
	    headerClass: 'modal-header',
	    bodyClass: 'modal-body',
	    footerClass: 'modal-footer'
	};
	var DEFAULT_INITIAL_SETTERS = [
	    'headerClass',
	    'title',
	    'titleHtml',
	    'body',
	    'bodyClass',
	    'footerClass'
	];
	var MessageModalPreset = (function (_super) {
	    __extends(MessageModalPreset, _super);
	    function MessageModalPreset(defaultValues, initialSetters) {
	        if (defaultValues === void 0) { defaultValues = undefined; }
	        if (initialSetters === void 0) { initialSetters = undefined; }
	        _super.call(this, Utils_1.extend(DEFAULT_CONFIG_VALUES, defaultValues || {}), Utils_1.arrayUnion(DEFAULT_INITIAL_SETTERS, initialSetters || []));
	    }
	    return MessageModalPreset;
	}(ModalAwarePreset_1.ModalAwarePreset));
	exports.MessageModalPreset = MessageModalPreset;


/***/ },

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ModalDialogInstance_1 = __webpack_require__(117);
	var modalFooter_1 = __webpack_require__(128);
	var MessageModalContext = (function () {
	    function MessageModalContext() {
	    }
	    return MessageModalContext;
	}());
	exports.MessageModalContext = MessageModalContext;
	var MessageModal = (function () {
	    function MessageModal(dialog, context) {
	        this.dialog = dialog;
	        this.context = context;
	    }
	    MessageModal.prototype.onFooterButtonClick = function ($event) {
	        $event.btn.onClick(this, $event.$event);
	    };
	    Object.defineProperty(MessageModal.prototype, "titleHtml", {
	        get: function () {
	            return this.context.titleHtml ? 1 : 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MessageModal = __decorate([
	        core_1.Component({
	            selector: 'modal-content',
	            directives: [modalFooter_1.ModalFooter],
	            template: "<div [ngClass]=\"context.headerClass\" [ngSwitch]=\"titleHtml\">\n        <div *ngSwitchWhen=\"1\" [innerHtml]=\"context.titleHtml\"></div>\n        <h3 *ngSwitchDefault class=\"modal-title\">{{context.title}}</h3>\n    </div>\n    <div [ngClass]=\"context.bodyClass\" [innerHtml]=\"context.body\"></div>\n    <modal-footer [footerClass]=\"context.footerClass\" \n                  [buttons]=\"context.buttons\"\n                  (onButtonClick)=\"onFooterButtonClick($event)\"></modal-footer>"
	        }), 
	        __metadata('design:paramtypes', [ModalDialogInstance_1.ModalDialogInstance, MessageModalContext])
	    ], MessageModal);
	    return MessageModal;
	}());
	exports.MessageModal = MessageModal;


/***/ },

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ModalFooter = (function () {
	    function ModalFooter() {
	        this.onButtonClick = new core_1.EventEmitter();
	    }
	    ModalFooter.prototype.onClick = function (btn, $event) {
	        this.onButtonClick.emit({ btn: btn, $event: $event });
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ModalFooter.prototype, "footerClass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], ModalFooter.prototype, "buttons", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], ModalFooter.prototype, "onButtonClick", void 0);
	    ModalFooter = __decorate([
	        core_1.Component({
	            selector: 'modal-footer',
	            template: "<div [ngClass]=\"footerClass\">\n    <button *ngFor=\"#btn of buttons;\"\n            [ngClass]=\"btn.cssClass\"\n            (click)=\"onClick(btn, $event)\">{{btn.caption}}</button>\n</div>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ModalFooter);
	    return ModalFooter;
	}());
	exports.ModalFooter = ModalFooter;


/***/ },

/***/ 129:
/***/ function(module, exports) {

	"use strict";
	function extend(m1, m2) {
	    var m = {};
	    for (var attr in m1) {
	        if (m1.hasOwnProperty(attr)) {
	            m[attr] = m1[attr];
	        }
	    }
	    for (var attr in m2) {
	        if (m2.hasOwnProperty(attr)) {
	            m[attr] = m2[attr];
	        }
	    }
	    return m;
	}
	exports.extend = extend;
	function arrayUnion(arr1, arr2) {
	    return arr1
	        .concat(arr2.filter(function (v) { return arr1.indexOf(v) === -1; }));
	}
	exports.arrayUnion = arrayUnion;


/***/ },

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(5);
	var MessageModal_1 = __webpack_require__(127);
	var MessageModalPreset_1 = __webpack_require__(126);
	var Utils_1 = __webpack_require__(129);
	function createBindings(config) {
	    config.buttons = [
	        {
	            cssClass: config.okBtnClass,
	            caption: config.okBtn,
	            onClick: function (modalComponent, $event) {
	                return modalComponent.dialog.close(true);
	            }
	        }
	    ];
	    return core_1.Injector.resolve([
	        core_1.provide(MessageModal_1.MessageModalContext, { useValue: config })
	    ]);
	}
	var OneButtonPreset = (function (_super) {
	    __extends(OneButtonPreset, _super);
	    function OneButtonPreset(modal, defaultValues) {
	        if (defaultValues === void 0) { defaultValues = undefined; }
	        _super.call(this, Utils_1.extend({
	            modal: modal,
	            bindings: createBindings,
	            okBtn: 'OK',
	            okBtnClass: 'btn btn-primary'
	        }, defaultValues || {}), [
	            'okBtn',
	            'okBtnClass'
	        ]);
	    }
	    return OneButtonPreset;
	}(MessageModalPreset_1.MessageModalPreset));
	exports.OneButtonPreset = OneButtonPreset;


/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(5);
	var Utils_1 = __webpack_require__(129);
	var MessageModal_1 = __webpack_require__(127);
	var MessageModalPreset_1 = __webpack_require__(126);
	function createBindings(config) {
	    config.buttons = [
	        {
	            cssClass: config.okBtnClass,
	            caption: config.okBtn,
	            onClick: function (modalComponent, $event) {
	                return modalComponent.dialog.close(true);
	            }
	        },
	        {
	            cssClass: config.cancelBtnClass,
	            caption: config.cancelBtn,
	            onClick: function (modalComponent, $event) {
	                return modalComponent.dialog.dismiss();
	            }
	        }
	    ];
	    return core_1.Injector.resolve([
	        core_1.provide(MessageModal_1.MessageModalContext, { useValue: config })
	    ]);
	}
	var TwoButtonPreset = (function (_super) {
	    __extends(TwoButtonPreset, _super);
	    function TwoButtonPreset(modal, defaultValues) {
	        if (defaultValues === void 0) { defaultValues = undefined; }
	        _super.call(this, Utils_1.extend({
	            modal: modal,
	            bindings: createBindings,
	            okBtn: 'OK',
	            okBtnClass: 'btn btn-primary',
	            cancelBtn: 'Cancel',
	            cancelBtnClass: 'btn btn-default'
	        }, defaultValues || {}), [
	            'okBtn',
	            'okBtnClass',
	            'cancelBtn',
	            'cancelBtnClass'
	        ]);
	    }
	    return TwoButtonPreset;
	}(MessageModalPreset_1.MessageModalPreset));
	exports.TwoButtonPreset = TwoButtonPreset;


/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var common_1 = __webpack_require__(133);
	var ICustomModal_1 = __webpack_require__(3);
	var ModalDialogInstance_1 = __webpack_require__(117);
	var YesNoModalContent = (function () {
	    function YesNoModalContent(title, body, hideNo, yesText, noText) {
	        if (title === void 0) { title = 'Hello World Title'; }
	        if (body === void 0) { body = 'Hello World Body!'; }
	        if (hideNo === void 0) { hideNo = false; }
	        if (yesText === void 0) { yesText = 'YES'; }
	        if (noText === void 0) { noText = 'NO'; }
	        this.title = title;
	        this.body = body;
	        this.hideNo = hideNo;
	        this.yesText = yesText;
	        this.noText = noText;
	    }
	    return YesNoModalContent;
	}());
	exports.YesNoModalContent = YesNoModalContent;
	var YesNoModal = (function () {
	    function YesNoModal(dialog, modelContentData) {
	        this.dialog = dialog;
	        this.context = modelContentData;
	        console.warn('DEPRECATED: YesNoModal will not be available in next version of ' +
	            'angular2-modal, please move to the preset API.');
	    }
	    YesNoModal.prototype.ok = function ($event) {
	        $event.stopPropagation();
	        this.dialog.close(true);
	    };
	    YesNoModal.prototype.cancel = function () {
	        this.dialog.dismiss();
	    };
	    YesNoModal = __decorate([
	        core_1.Component({
	            selector: 'modal-content',
	            directives: [common_1.NgIf],
	            template: "<div class=\"modal-header\">\n        <h3 class=\"modal-title\">{{context.title}}</h3>\n        </div>\n        <div class=\"modal-body\">{{context.body}}</div>\n        <div class=\"modal-footer\">\n            <button class=\"btn btn-primary\" (click)=\"ok($event)\">{{context.yesText}}</button>\n            <button *ngIf=\"!context.hideNo\" class=\"btn btn-warning\" (click)=\"cancel()\">{{context.noText}}</button>\n        </div>"
	        }), 
	        __metadata('design:paramtypes', [ModalDialogInstance_1.ModalDialogInstance, ICustomModal_1.ICustomModal])
	    ], YesNoModal);
	    return YesNoModal;
	}());
	exports.YesNoModal = YesNoModal;


/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ICustomModal_1 = __webpack_require__(3);
	var ModalDialogInstance_1 = __webpack_require__(117);
	var OKOnlyContent = (function () {
	    function OKOnlyContent(title, body, okText) {
	        if (title === void 0) { title = 'Hello World Title'; }
	        if (body === void 0) { body = 'Hello World Body!'; }
	        if (okText === void 0) { okText = 'OK'; }
	        this.title = title;
	        this.body = body;
	        this.okText = okText;
	    }
	    return OKOnlyContent;
	}());
	exports.OKOnlyContent = OKOnlyContent;
	var OKOnlyModal = (function () {
	    function OKOnlyModal(dialog, modelContentData) {
	        this.dialog = dialog;
	        this.context = modelContentData;
	        console.warn('DEPRECATED: OKOnlyModal will not be available in next version of ' +
	            'angular2-modal, please move to the preset API.');
	    }
	    OKOnlyModal.prototype.ok = function () {
	        this.dialog.close(true);
	    };
	    OKOnlyModal = __decorate([
	        core_1.Component({
	            selector: 'modal-content',
	            template: "<div class=\"modal-header\">\n        <h3 class=\"modal-title\">{{context.title}}</h3>\n        </div>\n        <div class=\"modal-body\">{{context.body}}</div>\n        <div class=\"modal-footer\">\n            <button class=\"btn btn-primary\" (click)=\"ok()\">{{context.okText}}</button>\n        </div>"
	        }), 
	        __metadata('design:paramtypes', [ModalDialogInstance_1.ModalDialogInstance, ICustomModal_1.ICustomModal])
	    ], OKOnlyModal);
	    return OKOnlyModal;
	}());
	exports.OKOnlyModal = OKOnlyModal;


/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(246);
	var common_1 = __webpack_require__(133);
	var demoPage_1 = __webpack_require__(277);
	var customizeWizard_1 = __webpack_require__(283);
	var App = (function () {
	    function App() {
	    }
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            providers: common_1.FORM_PROVIDERS.slice(),
	            directives: router_1.ROUTER_DIRECTIVES.slice(),
	            pipes: [],
	            styles: [],
	            template: "\n    <main>\n      <router-outlet></router-outlet>\n    </main>\n  "
	        }),
	        router_1.RouteConfig([
	            { path: '/', component: demoPage_1.DemoPage, name: 'Demo' },
	            { path: '/customizeModals', component: customizeWizard_1.CustomizeWizard, name: 'CustomizeModals' }
	        ]), 
	        __metadata('design:paramtypes', [])
	    ], App);
	    return App;
	}());
	exports.App = App;


/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(246);
	var angular2_modal_1 = __webpack_require__(1);
	var customModal_1 = __webpack_require__(278);
	var sampleElement_1 = __webpack_require__(279);
	var presets = __webpack_require__(280);
	var BUTTONS = [
	    {
	        text: 'Alert',
	        preset: presets.alert
	    },
	    {
	        text: 'Prompt',
	        preset: presets.prompt
	    },
	    {
	        text: 'Confirm',
	        preset: presets.confirm
	    },
	    {
	        text: 'Cascading',
	        preset: presets.cascading
	    },
	    {
	        text: 'In Element',
	        preset: presets.inElement
	    }
	];
	var DemoPage = (function () {
	    function DemoPage(modal) {
	        this.modal = modal;
	        this.buttons = BUTTONS;
	    }
	    DemoPage.prototype.processDialog = function (dialog) {
	        var _this = this;
	        dialog.then(function (resultPromise) {
	            return resultPromise.result.then(function (result) {
	                _this.lastModalResult = result;
	            }, function () { return _this.lastModalResult = 'Rejected!'; });
	        });
	    };
	    DemoPage.prototype.open = function (btn) {
	        var dialog, preset = btn.preset(this.modal);
	        if (btn.text === 'In Element') {
	            dialog = preset.open({
	                elementRef: this.mySampleElement,
	                anchorName: 'myModal'
	            });
	        }
	        else {
	            dialog = preset.open();
	        }
	        this.processDialog(dialog);
	    };
	    DemoPage.prototype.openCustomModal = function () {
	        var resolvedBindings = core_1.Injector.resolve([core_1.provide(angular2_modal_1.ICustomModal, {
	                useValue: new customModal_1.AdditionCalculateWindowData(2, 3) })]), dialog = this.modal.open(customModal_1.AdditionCalculateWindow, resolvedBindings, new angular2_modal_1.ModalConfig('lg', true, 27));
	        this.processDialog(dialog);
	    };
	    DemoPage = __decorate([
	        core_1.Component({
	            selector: 'demo-page',
	            directives: [sampleElement_1.SampleElement, router_1.RouterLink],
	            providers: [angular2_modal_1.Modal],
	            styles: [__webpack_require__(281)],
	            template: __webpack_require__(282)
	        }), 
	        __metadata('design:paramtypes', [angular2_modal_1.Modal])
	    ], DemoPage);
	    return DemoPage;
	}());
	exports.DemoPage = DemoPage;


/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var common_1 = __webpack_require__(133);
	var angular2_modal_1 = __webpack_require__(1);
	var AdditionCalculateWindowData = (function () {
	    function AdditionCalculateWindowData(num1, num2) {
	        this.num1 = num1;
	        this.num2 = num2;
	    }
	    return AdditionCalculateWindowData;
	}());
	exports.AdditionCalculateWindowData = AdditionCalculateWindowData;
	var AdditionCalculateWindow = (function () {
	    function AdditionCalculateWindow(dialog, modelContentData) {
	        this.dialog = dialog;
	        this.context = modelContentData;
	        this.wrongAnswer = true;
	    }
	    AdditionCalculateWindow.prototype.onKeyUp = function (value) {
	        this.wrongAnswer = value != 5;
	        this.dialog.close();
	    };
	    AdditionCalculateWindow.prototype.beforeDismiss = function () {
	        return true;
	    };
	    AdditionCalculateWindow.prototype.beforeClose = function () {
	        return this.wrongAnswer;
	    };
	    AdditionCalculateWindow = __decorate([
	        core_1.Component({
	            selector: 'modal-content',
	            directives: [common_1.CORE_DIRECTIVES],
	            styles: ["\n        .custom-modal-container {\n            padding: 15px;\n        }\n\n        .custom-modal-header {\n            background-color: #219161;\n            color: #fff;\n            -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);\n            -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);\n            box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);\n            margin-top: -15px;\n            margin-bottom: 40px;\n        }\n    "],
	            template: "\n        <div class=\"container-fluid custom-modal-container\">\n            <div class=\"row custom-modal-header\">\n                <div class=\"col-sm-12\">\n                    <h1>A Custom modal design</h1>\n                </div>\n            </div>\n            <div class=\"row\" [ngClass]=\"{'myclass' : shouldUseMyClass}\">\n                <div class=\"col-xs-12\">\n                    <div class=\"jumbotron\">\n                        <h1>Do the math to quit:</h1>\n                        <p class=\"lead\">I received an injection of the number <strong>{{context.num1}}</strong> and the number <strong>{{context.num2}}</strong></p>\n                        <span>What is the sum?</span>\n                         <input class=\"form-control\" type=\"text\" #answer (keyup)=\"onKeyUp(answer.value)\" autofocus>\n                    </div>\n                </div>\n            </div>\n        </div>"
	        }), 
	        __metadata('design:paramtypes', [angular2_modal_1.ModalDialogInstance, angular2_modal_1.ICustomModal])
	    ], AdditionCalculateWindow);
	    return AdditionCalculateWindow;
	}());
	exports.AdditionCalculateWindow = AdditionCalculateWindow;


/***/ },

/***/ 279:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(5);
	var demoPage_1 = __webpack_require__(277);
	var SampleElement = (function () {
	    function SampleElement(demoPage, elementRef) {
	        demoPage.mySampleElement = elementRef;
	    }
	    SampleElement = __decorate([
	        core_1.Component({
	            selector: 'sample-element',
	            template: "<div>\n        <h1>I Am an Element!</h1>\n        <p>I can be modaled!</p>\n     </div>\n     <div #myModal></div>\n     "
	        }),
	        __param(0, core_1.Inject(core_1.forwardRef(function () { return demoPage_1.DemoPage; }))), 
	        __metadata('design:paramtypes', [demoPage_1.DemoPage, core_1.ElementRef])
	    ], SampleElement);
	    return SampleElement;
	}());
	exports.SampleElement = SampleElement;


/***/ },

/***/ 280:
/***/ function(module, exports) {

	"use strict";
	function alert(modal) {
	    return modal.alert()
	        .size('lg')
	        .title('A simple Alert style modal window')
	        .body("\n        <h4>Alert is a classic (title/body/footer) 1 button modal window that \n        does not block.</h4>\n        <b>Configuration:</b>\n        <ul>\n            <li>Non blocking (click anywhere outside to dismiss)</li>\n            <li>Size large</li>\n            <li>Dismissed with default keyboard key (ESC)</li>\n            <li>Close wth button click</li>\n            <li>HTML content</li>\n        </ul>");
	}
	exports.alert = alert;
	function prompt(modal) {
	    return modal.prompt()
	        .size('lg')
	        .title('A simple Prompt style modal window')
	        .body("\n            <h4>Prompt is a classic (title/body/footer) 1 button modal window that \n            blocks.</h4>\n            <b>Configuration:</b>\n            <ul>\n                <li>Blocks (only button click can dismiss)</li>\n                <li>Size large</li>\n                <li>Keyboard can not dismiss</li>\n                <li>HTML content</li>\n            </ul>");
	}
	exports.prompt = prompt;
	function confirm(modal) {
	    return modal.confirm()
	        .size('lg')
	        .titleHtml("\n            <div class=\"modal-title\" \n                 style=\"font-size: 22px; color: grey; text-decoration: underline;\">\n                 A simple Confirm style modal window</div>")
	        .body("\n            <h4>Confirm is a classic (title/body/footer) 2 button modal window that blocks.</h4>\n            <b>Configuration:</b>\n            <ul>\n                <li>Blocks (only button click can close/dismiss)</li>\n                <li>Size large</li>\n                <li>Keyboard can not dismiss</li>\n                <li>HTML Title</li>\n                <li>HTML content</li>\n            </ul>");
	}
	exports.confirm = confirm;
	function cascading(modal) {
	    var presets = [];
	    presets.push(alert(modal));
	    presets.push(prompt(modal));
	    presets.push(confirm(modal));
	    presets.push(modal.prompt()
	        .size('sm')
	        .title('Cascading modals!')
	        .body('Find your way out...'));
	    return {
	        open: function () {
	            var ret = presets.shift().open();
	            while (presets.length > 0)
	                presets.shift().open();
	            return ret;
	        }
	    };
	}
	exports.cascading = cascading;
	function inElement(modal) {
	    return modal.prompt()
	        .size('sm')
	        .title('A modal contained by an element')
	        .body('Try stacking up more modals!');
	}
	exports.inElement = inElement;


/***/ },

/***/ 281:
/***/ function(module, exports) {

	module.exports = ".simple-element {\n    position: relative;\n    display:block;\n    background-color: #219161\n}"

/***/ },

/***/ 282:
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\n    <h1>Angular 2 (beta) Bootstrap Modal/Dialog</h1>\n    <p class=\"lead\">Blog post will be up soon! look for it in my <a href=\"http://blog.assaf.co/\" target=\"_blank\">blog</a>.</p>\n    <br>\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            <button *ngFor=\"#btn of buttons;\"\n                    class=\"btn btn-default\"\n                    (click)=\"open(btn)\">{{btn.text}}</button>\n            <button class=\"btn btn-default\" (click)=\"openCustomModal()\">Custom Modal</button>\n            <a [routerLink]=\"['CustomizeModals']\">Or use the modal code Generator!</a>\n        </div>\n    </div>\n    <br><br><br><br>\n    <sample-element class=\"jumbotron simple-element\"></sample-element>\n    <br><br>\n    <h2>Last modal result: {{lastModalResult}}</h2>\n</div>\n"

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var angular2_modal_1 = __webpack_require__(1);
	var html = __webpack_require__(284);
	var CustomizeWizard = (function () {
	    function CustomizeWizard(modal) {
	        this.modal = modal;
	        this.type = 'alert';
	        this.preset = {
	            size: 'lg',
	            isBlocking: true,
	            keyboard: 27,
	            dialogClass: '',
	            headerClass: '',
	            title: 'Hello World',
	            titleHtml: '',
	            body: 'A Customized Modal',
	            bodyClass: '',
	            footerClass: '',
	            okBtn: '',
	            okBtnClass: '',
	        };
	    }
	    CustomizeWizard.prototype.createModal = function () {
	        var p = this.preset;
	        var fluent = this.modal[this.type]();
	        for (var key in p) {
	            var value = p[key];
	            if (value === null || value === '')
	                continue;
	            fluent[key](value);
	        }
	        fluent.open();
	    };
	    Object.defineProperty(CustomizeWizard.prototype, "code", {
	        get: function () {
	            var p = this.preset, code = "modal." + this.type + "()\n";
	            for (var key in p) {
	                var value = p[key];
	                if (value === null || value === '')
	                    continue;
	                code += "    ." + key + "(" + (typeof value === 'string' ? "'" + value + "'" : value) + ")\n";
	            }
	            code += '    .open();';
	            return code;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CustomizeWizard = __decorate([
	        core_1.Component({
	            selector: 'customize-wizard',
	            directives: [],
	            providers: [angular2_modal_1.Modal],
	            template: html
	        }), 
	        __metadata('design:paramtypes', [angular2_modal_1.Modal])
	    ], CustomizeWizard);
	    return CustomizeWizard;
	}());
	exports.CustomizeWizard = CustomizeWizard;


/***/ },

/***/ 284:
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n    <h1>Customize A modal window</h1>\n    <p class=\"lead\">Configure a modal, see the code and view the output!</p>\n    <hr>\n    <div class=\"col-md-6\">\n        <div class=\"col-xs-6\">\n            <h3>Configuration:</h3>\n        </div>\n        <div class=\"col-xs-6 col-md-4\">\n            <button class=\"btn btn-success pull-right\" (click)=\"createModal()\">Open Modal</button>\n        </div>\n        <div class=\"col-xs-12\">\n            <form class=\"form-horizontal\" #form=\"ngForm\" (ngSubmit)=\"logForm(form.value)\">\n                <fieldset>\n\n                    <!-- Select Basic -->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"modalType\">Type</label>\n                        <div class=\"col-md-6\">\n                            <select id=\"modalType\" name=\"modalType\" class=\"form-control\"\n                                    [(ngModel)]=\"type\">\n                                <option value=\"alert\">Alert</option>\n                                <option value=\"prompt\">Prompt</option>\n                                <option value=\"confirm\">Confirm</option>\n                            </select>\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"modalSize\">Modal Size</label>\n                        <div class=\"col-md-6\">\n                            <select id=\"modalSize\" name=\"modalSize\" class=\"form-control\"\n                                    [(ngModel)]=\"preset.size\">\n                                <option value=\"sm\">Small</option>\n                                <option value=\"lg\">Large</option>\n                            </select>\n                        </div>\n                    </div>\n\n                    <!-- Multiple Checkboxes (inline) -->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"checkbox\">Blocking?</label>\n                        <div class=\"col-md-6\">\n                            <input type=\"checkbox\" name=\"checkbox\" id=\"checkbox\"\n                                   [(ngModel)]=\"preset.isBlocking\">\n                        </div>\n                    </div>\n\n                    <!-- Text input-->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"closeKeys\">Close Key</label>\n                        <div class=\"col-md-6\">\n                            <input id=\"closeKeys\" name=\"closeKeys\" type=\"number\" placeholder=\"27\"\n                                   class=\"form-control input-md\" [(ngModel)]=\"preset.keyboard\">\n                            <span class=\"help-block\">Key code for closing the window (e.g: 27 for ESC)</span>\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"dialogClass\">Dialog Class</label>\n                        <div class=\"col-md-6\">\n                            <input id=\"dialogClass\" name=\"dialogClass\" type=\"text\"\n                                   placeholder=\"modal-dialog\"  class=\"form-control input-md\"\n                                   [(ngModel)]=\"preset.dialogClass\">\n                            <span class=\"help-block\">A Class for the dialog container.  Default: modal-dialog</span>\n                        </div>\n                    </div>\n\n                    <!-- Text input-->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"headerClass\">Header Class</label>\n                        <div class=\"col-md-6\">\n                            <input id=\"headerClass\" name=\"headerClass\" type=\"text\"\n                                   placeholder=\"modal-header\" class=\"form-control input-md\"\n                                   [(ngModel)]=\"preset.headerClass\">\n                            <span class=\"help-block\"> A Class for the header (title) container.  Default: modal-header</span>\n                        </div>\n                    </div>\n\n                    <!-- Text input-->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"title\">Title</label>\n                        <div class=\"col-md-6\">\n                            <input id=\"title\" name=\"title\" type=\"text\" placeholder=\"This is a title\"\n                                   class=\"form-control input-md\" [(ngModel)]=\"preset.title\">\n                            <span class=\"help-block\">Caption for the title, enclosed in a H3 container.</span>\n                        </div>\n                    </div>\n\n                    <!-- Textarea -->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"titleHtml\">Title (HTML)</label>\n                        <div class=\"col-md-6\">\n                        <textarea class=\"form-control\" id=\"titleHtml\" name=\"titleHtml\"\n                                  [(ngModel)]=\"preset.titleHtml\"></textarea>\n                        </div>\n                        <p class=\"help-block\">An HTML (not compiled) body, if set Title is ignored.</p>\n                    </div>\n\n                    <!-- Textarea -->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"body\">Body</label>\n                        <div class=\"col-md-4\">\n                        <textarea class=\"form-control\" id=\"body\" name=\"body\"\n                                  [(ngModel)]=\"preset.body\"></textarea>\n                        </div>\n                    </div>\n\n                    <!-- Text input-->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"bodyClass\">Body Class</label>\n                        <div class=\"col-md-6\">\n                            <input id=\"bodyClass\" name=\"bodyClass\" type=\"text\" placeholder=\"modal-body\"\n                                   class=\"form-control input-md\" [(ngModel)]=\"preset.bodyClass\">\n                            <span class=\"help-block\">A Class for the body container. Default: modal-body</span>\n                        </div>\n                    </div>\n\n                    <!-- Text input-->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"footerClass\">Footer Class</label>\n                        <div class=\"col-md-6\">\n                            <input id=\"footerClass\" name=\"footerClass\" type=\"text\"\n                                   placeholder=\"modal-footer\" class=\"form-control input-md\"\n                                   [(ngModel)]=\"preset.footerClass\">\n                            <span class=\"help-block\">A Class for the footer container. Default: modal-footer</span>\n                        </div>\n                    </div>\n\n                    <!-- Text input-->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"okBtn\">OK Button Text</label>\n                        <div class=\"col-md-6\">\n                            <input id=\"okBtn\" name=\"okBtn\" type=\"text\" placeholder=\"OK\"\n                                   class=\"form-control input-md\"\n                                   [(ngModel)]=\"preset.okBtn\">\n                            <span class=\"help-block\">Caption for the OK button. Default: OK</span>\n                        </div>\n                    </div>\n\n                    <!-- Text input-->\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"okBtnClass\">OK Button Class</label>\n                        <div class=\"col-md-6\">\n                            <input id=\"okBtnClass\" name=\"okBtnClass\" type=\"text\"\n                                   placeholder=\"btn btn-primary\" class=\"form-control input-md\"\n                                   [(ngModel)]=\"preset.okBtnClass\">\n                            <span class=\"help-block\">A Class for the OK button. Default: btn btn-primary</span>\n                        </div>\n                    </div>\n\n                    <!-- Text input-->\n                    <div class=\"form-group\" *ngIf=\"type === 'confirm'\">\n                        <label class=\"col-md-4 control-label\" for=\"cancelBtn\">Cancel Button Text</label>\n                        <div class=\"col-md-6\">\n                            <input id=\"cancelBtn\" name=\"cancelBtn\" type=\"text\" placeholder=\"Cancel\"\n                                   class=\"form-control input-md\" [(ngModel)]=\"preset.cancelBtn\">\n                            <span class=\"help-block\">Caption for the Cancel button. Default: Cancel</span>\n                        </div>\n                    </div>\n\n                    <!-- Text input-->\n                    <div class=\"form-group\" *ngIf=\"type === 'confirm'\">\n                        <label class=\"col-md-4 control-label\" for=\"cancelBtnClass\">Cancel Button Class</label>\n                        <div class=\"col-md-6\">\n                            <input id=\"cancelBtnClass\" name=\"cancelBtnClass\" type=\"text\"\n                                   placeholder=\"btn btn-default\" class=\"form-control input-md\"\n                                   [(ngModel)]=\"preset.cancelBtnClass\">\n                            <span class=\"help-block\">A Class for the Cancel button. Default: btn btn-default</span>\n                        </div>\n                    </div>\n\n                </fieldset>\n            </form>\n        </div>\n    </div>\n    <div class=\"col-md-6\">\n        <h3>Code:</h3>\n        <pre>{{code}}</pre>\n    </div>\n</div>"

/***/ }

});
//# sourceMappingURL=app.map