// import type { IAuditLog } from '@rocket.chat/core-typings'; // Removed for FOSS

import type { IBaseModel } from './IBaseModel';

// Stub interface for FOSS version
export interface IAuditLog {
	_id: string;
	ts: Date;
	results: any[];
	userId: string;
	action: string;
	object: string;
	objectId: string;
	extraData: any;
	userAgent: string;
	ip: string;
}

export type IAuditLogModel = IBaseModel<IAuditLog>;
