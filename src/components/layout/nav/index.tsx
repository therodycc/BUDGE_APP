import { settings } from '../../../settings';

const Nav = () => {
  return <>
    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
      <ul className="navbar-nav ms-md-auto">
        <div className="card px-3">
          <div className="row justify-content-center align-items-center">

            {settings.navOptions.map((option, index) => (
              <>
                <div className="col-sm-auto col-4" key={`opt-${index}-id`}>
                  <div className='bg-dark rounded-circle shadow-sm border border-light text-center  cursor-pointer' style={{ width: "50px", height: "50px", lineHeight: "50px" }}>
                    <i className={`${option.icon}`}></i>
                  </div>
                </div>
              </>
            ))}


            <div className="ml-0 col-sm-auto col-8">
              <div className="">
                <h6 className="mb-0 font-weight-bolder text-secondary">
                  Richard Davis
                </h6>
                <p className="m-0 font-weight-normal text-sm text-secondary">
                  CEO / Co-Founder
                </p>
              </div>
            </div>
            <div className="col-sm-auto col-4">
              <div className="avatar avatar-xl position-relative">
                <img src="https://cooperativadepica.cl/wp-content/uploads/2018/07/avatar2.png" alt="bruce" className="w-70 rounded-circle shadow-sm border border-light" />
              </div>
            </div>

          </div>
        </div>

      </ul>
    </div>
  </>;
};

export default Nav;
