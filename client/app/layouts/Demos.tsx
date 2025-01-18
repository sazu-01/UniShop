
//packages
import { useState } from "react";

//components
import DemoTemplate from "@/app/components/DemoTemplate";
import {
  homePages,
  shopPages,
  usersAccounts,
  vendorAccounts,
} from "@/app/components/DemosArray";

//bootstrap component
import { Nav } from "react-bootstrap";

//css
import "@/css/Demos.css";

const Demos = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <>
      <section id="demos">
        <div className="demo-content">

          <Nav className="justify-content-center pt-5 mb-5" variant="pills">
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'home'}
                onClick={() => handleTabClick('home')}
              >
                Home Pages
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'shop'}
                onClick={() => handleTabClick('shop')}
              >
                Shop Pages
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'user'}
                onClick={() => handleTabClick('user')}
              >
                User Account
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'vendor'}
                onClick={() => handleTabClick('vendor')}
              >
                Vendor Account
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <div className="tab-content" id="pills-tabContent">
            {activeTab === 'home' && (
              <div className="tab-pane fade show active">
                <DemoTemplate demos={homePages}   />
              </div>
            )}
            {activeTab === 'shop' && (
              <div className="tab-pane fade show active">
                <DemoTemplate demos={shopPages}   />
              </div>
            )}
            {activeTab === 'user' && (
              <div className="tab-pane fade show active">
                <DemoTemplate demos={usersAccounts}  />
              </div>
            )}
            {activeTab === 'vendor' && (
              <div className="tab-pane fade show active">
                <DemoTemplate demos={vendorAccounts}  />
              </div>
            )}
          </div>
        </div>
      </section>



    </>
  );
};

export default Demos;
