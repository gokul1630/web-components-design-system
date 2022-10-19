import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import componentStyles from './Button.css.lit';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary';

@customElement('space-button')
export class Button extends LitElement {
  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false;

  @property({ type: String })
  label = '';

  @property({ type: String, attribute: 'button-size' })
  buttonSize: ButtonSize = 'md';

  @property({ type: String, attribute: 'button-variant' })
  buttonVariant: ButtonVariant = 'primary';

  @property()
  onClick!: () => void;

  static styles = [componentStyles];

  render() {
    return html`
      <button
        ?disabled=${this.isDisabled}
        class="btn ${this.buttonVariant} ${this.buttonSize}"
        @click=${this.onClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'space-button': Button;
  }
}
