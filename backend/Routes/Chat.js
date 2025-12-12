import express from "express";
import Thread from "../Models/Thread.js";
import { Content } from "openai/resources/containers/files/content.js";
import { responseByAI } from "../Utils/GenAI.js";
import mongoose from "mongoose";
const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    const thred = new Thread({
      threadId: "xyz",
      title: "Testing New THread",
    });

    const res = thred.save();
    res.send(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Store in DB" });
  }
});

// Get all Thread
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to Fetch the Threads ..." });
  }
});

// Get the Specific Thread based on ID
router.get("/thread/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const Chat = await Thread.findById(id)
    if (!Chat){
        res.status(404).json({err : "Thread is not found ...."})
    }
    res.json(Chat.messages)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to Fetch the Chat ..." });
  }
});

// Delete the Thread 
router.delete("/thread/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cleanId = typeof id === "string" && id.startsWith(":") ? id.slice(1) : id;

    let deleted = null;
    if (mongoose.Types.ObjectId.isValid(cleanId)) {
      deleted = await Thread.findByIdAndDelete(cleanId);
    } else {
      deleted = await Thread.findOneAndDelete({ threadId: cleanId });
    }

    if (!deleted) return res.status(404).json({ err: "Thread not found" });
    return res.status(200).json({ ok: "Successfully Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to Delete the Thread" });
  }
});

router.post("/chat" , async(req , res )=> {
   const {threadId , message} = req.body
  //  console.log("ID: " , threadId , "Prompt: ", message)

   if(!threadId || !message){
    return  res.status(500).json({err: "missing required fields"})
   }
   try {
    let threadd = await Thread.findOne({threadId})
    if(!threadd){
      //  Create a NEW thread
        threadd = new Thread({
        threadId,
        title: message,
        messages: [{
          role: "user",
          content: message
        }]
      })
    }else{
      threadd.messages.push({
        role: "user",
        content: message
      })
    }
    const assistentReply = await responseByAI(message)
    console.log("assistant reply: " , assistentReply);
    
    threadd.messages.push({
      role: "assistant",
      content: assistentReply
    })
    threadd.updatedAt = new Date();
    await threadd.save()

    res.json({Reply : assistentReply})
   } catch (error) {
    console.log(error)
    res.status(500).json({err : "Something went Wrong!!"})
   }
})

export default router;
