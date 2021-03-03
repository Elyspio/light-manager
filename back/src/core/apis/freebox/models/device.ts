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
/**
 * 
 * @export
 * @interface Device
 */
export interface Device {
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    rxBytes?: any;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    txBytes?: any;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    bssid?: any;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    connDuration?: any;
    /**
     * 
     * @type {Last}
     * @memberof Device
     */
    lastTx?: any;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    hostname?: any;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    mac?: any;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    accessType?: any;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    customKeyId?: any;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    id?: any;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    pairwiseCipher?: any;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    state?: any;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    inactive?: any;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    wpaAlg?: any;
    /**
     * 
     * @type {Last}
     * @memberof Device
     */
    lastRx?: any;
    /**
     * 
     * @type {Flags}
     * @memberof Device
     */
    flags?: any;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    txRate?: any;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    rxRate?: any;
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    signal?: any;
    /**
     * 
     * @type {Host}
     * @memberof Device
     */
    host?: any;
}