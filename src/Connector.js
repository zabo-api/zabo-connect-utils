/**
 * module description
 * @module Connector
 */

/**
 * The Connector is the abstract class that defines the interface between the provider and the Zabo Connect Widget.
 */
class Connector {
  /**
   * Connector constructor.
   * @param {Object} params - Object containing the initial parameters.
   */
  constructor (params = {}) {
    this._params = params
  }

  /**
   * Method to expose the connector name.
   * @returns {string}
   */
  getName () {
    throw new Error('You have to implement the method "getName".')
    // return 'name'
  }

  /**
   * @typedef {Object} StatusResponse - Object representing the connector status.
   * @property {boolean} isSupported - Whether the connector is supported.
   * @property {string} message - The status message.
   */

  /**
   * Async method to check the Connector status.
   * @returns {StatusResponse} - Object representing the status of the connector.
   */
  async getStatus () {
    return {
      isSupported: true,
      message: 'Connector ready!'
    }
  }

  /**
   * @typedef {Object} Credential - Object representing a credential.
   * @property {string} name - The name of the credential.
   * @property {Object} input - Object representing an input field.
   * @property {("email"|"password"|"select"|"text"|"hidden")} input.type - The input type.
   * @property {string} input.label - The label for the input field.
   * @property {string} input.placeholder - The placeholder for the input field.
   * @property {Array.<string>} input.options - The list of options in case of input type "select".
   * @property {string} input.value - The value property for the input field (in case you are just passing values through).
   * @property {string} input.default_value - The defaultValue property for the input field.
   */

  /**
   * Async method to implement the Connector interface.
   * @param {Array.<Credential>} requiredCredentials - The list of required credentials.
   * @param {Object} userInput - The object representing the values pre-filled by the user.
   * @returns {(Object|Array.<Credential>)} - The object representing the response values or a lsit of new required credentials.
   */
  async getCredentials (requiredCredentials = [], userInput = {}) {
    throw new Error('You have to implement the method "getCredentials".')
    // return { [key]: "value" } || [<Credential>, ...]
  }
}

export default Connector
