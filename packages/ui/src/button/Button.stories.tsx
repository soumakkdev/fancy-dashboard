import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './Button'

export default {
	title: 'Components/Button',
	component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Click Me</Button>

export const Default = Template.bind({})
Default.args = {
	variant: 'primary',
	size: 'small',
	fullWidth: false,
}
