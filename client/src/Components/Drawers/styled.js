import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0.5rem 1rem 0.5rem;
  align-items: center;
  justify-content: flex-start;
`;

export const HeadContainer = styled.div`
  display: flex;
  padding: 0.5rem 0rem;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const BackIconWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #42526e;
  transition: 150ms ease-in;
  &:hover {
    color: #091e42;
  }
`;

export const Title = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.1rem;
`;

export const CloseIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 150ms ease-in;
  cursor: pointer;
  color: #42526e;
  &:hover {
    color: #091e42;
  }
`;

export const Hr = styled.hr`
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3px;
`;

export const ContentWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
`;

export const ClickableIcon = styled.div`
  color: ${(props) => props.color};
  background-color: rgba(255, 255, 255, 0);
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: 150ms ease-in;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
