import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const HeaderSkeleton = (props: React.JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader 
    speed={2}
    width="100%" // Ajuste responsivo del ancho
    height={600}
    viewBox="0 0 400 600"
    backgroundColor="#c0c0c0"
    foregroundColor="#808080"
    {...props}
  >
    <rect x="502" y="13" rx="3" ry="3" width="48" height="6" /> 
    <rect x="44" y="56" rx="3" ry="3" width="52" height="6" /> 
    <rect x="440" y="13" rx="3" ry="3" width="48" height="6" /> 
    <rect x="45" y="45" rx="3" ry="3" width="48" height="6" /> 
    <circle cx="571" cy="16" r="8" /> 
    <rect x="161" y="17" rx="0" ry="0" width="101" height="81" /> 
    <rect x="424" y="164" rx="3" ry="3" width="100" height="23" /> 
    <rect x="46" y="34" rx="3" ry="3" width="48" height="6" /> 
    <circle cx="357" cy="51" r="33" />
  </ContentLoader>
);

export default HeaderSkeleton;
