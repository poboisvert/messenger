import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
    maxWidth: '6rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  badge: {
    backgroundColor: '#3C91FF',
    color: '#fff',
    padding: '2px 0.4rem 2px',
    height: 'fit-content',
    borderRadius: '30px',
    position: 'absolute',
    right: '5%',
    top: '7px',
  },
  previewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadMessages, typing } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {typing ? <em>Typing...</em> : latestMessageText}
        </Typography>
      </Box>
      {unreadMessages > 0 && (
        <span className={classes.badge}>{unreadMessages}</span>
      )}
    </Box>
  );
};

export default ChatContent;
