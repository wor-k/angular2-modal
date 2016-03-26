import { ResolvedProvider } from 'angular2/core';
import {Modal} from '../../providers/Modal';
import {ModalConfig} from '../../models/ModalConfig';
import {ConfigBuilder, ConfigSetter, setConfigMethod} from './../../framework/ConfigBuilder';
import {ModalDialogInstance} from '../../models/ModalDialogInstance';

export interface ModalInvokeConfig {
    component: any;
    modalConfig: ModalConfig;
}


/**
 * A ConfigBuilder can signal to open a modal window.
 * Once a configuration is ready, calling 'open' will invoke an onOpen callback.
 * The onOpen callback must be set on the instance before calling open.
 */
export class ModalInvokeConfigBuilder<T extends ModalInvokeConfig> extends ConfigBuilder<T> {
    constructor(defaultConfigValues: T = undefined, initialSetters: string[] = undefined) {
        super(defaultConfigValues, initialSetters);
        // this is not needed as we get them via defaults.
        // but it "protects" overwrites since we set writeOnce=true.
        setConfigMethod(this, 'modal', true);
        setConfigMethod(this, 'component', true);
        setConfigMethod(this, 'bindings', true);

        setConfigMethod(this, 'modalConfig');
    }

    modalConfig: ConfigSetter<ModalConfig, this>;
    private $$modal: Modal;
    // modal: ConfigSetter<Modal, this>;

    // component: ConfigSetter<any, this>;

    private $$bindings: (config: T) => ResolvedProvider[];
    // bindings: ConfigSetter<(config: T) => ResolvedProvider[], this>;



    open(): Promise<ModalDialogInstance> {
        if (! (this.$$modal instanceof Modal) ) {
            return <any>Promise.reject(new Error('Configuration Error: modal service not set.'));
        }

        if (typeof this.$$bindings !== 'function') {
            return <any>Promise.reject(new Error('Configuration Error: bindings not set.'));
        }

        let config: T = this.toJSON(),
            bindings = this.$$bindings(config);

        return this.$$modal.open(config.component, bindings, config.modalConfig);
    }
}
