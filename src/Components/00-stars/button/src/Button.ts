import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import componentStyles from './Button.css.lit';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary';

@customElement('lit-button')
export class Button extends LitElement {
  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false;

  @property({ type: String, attribute: 'button-size' })
  buttonSize: ButtonSize = 'md';

  @property({ type: String, attribute: 'button-variant' })
  buttonVariant!: ButtonVariant;

  @property()
  onClick!: () => void;

  @property({ type: String, attribute: 'button-url' })
  buttonUrl!: string;

  static styles = [componentStyles];

  render() {
    console.log(this.isDisabled);

    return this.buttonUrl
      ? html`
          <a
            aria-disabled=${this.isDisabled}
            class="btn ${this.buttonVariant} ${this.buttonSize}"
            @click=${this.onClick}
            href=${this.buttonUrl}
          >
            <slot></slot>
          </a>
        `
      : html`<button
          ?disabled=${this.isDisabled}
          class="btn ${this.buttonVariant} ${this.buttonSize}"
          @click=${this.onClick}
        >
          <slot></slot>
        </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-button': Button;
  }
}
