import React from 'react';
import './install-component.scss';

const InstallComponent = (props) => {
    const handleInstallClick = props.handleInstallClick ? props.handleInstallClick : function(){};
    const handleDismiss = props.handleDismiss ? props.handleDismiss : function() {};

    return (
        <div className="install-container">
            <div>Would you like to add Mark's Weather App to your home screen?</div>
            <button className="button link" onClick={handleInstallClick}>Absolutely!</button>
            <button className="button link" onClick={handleDismiss}>Nah</button>
        </div>
    )
}

export default InstallComponent;
