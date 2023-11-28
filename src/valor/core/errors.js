export const ProviderRpcErrors = {
    ACCOUNT_ACCESS_REJECTED: 4001,
    UNAUTHORIZED: 4100,
    UNSUPPORTED_METHOD: 4200,
    DISCONNECTED: 4900,
    CHAIN_DISCONNECTED: 4901,
    CHAIN_NOT_ADDED: 4902,
    ACCOUNT_ACCESS_ALREADY_REQUESTED: -32002,
    DOES_NOT_EXIST: -32601,
    INVALID_PARAMS: -32602,
}
export class ProviderRpcError extends Error {
    constructor(error) {
        super(error.message);
        this.message = error.message;
        this.code = error.code;
        this.data = error.data;
    }
}
export const throwUnsupportedMethod = (method='')=>{
    throw new ProviderRpcError({
        code: 4200, message: `Method (${method}) unsupported by provider`
    });
}
