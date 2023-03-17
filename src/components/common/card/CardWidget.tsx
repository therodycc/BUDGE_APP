import { faChevronDown, faGear, faHandHoldingUsd, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { CardWidgetI } from '../../../interfaces/common/card/card.interface';
import Button from '../button';

const CardWidget = ({ title, description, toggleEnabled, item, handleDelete, handleUpdate }: CardWidgetI) => {
  return <div className='mb-2'>
    <div className="card">
      <div className="card-body p-3">
        <div className="row">
          <div className="col-4 d-flex align-items-center">
            <div
              className={`rounded-circle text-white text-center bg-success me-3 icon-rounded`}
            >
              <FontAwesomeIcon className='cursor-pointer' icon={faHandHoldingUsd} />
            </div>
            <FontAwesomeIcon icon={faChevronDown} style={{
              cursor: "pointer"
            }} />
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
    {item?.showOptions &&
      <div className="px-3 bg-light d-flex py-3 ">
        <Button
          action={() => { handleDelete(item) }}
          bgClass={'danger'} type={'button'} loading={false}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
        <Button
          action={() => { handleUpdate() }}
          bgClass={'warning'} type={'button'} loading={false}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </Button>
      </div>
    }
  </div>;
};

export default CardWidget;
