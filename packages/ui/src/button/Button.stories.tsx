import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './Button'

export default {
	title: 'Components/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button />

export const Default = Template.bind({})
