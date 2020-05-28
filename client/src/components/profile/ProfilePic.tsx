import React from "react";
import styled from "styled-components";

const TEMP_PROFILE_PIC =
	"https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg";

const ProfilePic = () => {
	return (
		<>
			<Wrapper>
				<img src={TEMP_PROFILE_PIC} alt="smiling man" />
			</Wrapper>
		</>
	);
};

export default ProfilePic;

const Wrapper = styled.div`
	border-radius: 50%;
	overflow: hidden;
	height: 10em;
	width: 10em;
	margin: 2em 0 0 0;
	box-shadow: var(--box-shadow);

	img {
		height: 10em;
		width: 10em;
		object-fit: cover;
		object-position: 50% 50%;
		transition: transform 1s cubic-bezier(0.68, -0.6, 0.32, 1.6);
		transform: rotate(0deg);

		:hover {
			transform: rotate(360deg);
		}
	}
`;
