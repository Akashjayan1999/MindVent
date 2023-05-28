import chatModel from "../models/chatModel.js"

export const createChat = async (req, res) => {
  const newChat = new chatModel({
    members: [req.body.senderId, req.body.receiverId],
  })
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await chatModel.find({
      members: { $in: [req.params.userId] },
    }).sort({createdAt:-1});
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const findChat = async (req, res) => {
  try {
    const chat = await chatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });

    if (!chat) {
      const newChat = new chatModel({
        members: [req.params.firstId, req.params.secondId],
      });

      const savedChat = await newChat.save();
      res.status(200).json(savedChat);
    } else {
      res.status(200).json(chat);
    }
  } catch (error) {
    res.status(500).json(error);
  }
}; 


 