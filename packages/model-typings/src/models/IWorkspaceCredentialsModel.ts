// import type { IWorkspaceCredentials } from '@rocket.chat/core-typings'; // Removed for FOSS
import type { DeleteResult, UpdateResult } from 'mongodb';

import type { IBaseModel } from './IBaseModel';

// Stub interface for FOSS version
export interface IWorkspaceCredentials {
	_id: string;
	scope: string;
	accessToken: string;
	expirationDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface IWorkspaceCredentialsModel extends IBaseModel<IWorkspaceCredentials> {
	getCredentialByScope(scope?: string): Promise<IWorkspaceCredentials | null>;
	updateCredentialByScope(credentials: { scope: string; accessToken: string; expirationDate: Date }): Promise<UpdateResult>;
	removeAllCredentials(): Promise<DeleteResult>;
}
