import React, { useState } from 'react';
import { FormControl, FilledInput } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  postMessage,
  streamingTyping,
  postReadConfirm,
} from '../../store/utils/thunkCreators';

const styles = {
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
  },
};

const Input = (props) => {
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);

  let timer = '';

  const handleChange = (event) => {
    if (timer) clearTimeout(timer);
    setTyping(true);
    setText(event.target.value);

    sendTyping(event.target.value.length > 0, typing);
    timer = setTimeout(() => {
      sendTyping(false, typing);
      setTyping(false);
    }, 3000);
  };

  const sendTyping = (state, prevState = state.typing) => {
    if (props.conversationId) {
      if (!(prevState === state)) {
        props.streamingTyping({
          conversationId: props.conversationId,
          typing: state,
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = event.target.text.value;
    if (!text || text.lenght === 0) return;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text,
      recipientId: props.otherUser.id,
      conversationId: props.conversationId,
      sender: props.conversationId ? null : props.user,
    };
    sendTyping(false, true);
    await props.postMessage(reqBody);
    setTyping(false);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          disableUnderline
          placeholder='Type something...'
          value={text}
          name='text'
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
    streamingTyping: (payload) => {
      streamingTyping(payload);
    },
    postReadConfirm: (conversationId) => {
      dispatch(postReadConfirm({ conversationId }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
