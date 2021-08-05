import React from 'react';
import successIcon from '../images/success.png';
import failIcon from '../images/fail.png';

function InfoTooltip({infoTooltipState, onClose}) {


  return (
    <section className={`popup popup_type_info-tooltip ${infoTooltipState && "popup_opened"}`} >
        <div className="popup__container popup__container_type_info-tooltip">
            <img src={infoTooltipState?.success ? successIcon : failIcon} alt={infoTooltipState?.success ? 'Успешно!' : 'Не удалось!'} className="popup__image popup__image_type_info-tooltip"></img>
            <h2 className="popup__caption popup__caption_type_info-tooltip">{infoTooltipState?.text}</h2>
          <button className="popup__close-icon popup__close-icon_type_image" type="button" onClick={onClose} ></button>
        </div>
    </section>
  );
}

export default InfoTooltip;