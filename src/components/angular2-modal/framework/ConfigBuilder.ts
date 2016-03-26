// alert
// prompt (alert + blocking)
// confirm (yes / not

const PRIVATE_PREFIX = '$$';
const RESERVED_REGEX = /^(\$\$).*/;

function validateMethodName(name: string) {
    if (!name) {
        throw new Error(`Illegal method name. Empty method name is not allowed`);
    } else if (name in this) {
        throw new Error(`A member name '${name}' already defined.`);
    }
}

function getConfigPropertyNames (subject: any): string[] {
    return Object.getOwnPropertyNames(subject)
        .filter(name => RESERVED_REGEX.test(name))
        .map(name => name.substr(2));
}

function privateKey(name: string): string {
    return PRIVATE_PREFIX + name;
}

/**
 * Create a function for setting a value for a property on a given object.
 * @param obj The object to apply the key & setter on.
 * @param propertyName The name of the property on the object
 * @param writeOnce If true will allow writing once (default: false)
 */
export function setConfigMethod<T>(obj: T, propertyName: string, writeOnce: boolean = false): void {
    validateMethodName.call(obj, propertyName);

    Object.defineProperty(obj, propertyName, <any>{
        configurable: false,
        enumerable: false,
        writable: false,
        value: function (value: any) {
            let key = privateKey(propertyName);
            if (writeOnce && this.hasOwnProperty(key)) {
                throw new Error(`Overriding config property '${propertyName}' is not allowed.`);
            }
            this[key] = value;
            return this;
        }
    });
}


/**
 * Describes a configuration setter.
 * A function that gets a value and returns the instance it works on.
 */
export interface ConfigSetter<T, Z> {
    //TODO: Setting 'this' instead of Z does not work, this=ConfigSetter here...
    (value: T): Z;
}


export interface IConfigBuilderFactory<Z> {
    configBuilder: Z;
    setMethod(name: string, defaultValue?: any): IConfigBuilderFactory<Z>;
}

/**
 * Represent a fluent API factory wrapper for defining ConfigBuilder instances.
 */
export class ConfigBuilderFactory<T> {
    private _configBuilder: ConfigBuilder<T>;

    constructor(configBuilder?: ConfigBuilder<T>) {
        this._configBuilder =
            configBuilder instanceof ConfigBuilder ? configBuilder : <any>new ConfigBuilder();
    }

    /**
     * Create a setter on the configuration object.
     * @param name The name of the setter function.
     * @param defaultValue If set (not undefined) set's the value on the config object immediately.
     * @returns {ConfigBuilderFactory}
     */
    setMethod(name: string, defaultValue: any = undefined): ConfigBuilderFactory<T> {
        setConfigMethod(this._configBuilder, name);
        if (defaultValue !== undefined) {
            this._configBuilder[name](defaultValue);
        }
        return this;
    }

    /**
     * The config builder object.
     * @returns {ConfigBuilder<T>}
     */
    get configBuilder(): ConfigBuilder<T> {
        return this._configBuilder;
    }
}

/**
 * Represent a fluent API configuration builder where setter functions return their context
 * which is the ConfigBuilder instance itself.
 */
export class ConfigBuilder<T> {

    /**
     *
     * @param defaultConfigValues An object representing default values for the config object.
     * Keys are the config properties and the values are the default values for the config.
     * @param initialSetters A list of initial setters for this ConfigBuilder.
     */
    constructor(defaultConfigValues: T = undefined, initialSetters: string[] = undefined) {
        if (defaultConfigValues) {
            Object.getOwnPropertyNames(defaultConfigValues)
                .forEach(name => this[privateKey(name)] = defaultConfigValues[name]);
        }

        if (Array.isArray(initialSetters)) {
            initialSetters.forEach(name => setConfigMethod(this, name));
        }
    }


    /**
     * Returns a ConfigBuilderFactory ready to define a ConfigBuilder instance.
     * @param defaultConfigValues An object representing default values for the config object.
     * Keys are the config properties and the values are the default values for the config.
     * @param initialSetters A list of initial setters for this ConfigBuilder.
     * @returns {ConfigBuilderFactory<T>}
     */
    static compose<T>(defaultConfigValues: T = undefined,
                      initialSetters: string[] = undefined): ConfigBuilderFactory<T> {

        return <any>ConfigBuilder.composeWith<ConfigBuilder<T>>(
            new ConfigBuilder<T>(defaultConfigValues, initialSetters));
    }


    static composeWith<Z>(configBuilder: Z): IConfigBuilderFactory<Z> {
        return <any>new ConfigBuilderFactory<any>(<any>configBuilder);
    }

    toJSON(): T {
        return getConfigPropertyNames(this)
            .reduce((obj: T, name: string) => {
                obj[name] = this[privateKey(name)];
                return obj;
            }, <T><any>{});
    }
}
