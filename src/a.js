intent('what', 'what', reply('this new.'));

const API_KEY = '37a26ad61cc34ea3b838da5d15abf482';
let savedArticles = [];

intent('Give me the news from $(source* (.*))', (p) => {
    let NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?apiKey=37a26ad61cc34ea3b838da5d15abf482';

    if (p.source.value) {
        NEWS_API_URL = '${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join(' - ')}';
    }

    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);

        if (!articles.length) {
            p.play('Sorry, please try searching for news from another source');
            return;
        }

        savedArticles = articles;

        p.play({ command: 'newHeadlines', articles });
        p.play('Here are the (latest|recent) ${p.source.value} news.');
    });
});