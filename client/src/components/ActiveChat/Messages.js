import React from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, lastReadMessageId } = props;
  React.useEffect(() => {
    const startReadFrom = document.getElementById(
      `message-focus-${lastReadMessageId}`
    );
    if (startReadFrom) {
      console.log('scrolling into view');
      startReadFrom.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            otherUser={otherUser}
            text={message.text}
            id={message.createdAt}
            time={time}
            lastReadMessageId={lastReadMessageId}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
