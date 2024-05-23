
//packages
import React from "react";
import { Link } from "react-router-dom";

//css
import "../css/DemoTemplate.css";

//type
import { DemoTemplateProps } from "../types/props";


const DemoTemplate: React.FC<DemoTemplateProps> = ({ demos }) => {

  //create a new array 'editName' where hyphens are replaced with spaces
  const editName = demos.names.map((name) => name.replace(/-/g, " "));

  return (
    <>
      <div className="demo-template">
        {demos.images.map((image: string, index: number) => (
          <Link
            to={`${demos.names[index]}/`}
            key={index}
            className="demo-box"
          >
            <img src={image} alt={`Demo image ${index + 1}`} />
            <button className="demo-button">
              <p>{editName[index]}</p>
            </button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DemoTemplate;
