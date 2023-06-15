function remindBot({ bot, chatId, links, messages, schedule }) {
    let userAttendedLive = false;
  
    const connectBtn = {
      keyboard: [["Подключиться"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    };
  
    function sendScheduledMessage(type, file, options = {}) {
      switch (type) {
        case "message":
          bot.sendMessage(chatId, file, options);
          break;
        case "video":
          bot.sendVideo(chatId, file);
          break;
        case "image":
          bot.sendPhoto(chatId, file);
          break;
        case "audio":
          bot.sendAudio(chatId, file);
          break;
        default:
          break;
      }
    }
  
    function scheduleJobsForLiveWebinar() {
      schedule.scheduleJob("0 12 * * *", () => {
        sendScheduledMessage("video", links.fourthCircle);
        sendScheduledMessage("video", links.fifthCircle);
        sendScheduledMessage("video", links.sixthCircle);
        sendScheduledMessage("video", links.seventhCircle);
        sendScheduledMessage("message", messages.questionsMessage, {
          reply_markup: {
            keyboard: [["Задать вопрос"], ["Забрать место на курсе"]],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      });
  
      schedule.scheduleJob("00 14 * * *", () => {
        sendScheduledMessage("image", "./imgs/priceGrowth.png");
        sendScheduledMessage("message", messages.priceGrowthMessage, {
          reply_markup: {
            keyboard: [["Забронировать место"], ["Написать менеджеру"]],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      });
  
      schedule.scheduleJob("45 21 * * *", () => {
        sendScheduledMessage("message", messages.lastMessage, {
          reply_markup: {
            keyboard: [["Забронировать место"], ["Написать менеджеру"]],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      });
    }
  
    function scheduleJobsForNonLiveWebinar() {
      schedule.scheduleJob("0 14 * * *", () => {
        sendScheduledMessage("audio", links.secondAudio);
        sendScheduledMessage("image", "./imgs/ihorCase.png");
        sendScheduledMessage("message", messages.ihorCaseMessage);
      });
  
      schedule.scheduleJob("0 18 * * *", () => {
        sendScheduledMessage("image", "./imgs/1hour.png");
        sendScheduledMessage("message", messages.repeatInOneHourMessage);
      });
    }
  
    schedule.scheduleJob("0 10 * * *", () => {
      sendScheduledMessage("message", messages.repeatMessage);
    });
  
    schedule.scheduleJob("50 18 * * *", () => {
      sendScheduledMessage("image", "./imgs/10mts.png");
      sendScheduledMessage("message", messages.repeatAlmostStartMessage, {
        reply_markup: connectBtn,
      });
    });
  
    schedule.scheduleJob("0 19 * * *", () => {
      sendScheduledMessage("image", "./imgs/live.png");
      sendScheduledMessage("message", messages.repeatFirstLiveMessage, {
        reply_markup: connectBtn,
      });
    });
  
    schedule.scheduleJob("15 19 * * *", () => {
      sendScheduledMessage("image", "./imgs/x3.png");
      sendScheduledMessage("message", messages.repeatSecondLiveMessage, {
        reply_markup: connectBtn,
      });
    });
  
    schedule.scheduleJob("0 20 * * *", () => {
      sendScheduledMessage("image", "./imgs/7steps.png");
      sendScheduledMessage("message", messages.repeatThirdLiveMessage, {
        reply_markup: connectBtn,
      });
    });
  
    schedule.scheduleJob("20 20 * * *", () => {
      sendScheduledMessage("image", "./imgs/airdrop.png");
      sendScheduledMessage("message", messages.fourthLiveMessage, {
        reply_markup: connectBtn,
      });
    });
  
    bot.onText(/Подключиться/, () => {
      userAttendedLive = true;
    });
  
    if (userAttendedLive) {
      scheduleJobsForLiveWebinar();
    } else {
      scheduleJobsForNonLiveWebinar();
    }
  }
  
  module.exports = remindBot;
  