const Window = require("../../../../js/windows/window.js");
// const BSN = require('../../../../js/components/bootstrap-native-custom.min.js');
// const WindowTypes = require("../../../../js/windows/windowTypes.js");
const ethers = require('ethers');
const { MaxUint256 } = ethers.constants;
const {convertUnixTimestamp, createElement, swapClass} = require("../../../../js/globals.js");
const ProgressSlider = require('../../components/progressSlider.js');
const DetailsPopoverButton = require('../../components/detailsPopoverButton.js');
const createStory = require('../../../../js/components/story.js');
const infoPopup = require('../../components/infoPopup.js');
const jumboImg = require('../../../../assets/ilo/Defi_Presales_Reimagined_v12.png')
let stx, stxHelpers, addr, stxFns;

const Web3 = require('web3');

// Rest is useful for calling APIs
const Rest = require("../../../../js/util/rest.js");
const { sortBy, random, create } = require("lodash");
const DropdownListing = require("../../components/dropdownListing.js");
// helpful utilities for injecting content dynamically
// dont forget to clean up elements in __on_close__
// data caching can also be conducted in __on_close__
/*globals.js: gotoSubdomain, createElement, swapClass, lerp, convertUnixTimestamp, symbolSvgGenerator, truncateAddress */
// const { saveStorage, getStorage } = require("../../../../js/util/storage.js");


class LiquidityWindow extends Window {
  get pageRoot() {
    return document.getElementById('liqLockSearchRoot');
  }
  get sharedWeb3() {
    return this._shared.web3;
  }
  get apiUrl() {
    return this._shared.web3.networkId == 1 ? 'https://api.fairtokenproject.com/' : 'https://api.stage.fairtokenproject.com/';
  }
  get ethscanBaseUrl() {
    const ntwkname = {
      homestead: '', mainnet: '', ropsten: 'ropsten.'
    }[this._shared.web3._network.name]
    return {
      tx: `https://${ntwkname}etherscan.io/tx/`,
      addr: `https://${ntwkname}etherscan.io/address/`,
    };
  }

  constructor(_params) {
    super(_params);
    this._shared = _params.shared;
    // this._wManager = _params.windows;
    this.__on_network_change__ = this.__on_network_change__.bind(this);
    this.__on_wallet_change__ = this.__on_wallet_change__.bind(this);
  }

  //override for initialization
  async __on_open__() {
    const _jumboImg = document.querySelector('.jumbo-ilo-image');
    _jumboImg.setAttribute('src', jumboImg.default);
    var _connected = this._shared.web3.wallet != undefined && this._shared.web3.wallet != null;
    if (_connected) {
      this._shared.web3.onNetworkChange(this.__on_network_change__);
      this._shared.web3.onWalletChange(this.__on_wallet_change__);
    } else {
      console.log('not connected')
      if (window.location.href.includes('#locks')) {
        document.querySelector('#container-liqpage-ilocards').classList.add('hidden');
        document.querySelector('#tab-button-liqpage-ilocards').classList.remove('active');
        document.querySelector('#container-liqpage-liqlocks').classList.remove('hidden');
        document.querySelector('#tab-button-liqpage-liqlocks').classList.add('active');
      } else {
        document.querySelector('#container-liqpage-liqlocks').classList.add('hidden');
        document.querySelector('#tab-button-liqpage-liqlocks').classList.remove('active');
        document.querySelector('#container-liqpage-ilocards').classList.remove('hidden');
        document.querySelector('#tab-button-liqpage-ilocards').classList.add('active');
      }
      document.querySelector('.ilosubtab-container-parent>div.loader').classList.remove('hidden');
      await this.__set_getTokens__();
      this.__draw_liq_table__(this._newTokens, 'liqLockTableRoot').then();
      this.__init_liq_search__().then();
      this.__init_liq_page_tabs__();
      this.__init_ilo_cards__().then();
      document.querySelector('.ilosubtab-container-parent>div.loader').classList.add('hidden');
    }
  }

  async __set_getTokens__(_singleModeAddr) {
    this.getTokens = (await Rest.get(`${this.apiUrl}getTokens`)).message;
  }

