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
 * @interface Host
 */
export interface Host {
    /**
     * 
     * @type {L2Ident}
     * @memberof Host
     */
    l2ident?: any;
    /**
     * 
     * @type {boolean}
     * @memberof Host
     */
    active?: any;
    /**
     * 
     * @type {boolean}
     * @memberof Host
     */
    persistent?: any;
    /**
     * 
     * @type {Array&lt;Name&gt;}
     * @memberof Host
     */
    names?: any;
    /**
     * 
     * @type {string}
     * @memberof Host
     */
    vendorName?: any;
    /**
     * 
     * @type {string}
     * @memberof Host
     */
    hostType?: any;
    /**
     * 
     * @type {string}
     * @memberof Host
     */
    _interface?: any;
    /**
     * 
     * @type {string}
     * @memberof Host
     */
    id?: any;
    /**
     * 
     * @type {number}
     * @memberof Host
     */
    lastTimeReachable?: any;
    /**
     * 
     * @type {boolean}
     * @memberof Host
     */
    primaryNameManual?: any;
    /**
     * 
     * @type {string}
     * @memberof Host
     */
    defaultName?: any;
    /**
     * 
     * @type {Array&lt;L3Connectivity&gt;}
     * @memberof Host
     */
    l3connectivities?: any;
    /**
     * 
     * @type {boolean}
     * @memberof Host
     */
    reachable?: any;
    /**
     * 
     * @type {number}
     * @memberof Host
     */
    lastActivity?: any;
    /**
     * 
     * @type {AccessPoint}
     * @memberof Host
     */
    accessPoint?: any;
    /**
     * 
     * @type {string}
     * @memberof Host
     */
    primaryName?: any;
}