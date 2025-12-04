import express from "express";
import Thread from "../Models/Thread.js";
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
router.delete("/thread/:id" , async(req , res)=> {
    const {id} = req.params
     try {
         const DeletedThread = Thread.findByIdAndDelete(id)
         if(!DeletedThread){
            res.status(404).json({err : "THread not found ..."})
         }
         res.status(200).json({err: "Successfully Deleted ..."})
     } catch (error) {
        console.log(error);
    res.status(500).json({ error: "Failed to Delete the Thread ..." });
     }
})

export default router;
