const TelegramBot = require("node-telegram-bot-api");
const messages = require("./messages");
const circles = require("./links");

const token = "6014704152:AAGCqvu80etIWQwPZx0y-h3bk9gh0K7F_7g";
const bot = new TelegramBot(token, { polling: true });

const filePath = "./bonus.pdf";
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendVideo(chatId, circles.firstCircle);
  bot.sendMessage(chatId, messages.startMessage, {
    reply_markup: {
      keyboard: [["Узнать о спикере"], ["Забрать бонус"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.onText(/Узнать о спикере/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, messages.speakerMessage);
});

bot.onText(/Забрать бонус/, (msg) => {
  const chatId = msg.chat.id;
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

bot.onText(/Открыть доступ/, (msg) => {
  const chatId = msg.chat.id;
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

bot.onText(/Подписаться/, (msg) => {
  const chatId = msg.chat.id;
  const joinLink = "https://t.me/+FbJp0w3_dHMwYzQy";

  bot.sendMessage(chatId, joinLink);

  const imgs = [
    { type: "photo", media: "./imgs/successPic1.png" },
    { type: "photo", media: "./imgs/successPic2.png" },
    { type: "photo", media: "./imgs/successPic3.png" },
    { type: "photo", media: "./imgs/successPic4.png" },
    { type: "photo", media: "./imgs/successPic5.png" },
  ];
  const audio =
    "https://drive.google.com/uc?export=download&id=1jPaGTyZ9mBjiGdlgBmc_qRi3CHWlTgkh";

  setTimeout(() => {
    bot.sendAudio(chatId, audio);
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

bot.onText(/Да, хочу так же/, (msg) => {
  const chatId = msg.chat.id;
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

bot.onText(/Давай/, (msg) => {
  const chatId = msg.chat.id;

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
  (msg) => {
    const chatId = msg.chat.id;

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

bot.onText(/^(Что такое NFT\?|Трейдинг|Заработок на NFT играх|Все перечисленное)$/, (msg) => {
    const chatId = msg.chat.id;
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

  bot.onText(/Открыть бонус/, (msg) => {
    const chatId = msg.chat.id;

    const youTubeLink = 'https://youtu.be/wiDy6uPqcvw';
    
    bot.sendMessage(chatId, youTubeLink);
  });

  bot.onText(/Пропустить/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, messages.missMessage)
  })