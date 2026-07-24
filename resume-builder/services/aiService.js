const OpenAI = require('openai');

const getOpenAIInstance = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured in environment variables.');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
};

const generateSummary = async ({ jobTitle, skills, experience, education }) => {
  const openai = getOpenAIInstance();

  const prompt = `You are a professional resume writer. Write a compelling, professional, ATS-optimized summary (3-4 sentences) for a resume based on the following candidate background:
- Target Job Title: ${jobTitle || 'Professional'}
- Key Skills: ${skills || 'Not provided'}
- Work Experience Highlight: ${experience || 'Not provided'}
- Education: ${education || 'Not provided'}

Make it engaging, impactful, and written in the third person or strong first person without explicit pronouns. Return ONLY the summary text.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an expert resume consultant specializing in ATS-optimized summaries.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 250,
    temperature: 0.7
  });

  return completion.choices[0].message.content.trim();
};

const improveExperience = async ({ experience }) => {
  const openai = getOpenAIInstance();

  const prompt = `You are an expert career coach and resume strategist. Improve the following work experience entry into high-impact, professional action bullet points starting with strong action verbs. Use the STAR method (Situation, Task, Action, Result) wherever applicable.

Raw Work Experience:
${experience}

Return ONLY the polished bullet points.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a professional resume strategist.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 350,
    temperature: 0.7
  });

  return completion.choices[0].message.content.trim();
};

const generateSkillsSuggestion = async ({ jobRole }) => {
  const openai = getOpenAIInstance();

  const prompt = `You are an expert talent recruiter. Provide a comma-separated list of the top 12 most relevant technical and soft skills for a candidate applying for the role of: "${jobRole}".

Return ONLY the comma-separated list of skills, nothing else.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an executive technology recruiter.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 150,
    temperature: 0.6
  });

  return completion.choices[0].message.content.trim();
};

module.exports = {
  generateSummary,
  improveExperience,
  generateSkillsSuggestion
};
