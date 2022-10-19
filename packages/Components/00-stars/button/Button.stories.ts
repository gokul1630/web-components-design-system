import { html } from "lit"
import "./src/Button"

export default  {
	title: "Stars/Button",
	component: "space-button",
	args: {
		label: "Button",
		disabled: false,
	},
	argTypes: {
		size: {
			control: { type: "radio" },
			options: ["sm", "md", "lg"],
		},
		buttonVariant: {
			control: { type: "radio" },
			options: ["primary", "secondary"],
		},
	},
}


const Template = ({ label, size, buttonVariant, disabled }: any) => {
	return html`
		<space-button
			label=${label}
			button-variant=${buttonVariant}
			?is-disabled=${disabled}
			button-size="${size}"
		>Button</space-button>
	`
}

export const Large: any = Template.bind({})
Large.args = {
	size: "lg",
}

export const Small: any = Template.bind({})
Small.args = {
	size: "sm",
}
export const Primary: any = Template.bind({})
Primary.args = {
	size: "sm",
	buttonVariant: "primary",
}
export const Secondary: any = Template.bind({})
Secondary.args = {
	size: "sm",
	buttonVariant: "secondary",
}