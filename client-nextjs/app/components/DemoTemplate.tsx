
//packages
import React from "react";
import Link from "next/link";
import Image from "next/image";
//css
import "@/css/DemoTemplate.css"

//type
import { DemoTemplateProps } from "@/app/types/props";


const DemoTemplate: React.FC<DemoTemplateProps> = ({ demos }) => {

  //create a new array 'editName' where hyphens are replaced with spaces
  const editName = demos.names.map((name) => name.replace(/-/g, " "));

  return (
    <>
      <div className="demo-template">
        {demos.images.map((image: string, index: number) => (
          <Link
            href={`${demos.names[index]}/`}
            key={index}
            className="demo-box"
          >
            <Image src={image} alt={`Demo image ${index + 1}`} width={500} height={500}  />
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
