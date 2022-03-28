'use strict';
const {createElement,swapClass} = require('../../../js/globals.js');
const copyText = require('./copyText.js');

const parseMsg = function(_msg) {
    if (_msg.includes('insufficient funds')) {
        return 'Insufficient funds.';
    } else {
        return 'Unknown error occurred.';
    }
}

const createTxErrorPopup = function(_msg) {
    const _parsed = parseMsg(_msg.message);
    const _popup = createElement('div', '', 'errorPopupContainer fadeIn', document.body);
    _popup.style = `position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;background-color:rgba(0,0,0,0.5)`;
    const _htmlStr = `
    <div class="error-box relative emptyMargin center" style="max-width:400px;overflow:hidden;">
        <div class="header d-flex justify-content-right align-items-center">
            <img src="https://public.fairtokenproject.com/warning.png"/>
            <p class="title">TRANSACTION ERROR</p>
        </div>
        <p class="msg" style="font-size:16px !important;">
            ${_parsed}
        </p>
        <div class="btn-row row justify-content-center"></div>
    </div>`;
    const _template = document.createElement('template');
    _template.innerHTML = _htmlStr;
    const _box = _template.content;
    _popup.appendChild(_box);
    createElement('p', '', 'actionBtn med-gray', _popup.querySelector('.error-box'), 'Copy Error For Support', ()=>{
        copyText(_msg.message, 'Error for Support');
    })
    createElement('p', '', 'actionBtn blue', _popup.querySelector('.error-box'), 'OK', ()=>{
        swapClass(_popup, 'fadeIn', 'fadeOut');
        setTimeout(()=>{_popup.remove()}, 1000);
    })
    _popup.onclick = ()=>{
        swapClass(_popup, 'fadeIn', 'fadeOut');
        setTimeout(()=>{_popup.remove()}, 1000);
    }
}

module.exports = createTxErrorPopup;
