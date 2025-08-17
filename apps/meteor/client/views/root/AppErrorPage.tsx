import { Box, PaletteStyleTag, States, StatesAction, StatesActions, StatesIcon, StatesSubtitle, StatesTitle } from '@rocket.chat/fuselage';
import { useUserPreference } from '@rocket.chat/ui-contexts';
import { useDarkMode } from '@rocket.chat/fuselage-hooks';
import type { ErrorInfo, ReactElement } from 'react';

type AppErrorPageProps = {
	error: Error;
	info?: ErrorInfo;
	clearError: () => void;
};

const AppErrorPage = (_props: AppErrorPageProps): ReactElement => {
	const userThemePreference = useUserPreference('themeAppearence') || 'auto';
	const isDark = useDarkMode(userThemePreference === 'auto' ? undefined : userThemePreference === 'dark');
	const theme = isDark ? 'dark' : 'light';

	return (
		<>
			<PaletteStyleTag theme={theme} tagId='app-error-palette' />
			<Box display='flex' justifyContent='center' height='full' backgroundColor='surface'>
				<States>
					<StatesIcon name='error-circle' />
					<StatesTitle>Application Error</StatesTitle>
					<StatesSubtitle>The application GUI just crashed.</StatesSubtitle>

					<StatesActions>
						<StatesAction
							onClick={() => {
								const result = indexedDB.deleteDatabase('MeteorDynamicImportCache');
								result.onsuccess = () => {
									window.location.reload();
								};
								result.onerror = () => {
									window.location.reload();
								};
							}}
						>
							Reload Application
						</StatesAction>
					</StatesActions>
				</States>
			</Box>
		</>
	);
};

export default AppErrorPage;
