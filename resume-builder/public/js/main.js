document.addEventListener('DOMContentLoaded', () => {
  const btnAiSummary = document.getElementById('btn-ai-summary');
  const btnAiSkills = document.getElementById('btn-ai-skills');
  const btnAiExperience = document.getElementById('btn-ai-experience');
  const aiAlert = document.getElementById('ai-alert');

  const showAlert = (message, type = 'error') => {
    if (!aiAlert) return;
    aiAlert.className = `alert alert-${type}`;
    aiAlert.innerHTML = `<span>${message}</span>`;
    aiAlert.style.display = 'flex';
    aiAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const hideAlert = () => {
    if (!aiAlert) return;
    aiAlert.style.display = 'none';
  };

  // Helper for AI button loading state
  const setLoadingState = (button, isLoading, originalText) => {
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = originalText;
      button.innerHTML = `<span class="spinner"></span> Generating...`;
    } else {
      button.disabled = false;
      button.innerHTML = button.dataset.originalText || originalText;
    }
  };

  // Generate Summary Event
  if (btnAiSummary) {
    btnAiSummary.addEventListener('click', async () => {
      hideAlert();
      const jobTitle = document.getElementById('title')?.value || '';
      const skills = document.getElementById('skills')?.value || '';
      const experience = document.getElementById('experience')?.value || '';
      const education = document.getElementById('education')?.value || '';

      if (!jobTitle && !skills && !experience) {
        showAlert('Please enter at least a Resume Title, Skills, or Experience to help AI generate a summary.');
        return;
      }

      setLoadingState(btnAiSummary, true, '✨ Generate with AI');

      try {
        const response = await fetch('/ai/generate-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobTitle, skills, experience, education })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to generate AI summary.');
        }

        const summaryField = document.getElementById('summary');
        if (summaryField) {
          summaryField.value = data.result;
          showAlert('AI Summary generated successfully!', 'success');
        }
      } catch (err) {
        showAlert(err.message || 'An error occurred while generating AI summary.');
      } finally {
        setLoadingState(btnAiSummary, false, '✨ Generate with AI');
      }
    });
  }

  // Suggest Skills Event
  if (btnAiSkills) {
    btnAiSkills.addEventListener('click', async () => {
      hideAlert();
      const jobRole = document.getElementById('title')?.value || '';

      if (!jobRole) {
        showAlert('Please enter a Resume Title / Job Role first to suggest skills.');
        return;
      }

      setLoadingState(btnAiSkills, true, '✨ Suggest Skills');

      try {
        const response = await fetch('/ai/generate-skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobRole })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to suggest skills.');
        }

        const skillsField = document.getElementById('skills');
        if (skillsField) {
          skillsField.value = data.result;
          showAlert('AI Skills suggested successfully!', 'success');
        }
      } catch (err) {
        showAlert(err.message || 'An error occurred while suggesting skills.');
      } finally {
        setLoadingState(btnAiSkills, false, '✨ Suggest Skills');
      }
    });
  }

  // Improve Experience Event
  if (btnAiExperience) {
    btnAiExperience.addEventListener('click', async () => {
      hideAlert();
      const experienceField = document.getElementById('experience');
      const experience = experienceField?.value || '';

      if (!experience.trim()) {
        showAlert('Please enter your work experience text first so AI can improve it.');
        return;
      }

      setLoadingState(btnAiExperience, true, '✨ Improve with AI');

      try {
        const response = await fetch('/ai/improve-experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ experience })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to improve experience.');
        }

        if (experienceField) {
          experienceField.value = data.result;
          showAlert('Work experience improved with AI bullet points!', 'success');
        }
      } catch (err) {
        showAlert(err.message || 'An error occurred while improving experience.');
      } finally {
        setLoadingState(btnAiExperience, false, '✨ Improve with AI');
      }
    });
  }
});
