import React, { useEffect, useState } from "react";
import * as style from "./styled";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as common from "../../CommonStyled";
import { useDispatch, useSelector } from "react-redux";
import { boardTitleUpdate } from "../../../../../Services/boardsService";
import RightDrawer from "../../../../Drawers/RightDrawer/RightDrawer";
import BasePopover from "../../../../Modals/EditCardModal/ReUsableComponents/BasePopover";
import InviteMembers from "../../../../Modals/EditCardModal/Popovers/InviteMembers/InviteMembers";
import { Avatar } from "@mui/material";

const TopBar = () => {
  const board = useSelector((state) => state.board);
  const [currentTitle, setCurrentTitle] = useState(board.title);
  const [showDrawer, setShowDrawer] = useState(false);
  const [invitePopover, setInvitePopover] = React.useState(null);
  const dispatch = useDispatch();
  const members = useSelector((state) => state.board.members);
  const userId = useSelector((state) => state.user.userInfo._id);
  useEffect(() => {
    if (!board.loading) setCurrentTitle(board.title);
  }, [board.loading, board.title]);
  const handleTitleChange = () => {
    boardTitleUpdate(currentTitle, board.id, dispatch);
  };
  const userOwnerId = board.members.filter(
    (member) => member.role === "owner"
  )[0]?.user;
  const checkRole = userId === userOwnerId;
  console.log(board);
  return (
    <style.TopBar>
      <style.LeftWrapper>
        {checkRole && (
          <style.InviteButton
            onClick={(event) => setInvitePopover(event.currentTarget)}
          >
            <PersonAddAltIcon />
            <style.TextSpan>Add Member</style.TextSpan>
          </style.InviteButton>
        )}

        {invitePopover && (
          <BasePopover
            anchorElement={invitePopover}
            closeCallback={() => {
              setInvitePopover(null);
            }}
            title="Invite Members"
            contents={
              <InviteMembers
                closeCallback={() => {
                  setInvitePopover(null);
                }}
              />
            }
          />
        )}
        <>
          {checkRole && (
            <>
              <style.BoardNameInput
                placeholder="Board Name"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                onBlur={handleTitleChange}
              />
            </>
          )}
        </>

        <>{!checkRole && <common.Button>{currentTitle}</common.Button>}</>
      </style.LeftWrapper>

      <style.RightWrapper>
        <>
          {members.map((member, index) => (
            <Avatar
              key={index}
              sx={{
                width: 28,
                height: 28,
                bgcolor: member.color,
                fontSize: "0.875rem",
                fontWeight: "800",
                marginRight: "4px",
              }}
            >
              {member.name[0].toUpperCase()}
            </Avatar>
          ))}
        </>

        <common.Button
          onClick={() => {
            setShowDrawer(true);
          }}
        >
          <MoreHorizIcon />
          <style.TextSpan>Show menu</style.TextSpan>
        </common.Button>
      </style.RightWrapper>
      <RightDrawer
        show={showDrawer}
        closeCallback={() => {
          setShowDrawer(false);
        }}
      />
    </style.TopBar>
  );
};

export default TopBar;
