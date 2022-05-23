import { v4 as uuid } from 'uuid';

export const gxUUID = (): string => {
    return uuid();
}