import React from "react";
import styled from "styled-components";

const TEMP_PROFILE_PIC =
	"https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg";

type Props = {
	size: number;
	isAnimating?: boolean;
};

const ProfilePic: React.FC<Props> = ({size, isAnimating}) => {
	return (
		<>
			<Wrapper size={size} isAnimating={isAnimating}>
				<img src={TEMP_PROFILE_PIC} alt="smiling man" />
			</Wrapper>
		</>
	);
};

export default ProfilePic;

const Wrapper = styled.div<Props>`
	border-radius: 50%;
	overflow: hidden;
	height: ${props => `${props.size}em`};
	width: ${props => `${props.size}em`};
	margin: 0;
	box-shadow: var(--box-shadow);

	img {
		height: inherit;
		width: inherit;
		object-fit: cover;
		object-position: 50% 50%;
		transition: transform 1s cubic-bezier(0.68, -0.6, 0.32, 1.6);

		:hover {
			transform: ${props => props.isAnimating && "rotate(360deg);"};
		}
	}
`;
