import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

const theme = create({
	base: 'light',
})

addons.setConfig({
	theme: theme,
	isFullscreen: false,
	showNav: true,
	showPanel: false,
	panelPosition: 'right',
	enableShortcuts: true,
	isToolshown: false,
	initialActive: 'sidebar',
	sidebar: {
		showRoots: true,
	},
})
