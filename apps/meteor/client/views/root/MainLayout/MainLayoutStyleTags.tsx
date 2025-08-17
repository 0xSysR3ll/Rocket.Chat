import { PaletteStyleTag } from '@rocket.chat/fuselage';
import { useUserPreference } from '@rocket.chat/ui-contexts';
import { useDarkMode } from '@rocket.chat/fuselage-hooks';

import { codeBlock } from '../lib/codeBlockStyles';

export const MainLayoutStyleTags = () => {
	const userThemePreference = useUserPreference('themeAppearence') || 'auto';
	const isDark = useDarkMode(userThemePreference === 'auto' ? undefined : userThemePreference === 'dark');
	const theme = isDark ? 'dark' : 'light';

	return (
		<>
			<PaletteStyleTag theme={theme} selector='.rcx-content--main, .rcx-tile' tagId={`main-palette-${theme}`} />
			<PaletteStyleTag theme='dark' selector='.rcx-sidebar--main, .rcx-sidepanel, .rcx-navbar' tagId='sidebar-palette' />
			{theme === 'dark' && <PaletteStyleTag selector='.rcx-content--main' palette={codeBlock} tagId='codeBlock-palette' />}
		</>
	);
};
