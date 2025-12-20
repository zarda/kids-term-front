import type { LanguagePackData } from '../../types/language.types'

const chineseToChinesePack: LanguagePackData = {
  id: 'zh-zh',
  words: [
    // 動物 Animals
    { id: 'zh-zh-1', term: '小狗', definition: '汪汪叫的寵物', pronunciation: 'xiǎo gǒu', examples: ['我家有一隻可愛的小狗。'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-zh-2', term: '小貓', definition: '喵喵叫的寵物', pronunciation: 'xiǎo māo', examples: ['小貓喜歡玩毛線球。'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-zh-3', term: '兔子', definition: '有長耳朵、愛吃紅蘿蔔的動物', pronunciation: 'tù zi', examples: ['兔子跳得很快。'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-zh-4', term: '小鳥', definition: '有翅膀會飛的動物', pronunciation: 'xiǎo niǎo', examples: ['小鳥在樹上唱歌。'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-zh-5', term: '金魚', definition: '在水裡游的小魚', pronunciation: 'jīn yú', examples: ['金魚在魚缸裡游來游去。'], category: 'animals', difficulty: 'beginner' },
    // 身體 Body
    { id: 'zh-zh-6', term: '眼睛', definition: '用來看東西的器官', pronunciation: 'yǎn jing', examples: ['我有一雙大眼睛。'], category: 'body', difficulty: 'beginner' },
    { id: 'zh-zh-7', term: '耳朵', definition: '用來聽聲音的器官', pronunciation: 'ěr duo', examples: ['用耳朵聽老師說話。'], category: 'body', difficulty: 'beginner' },
    { id: 'zh-zh-8', term: '嘴巴', definition: '用來吃東西和說話的器官', pronunciation: 'zuǐ ba', examples: ['吃飯時嘴巴要閉起來。'], category: 'body', difficulty: 'beginner' },
    { id: 'zh-zh-9', term: '手', definition: '用來拿東西和寫字的部位', pronunciation: 'shǒu', examples: ['我用手寫功課。'], category: 'body', difficulty: 'beginner' },
    { id: 'zh-zh-10', term: '腳', definition: '用來走路和跑步的部位', pronunciation: 'jiǎo', examples: ['我用腳踢足球。'], category: 'body', difficulty: 'beginner' },
    // 學校 School
    { id: 'zh-zh-11', term: '老師', definition: '在學校教我們知識的人', pronunciation: 'lǎo shī', examples: ['老師教我們寫字。'], category: 'school', difficulty: 'beginner' },
    { id: 'zh-zh-12', term: '同學', definition: '一起上課的朋友', pronunciation: 'tóng xué', examples: ['我和同學一起玩。'], category: 'school', difficulty: 'beginner' },
    { id: 'zh-zh-13', term: '課本', definition: '上課用的書', pronunciation: 'kè běn', examples: ['請打開課本第五頁。'], category: 'school', difficulty: 'beginner' },
    { id: 'zh-zh-14', term: '鉛筆', definition: '用來寫字的文具', pronunciation: 'qiān bǐ', examples: ['我用鉛筆寫作業。'], category: 'school', difficulty: 'beginner' },
    { id: 'zh-zh-15', term: '橡皮擦', definition: '用來擦掉錯字的文具', pronunciation: 'xiàng pí cā', examples: ['寫錯了用橡皮擦擦掉。'], category: 'school', difficulty: 'beginner' },
    // 家人 Family
    { id: 'zh-zh-16', term: '爸爸', definition: '男生的家長', pronunciation: 'bà ba', examples: ['爸爸帶我去公園玩。'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-zh-17', term: '媽媽', definition: '女生的家長', pronunciation: 'mā ma', examples: ['媽媽煮飯給我吃。'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-zh-18', term: '爺爺', definition: '爸爸的爸爸', pronunciation: 'yé ye', examples: ['爺爺講故事給我聽。'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-zh-19', term: '奶奶', definition: '爸爸的媽媽', pronunciation: 'nǎi nai', examples: ['奶奶做的餅乾很好吃。'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-zh-20', term: '弟弟', definition: '比我小的男生兄弟', pronunciation: 'dì di', examples: ['我和弟弟一起玩玩具。'], category: 'family', difficulty: 'beginner' },
    // 食物 Food
    { id: 'zh-zh-21', term: '蘋果', definition: '紅色或綠色的圓形水果', pronunciation: 'píng guǒ', examples: ['蘋果又甜又脆。'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-zh-22', term: '香蕉', definition: '黃色彎彎的水果', pronunciation: 'xiāng jiāo', examples: ['猴子愛吃香蕉。'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-zh-23', term: '牛奶', definition: '白色的營養飲料', pronunciation: 'niú nǎi', examples: ['每天喝牛奶長高高。'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-zh-24', term: '餅乾', definition: '脆脆的小點心', pronunciation: 'bǐng gān', examples: ['我喜歡吃巧克力餅乾。'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-zh-25', term: '冰淇淋', definition: '冰冰涼涼的甜點', pronunciation: 'bīng qí lín', examples: ['夏天吃冰淇淋好涼快。'], category: 'food', difficulty: 'beginner' },
    // 自然 Nature
    { id: 'zh-zh-26', term: '太陽', definition: '天上發光發熱的星球', pronunciation: 'tài yáng', examples: ['太陽公公出來了。'], category: 'nature', difficulty: 'beginner' },
    { id: 'zh-zh-27', term: '月亮', definition: '晚上天空中亮亮的', pronunciation: 'yuè liang', examples: ['月亮像一個大圓盤。'], category: 'nature', difficulty: 'beginner' },
    { id: 'zh-zh-28', term: '星星', definition: '晚上天空中閃閃發光的', pronunciation: 'xīng xing', examples: ['天上有好多星星。'], category: 'nature', difficulty: 'beginner' },
    { id: 'zh-zh-29', term: '花', definition: '漂亮又香的植物', pronunciation: 'huā', examples: ['花園裡開滿了花。'], category: 'nature', difficulty: 'beginner' },
    { id: 'zh-zh-30', term: '樹', definition: '高高的綠色植物', pronunciation: 'shù', examples: ['小鳥住在樹上。'], category: 'nature', difficulty: 'beginner' },
  ],
}

export default chineseToChinesePack
