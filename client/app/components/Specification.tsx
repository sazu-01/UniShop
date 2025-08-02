

import React from 'react';
import "@/css/Specification.css";

interface SpecificationItem {
    key : string,
    value : string,
}

interface SpecificationProps {
    specification : SpecificationItem[]
}

export default function Specification({specification} : SpecificationProps) {

if (!specification || specification.length === 0) return null;
    
  return (
    <div id="specification-container">
      <h3 className="specification-heading">Specifications</h3>
      <table className="specification-table">
        <tbody>
          {specification.map((item, index) => (
            <tr key={index}>
              <td className="spec-key">{item.key}</td>
              <td className="spec-value">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
