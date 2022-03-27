import React from 'react';
import { CardWidgetI } from '../../../interfaces/common/card/card.interface';

const CardWidget = ({ title, description, toggleEnabled, item }: CardWidgetI) => {
  return <>
    <div className="card mb-3">
      <div className="card-body p-3">
        <div className="row">
          <div className="col-4">
            <div className="icon icon-lg icon-shape bg-gradient-success shadow text-center border-radius-md">
              <i className="fas fa-hand-holding-usd"></i>
            </div>
          </div>
          <div className="col-6 my-auto text-end">
            <p className="text-sm mb-0 opacity-7">{title}</p>
            <h5 className="font-weight-bolder mb-0">
              {description}
            </h5>
          </div>
          <div className="col-2 my-auto p-0">
            <div className="form-check form-switch ms-2 my-auto is-filled">
              <input
                className="form-check-input"
                type="checkbox"
                onClick={() => { toggleEnabled() }}
                defaultChecked={item && item.active}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default CardWidget;
