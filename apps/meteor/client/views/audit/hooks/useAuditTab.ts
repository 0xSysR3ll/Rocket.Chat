// import type { IAuditLog } from '@rocket.chat/core-typings'; // Removed for FOSS
import { useEffectEvent } from '@rocket.chat/fuselage-hooks';
import { useRoute, useRouteParameter } from '@rocket.chat/ui-contexts';
import type { SetStateAction } from 'react';
import { useMemo } from 'react';

const typeToTabMap: Record<any, string> = {
	'': 'rooms',
	'u': 'users',
	'd': 'direct',
	'l': 'omnichannel',
};

const tabToTabMap = new Map(Object.entries(typeToTabMap).map(([type, tab]) => [tab, type as any]));

export const useAuditTab = () => {
	const tab = useRouteParameter('tab');
	const type = useMemo(() => tabToTabMap.get(tab ?? 'rooms') ?? '', [tab]);

	const auditRoute = useRoute('audit-home');

	const setType = useEffectEvent((newType: SetStateAction<any>) => {
		auditRoute.replace({ tab: typeToTabMap[typeof newType === 'function' ? newType(type) : newType] ?? 'rooms' });
	});

	return [type, setType] as const;
};
