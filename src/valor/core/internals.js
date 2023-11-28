import { getDevice } from './utils';
export const internalState = {
    svelteInstance: null,
    appMetadata: null,
    device: getDevice()
};
