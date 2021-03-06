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
 * @interface BadRequest
 */
export interface BadRequest {
    /**
     * The error name
     * @type {string}
     * @memberof BadRequest
     */
    name: any;
    /**
     * An error message
     * @type {string}
     * @memberof BadRequest
     */
    message: any;
    /**
     * The status code of the exception
     * @type {number}
     * @memberof BadRequest
     */
    status: any;
    /**
     * A list of related errors
     * @type {Array&lt;GenericError&gt;}
     * @memberof BadRequest
     */
    errors?: any;
    /**
     * The stack trace (only in development mode)
     * @type {Array&lt;string&gt;}
     * @memberof BadRequest
     */
    stack?: any;
}
