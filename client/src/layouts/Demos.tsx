

//components
import DemoTemplate from "../components/DemoTemplate";
import {
  homePages,
  shopPages,
  usersAccounts,
  vendorAccounts,
} from "../components/DemosArray";

//css
import "../css/Demos.css";

const Demos = () => {
  return (
    <>
      <section id="demos">
        <div className="demo-content">
          <ul
            className="nav nav-pills justify-content-center pt-5 mb-5"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item pt-2" role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Home Pages
              </button>
            </li>
            <li className="nav-item pt-2" role="presentation">
              <button
                className="nav-link"
                id="pills-pages-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-pages"
                type="button"
                role="tab"
                aria-controls="pills-pages"
                aria-selected="false"
              >
                Shop Pages
              </button>
            </li>
            <li className="nav-item pt-2" role="presentation">
              <button
                className="nav-link"
                id="pills-user-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-user"
                type="button"
                role="tab"
                aria-controls="pills-user"
                aria-selected="false"
              >
                User Account
              </button>
            </li>
            <li className="nav-item pt-2" role="presentation">
              <button
                className="nav-link"
                id="pills-vendor-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-vendor"
                type="button"
                role="tab"
                aria-controls="pills-vendor"
                aria-selected="false"
              >
                Vendor Account
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex={0}
            >
              <DemoTemplate demos={homePages} />
            </div>
            <div
              className="tab-pane fade"
              id="pills-pages"
              role="tabpanel"
              aria-labelledby="pills-pages-tab"
              tabIndex={0}
            >
              <DemoTemplate demos={shopPages} />
            </div>
            <div
              className="tab-pane fade"
              id="pills-user"
              role="tabpanel"
              aria-labelledby="pills-user-tab"
              tabIndex={0}
            >
              <DemoTemplate demos={usersAccounts} />
            </div>
            <div
              className="tab-pane fade"
              id="pills-vendor"
              role="tabpanel"
              aria-labelledby="pills-vendor-tab"
              tabIndex={0}
            >
              <DemoTemplate demos={vendorAccounts} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Demos;
