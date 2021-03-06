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
 * @interface L3Connectivity
 */
export interface L3Connectivity {
    /**
     * 
     * @type {string}
     * @memberof L3Connectivity
     */
    addr?: any;
    /**
     * 
     * @type {boolean}
     * @memberof L3Connectivity
     */
    active?: any;
    /**
     * 
     * @type {boolean}
     * @memberof L3Connectivity
     */
    reachable?: any;
    /**
     * 
     * @type {number}
     * @memberof L3Connectivity
     */
    lastActivity?: any;
    /**
     * 
     * @type {string}
     * @memberof L3Connectivity
     */
    af?: L3ConnectivityAfEnum;
    /**
     * 
     * @type {number}
     * @memberof L3Connectivity
     */
    lastTimeReachable?: any;
}

/**
    * @export
    * @enum {string}
    */
export enum L3ConnectivityAfEnum {
    Ipv4 = 'ipv4',
    Ipv6 = 'ipv6'
}

