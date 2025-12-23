import type { LanguagePackData } from '../../types/language.types'

const chineseToJapanesePack: LanguagePackData = {
  id: 'zh-ja',
  words: [
    // Animals 動物
    { id: 'zh-ja-1', term: 'いぬ', definition: '狗', pronunciation: 'i-nu', examples: ['いぬがすきです。'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-ja-2', term: 'ねこ', definition: '貓', pronunciation: 'ne-ko', examples: ['ねこはかわいいです。'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-ja-3', term: 'とり', definition: '鳥', pronunciation: 'to-ri', examples: ['とりがとんでいます。'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-ja-4', term: 'さかな', definition: '魚', pronunciation: 'sa-ka-na', examples: ['さかながおよいでいます。'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-ja-5', term: 'うさぎ', definition: '兔子', pronunciation: 'u-sa-gi', examples: ['うさぎがぴょんぴょん。'], category: 'animals', difficulty: 'beginner' },
    // Colors 顏色
    { id: 'zh-ja-6', term: 'あか', definition: '紅色', pronunciation: 'a-ka', examples: ['りんごはあかいです。'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-ja-7', term: 'あお', definition: '藍色', pronunciation: 'a-o', examples: ['そらはあおいです。'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-ja-8', term: 'みどり', definition: '綠色', pronunciation: 'mi-do-ri', examples: ['くさはみどりです。'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-ja-9', term: 'きいろ', definition: '黃色', pronunciation: 'ki-i-ro', examples: ['バナナはきいろです。'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-ja-10', term: 'ピンク', definition: '粉紅色', pronunciation: 'pin-ku', examples: ['ピンクがすきです。'], category: 'colors', difficulty: 'beginner' },
    // Numbers 數字
    { id: 'zh-ja-11', term: 'いち', definition: '一', pronunciation: 'i-chi', examples: ['いちにんです。'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-ja-12', term: 'に', definition: '二', pronunciation: 'ni', examples: ['てがにほんあります。'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-ja-13', term: 'さん', definition: '三', pronunciation: 'san', examples: ['さんにんのともだち。'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-ja-14', term: 'よん', definition: '四', pronunciation: 'yon', examples: ['いぬはあしがよんほん。'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-ja-15', term: 'ご', definition: '五', pronunciation: 'go', examples: ['ゆびがごほんあります。'], category: 'numbers', difficulty: 'beginner' },
    // Family 家人
    { id: 'zh-ja-16', term: 'おかあさん', definition: '媽媽', pronunciation: 'o-ka-a-san', examples: ['おかあさんだいすき。'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-ja-17', term: 'おとうさん', definition: '爸爸', pronunciation: 'o-to-u-san', examples: ['おとうさんはせがたかい。'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-ja-18', term: 'おにいさん', definition: '哥哥', pronunciation: 'o-ni-i-san', examples: ['おにいさんとあそびます。'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-ja-19', term: 'おねえさん', definition: '姊姊', pronunciation: 'o-ne-e-san', examples: ['おねえさんはやさしい。'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-ja-20', term: 'おばあちゃん', definition: '奶奶/外婆', pronunciation: 'o-ba-a-chan', examples: ['おばあちゃんのいえにいく。'], category: 'family', difficulty: 'beginner' },
    // Food 食物
    { id: 'zh-ja-21', term: 'りんご', definition: '蘋果', pronunciation: 'rin-go', examples: ['りんごをたべます。'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-ja-22', term: 'バナナ', definition: '香蕉', pronunciation: 'ba-na-na', examples: ['さるはバナナがすき。'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-ja-23', term: 'ぎゅうにゅう', definition: '牛奶', pronunciation: 'gyu-u-nyu-u', examples: ['ぎゅうにゅうをのみます。'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-ja-24', term: 'ケーキ', definition: '蛋糕', pronunciation: 'ke-e-ki', examples: ['たんじょうびケーキ！'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-ja-25', term: 'アイス', definition: '冰淇淋', pronunciation: 'a-i-su', examples: ['アイスがたべたい！'], category: 'food', difficulty: 'beginner' },
    // Greetings 打招呼
    { id: 'zh-ja-26', term: 'こんにちは', definition: '你好', pronunciation: 'kon-ni-chi-wa', examples: ['こんにちは！'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-ja-27', term: 'さようなら', definition: '再見', pronunciation: 'sa-yo-u-na-ra', examples: ['さようなら、またね！'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-ja-28', term: 'ありがとう', definition: '謝謝', pronunciation: 'a-ri-ga-to-u', examples: ['ありがとうございます！'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-ja-29', term: 'おねがい', definition: '請', pronunciation: 'o-ne-ga-i', examples: ['おねがいします。'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-ja-30', term: 'ごめんね', definition: '對不起', pronunciation: 'go-men-ne', examples: ['ごめんね。'], category: 'greetings', difficulty: 'beginner' },
  ],
}

export default chineseToJapanesePack
