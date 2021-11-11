import React from 'react';
import { ItsyPage } from "@itsy-ui/app-native";
import { ItsyContainer } from "@itsy-ui/layout-native";

const PageWrapper = (props: any) => {
	const { pageId } = props;

	return <ItsyContainer style={{ backgroundColor: "white", height: "100%" }}>
		<ItsyPage schema={{ pageId, queryParams: { ...props } }} />
	</ItsyContainer>
}

export default PageWrapper;