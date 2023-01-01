import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  SectionContainer,
  MemberSectionContainer,
  MemberInfoContainer,
  SectionHeaderContainer,
  DescriptionSectionContainer,
  MemberEmail,
  IconWrapper,
  SectionTitle,
  MemberName,
  DescriptionInput,
  HiddenText,
} from "./styled";
import MemberIcon from "@mui/icons-material/PersonOutlineOutlined";
import DescriptionIcon from "@mui/icons-material/TextSnippetOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BottomButtonGroup from "../../../Pages/BoardPage/BoardComponents/BottomButtonGroup/BottomButtonGroup";
import {
  boardDescriptionUpdate,
  memberDelete,
} from "../../../../Services/boardService";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
const AboutMenu = () => {
  const textAreaRef = useRef();
  const hiddenTextRef = useRef();
  const descriptionAreaRef = useRef();
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const boardId = useSelector((state) => state.board.id);
  const [description, setDescription] = useState(board.description);
  const [textareaFocus, setTextareaFocus] = useState(false);
  const userId = useSelector((state) => state.user.userInfo._id);
  const userOwnerId = board.members.filter(
    (member) => member.role === "owner"
  )[0]?.user;
  const checkRole = userId === userOwnerId;
  const [open, setOpen] = useState(null);
  const hanldeOpen = Boolean(open);
  const [userDelete, setUserDelete] = useState(null);
  const handleClickOpen = (email) => {
    setUserDelete(email);
    console.log(email);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserDelete(null);
  };

  const onChangeHandler = function (e) {
    const target = e.target;
    setDescription(target.value);
    textAreaRef.current.style.height = "5.5rem";
    textAreaRef.current.style.height = `${target.scrollHeight}px`;
  };
  const handleSaveClick = () => {
    setTextareaFocus(false);
    boardDescriptionUpdate(board.id, description, dispatch);
  };

  const handleClickOutside = (e) => {
    if (descriptionAreaRef.current)
      if (!descriptionAreaRef.current.contains(e.target)) {
        setTextareaFocus(false);
        setDescription(board.description);
      }
  };

  const handleKickUser = async (e, email) => {
    e.preventDefault();
    setOpen(false);
    await memberDelete(boardId, userDelete, dispatch);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <Container>
      <SectionContainer>
        <SectionHeaderContainer>
          <IconWrapper>
            <MemberIcon fontSize="inherit" />
          </IconWrapper>
          <SectionTitle>Board Admins</SectionTitle>
        </SectionHeaderContainer>
        {board.members
          .filter((member) => member.role === "owner")
          .map((member) => {
            return (
              <MemberSectionContainer key={member.email}>
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    bgcolor: member.color,
                    fontWeight: "800",
                  }}
                >
                  {member.name[0].toUpperCase()}
                </Avatar>
                <MemberInfoContainer>
                  <MemberName>{`${member.name.replace(
                    /^./,
                    member.name[0].toUpperCase()
                  )} ${member.surname.toUpperCase()}`}</MemberName>
                  <MemberEmail>{member.email}</MemberEmail>
                </MemberInfoContainer>
              </MemberSectionContainer>
            );
          })}
      </SectionContainer>
      <SectionContainer>
        <SectionHeaderContainer>
          <IconWrapper>
            <DescriptionIcon fontSize="inherit" />
          </IconWrapper>
          <SectionTitle>Description</SectionTitle>
        </SectionHeaderContainer>
        <DescriptionSectionContainer ref={descriptionAreaRef}>
          <DescriptionInput
            ref={textAreaRef}
            onChange={onChangeHandler}
            value={description}
            onFocus={() => setTextareaFocus(true)}
            textHeight={
              hiddenTextRef.current
                ? hiddenTextRef.current.scrollHeight
                : "1rem"
            }
            focused={textareaFocus}
            placeholder="It’s your board’s time to shine! Let people know what this board is used for and what they can expect to see."
          />
          {textareaFocus && (
            <BottomButtonGroup
              title="Save"
              clickCallback={handleSaveClick}
              closeCallback={() => setTextareaFocus(false)}
            />
          )}
        </DescriptionSectionContainer>
      </SectionContainer>
      <HiddenText ref={hiddenTextRef}>{description}</HiddenText>
      <SectionContainer>
        <SectionHeaderContainer>
          <IconWrapper>
            <PeopleOutlineIcon fontSize="inherit" />
          </IconWrapper>
          <SectionTitle>List Members</SectionTitle>
        </SectionHeaderContainer>
        {board.members
          .filter((member) => member.role === "member")
          .map((member) => {
            return (
              <MemberSectionContainer key={member.email}>
                <Avatar
                  sx={{
                    width: "2rem",
                    height: "2rem",
                    bgcolor: member.color,
                    fontWeight: "800",
                  }}
                >
                  {member.name[0].toUpperCase()}
                </Avatar>
                <MemberInfoContainer>
                  <MemberName>{`${member.name.replace(
                    /^./,
                    member.name[0].toUpperCase()
                  )} ${member.surname.toUpperCase()}`}</MemberName>
                  <MemberEmail>{member.email}</MemberEmail>
                </MemberInfoContainer>
                {checkRole && (
                  <>
                    <PersonRemoveIcon
                      onClick={() => handleClickOpen(member.email)}
                      size="small"
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                    <Dialog
                      open={hanldeOpen}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Confirm Remove"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure to kick this person out of the project?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleClose}
                          sx={{
                            bgcolor: "#F0F0F0",
                            color: "#000",
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={(e) => handleKickUser(e, member.email)}
                          autoFocus
                          sx={{
                            bgcolor: "#DC3545",
                            color: "#FFFFFF",
                          }}
                        >
                          Yes, Remove
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                )}
              </MemberSectionContainer>
            );
          })}
      </SectionContainer>
    </Container>
  );
};

export default AboutMenu;
