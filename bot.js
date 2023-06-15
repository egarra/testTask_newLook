const TelegramBot = require("node-telegram-bot-api");
const schedule = require('node-schedule');

const messages = require("./messages");
const links = require("./links");
const remindBot = require("./remindBot");


const chatId = 451276544;
const token = "6014704152:AAGCqvu80etIWQwPZx0y-h3bk9gh0K7F_7g";

const bot = new TelegramBot(token, { polling: true });

const filePath = "./bonus.pdf";
bot.onText(/\/start/, () => {
  bot.sendVideo(chatId, links.firstCircle);
  bot.sendMessage(chatId, messages.startMessage, {
    reply_markup: {
      keyboard: [["Узнать о спикере"], ["Забрать бонус"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.onText(/Узнать о спикере/, () => {
  bot.sendMessage(chatId, messages.speakerMessage);
});

bot.onText(/Забрать бонус/, () => {
  bot.sendDocument(chatId, filePath);

  setTimeout(() => {
    bot.sendPhoto(chatId, "./imgs/access.png", {
      reply_markup: {
        keyboard: [["Открыть доступ"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }, 2 * 60 * 1000);
});

bot.onText(/Открыть доступ/, () => {
  bot.sendMessage(chatId, messages.accessMessage, {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Подписаться",
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.onText(/Подписаться/, () => {
  const joinLink = "https://t.me/+FbJp0w3_dHMwYzQy";

  bot.sendMessage(chatId, joinLink);

  const imgs = [
    { type: "photo", media: "./imgs/successPic1.png" },
    { type: "photo", media: "./imgs/successPic2.png" },
    { type: "photo", media: "./imgs/successPic3.png" },
    { type: "photo", media: "./imgs/successPic4.png" },
    { type: "photo", media: "./imgs/successPic5.png" },
  ];

  setTimeout(() => {
    bot.sendAudio(chatId, links.firstAudio);
    bot.sendMediaGroup(chatId, imgs);
    bot.sendMessage(
      chatId,
      messages.afterSubscribeMessage,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Да, хочу так же",
              },
            ],
          ],
        },
      },
      2 * 60 * 1000
    );
  });
});

bot.onText(/Да, хочу так же/, () => {
  bot.sendMessage(chatId, messages.dontMissMessage);

  setTimeout(() => {
    bot.sendPhoto(chatId, "./imgs/formParticipant.png");
    bot.sendMessage(chatId, messages.formParticipantMessage, {
      reply_markup: {
        keyboard: [["Давай"], ["Пропустить"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }, 2 * 60 * 1000);
});

bot.onText(/Давай/, () => {

  const question1 = "Ты уже изучал NFT и крипту ранее?";
  const options1 = [
    "1. Нет, впервые заинтересовала эта тема",
    "2. У меня есть общее представление, хотелось бы узнать больше",
    "3. Я уже работаю с NFT и зарабатываю, но хочу круче прокачать себя и повысить доход",
  ];

  bot.sendMessage(chatId, question1, {
    reply_markup: {
      keyboard: [options1],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.onText(
  /^(1\. Нет, впервые заинтересовала эта тема|2\. У меня есть общее представление, хотелось бы узнать больше|3\. Я уже работаю с NFT и зарабатываю, но хочу круче прокачать себя и повысить доход)$/,
  () => {
    const question2 = "Какая тема интересует тебя больше всего?";
    const options2 = [
      "Что такое NFT?",
      "Трейдинг",
      "Заработок на NFT играх",
      "Все перечисленное",
    ];

    bot.sendMessage(chatId, question2, {
        reply_markup: {
          keyboard: [options2],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
  }
);

bot.onText(/^(Что такое NFT\?|Трейдинг|Заработок на NFT играх|Все перечисленное)$/, () => {
    const question3 = "Что тебе еще интересно узнать про NFT?";
  
    bot.sendMessage(chatId, question3).then(() => {
      bot.sendMessage(chatId, messages.goodByeMessage, {
        reply_markup: {
          keyboard: [['Открыть бонус']],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    });
  });

  bot.onText(/Открыть бонус/, () => {
    const youTubeLink = 'https://youtu.be/wiDy6uPqcvw';
    bot.sendMessage(chatId, youTubeLink);
  });

  bot.onText(/Пропустить/, () => {
    bot.sendMessage(chatId, messages.missMessage)
  });


  remindBot({bot, chatId, links, messages, schedule});

