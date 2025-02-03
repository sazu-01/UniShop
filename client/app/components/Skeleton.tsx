
'use client';
import React from "react";
import "@/css/Skeleton.css";

interface SkeletonProps {
  width?:string;
  height?: string;
  className?: string
}


const Skeleton : React.FC<SkeletonProps> = ({width, height, className}) => {
  return (
     <div 
      className={`skeleton ${className}`}
      style={{width : width || '100%', height: height || ""}}
     />
  )
}

export default Skeleton;
