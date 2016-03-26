import { Injector, provide , ResolvedBinding} from 'angular2/core';
import {ICustomModal} from '../models/ICustomModal';
import {OKOnlyModal} from '../commonModals/okOnlyModal';
import {ConfigSetter} from '../framework/ConfigBuilder';
import {ModalInvokeConfigBuilder, ModalInvokeConfig} from './base/ModalInvokeConfigBuilder';
import {Modal} from '../providers/Modal';

function createBindings(config: PromptConfig): ResolvedBinding[] {
    return Injector.resolve([
        provide(ICustomModal, {useValue: {
            title: config.title,
            body: config.content,
            okText: config.ok
        }})
    ]);
}

export interface PromptConfig extends ModalInvokeConfig {
    title: string;
    titleHtml: string;
    content: string;
    contentHtml: string;
    ok: string;
}


export class Prompt extends ModalInvokeConfigBuilder<PromptConfig> {
    constructor(modal: Modal) {
        super(<any>{
            modal: modal,
            component: OKOnlyModal,
            bindings: createBindings
        }, [
            'title',
            'titleHtml',
            'content',
            'contentHtml',
            'ok',
        ]);
    }

    title: ConfigSetter<string, this>;
    titleHtml: ConfigSetter<string, this>;
    content: ConfigSetter<string, this>;
    contentHtml: ConfigSetter<string, this>;
    ok: ConfigSetter<string, this>;
}