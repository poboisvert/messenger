const router = require('express').Router();
const { Conversation, Message } = require('../../db/models');
const onlineUsers = require('../../onlineUsers');
const { Op } = require('sequelize');

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

/**
 * {
 *    conversationId: 1,
 *    read: true
 * }
 */
router.patch('/read', async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401);

    const { conversationId } = req.body;
    if (!conversationId)
      return res.status(400).json({ message: 'conversationId is required' });

    const messages = await Message.update(
      { read: true },
      {
        where: {
          conversationId: {
            [Op.eq]: conversationId,
          },
          senderId: {
            [Op.not]: req.user.id,
          },
          read: {
            [Op.eq]: false,
          },
        },
        returning: true,
      }
    );
    const resDate = {
      conversationId,
      updatedMessages: messages[1].map((message) => ({
        id: message.id,
        createdAt: message.createdAt,
      })),
      updatedMessagesCount: messages[0],
    };
    res.status(200).json(resDate);
  } catch (error) {
    next(error);
  }
});

module.exports = router;