  async __init_liq_search__(_tokens, _parent) {
    const self = this;
    const Web3 = require('web3');
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    // const web3 = this._shared.web3;

    const $root = document.getElementById('liqLockSearchRoot');
    const $llSearchInput = $root.querySelector('#llSearchInput');
    const $llSearchBtn = $root.querySelector('#llSearchBtn');
    const $llSearchModal = $root.querySelector('#llSearchModal');
    const $llSearchModalPlaceholder = $root.querySelector('#llSearchModalPlaceholder');
    const $llSearchModalSpinner = $root.querySelector('#llSearchModalSpinner');
    const $llSearchFailedNotice = $root.querySelector('#llSearchFailedNotice');
    const $searchModalBody = $root.querySelector('.modal-body');
    const $llSearchModalX = $root.querySelector('#llSearchModalX');
    const $llSearchModalCloseBtn = $root.querySelector('#llSearchModalCloseBtn');
    const $lockInfoContainer = $root.querySelector('#lockInfoContainer');
    const $launchedWithFtpTag = $root.querySelector('#launchedWithFtpTag');
    const $tokenName = $root.querySelector('#tokenName');
    const $tokenPair = $root.querySelector('#tokenPair');
    const $lockStatus = $root.querySelector('#lockStatus');
    const $lockSettingsContainer = $root.querySelector('#lockSettingsContainer');
    const $releaseSettingsContainer = $root.querySelector('#releaseSettingsContainer');
    const $inp_payoutAddress = $root.querySelector('#inp_payoutAddress');
    const $inp_lockDuration = $root.querySelector('#inp_lockDuration');
    const $btn_initLock = $root.querySelector('#btn_initLock');
    const $btn_initRelease = $root.querySelector('#btn_initRelease');
    const $lockSettingsSpinner = $root.querySelector('#lockSettingsSpinner');
    const $releaseSettingsSpinner = $root.querySelector('#releaseSettingsSpinner');
    async function toggleSearchModal(bShow) {
      if (!bShow) {
        //close & reset modal contents
        $llSearchModal.classList.add('hidden');
        $llSearchModalPlaceholder.classList.remove('hidden');
        $launchedWithFtpTag.classList.add('hidden')
        $lockInfoContainer.classList.add('hidden')
        $lockSettingsContainer.classList.add('hidden')
        $releaseSettingsContainer.classList.add('hidden')
        $llSearchModalSpinner.classList.remove('hidden')
        $llSearchFailedNotice.classList.add('hidden')
        $lockSettingsSpinner.classList.add('hidden');
        $releaseSettingsSpinner.classList.add('hidden');
        addr.wip_LpToken = false;
        addr.wip_ERC20Token = false;
        $inp_payoutAddress.value = '';
        $inp_lockDuration.value = '';
        return;
      }
      //show & init modal contents
      const inputVal = $root.querySelector('#llSearchInput').value.trim();
      // const inputVal = addr.ERC20_Sandstorm;/*MOCK BYPASS (FTP)*/
      // const inputVal = addr.Pair_LuckyFloki_WETH;/*MOCK BYPASS (FTP)*/

      $llSearchModal.classList.remove('hidden');
      $llSearchModalPlaceholder.classList.add('hidden');
      addr.WETH = await stxFns.router_getWETHaddress();//populates addr.WETH
      addr.USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";


      const addrUserInput_sum = ethers.utils.getAddress(inputVal);
      // const addrUserInput_low = inputVal.toLowerCase();

      const [isLpToken, token0, token1] = await stxFns.lpToken_validateLpToken(addrUserInput_sum);
      var currencyStr = "WETH";
      if (isLpToken) {
        addr.wip_LpToken = addrUserInput_sum;
        if (token0 === addr.USDC || token1 === addr.USDC)
          currencyStr = "USDC";
        addr.wip_ERC20Token = (token0 === addr.WETH || token0 === addr.USDC)? token1 : token0;
      } else {
        //User input was NOT a uni pair, but it might have been an erc20 token address
        //so we can try using Factory.getPair(addrWETH, addrUserInput) to get the pair address
        const foundPair = await stxFns.factory_getPair(addrUserInput_sum);
        if (foundPair.address) {
          addr.wip_LpToken = foundPair.address;
          addr.wip_ERC20Token = addrUserInput_sum;
          currencyStr = foundPair.currency;
        } else {
          //warn user -> close search modal
          $llSearchModalSpinner.classList.add('hidden')
          $llSearchFailedNotice.classList.remove('hidden')
          console.log('input address was not a pair, nor was it an ERC20 that has a WETH or USDC pair (on Uniswap)')
          return; //exit
        }
      }

      // const getTokens = await Rest.get(`${SELF.apiUrl}getTokens`);
      // console.log(getTokens.message)
      // console.log(self)
      const isFTPToken = !!self.getTokens.some((v,i) => {
        return addr.wip_LpToken === v.uniswapV2Pair
      });

      // const getLock = await Rest.get(`${SELF.apiUrl}getLock?pair=${addr.wip_LpToken.toLowerCase()}`);
      let isReleasable = false, isLockable = false;
      const [ReleaseDate, PayoutAddress, StartingBalance] = await stxFns.ftpLiqLock_getLockedTokens(addr.wip_LpToken);
      const erc20TokenName = await stxFns.erc20Token_name(addr.wip_ERC20Token)
      const erc20TokenSymbol = await stxFns.erc20Token_symbol(addr.wip_ERC20Token)
      const denom = (currencyStr == "WETH")? 10**18 : 10**6;
      const currencyAddr = (currencyStr == "WETH")? addr.WETH : addr.USDC;
      $tokenName.innerHTML = `${erc20TokenName}`;
      $tokenPair.innerHTML = `${currencyStr}/${erc20TokenSymbol}`;
      $lockStatus.innerHTML = await(async() => {
        //Decide what to show for this pair token's lock status
        if (ReleaseDate === "0") {
          const lpToken_balOf_signer = await stxFns.lpToken_balanceOf(addr.signer);
          const lpToken_totalSupply = await stxFns.lpToken_totalSupply();
          if(lpToken_balOf_signer/lpToken_totalSupply >= 0.99) {
            isLockable = true;
            return `Able to be locked using the ${lpToken_balOf_signer/10**18} pair tokens held by the connected wallet.`;
          }else if(lpToken_balOf_signer > 0){
            return `You must hold 100% of the Keys in order to Lock.`;
          }else{
            return `Not locked through FTP Locker.`;
          }
        } else if (ReleaseDate*1000 > Date.now() || StartingBalance == 0) {
          //expires in future, display plainly
          const startingBal = StartingBalance/denom;
          const currentBal = await stxFns.erc20Token_balanceOf(currencyAddr ,addr.wip_LpToken)/denom;
          const percentLock = (startingBal>0)? startingBal.toFixed(2)/currentBal.toFixed(2) : 0;
          var _lockStr = `<span style="color:#cdd9e5">Initial Liquidity Locked:</span> <span style="color:white">${startingBal.toFixed(2)}</span> ${currencyStr} <span style="color:white">${parseInt(percentLock*100)}%</span> Locked until ${convertUnixTimestamp(ReleaseDate).slice(0,11)} <br><span style="color:#cdd9e5">Rug Proof Liquidity(Variable):</span> <span style="color:white">${(currentBal-startingBal).toFixed(2)}</span> ${currencyStr} <span style="color:white">${100-parseInt(percentLock*100)}%</span> Locked Forever`;
          if(StartingBalance == 0)
            _lockStr = `<span style="color:#cdd9e5">Rug Proof Liquidity:</span> <span style="color:white">${currentBal}</span> ${currencyStr} <span style="color:white">100%</span>`;
          return _lockStr;
        } else {
          //expired in past, display as warning
          isReleasable = true;
          return `Expired ${convertUnixTimestamp(ReleaseDate)}.`;
        }
      })();

      if(isReleasable){
        $releaseSettingsContainer.classList.remove('hidden');
      }
      if (isFTPToken) {
        /*
        for an FTP token, the assumption is that this was automatically
        locked and cannot be relocked through our platform.  For this, we show:
        label that says: Launched with FTP Deployer
        tokenName: FIFTYONEFIFTY
        tokenPair: WETH/FIFTY
        locked: yes/no (Determined by /getLock lockExpiry field)
        A lock button will not show for ftp tokens
        */
        $launchedWithFtpTag.classList.remove('hidden');
        $lockInfoContainer.classList.remove('hidden');
        $lockSettingsContainer.classList.add('hidden');
        $llSearchModalSpinner.classList.add('hidden');
      } /* end: ftpDeployed === true */
      else {
        /* NON FTP */
        /*
        if I search for a non-FTP token 0x10e4a463f2ace6e3836fe547e885993844299be6,
        show:
        tokenName: FLOKItoken
        tokenPair: WETH/FLOKI
        locked: yes/no
        -- Determined by whether or not the connected wallet has a balance of the pair tokens)
        -- If the connected wallet holds pair tokens, they will see the lock settings
        Lock settings: Payout address, Lock duration (dropdown with 1w, 1mo., 3mo., 6mo., 1y., forever)
        If forever option is chosen, set payout address to '0' address and lock duration to 5min.
        */
        if(isLockable){
          $lockSettingsContainer.classList.remove('hidden')
        }
        $launchedWithFtpTag.classList.add('hidden')
        $lockInfoContainer.classList.remove('hidden')
        $llSearchModalSpinner.classList.add('hidden')
      }
    }

    /** BIND EVENTS **/
    ['paste','input','onpaste','DOMCharacterDataModified','propertychange','keyup'].forEach((v)=>{
      this.__register_evt_listener__($llSearchInput, v, onAllActivity_llSearchInput);
    })
    function onAllActivity_llSearchInput(e){
      if(e.type==='paste'){_sleep(1);}
      $llSearchBtn.disabled = !ethers.utils.isAddress(e.currentTarget.value);
      // console.log(`isAddress?${ethers.utils.isAddress(e.currentTarget.value)}`)
      if(e.key==='Enter'){
        if(!$llSearchBtn.disabled){toggleSearchModal(true);}
      }
    }

    this.__register_evt_listener__($llSearchBtn, 'click',(e)=>{
      toggleSearchModal(true);
    });
    this.__register_evt_listener__($llSearchModalX, 'click',(e)=>{
      toggleSearchModal(false);});
    this.__register_evt_listener__($llSearchModalCloseBtn, 'click',(e)=>{
      toggleSearchModal(false);});

    this.__register_evt_listener__($inp_lockDuration, 'paste',validateLockSettings);
    this.__register_evt_listener__($inp_payoutAddress, 'paste',validateLockSettings);
    this.__register_evt_listener__($inp_lockDuration, 'keyup',validateLockSettings);
    this.__register_evt_listener__($inp_payoutAddress, 'keyup',validateLockSettings);
    function validateLockSettings(){
      const lockVal = $root.querySelector('#inp_lockDuration').value;
      const validLock = lockVal.trim().match(/^(forever|(\d+)([dwmy]))$/);
      if(validLock != null && ethers.utils.isAddress($inp_payoutAddress.value)){
        $btn_initLock.disabled = false;
      }else{
        $btn_initLock.disabled = true; }
    }
    function shorthandDurationToFutureEpochInSeconds(shortHandDuration){
      const timeMatch = shortHandDuration.trim().match(/^(forever|(\d+)([dwmy]))$/);
      if(timeMatch == null){
        return false;
      }else if(timeMatch[0]==='forever'){
        return MaxUint256;
      }else{
        const n = timeMatch[2];
        const unit = timeMatch[3];
        const duration = n*{
          d:86400, w:604800, m:2628000, y:31536000,
        }[unit];
        return (Math.floor((Date.now() / 1000) + duration)).toString();
      }
    }
    this.__register_evt_listener__($btn_initLock, 'click',async(e)=>{
      $lockSettingsSpinner.classList.remove('hidden');
      const lpToken_allowance = await stxFns.lpToken_allowance_for_FTPLiqLock();
      const lpToken_balOf_signer = await stxFns.lpToken_balanceOf(addr.signer);

      if(Number(lpToken_balOf_signer) > Number(lpToken_allowance)){
        await stxFns.lpToken_approve_FTPLocker(lpToken_balOf_signer);
      }
      //perform liquidity lock
      const payoutAddress = $root.querySelector('#inp_payoutAddress').value;
      const payoutAddress_sum = ethers.utils.getAddress(payoutAddress);
      const lockDurationShorthand = $root.querySelector('#inp_lockDuration').value;
      //releaseDate expects string of epoch as seconds (not ms)
      const setReleaseDate = shorthandDurationToFutureEpochInSeconds(lockDurationShorthand);
      await stxFns.ftpLiqLock_lockTokens(addr.wip_LpToken, setReleaseDate, payoutAddress_sum)
      .then(()=>{
        $lockSettingsSpinner.classList.add('hidden');
      })

    });
    this.__register_evt_listener__($btn_initRelease, 'click',async(e)=>{
      $releaseSettingsSpinner.classList.remove('hidden');

      await stxFns.ftpLiqLock_releaseTokens(addr.wip_LpToken)

      setTimeout(()=>{
        $releaseSettingsSpinner.classList.add('hidden');
      },1500)
    });
  }


