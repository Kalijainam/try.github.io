function sendSMS(medicineName) {
    const fromNumber = '+12545564586';
    const toNumber = '+918964924142';
    const message = `Reminder: Take ${medicineName}`;
  
    fetch('https://api.twilio.com/2010-04-01/Accounts/AC55ef14cd0241d915fbef9081a1a7ebb5/Messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('AC55ef14cd0241d915fbef9081a1a7ebb5:884ef6a177517e77fc0c94c672b3dca3')
      },
      body: new URLSearchParams({
        From: fromNumber,
        To: toNumber,
        Body: message
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Message has been sent!');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
  }
  
  function setReminder() {
    const medicineNameInput = document.getElementById('medicineName');
    const medicineName = medicineNameInput.value;
  
    const reminderTimeInput = document.getElementById('reminderTime');
    const reminderTimeValue = reminderTimeInput.value;
  
    const now = new Date();
    const reminderTime = new Date(now.toDateString() + ' ' + reminderTimeValue);
  
    const timeDifference = reminderTime.getTime() - now.getTime();
  
    if (timeDifference < 0) {
      console.error('Invalid reminder time');
      return;
    }
  
    setTimeout(() => sendSMS(medicineName), timeDifference);
  }
  