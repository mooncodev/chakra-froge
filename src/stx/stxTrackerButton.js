'use strict';
const { createElement } = require("../../../js/globals");
const stx = require("./stx.js");

module.exports = function(_web3, _tx, _btn, _id, _disabled, _enabledColor, _enabledText, _disabledText, _injectedArgs=null) {
    const _loader = _btn.querySelector('.lds-dual-ring');
    if (_loader) {
        _loader.remove();
    }
    const _txId = `${_id}-${_web3.wallet}`;
    const _txStatus = _web3.getTxStatus(_txId);
    _btn.classList.add('relative');
    if (_txStatus && (_txStatus == 'processing' || _txStatus == 'pending') || _disabled) {
        _btn.classList.remove(_enabledColor);
        _btn.classList.add('gray');
        _btn.onclick = (e)=>{e.stopPropagation();};
        if (_disabled)
            _btn.textContent = _disabledText;
        else  {
            _btn.textContent = _enabledText;
            createElement('div', '', 'absolute center lds-dual-ring', _btn);
        }
    } else {
        _btn.textContent = _enabledText;
        _btn.classList.add(_enabledColor);
        _btn.classList.remove('gray');

        _btn.onclick = async function (_e) {
            _e.stopPropagation();
            _btn.classList.remove(_enabledColor);
            _btn.classList.add('gray');
            _web3.trackTx(_txId, '', 'pending');
            createElement('div', '', 'absolute center lds-dual-ring', _btn);
            if (_injectedArgs) {
                _tx.callArgs = _injectedArgs();
            }
            const _r = await stx(_tx, _hash=> {
                _web3.trackTx(_txId, _hash)
                _btn.classList.remove(_enabledColor);
                _btn.classList.add('gray');
                _btn.onclick = (e)=>{e.stopPropagation();};
                _btn.textContent = _enabledText;
                createElement('div', '', 'absolute center lds-dual-ring', _btn);
            });
            if (!_r) {
                _web3.trackTx(_txId, '', 'cancel');
                _btn.textContent = _enabledText;
                _btn.classList.add(_enabledColor);
                _btn.classList.remove('gray');
            }
        };
    }
}