  async __some_web3_thing__(_tokens, _parent) {
    let web3;
    if (typeof window.web3 !== 'undefined') {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  }


  async __draw_liq_table__(_tokens, _parent) {

    //---FETCH ALL DATA
    const getLocks = await Rest.get(`${this.apiUrl}getLocks`);

    //TODO: figure out why this approach does not work.
    // - issue: items from getLocks do not match any items from getTokens
    /*
        const getTokens = await Rest.get(`${apiUrl}getTokens`).catch((err)=>{console.log('getTokens ERR: ',err)});
        //filter for tokens with a pair
        let pairTokens = getLocks.message.map((v, i) => {
          if(i>9){return;}
          let matchedToken = getTokens.message.some((vv,ii)=>{return v.hash === vv.uniswapV2Pair})
          matchedToken.getLock = v;
          return matchedToken;
        });
    */

    let pairTokens = [];
    let promises = [];
    getLocks.message.slice(0, 10).forEach((v, i) => {
      // for each of the (first 10) getLocks results
      // call getTokens in single-mode and build pairTokens
      promises.push(new Promise((resolve) => {
          Rest.get(`${this.apiUrl}getTokens?search=${v.hash}`)
          .then((res)=>{
            res.message.getLock = v;
            pairTokens.push(res.message)
            resolve();
          })
        })
      );
    });

    //---DATA 100% FETCHED
    //---BUILD HTML
    Promise.all(promises)
    .then(() => {
      // build the table head
      let htmlStr =
      `<div id="liqlock-table">
        <div id="liqlock-table-body" class="h-scroll" style="max-height: 700px;">`;

      // build a tr for every token
      pairTokens.forEach((v, i) => {

        //tr header
        htmlStr +=
        `<div class="liqlock-row-container liqlock-${i}" style="height: 59px;">
          <div class="liqlock-tr liqlock-row-header nowrap">
            <p class="liqlock-td h-hidden">${v.name}</p>
            <p class="liqlock-td h-hidden">
        ${(()=>{
          //Decide what to show for the lock column of this token
          if (isNaN(v.getLock.lockExpiry)) {
            return `Lock Status Unknown`
          } else if(v.getLock.lockExpiry > Date.now()/1000){
            //expires in future, display plainly
            if(v.getLock.lockExpiry < Date.now()/1000 + 86400*7){
              //expires in future, display plainly
              return `<span class="liqlock-warning-text d-block">Expiring soon on: </span>
                      ${convertUnixTimestamp(v.getLock.lockExpiry)}`
            }
            return `<span class="liqlock-ok-text d-block">Expires on: </span>
                    ${convertUnixTimestamp(v.getLock.lockExpiry)}`
          } else {
            //expired in past, display as warning
            return `<span class="liqlock-warning-text d-block">Expired on: </span>
                    ${convertUnixTimestamp(v.getLock.lockExpiry)}`
          }
        })()}              
            </p>
          </div><!-- end .liqlock-row-header -->
        ${(()=>{
        //tr expandable content
        /*
          return
           `<div class="emptyMargin liqlock-row-content">
              <p class="subtext">About ${v.name}</p>
              <div class="form-container">
                <input class="input-1" placeholder="Payout Address"><br/>
                <input class="input-2" placeholder="Pair Address"><br/>
                <button class="btn-approve-lock" disabled>Approve Lock</button>
              </div>
            </div>`;
        */
        })()}              
          
        </div><!-- end .liqlock-row-container -->`;//end of each single & full tr

      });//end pairTokens.forEach()

      htmlStr += `</div>`;//end of each single & full tr
      const liqTableRoot = document.getElementById("liqLockTableRoot");
      liqTableRoot.innerHTML = htmlStr
      const liqSearch = document.getElementById("liqLockTableRoot");

      //---HTML 100% BUILT AND INSERTED TO DOM
      //---BIND EVENTS SPECIFIC TO THIS INSERTED HTML
      //we pass the root in just to reuse the dom lookup - it could also be placed on the class
      //this.__bind_events_liq_table__(liqTableRoot);

    })//end Promise.all().then()
  }

/*
  __bind_events_liq_table__(liqTableRoot){
    const liqLockBtns = liqTableRoot.querySelectorAll('.btn-lock-liquidity');
    //every liquidity lock button gets its own listener with the same dynamic callback
    liqLockBtns.forEach((v,i)=>{
      v.addEventListener('click',(e)=>{
        const clickedBtn = e.currentTarget;
        const parentRow = clickedBtn.parentElement.parentElement.parentElement;
        const trHeader = parentRow.querySelector('.liqlock-row-header')
        const trContent = parentRow.querySelector('.liqlock-row-content')
        const headerHeight = trHeader.scrollHeight;
        const contentHeight = trContent.scrollHeight;
        const totalHeight = parentRow.scrollHeight;
        const currentHeight = parentRow.offsetHeight;

        if (currentHeight !== totalHeight) {//expand
          parentRow.style.height = `${totalHeight}px`;
          trContent.scrollTo({behavior:'smooth',left:0})
        } else {//collapse
          parentRow.style.height = `${headerHeight}px`;
        }

      })
    })
  }
*/

  __init_liq_page_tabs__() {
    const $tabButtonLiqLocks = document.getElementById('tab-button-liqpage-liqlocks');
    const $tabButtonIloCards = document.getElementById('tab-button-liqpage-ilocards');
    const $containerLiqLocks = document.getElementById('container-liqpage-liqlocks');
    const $containerIloCards = document.getElementById('container-liqpage-ilocards');
    this.__register_evt_listener__($tabButtonLiqLocks, 'click', (e)=>{
      $tabButtonLiqLocks.classList.add('active');
      $containerLiqLocks.classList.remove('hidden');
      $tabButtonIloCards.classList.remove('active');
      $containerIloCards.classList.add('hidden');
    })
    this.__register_evt_listener__($tabButtonIloCards, 'click', (e)=>{
      $tabButtonIloCards.classList.add('active');
      $containerIloCards.classList.remove('hidden');
      $tabButtonLiqLocks.classList.remove('active');
      $containerLiqLocks.classList.add('hidden');
    })
    const $subTabButtons = document.querySelectorAll('.ilosubtab-button');
    const $subTabContainers = document.querySelectorAll('.ilosubtab-container');

    $subTabButtons.forEach(v=>this.__register_evt_listener__(v, 'click',(e)=>{
      let choice = Array.from(e.currentTarget.classList).filter(v=>['funding','inflight','launched'].includes(v))
      const active = document.querySelector('.ilosubtab-active.active');
      const inactive = active.parentNode.querySelector('.ilosubtab-inactive');
      inactive.classList.remove('hidden');
      active.classList.remove('active')
      active.classList.add('hidden')
      active.parentNode.parentNode.classList.remove('active');
      const newActive = document.querySelector(`.ilosubtab-button.${choice}>div>img.ilosubtab-active`);
      const newInactive = newActive.parentNode.querySelector('.ilosubtab-inactive');
      newInactive.classList.add('hidden');
      newActive.classList.add('active');
      newActive.classList.remove('hidden');
      newActive.parentNode.parentNode.classList.add('active');
      document.querySelector(`.ilosubtab-container.${choice}`).classList.remove('hidden')
      document.querySelectorAll(`.ilosubtab-container:not(.${choice})`).forEach(v=>v.classList.add('hidden'))
      document.getElementById('ilosubtab-progress').style.width = choice=='launched'?'100%':choice=='inflight'?'67%':'33%';
      document.getElementById('ilo-tab-header').textContent = choice == 'funding' ? 'FUNDING' : choice == 'inflight' ? 'COUNTDOWN' : 'LAUNCHED';
      document.getElementById('ilo-tab-description').textContent =
        choice == 'funding' ? 'These projects are in the funding phase.' :
        choice == 'inflight' ? 'These projects have finished the funding phase, and are getting ready to launch.' :
        'These projects have finished the funding phase, and are finally available to trade!';

      // handle scroll view changes
      const _container = document.querySelector(`.ilosubtab-container.${choice}`);
      const _children = _container.childNodes.length+1;
      if (_children*300 > _container.offsetWidth)
        _container.style.justifyContent = 'left';
      else
        _container.style.justifyContent = 'center';
    }))

  }

  async __load_card__(_clone, _token, _onLoad) {
    const _info1 = await stxFns.ilo_getListingInfo1(_token);
    const _info2 = await stxFns.ilo_getListingInfo2(_token);
    const _info3 = await stxFns.ilo_getListingInfo3(_token);
    _onLoad(_clone, _info1, _info2, _info3);
  }

  async __load_card_offline__(_clone, _token, _onLoad) {
    var _scope = false;
    var _goal = 0;
    var _progress = 0;
    var _participants = 0;
    var _recoveryThreshold = 0;
    const _resp = await Rest.get(`${this.apiUrl}getFundingStats?token=${_token}`);
    if (_resp.statusCode == 200) {
      _goal = _resp.message.fundGoal;
      _progress = _resp.message.fundProgress;
      _scope = _resp.message.scope;
      _participants = _resp.message.participants;
      _recoveryThreshold = _resp.message.recoveryThreshold;
    }
    _onLoad(_clone, [_scope, _goal, _progress, _participants, _recoveryThreshold]);
  }

  async __init_ilo_cards__() {
    this.__draw_faq__();
    this.__draw_stories__();
    this.__init_ilo_tc__();

    stx = require('../../components/stx');
    stxHelpers = await require('./stxHelpers.js')();
    addr = stxHelpers.addr;
    stxFns = stxHelpers.stxFns;

    const $subTabContainers = document.querySelectorAll('.ilosubtab-container');
    $subTabContainers.forEach(v=>v.innerHTML=
      `<div class='vacancy-msg'>
        <p class="text-center">New tokens are coming soon.</p>
        <p class="text-center">Practice staking by switching to Ropsten testnet.</p>
      </div>`
    )

    const iloCardTemplateString = require('./iloCardTemplate');

    const iloTokens = sortBy(this.getTokens.filter((v,i) => {
      return v.settings != null
        && v.settings.ilo != null
        && v.settings.ilo.json != null
        && v.settings.ilo.json.enabled
        ;
    }), o=>{
      return parseInt(o.creationDate)
    }).reverse();

    // const iloTokens = require('./mock_getTokens').default;
    let connected = this._shared.web3.wallet != undefined;

    iloTokens.forEach(function(v,i){

      let template = document.createElement('template');
      template.innerHTML = iloCardTemplateString;
      let clone = template.content;
      let cloneItem = clone.querySelector('.ilo-card');
      cloneItem.id = 'iloCard-'+v.id;
      const $iloName = clone.querySelector('.ilo-name');$iloName.textContent = v.name;
      const $iloSymbol = clone.querySelector('.ilo-symbol');$iloSymbol.textContent = v.symbol;
      const $fundBtnForecast = clone.querySelector('.ftp-ilo-fund-btn-forecast');
      const $fundBtnEstimate = clone.querySelector('.ftp-ilo-fund-btn-estimate');
      const $fundBtn = clone.querySelector('.ftp-ilo-fund-btn');
      const $detailsPopoverContainer = clone.querySelector('.ilo-details-popover');
      const $fundSlider = new ProgressSlider(clone.querySelector('.progress-slider'));
      const $fundPreset1 = clone.querySelector('.fund-preset-1');
      const $fundPreset2 = clone.querySelector('.fund-preset-2');
      const $fundPreset3 = clone.querySelector('.fund-preset-3');
      const $fundPreset4 = clone.querySelector('.fund-preset-4');
      const $fundInput = clone.querySelector('.ilo-fund-input');
      this.__register_evt_listener__($fundPreset1, 'click',()=>{
        cloneItem.querySelector('.ilo-fund-preset-btns').classList.add('hidden');
        cloneItem.querySelector('.ilo-fund-input-row').classList.remove('hidden');
      })
      this.__register_evt_listener__($fundPreset2, 'click',()=>{
        $fundSlider.value = 0.5;
      })
      this.__register_evt_listener__($fundPreset3, 'click',()=>{
        $fundSlider.value = 1;
      })
      this.__register_evt_listener__($fundPreset4, 'click',()=>{
        cloneItem.querySelector('.ilo-fund-preset-btns').classList.remove('hidden');
        cloneItem.querySelector('.ilo-fund-input-row').classList.add('hidden');
        $fundSlider.value = random(true);
      })

      const detailsPopover = new DetailsPopoverButton({
        // 'beforebegin|afterbegin|beforeend|afterend'
        btnInsert: [$fundBtn, 'afterend'],
        showBtn: false,
        popoverType: 'info'
      })

      // TODO: dynamically truncate token name based on width competition with symbol.
      // while(($iloName.offsetWidth+$iloSymbol.offsetWidth) > (clone.offsetWidth-30)){}
      // if(($iloName.offsetWidth+$iloSymbol.offsetWidth) > (clone.offsetWidth-30)){}
      // TODO: bg img
      if(v.settings.ilo.json.bgimg){
        clone.querySelector('article').style.background =
          `url('${v.settings.ilo.json.bgimg}') center / cover no-repeat`;
      }
      let blurb = "Additional description not available at this time."
      clone.querySelector('article>p').textContent = v.settings.general.json.description || blurb;
      if (v.uniswapV2Pair != '') {
        const _buyBtn = clone.querySelector('form>div.launched>div.ftp-ilo-fund-btn');
        clone.querySelector('.social-links>div.linkItem>a.chart').setAttribute('href',`https://www.dextools.io/app/ether/pair-explorer/${v.uniswapV2Pair}`);
        if (v.launched) {
          this.__register_evt_listener__(_buyBtn, 'click', ()=>{window.open(`https://app.uniswap.org/#/swap?exactField=input&exactAmount=0&use=v2&outputCurrency=${v.token}&inputCurrency=Eth`)});
          _buyBtn.classList.remove('hidden');
        }
      }
      clone.querySelector('.social-links>div.linkItem>a.contract').setAttribute('href',`https://${this._shared.web3.networkId==1?'':'ropsten.'}etherscan.io/address/${v.token}`);
      clone.querySelector('.social-links>div.linkItem>a.telegram').setAttribute('href',v.settings.social.json.telegram);
      clone.querySelector('.social-links>div.linkItem>a.twitter').setAttribute('href',v.settings.social.json.twitter);
      clone.querySelector('.social-links>div.linkItem>a.website').setAttribute('href',v.settings.social.json.website);
      clone.querySelector('.social-links>div.linkItem>a.whitepaper').setAttribute('href',v.settings.social.json.whitepaper);
      clone.querySelectorAll('.social-links>div.linkItem>a').forEach((v,i)=>{
        if(!v.getAttribute('href')||v.getAttribute('href').length <= 5){v.parentNode.classList.add('hidden');}
      })

      if (v.settings.antibot.json.enabled) {
        clone.querySelector('.ftp-services>div.linkItem>div.antibot').parentNode.classList.remove('hidden');
        clone.querySelector('.ftp-svc-label').classList.remove('hidden');
      }
      var _tax = parseFloat(v.settings.ethReflect.json.tax);
      if (v.settings.ethReflect.json.enabled) {
        const _link = clone.querySelector('.ftp-services>div.linkItem>div.ethreflect');
        _link.parentNode.classList.remove('hidden');
        _link.parentNode.querySelector('p').textContent = `ETH Reflect: ${_tax}%`;
        clone.querySelector('.ftp-svc-label').classList.remove('hidden');
      }
      _tax = parseFloat(v.settings.liquidityAdd.json.tax);
      if (v.settings.liquidityAdd.json.enabled) {
        const _link = clone.querySelector('.ftp-services>div.linkItem>div.lpadd');
        _link.parentNode.classList.remove('hidden');
        _link.parentNode.querySelector('p').textContent = `LP Add: ${_tax}%`;
        clone.querySelector('.ftp-svc-label').classList.remove('hidden');
      }
      _tax = parseFloat(v.settings.payroll.json.tax);
      if (_tax > 0) {
        const _link = clone.querySelector('.ftp-services>div.linkItem>div.payroll');
        _link.parentNode.classList.remove('hidden');
        _link.parentNode.querySelector('p').textContent = `Payroll: ${_tax}%`;
        clone.querySelector('.ftp-svc-label').classList.remove('hidden');
      }

      const _creationDate = new Date(parseInt(v.creationDate))
      const _owner = v.owner;
      const _listLabel = clone.querySelector('.ilo-listing-date');
      _listLabel.textContent = `LISTED: ${_creationDate.toLocaleDateString()}`;
      if (_owner != '') {
        createElement('span', '', 'link', _listLabel, ` by ${_owner.substring(0,3)}..${_owner.substring(_owner.length-4)}`,()=>{window.open(`https://etherscan.io/address/${v.owner}`)});
      }

      let destinationTab;
      if(!v.listedOnMarket && !v.launched){
        destinationTab='funding'
      }
      else if (v.listedOnMarket && !v.launched){
        destinationTab='inflight'
      }
      else if(v.launched){
        destinationTab='launched'
      }

      let container = document.querySelector(`.ilosubtab-container.${destinationTab}`);
      const vacancyMsg = container.querySelector('.vacancy-msg');
      if(!!vacancyMsg){
        vacancyMsg.remove();
      }

      const _children = container.childNodes.length+1;
      if (_children*300 > container.offsetWidth)
        container.style.justifyContent = 'left';
      else
        container.style.justifyContent = 'center';

      container.append(clone);

      // !! Only if desktop
      this.__register_evt_listener__(container, 'wheel', _evt => {
        _evt.preventDefault();
        container.scrollLeft += _evt.deltaX * 0.1;
        container.scrollLeft += _evt.deltaY * 0.1;
      });

      let maxContribution;
      if(!connected){
        this.__load_card_offline__(cloneItem, v.token, (_card, _data) => {
          const [_scope, _goal, _progress, _participants, _recoveryThreshold] = _data;
          _card.querySelector('.funding-goal-calc').textContent = `${_progress} / ${_goal} ETH`;
          const fundedPct = Math.floor((_progress / _goal)*100);
          setFtpProgbar(_card, fundedPct);
          const _lockLabel = lockLabel(v);
          _card.querySelector('.ilo-card>form>div.networkerror').classList.remove('hidden');
          _card.querySelector('.ftp-ilo-fund-btn').classList.add('disabled');
          _card.querySelector('.ftp-ilo-fund-btn').disabled=true;
          _card.querySelector('.progress-slider').classList.add('disabled');
          _card.querySelector('.lds-ellipsis').classList.add('hidden');
          _card.querySelector('.ilo-listing-scope').textContent = _scope ? 'Public' : 'Private';
          _card.querySelector('.ilo-card>form>div>div.recovery.stat>span').textContent = `${_lockLabel=='Forever'?0:_recoveryThreshold}%`;
          _card.querySelector('.ilo-card>form>div>div.lock.stat>span').textContent = _lockLabel;
          _card.querySelector('.ilo-card>form>div>div.participants.stat>span').textContent = _participants;
        })
      }
      else{
        this.__load_card__(cloneItem, v.token,
          function (_card, _info1, _info2, _info3) {
            const [
              _scope,
              _whitelisted,
              _launched,
              _fundGoal,
              _fundProgress
            ] = _info1;
            var [
              _maxContribution,
              _minContribution,
              _ethPerAlloc,
              _paidByStaker,
              _stakerAlloc
            ] = _info2;
            var [
              _participants,
              _recoveryThreshold
            ] = _info3;

            const _lockLabel = lockLabel(v);
            _recoveryThreshold = parseInt(parseInt(_recoveryThreshold)/100000*100);

            if (parseInt(_maxContribution) < parseInt(_minContribution)) {
              _minContribution = _maxContribution;
            }

            maxContribution = parseInt(_maxContribution);

            let sliderMin, sliderMax,sliderMaxAlt, sliderVal;
            const ethFundedSoFar = parseFloat((_fundProgress / (10**18)).toFixed(3));
            const ethFundingGoal = parseFloat((_fundGoal / (10**18)).toFixed(3));
            const ethFundsToGo = ethFundingGoal - ethFundedSoFar;
            const remainingPcts = ethFundsToGo / ethFundingGoal;
            //set progressbar
            _card.querySelector('.funding-goal-calc').textContent = `${ethFundedSoFar} / ${ethFundingGoal} ETH`;
            const fundedPct = Math.floor((ethFundedSoFar / ethFundingGoal)*100);
            setFtpProgbar(_card, fundedPct);

            _card.querySelector('.ilo-listing-scope').textContent = _scope ? 'Public' : 'Private';
            _card.querySelector('.ilo-card>form>div>div.recovery.stat>span').textContent = `${_lockLabel=='Forever'?0:_recoveryThreshold}%`;
            _card.querySelector('.ilo-card>form>div>div.lock.stat>span').textContent = _lockLabel;
            _card.querySelector('.ilo-card>form>div>div.participants.stat>span').textContent = _participants;

            if (destinationTab != 'funding') {
              _card.querySelector(`.ilo-card>form>div.${destinationTab}`).classList.remove('hidden');
            } else {
              if (remainingPcts < 0.001) {
                _card.querySelector('.ilo-card>form>div.fundingfinished').classList.remove('hidden');
              } else if (v.owner.toLowerCase() == this._shared.web3.wallet.toLowerCase()) {
                _card.querySelector('.ilo-card>form>div.userisowner').classList.remove('hidden');
              } else if (maxContribution < 1) {
                _card.querySelector(`.ilo-card>form>div.userfundedmax`).classList.remove('hidden')
              } else if (!_whitelisted && !_scope) {
                _card.querySelector(`.ilo-card>form>div.usernotwhitelisted`).classList.remove('hidden')
              } else if (maxContribution > 1) {
                _card.querySelector(`.ilo-card>form>div.${destinationTab}`).classList.remove('hidden');
              }
            }
            _card.querySelector('.lds-ellipsis').classList.add('hidden');

            /*
            assert the max contribution for XTOKEN is .6%, the total tax is 1.2%, and the total funding goal is 2 ETH
            therefor as .6% is 50% of the total tax, any contributor can only contribute "1 ETH for .6%"
            therefor when the slider is all the way to the right, the fund button will read "FUND XTOKEN 1 ETH for 0.6%"

            now assert that we are only .5 ETH to get to the goal
            therefor on slider max, the fund button will read "FUND XTOKEN .5 ETH for .3%"
            */

            //Q: “what’s the total tax rate?”
            const pctTotalILOTax = (_fundGoal / _ethPerAlloc) / 1000;
            const pctMaxCTBN = _maxContribution/999.8;
            //Q: “what pct of the total tax rate is the max possible contribution?”
            const maxCTBNAsPctOfTaxRate = (pctMaxCTBN / pctTotalILOTax) * 100;

            const ethMinCTBN = _fundGoal/(10**18)/1000;
            const ethMaxCTBN = (_fundGoal/(10**18)) * (maxCTBNAsPctOfTaxRate/100);
            sliderMin = 0;
            if(ethMaxCTBN < ethFundsToGo){
              sliderMax = ethMaxCTBN;
            }else{
              sliderMax = ethFundsToGo;
            }

            //give the slider an initial setting
            $fundSlider.value = 0;
            const isStakingPossible = (v.listedOnMarket !== true);
            if(!isStakingPossible){
              $fundBtn.classList.add('disabled');$fundBtn.disabled=true;
              $fundSlider.el.classList.add('disabled');
              $fundBtnForecast.textContent = `${v.symbol} is not listed on the market!`;
            }else if(ethFundsToGo<=0){
              $fundBtn.classList.add('disabled');
              $fundBtn.disabled=true;
              $fundSlider.el.classList.add('disabled');
              // $fundBtnForecast.textContent = `${v.symbol} has already reached its goal!`;
              // _card.querySelector('.ilo-card>form>div.funding').classList.add('hidden');
            }else{
              const mappedSliderVal = map(sliderMin, 0 , 100, sliderMin, sliderMax);
              const pctContribution = mapPctWhereGoalIsPct(sliderMin, ethFundingGoal, pctTotalILOTax);
              $fundBtnForecast.textContent = getFundBtnText(v.symbol, sliderMin, pctContribution);
              $fundBtnEstimate.textContent = getFundBtnEstimate(v.symbol,sliderMin,pctContribution);
              $fundSlider.onChange = (_pct)=>{
                const mappedSliderVal = map(_pct, 0 , 100, sliderMin, sliderMax);
                const pctContribution = mapPctWhereGoalIsPct(mappedSliderVal, ethFundingGoal, pctTotalILOTax);
                $fundBtnForecast.textContent = getFundBtnText(v.symbol, mappedSliderVal, pctContribution);
                $fundBtnEstimate.textContent = getFundBtnEstimate(v.symbol,sliderMin,pctContribution);
                $fundInput.value = parseFloat(mappedSliderVal);
              }

              this.__register_evt_listener__($fundInput, 'change', _e=>{
                const _minEth = sliderMin;
                const _maxEth = sliderMax;
                var _val = parseFloat($fundInput.value);
                _val = _val<_minEth?_minEth:_val>_maxEth?_maxEth:_val;
                $fundInput.value = _val;
                const _pct = (_val-_minEth)/(_maxEth-_minEth);
                // console.log(`min:${_minEth}, max:${_maxEth}, val:${_val}, pct:${_pct}`)
                $fundSlider.value = _pct;
              })

              /** PERFORM STAKE **/
              this.__register_evt_listener__($fundBtn, 'click', async (e)=>{
                detailsPopover.update({type: 'info', title:'Processing...', content:`The transaction is completing in the background.`})
                detailsPopover.showButton();
                const baseUrl = this.ethscanBaseUrl.tx;
                const sliderVal = $fundSlider.value;
                const mappedSliderVal = (map(sliderVal, 0 , 100, sliderMin, sliderMax)).toFixed(18);
                // console.log(`slider: ${sliderVal}% | min: ${sliderMin} | max: ${sliderMax} | mapped: ${mappedSliderVal}`)
                let howMuchGwei = ethers.utils.parseEther(mappedSliderVal.toString());
                let addrDestination = v.token;
                await stxFns.ilo_sendEth(howMuchGwei, addrDestination)
                .then((res)=>{
                  detailsPopover.update({type: 'success', title:'Success!',
                    content:`The transaction completed successfully.<br/><a href="${baseUrl}${res.transactionHash}" target="_blank">View on Etherscan</a>`
                  })
                })
                .catch((res)=>{
                  detailsPopover.update({type: 'error', title:'Transaction Reverted',
                    content:`The transaction reverted. Try again?<br/><a href="${baseUrl}${res.transactionHash}" target="_blank">View on Etherscan</a>`
                  })
                })
              });
            }

        }.bind(this))
      }

      if(i === iloTokens.length-1){
        //final iteration has finished
        const $vacancyMsgs = document.querySelectorAll('.vacancy-msg');
        $vacancyMsgs.forEach(v=>v.textContent='No listings found under this status at this time.');
      }
    }.bind(this));

    const lockLabel = (token) => {
      const _now = Date.now();
      const _lockMs = parseInt(token.settings.tokenomics.json.liqLockTimer)*24*3600*1000;
      const _fromMs = token.launchDate?parseInt(token.launchDate):_now;
      const _toMs = _fromMs + _lockMs;
      const _remaining = _toMs - _now;
      if (_remaining <= 0){
          return `0m`
      }
      const _days = parseInt(_remaining/1000/3600/24);
      const _hours = parseInt(_remaining/1000/3600);
      const _minutes = parseInt(_remaining/1000/60);

      if (_minutes < 60) {
        return `${_minutes}m`;
      } else if (_hours < 24) {
        const _h = parseFloat(_minutes/60).toFixed(1);
        return `${_h}h`;
      } else if (_days < 365) {
        return `${_days}d`;
      } else {
        const _years = parseFloat(_days/365.0).toFixed(1);
        if (_years > 100) {
          return `Forever`
        }
        return `${_years}y`;
      }
    }

    const map = (value, istart, istop, ostart, ostop)=>{
      // Converts n value from i range to o range
      return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    };
    function mapPctWhereGoalIsPct(val, goal, goalPct){
      return (val/goal) * goalPct;
    }
    function getFundBtnText(tokenSymbol, ethVal, pctContribution){
      return `Stake ${ethVal.toFixed(2)} ETH for ${pctContribution.toFixed(2)}%`
    }
    function getFundBtnEstimate(tokenSymbol, ethVal, pctContribution){
      return `$${parseInt(pctContribution/100*1000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} per $1m volume`
    }
    function setFtpProgbar($ancestor, pct){
      // const $polygon = $ancestor.querySelector('.svg-ftp-progbar>polygon');
      // let pts = `${pct} 4 0 4 0 0 ${pct<99?pct+2:(pct===99?pct+1:pct)} 0${(a=>pct===99?' 100 2':'')()}`;
      // $polygon.setAttribute('points',pts);
      const _bar = $ancestor.querySelector('.ilo-progressbar');
      if (_bar) {
        if (!pct || pct < 8)
          pct = 8;
        _bar.style.width = `${pct}%`;
      }
    }
  }

  async __draw_stories__() {
    const _stories = document.getElementById('iloStories');
    while (_stories.firstChild)
      _stories.removeChild(_stories.firstChild);
    const _parent = document.getElementById('iloStories');
    createStory({
      parent: _parent,
      title: 'Make a Coin In Crypto, the Easy Way',
      description: `Your coin can stand out from the noise by backing a physical business, 
      supporting a charity, or...`,
      background: 'https://public.fairtokenproject.com/articles/makeacoin.jpg',
      link: 'https://fairtokenproject.medium.com/make-a-coin-in-crypto-the-easy-way-e7721d9a3c12'
    })

    createStory({
      parent: _parent,
      title: 'FTP ILO is the Kickstarter of DeFi',
      description: `...like kickstarter, except funders immediately earn 
      as the business generates revenue...`,
      background: 'https://public.fairtokenproject.com/articles/kickstarterofcrypto.jpg',
      link: 'https://fairtokenproject.medium.com/49441e17dc44'
    })

    createStory({
      parent: _parent,
      title: 'The End of Bots in Crypto?',
      description: `...two most common bot types trading coins today are 
      pump-and-dump bots and scalping bots...`,
      background: 'https://public.fairtokenproject.com/articles/endofbots.jpg',
      link: 'https://fairtokenproject.medium.com/?p=dfce1c36e0a0'
    })
  }

  async __draw_faq__() {
    if (this._iloFaq)
      this._iloFaq.dispose();
    this._iloFaq = new DropdownListing({
      debug:false,
      parentId: 'iloFaq',
      headerPadding:24,
      headerNames: ['FREQUENTLY ASKED QUESTIONS FOR FTP ILO'],
    });
    const _faq = require('./faq.js');

    for (var i in _faq) {
      var _header = createElement('div', '', 'row nowrap relative emptyMargin');
      var _content = createElement('div', '' ,'emptyMargin dropdownListingContent');
      createElement('p', '', 'listing-col-md h-hidden', _header, _faq[i].q);
      for (var k in _faq[i].a)
        createElement('p', '', 'listing-col-md h-hidden', _content, _faq[i].a[k]);
      this._iloFaq.addElement({
          header:_header,
          content: _content
      });
    }
  }

  __init_ilo_tc__() {
    this.__register_evt_listener__(document.querySelector('.iloInquiry'), 'click', function() {
      infoPopup('FTP Terms and Conditions', `
          <p class="bold">Welcome to Fair Token Project</p>
          <p>Please read these terms and conditions (“terms and conditions”,
            “terms”) carefully before using fairtokenproject.com website
            (“website”, “service”, “tools”, “software”, “technology”) operated
            by Fair Token Project (“FTP”, “we”, “our”).
            </p>
          <p>Thank you for using our services/tools. We strive to create easy to
          digest information and simple yet effective tools to help you find
          better investments and/or create honest web3.0 companies.
          </p>
          <p>We are huge proponents of Web3.0 for the freedom and
          decentralization that comes along with it. As such we do not filter,
          vet, or even research any users of our technology. Investing in defi is
          inherently risky, Fair Token Project does not promote, advocate, or
          control any entities found on fairtokenproject.com unless explicitly
          stated otherwise. While we take many actions to limit malicious
          actors, there are still people out there who will do everything
          possible to scam you. Please make sure to research before you
          invest, even projects/companies found within fairtokenproject.com.</p>

          <p class="bold">Conditions of Use</p>
          <p>By using this website, you certify that you have read and reviewed
          these terms and that you agree to comply with these terms. Fair
          Token Project only grants use and access of its software and website
          to those who have agreed to our terms.</p>
          <p>By using this website you also agree that you will not use our
          software to lie to, cheat, manipulate, steal from, rob, scam, rug, or
          any other malicious act that dishonestly separates investors from
          their funds.</p>
          
          <p class="bold">Limitation of Liability</p>
          <p>The software found here is highly experimental and constantly
          evolving, FTP is not liable or responsible for any crypto currency
          gains or losses that may come from investing in users of our
          software. FTP does not store information, vet, or research any users
          of our software, as such FTP is not responsible for actions of users of
          our software.
          </p>
          
          <p class="bold">Privacy Policy</p>
          <p>We do not attain any information related to users of our service
          other than a wallet address. This wallet address is used to enable
          certain features for user control over entities made through our
          software. FTP will never ask for your personal information.</p>
          <p>Fair Token Project reserves the right to edit, change, or modify
          these terms at any time. These terms are an agreement
          between FTP and the user of its software.</p>
      `)
  }.bind(this));
  }

  __dispose__() {
    if (this._listeners) {
      for (var i in this._listeners) {
        const _l = this._listeners[i];
        _l.obj.removeEventListener(_l.evt, _l.func);
      }
    }

    if (this._iloFaq)
      this._iloFaq.dispose();

    const _stories = document.getElementById('iloStories');
    while (_stories.firstChild)
      _stories.removeChild(_stories.firstChild);

    const _fundingCards = document.querySelector('.ilosubtab-container.funding');
    const _inflightCards = document.querySelector('.ilosubtab-container.inflight');
    const _launchedCards = document.querySelector('.ilosubtab-container.launched');
    while (_fundingCards.firstChild)
      _fundingCards.removeChild(_fundingCards.firstChild);
    while (_inflightCards.firstChild)
      _inflightCards.removeChild(_inflightCards.firstChild);
    while (_launchedCards.firstChild)
      _launchedCards.removeChild(_launchedCards.firstChild);
  }

  //override for disposal
  __on_close__() {
    this._shared.web3.rmNetworkChange(this.__on_network_change__);
    this._shared.web3.rmWalletChange(this.__on_wallet_change__);
    this.__dispose__();
  }

  __on_network_change__(_networkName, _networkId, _wallet) {
    this.__on_wallet_change__(_networkName, _networkId, _wallet);
  }

  async __on_wallet_change__(_networkName, _networkId, _wallet) {
    if (this._loadingFromNetworkChange) return;
    this._loadingFromNetworkChange = true;
    this.__dispose__();
    if (window.location.href.includes('#locks')) {
      document.querySelector('#container-liqpage-ilocards').classList.add('hidden');
      document.querySelector('#tab-button-liqpage-ilocards').classList.remove('active');
      document.querySelector('#container-liqpage-liqlocks').classList.remove('hidden');
      document.querySelector('#tab-button-liqpage-liqlocks').classList.add('active');
    } else {
      document.querySelector('#container-liqpage-liqlocks').classList.add('hidden');
      document.querySelector('#tab-button-liqpage-liqlocks').classList.remove('active');
      document.querySelector('#container-liqpage-ilocards').classList.remove('hidden');
      document.querySelector('#tab-button-liqpage-ilocards').classList.add('active');
    }
    document.querySelector('.ilosubtab-container-parent>div.loader').classList.remove('hidden');
    await this.__set_getTokens__();
    this.__draw_liq_table__(this._newTokens, 'liqLockTableRoot').then();
    this.__init_liq_search__().then();
    this.__init_liq_page_tabs__();
    this.__init_ilo_cards__().then();
    document.querySelector('.ilosubtab-container-parent>div.loader').classList.add('hidden');
    this._loadingFromNetworkChange = false;
  }

  __register_evt_listener__(_obj, _evt, _func) {
    if (!this._listeners) {
      this._listeners = [];
    }
    _obj.addEventListener(_evt, _func);
    this._listeners.push({obj:_obj, evt:_evt, func:_func});
  }

}
module.exports = LiquidityWindow;
function _sleep(ms) {//usage: await _sleep(5000);
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Copy the Token or V2Pair to the clipboard and display a toast **/
function copyDataToClipboard(data) {
  navigator.clipboard.writeText(data).then(function() {
    var toast = document.getElementById("toast");
    toast.innerHTML = "Copied " + data + " to clipboard";
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
window.copyDataToClipboard = copyDataToClipboard;
