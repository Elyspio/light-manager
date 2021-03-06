/* tslint:disable */
/* eslint-disable */
/**
 * Api documentation
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { BadRequest } from '../models';
import { Body } from '../models';
import { Device } from '../models';
import { DeviceReduced } from '../models';
/**
 * DevicesApi - axios parameter creator
 * @export
 */
export const DevicesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        devicesGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/core/devices`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} mac 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        devicesGetDevice: async (mac: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'mac' is not null or undefined
            if (mac === null || mac === undefined) {
                throw new RequiredError('mac','Required parameter mac was null or undefined when calling devicesGetDevice.');
            }
            const localVarPath = `/core/devices/{mac}`
                .replace(`{${"mac"}}`, encodeURIComponent(String(mac)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {Body} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        devicesIsConnected: async (body?: Body, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/core/devices/connected`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DevicesApi - functional programming interface
 * @export
 */
export const DevicesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async devicesGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<DeviceReduced>>> {
            const localVarAxiosArgs = await DevicesApiAxiosParamCreator(configuration).devicesGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {string} mac 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async devicesGetDevice(mac: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Device>> {
            const localVarAxiosArgs = await DevicesApiAxiosParamCreator(configuration).devicesGetDevice(mac, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {Body} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async devicesIsConnected(body?: Body, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>> {
            const localVarAxiosArgs = await DevicesApiAxiosParamCreator(configuration).devicesIsConnected(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DevicesApi - factory interface
 * @export
 */
export const DevicesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        devicesGet(options?: any): AxiosPromise<Array<DeviceReduced>> {
            return DevicesApiFp(configuration).devicesGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} mac 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        devicesGetDevice(mac: string, options?: any): AxiosPromise<Device> {
            return DevicesApiFp(configuration).devicesGetDevice(mac, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {Body} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        devicesIsConnected(body?: Body, options?: any): AxiosPromise<boolean> {
            return DevicesApiFp(configuration).devicesIsConnected(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DevicesApi - object-oriented interface
 * @export
 * @class DevicesApi
 * @extends {BaseAPI}
 */
export class DevicesApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApi
     */
    public devicesGet(options?: any) {
        return DevicesApiFp(this.configuration).devicesGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {string} mac 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApi
     */
    public devicesGetDevice(mac: string, options?: any) {
        return DevicesApiFp(this.configuration).devicesGetDevice(mac, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {Body} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevicesApi
     */
    public devicesIsConnected(body?: Body, options?: any) {
        return DevicesApiFp(this.configuration).devicesIsConnected(body, options).then((request) => request(this.axios, this.basePath));
    }
}
