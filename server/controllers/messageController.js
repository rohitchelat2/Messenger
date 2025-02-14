import * as messageService from "../services/messageService.js"
import * as userService from "../services/userService.js"

import { getCookie } from  "@hono/hono/cookie";
import * as jwt from "@hono/hono/jwt"
let secret;
const COOKIE_KEY = "auth";

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }

const getMessages = async (c) => {

    //const body = await c.req.json();
    const token = getCookie(c, COOKIE_KEY);
    console.log(token);
    const jwtPayload = await jwt.verify(token, secret);
    
    console.log(jwtPayload.id);

    /*const userId = c.get("jwtPayload");
    const body = await c.req.json();
    const messages = await messageService.getMessages(userId, body.receiverId);*/
    return c.json({response: "Messages fetched"});
}

const storeMessage = async (senderID,receiverId, message) => {
   

        const messagePack = {
            id: crypto.randomUUID(),
            sender_id: senderID,
            receiver_id: receiverId,
            message: message,
          };

    const result = await messageService.storeMessage(messagePack);
    const recieverSocket = await userService.getSocket(receiverId);
    return {result, recieverSocket };}
 
export {getMessages,storeMessage}



/*const getTopics = async (c) => {
    
const topics = await contentService.getTopicsFromDb();
return c.json(topics)
};


const addTopic = async (c) => {
    const body = await c.req.json();
    if (!body.topic||body.topic.length<2){
        return c.json({error: "Minimum topic length is 3 characters"});
    }

    const user = c.get("jwtPayload");
    const topicExistCheck = await contentService.getTopicsFromDbbyTopic(body.topic);
    if (topicExistCheck.length>0){
        return c.json({error: "Topic already exist!"});
    }

    const id= crypto.randomUUID()
   await contentService.addTopicToDb(id, body.topic, user.id);
    return c.json({status:"Topic added succesfully"})
    };

const deleteTopic = async (c) => {
    const topicId = c.req.param("topicId");
    await contentService.deleteTopicFromDb(topicId);
    return c.json({status: "Topic deleted successfully"});
    
}

const deleteQuestion = async (c) => {
    const qId = c.req.param("qId");
    await contentService.deleteQuestionFromDb(qId);
    const questions = await getQuestions(c);
    return questions;
    
}



const addQuestion = async (c) => {
    const body = await c.req.json();
    const topicId = c.req.param("topicId");
    const user = c.get("jwtPayload");
    const qId= crypto.randomUUID()
    await contentService.addQuestionToDb(qId, body.questionText, user.id,topicId);
    for (let i = 1; i < Object.keys(body).length; i++) {
    const aId =crypto.randomUUID();
    let isCorrect = false;
    i===1?isCorrect= true:isCorrect = false;
    await contentService.addQuestionOptionsToDb(aId, qId,  body[Object.keys(body)[i]] , isCorrect);
    }
    const questions = await getQuestions(c)
    return questions
    };


const updateQuestion = async (c) => {
    const body = await c.req.json();
    await contentService.updateQuestion(body.question_text, body.id);
    return c.json({status: "Successful"});
    };

const deleteOption = async (c) => {
    const oId = c.req.param("oId");
    console.log(oId)
    await contentService.deleteOption(oId);
    return c.json({status: "Deleted"});
    };

const updateOption = async (c) => {
    const body = await c.req.json();
    await contentService.updateOption(body.option_text, body.id);
    return c.json({status: "Successful"});
    };

const addOption = async (c) => {
    const body = await c.req.json();
   const isCorrect = false;
    const aId =crypto.randomUUID();
    await contentService.addQuestionOptionsToDb(aId, body.qId,  body.option_text, isCorrect);
    return c.json({status: "Successful"});
    };
const getQuestions = async (c) => {
    const topicId = c.req.param("topicId");
    const questions = await contentService.getQuestionsFromDb(topicId)
    for(let i=0;i<questions.length;i++)
    {
        questions[i].options= await contentService.getOptionsFromDb(questions[i].id);
        delete questions[i].user_id
    }
        //= await questions.map(async (question)=> { question.options= await contentService.getQuestionsFromDb(question.id); return await question})
        return  c.json(questions)
    };

const logAnswer = async (c) =>{
    const topicId = c.req.param("topicId");
    const body = await c.req.json();
    const user = c.get("jwtPayload");
    const logId= crypto.randomUUID()
    await contentService.logAnserToDb(logId,user.id,topicId,body.question_id,body.id,body.is_correct);
    return c.json({status: "successful"})
    
}*/