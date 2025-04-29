
import twilio from 'twilio';
import { askQuestion, resetConversation } from './services/aiService.js';

const VoiceResponse = twilio.twiml.VoiceResponse;

export default async function (req, res) {
  const twiml = new VoiceResponse();
  const speechResult = req.body.SpeechResult;
  const callStatus = req.body.CallStatus;

  if (callStatus && (callStatus === 'completed' || callStatus === 'no-answer')) {
    resetConversation();
  }

  if (!speechResult) {
    const gather = twiml.gather({
      input: 'speech',
      action: '/twilioWebhook',
      method: 'POST',
      timeout: 5,
      speechTimeout: 'auto'
    });
    gather.say('Hello! This is your AI assistant. Please ask your question after the beep.');
    twiml.say('We did not receive any input. Goodbye.');
  } else {
    try {
      const aiResponse = await askQuestion(speechResult);
      twiml.say(aiResponse);
    } catch (error) {
      console.error('AI service error:', error);
      twiml.say('Sorry, an error occurred while processing your request.');
    }
    twiml.hangup();
  }

  res.type('text/xml');
  res.send(twiml.toString());
}
