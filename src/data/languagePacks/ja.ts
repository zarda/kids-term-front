import type { LanguagePackData } from '../../types/language.types'

const japanesePack: LanguagePackData = {
  id: 'en-ja',
  words: [
    // Greetings
    { id: 'ja-1', term: 'こんにちは', definition: 'Hello', pronunciation: 'kon-ni-chi-wa', examples: ['こんにちは、元気ですか?'], category: 'greetings', difficulty: 'beginner' },
    { id: 'ja-2', term: 'おはようございます', definition: 'Good morning', pronunciation: 'o-ha-yō go-zai-mas', examples: ['おはようございます、先生。'], category: 'greetings', difficulty: 'beginner' },
    { id: 'ja-3', term: 'おやすみなさい', definition: 'Good night', pronunciation: 'o-ya-su-mi-na-sai', examples: ['おやすみなさい、また明日。'], category: 'greetings', difficulty: 'beginner' },
    { id: 'ja-4', term: 'さようなら', definition: 'Goodbye', pronunciation: 'sa-yō-na-ra', examples: ['さようなら、また会いましょう。'], category: 'greetings', difficulty: 'beginner' },
    { id: 'ja-5', term: 'ありがとう', definition: 'Thank you', pronunciation: 'a-ri-ga-tō', examples: ['ありがとうございます！'], category: 'greetings', difficulty: 'beginner' },
    { id: 'ja-6', term: 'すみません', definition: 'Excuse me/Sorry', pronunciation: 'su-mi-ma-sen', examples: ['すみません、トイレはどこですか?'], category: 'greetings', difficulty: 'beginner' },
    // Food
    { id: 'ja-7', term: '水', definition: 'Water', pronunciation: 'mi-zu', examples: ['水をください。'], category: 'food', difficulty: 'beginner' },
    { id: 'ja-8', term: 'ご飯', definition: 'Rice/Meal', pronunciation: 'go-han', examples: ['ご飯を食べます。'], category: 'food', difficulty: 'beginner' },
    { id: 'ja-9', term: 'りんご', definition: 'Apple', pronunciation: 'rin-go', examples: ['りんごは赤いです。'], category: 'food', difficulty: 'beginner' },
    { id: 'ja-10', term: 'お茶', definition: 'Tea', pronunciation: 'o-cha', examples: ['お茶をどうぞ。'], category: 'food', difficulty: 'beginner' },
    { id: 'ja-11', term: '寿司', definition: 'Sushi', pronunciation: 'su-shi', examples: ['寿司が好きです。'], category: 'food', difficulty: 'beginner' },
    { id: 'ja-12', term: 'ラーメン', definition: 'Ramen', pronunciation: 'rā-men', examples: ['ラーメンを食べたい。'], category: 'food', difficulty: 'beginner' },
    // Travel
    { id: 'ja-13', term: '空港', definition: 'Airport', pronunciation: 'kū-kō', examples: ['空港まで遠いです。'], category: 'travel', difficulty: 'intermediate' },
    { id: 'ja-14', term: 'ホテル', definition: 'Hotel', pronunciation: 'ho-te-ru', examples: ['ホテルはどこですか?'], category: 'travel', difficulty: 'beginner' },
    { id: 'ja-15', term: '駅', definition: 'Station', pronunciation: 'e-ki', examples: ['駅はあそこです。'], category: 'travel', difficulty: 'beginner' },
    { id: 'ja-16', term: '切符', definition: 'Ticket', pronunciation: 'kip-pu', examples: ['切符を買いました。'], category: 'travel', difficulty: 'intermediate' },
    // Numbers
    { id: 'ja-17', term: '一', definition: 'One', pronunciation: 'i-chi', examples: ['一つください。'], category: 'numbers', difficulty: 'beginner' },
    { id: 'ja-18', term: '二', definition: 'Two', pronunciation: 'ni', examples: ['二人です。'], category: 'numbers', difficulty: 'beginner' },
    { id: 'ja-19', term: '三', definition: 'Three', pronunciation: 'san', examples: ['三時です。'], category: 'numbers', difficulty: 'beginner' },
    { id: 'ja-20', term: '十', definition: 'Ten', pronunciation: 'jū', examples: ['十歳です。'], category: 'numbers', difficulty: 'beginner' },
    // Daily
    { id: 'ja-21', term: '家', definition: 'House/Home', pronunciation: 'i-e / u-chi', examples: ['家に帰ります。'], category: 'daily', difficulty: 'beginner' },
    { id: 'ja-22', term: '仕事', definition: 'Work', pronunciation: 'shi-go-to', examples: ['仕事に行きます。'], category: 'daily', difficulty: 'beginner' },
    { id: 'ja-23', term: '家族', definition: 'Family', pronunciation: 'ka-zo-ku', examples: ['家族は大切です。'], category: 'daily', difficulty: 'beginner' },
    { id: 'ja-24', term: '友達', definition: 'Friend', pronunciation: 'to-mo-da-chi', examples: ['彼は私の友達です。'], category: 'daily', difficulty: 'beginner' },
    { id: 'ja-25', term: '今日', definition: 'Today', pronunciation: 'kyō', examples: ['今日は月曜日です。'], category: 'time', difficulty: 'beginner' },
  ],
}

export default japanesePack
