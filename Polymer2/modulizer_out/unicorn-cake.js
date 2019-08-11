import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * `unicorn-cake`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class UnicornCake extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <h2>Hello [[prop1]]!</h2>
`;
  }

  static get is() { return 'unicorn-cake'; }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'unicorn-cake'
      }
    };
  }
}

window.customElements.define(UnicornCake.is, UnicornCake);
