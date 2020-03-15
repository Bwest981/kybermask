import React, { Component} from 'react'
import PropTypes from 'prop-types'
import AccountModalContainer from '../account-modal-container'
import genAccountLink from '../../../../../lib/account-link.js'
import QrView from '../../../ui/qr-code'
import EditableLabel from '../../../ui/editable-label'
import Button from '../../../ui/button'
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
web3.eth.getAccounts().then(console.log);

const iframeStyle = {
  height: '420px',
  width: '355px'
};

export default class TokenSwapsModal extends Component {
  static propTypes = {
    selectedIdentity: PropTypes.object,
    network: PropTypes.string,
    showExportPrivateKeyModal: PropTypes.func,
    setAccountLabel: PropTypes.func,
    keyrings: PropTypes.array,
    rpcPrefs: PropTypes.object,
  }


  static contextTypes = {
    t: PropTypes.func,
  }


  componentDidMount(){


    var addScript = document.createElement('script');
    addScript.setAttribute('async','https://widget.kyber.network/v0.7.5/widget.js');
    document.getElementsByTagName("showSwaps")[0].appendChild(addScript);

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://widget.kyber.network/v0.7.5/widget.css';
    document.head.appendChild(link);




  }


  render () {
    const {
      selectedIdentity,
      network,
      showExportPrivateKeyModal,
      setAccountLabel,
      keyrings,
      rpcPrefs,
    } = this.props
    const { name, address } = selectedIdentity

    const keyring = keyrings.find((kr) => {
      return kr.accounts.includes(address)
    })

    let exportPrivateKeyFeatureEnabled = true
    // This feature is disabled for hardware wallets
    ////62a4cc55f9c3c816da30efaebababf1a2a060efd79ac29619c757b055ce5f8d9

    //main net
    //0x0a0512D045F19606f516107CeaBAcB21DB6Ee232
    //9cf84a9e39bcf040da174854cc465bcd74f2388a9104b90e030d4017ba23d450
    if (keyring && keyring.type.search('Hardware') !== -1) {
      exportPrivateKeyFeatureEnabled = false
    }



    return (
      <AccountModalContainer>
        <EditableLabel
          className="account-modal__name"
          defaultValue={name}
          onSubmit={label => setAccountLabel(address, label)}
        />
        <div id="showSwaps">
          <iframe style={iframeStyle} src="https://widget.kyber.network/v0.7.5/?type=swap&mode=iframe&lang=en&callback=https%3A%2F%2Fkyberpay-sample.knstats.com%2Fcallback&paramForwarding=true&network=mainnet&theme=theme-emerald" className='kyber-widget-button theme-emerald theme-supported' name='KyberWidget - Powered by KyberNetwork' title='Pay with tokens' />
        </div>



      </AccountModalContainer>
    )
  }
}
