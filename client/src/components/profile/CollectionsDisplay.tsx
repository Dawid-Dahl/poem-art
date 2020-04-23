import React from "react";
import styled from "styled-components";
import Collection from "./Collection";

const collectionMock = [
	{
		collection_id: 4,
		name: "Cat Poems",
		poems: [{}, {}, {}],
		date_added: Date.now(),
		owner: 39,
	},
	{
		collection_id: 1,
		name: "Sad Poems",
		poems: [{}, {}, {}],
		date_added: Date.now(),
		owner: 39,
	},
	{
		collection_id: 8,
		name: "Inspiring Poems",
		poems: [{}, {}, {}],
		date_added: Date.now(),
		owner: 39,
	},
];

const CollectionsDisplay = () => {
	return (
		<>
			<Wrapper>
				{collectionMock.map(collection => (
					<Collection key={collection.collection_id} name={collection.name} />
				))}
			</Wrapper>
		</>
	);
};

export default CollectionsDisplay;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	background-color: lightgrey;
	width: 90%;
	border-radius: var(--border-radius);
`;
