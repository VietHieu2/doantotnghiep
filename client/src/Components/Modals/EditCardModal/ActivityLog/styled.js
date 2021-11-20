import styled from 'styled-components';
import { CommonButton } from '../CommonStyles';

export const Container = styled.div`
	margin-left: 1rem;
	display: flex;
	flex-direction: row;
	gap: 1rem;
`;

export const LeftContainer = styled.div`
	padding-top: 0.3rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const Avatar = styled.div`
	background-color: green;
	font-size: 0.85rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: 600;
	height: 1.5rem;
	width: 1.5rem;
`;

export const RightContainer = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
`;

export const LogWrapper = styled.div`
	display: block;
	padding-top: 0.5rem;
	font-size: 0.875rem;
	word-wrap: break-word;
	width: 100%;
`;

export const Title = styled.div`
	margin: 0;
	padding: 0.45rem 0rem 0rem 0rem;
	display: inline;
	color: black;
	font-size: 0.8755rem;
	font-weight: 800;
`;

export const Date = styled.div`
	font-size: 0.75rem;
	color: #5e6c84;
`;
