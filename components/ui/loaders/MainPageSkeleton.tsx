import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

// Define la interfaz para los props, extendiendo de IContentLoaderProps para incluir los props del componente ContentLoader
const MainPageSkeleton = (
	props: React.JSX.IntrinsicAttributes & IContentLoaderProps
) => (
	<ContentLoader
		speed={2}
		width="100%"
		height={600}
		viewBox="0 0 400 600"
		backgroundColor="#c0c0c0"
		foregroundColor="#808080"
		{...props}
	>
		<rect x="440" y="13" rx="3" ry="3" width="48" height="6" />
		<rect x="45" y="45" rx="3" ry="3" width="48" height="6" />
		<rect x="54" y="167" rx="3" ry="3" width="167" height="6" />
		<rect x="55" y="185" rx="3" ry="3" width="279" height="6" />
		<rect x="112" y="217" rx="3" ry="3" width="194" height="56" />
		<rect x="92" y="330" rx="3" ry="3" width="231" height="110" />
		<rect x="161" y="17" rx="0" ry="0" width="101" height="81" />
		<rect x="424" y="164" rx="3" ry="3" width="100" height="23" />
		<rect x="46" y="34" rx="3" ry="3" width="48" height="6" />
		<rect x="92" y="455" rx="3" ry="3" width="231" height="110" />
	</ContentLoader>
);

export default MainPageSkeleton;
