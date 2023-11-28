/**
 * Creates the common instance used for signing
 * transactions with hardware wallets
 * @returns the initialized common instance
 */
export const getCommon = async ({ customNetwork, chainId }) => {
    const { default: Common, Hardfork } = await import('@ethereumjs/common');
    const CommonConstructor = Common.default || Common;
    let common;
    try {
        common = new CommonConstructor({
            chain: customNetwork || chainId,
            // Berlin is the minimum hardfork that will allow for EIP1559
            hardfork: Hardfork.Berlin,
            // List of supported EIPS
            eips: [1559]
        });
    }
    catch (e) {
        if (e.message && /Chain.*not supported/.test(e.message)) {
            common = CommonConstructor.custom({ chainId });
        }
        else {
            throw e;
        }
    }
    return common;
};
/**
 * Takes in TransactionRequest and converts all BigNumber values to strings
 * @param transaction
 * @returns a transaction where all BigNumber properties are now strings
 */
export const bigNumberFieldsToStrings = (transaction) =>
  Object.keys(transaction).reduce((transaction, txnProperty) => ({
    ...transaction,
    ...(transaction[txnProperty]
        .toHexString
        ? {
            [txnProperty]: transaction[txnProperty].toHexString()
        }
        : {})
}), transaction);
