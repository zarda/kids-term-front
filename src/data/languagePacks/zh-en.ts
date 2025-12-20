import type { LanguagePackData } from '../../types/language.types'

const chineseToEnglishPack: LanguagePackData = {
  id: 'zh-en',
  words: [
    // Animals 動物
    { id: 'zh-en-1', term: 'Dog', definition: '狗', pronunciation: 'dawg', examples: ['I have a dog.'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-en-2', term: 'Cat', definition: '貓', pronunciation: 'kat', examples: ['The cat is cute.'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-en-3', term: 'Bird', definition: '鳥', pronunciation: 'burd', examples: ['The bird can fly.'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-en-4', term: 'Fish', definition: '魚', pronunciation: 'fish', examples: ['The fish swims.'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-en-5', term: 'Rabbit', definition: '兔子', pronunciation: 'RAB-it', examples: ['The rabbit hops.'], category: 'animals', difficulty: 'beginner' },
    // Colors 顏色
    { id: 'zh-en-6', term: 'Red', definition: '紅色', pronunciation: 'red', examples: ['The apple is red.'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-en-7', term: 'Blue', definition: '藍色', pronunciation: 'bloo', examples: ['The sky is blue.'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-en-8', term: 'Green', definition: '綠色', pronunciation: 'green', examples: ['The grass is green.'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-en-9', term: 'Yellow', definition: '黃色', pronunciation: 'YEL-oh', examples: ['The sun is yellow.'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-en-10', term: 'Pink', definition: '粉紅色', pronunciation: 'pink', examples: ['I like pink.'], category: 'colors', difficulty: 'beginner' },
    // Numbers 數字
    { id: 'zh-en-11', term: 'One', definition: '一', pronunciation: 'wun', examples: ['I have one book.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-en-12', term: 'Two', definition: '二', pronunciation: 'too', examples: ['I have two hands.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-en-13', term: 'Three', definition: '三', pronunciation: 'three', examples: ['Three little pigs.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-en-14', term: 'Four', definition: '四', pronunciation: 'for', examples: ['A dog has four legs.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-en-15', term: 'Five', definition: '五', pronunciation: 'fiyv', examples: ['I have five fingers.'], category: 'numbers', difficulty: 'beginner' },
    // Family 家人
    { id: 'zh-en-16', term: 'Mom', definition: '媽媽', pronunciation: 'mahm', examples: ['I love my mom.'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-en-17', term: 'Dad', definition: '爸爸', pronunciation: 'dad', examples: ['My dad is tall.'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-en-18', term: 'Brother', definition: '兄弟', pronunciation: 'BRUH-ther', examples: ['He is my brother.'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-en-19', term: 'Sister', definition: '姊妹', pronunciation: 'SIS-ter', examples: ['She is my sister.'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-en-20', term: 'Grandma', definition: '奶奶/外婆', pronunciation: 'GRAND-mah', examples: ['Grandma bakes cookies.'], category: 'family', difficulty: 'beginner' },
    // Food 食物
    { id: 'zh-en-21', term: 'Apple', definition: '蘋果', pronunciation: 'AP-ul', examples: ['I eat an apple.'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-en-22', term: 'Banana', definition: '香蕉', pronunciation: 'buh-NAN-uh', examples: ['Monkeys like bananas.'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-en-23', term: 'Milk', definition: '牛奶', pronunciation: 'milk', examples: ['I drink milk.'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-en-24', term: 'Cake', definition: '蛋糕', pronunciation: 'kayk', examples: ['Birthday cake is yummy.'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-en-25', term: 'Ice cream', definition: '冰淇淋', pronunciation: 'ais kreem', examples: ['I love ice cream!'], category: 'food', difficulty: 'beginner' },
    // School 學校
    { id: 'zh-en-26', term: 'Book', definition: '書', pronunciation: 'book', examples: ['I read a book.'], category: 'school', difficulty: 'beginner' },
    { id: 'zh-en-27', term: 'Pencil', definition: '鉛筆', pronunciation: 'PEN-sul', examples: ['I write with a pencil.'], category: 'school', difficulty: 'beginner' },
    { id: 'zh-en-28', term: 'Teacher', definition: '老師', pronunciation: 'TEE-cher', examples: ['The teacher is nice.'], category: 'school', difficulty: 'beginner' },
    { id: 'zh-en-29', term: 'Friend', definition: '朋友', pronunciation: 'frend', examples: ['You are my friend.'], category: 'school', difficulty: 'beginner' },
    { id: 'zh-en-30', term: 'School', definition: '學校', pronunciation: 'skool', examples: ['I go to school.'], category: 'school', difficulty: 'beginner' },
    // Body 身體
    { id: 'zh-en-31', term: 'Head', definition: '頭', pronunciation: 'hed', examples: ['I nod my head.'], category: 'body', difficulty: 'beginner' },
    { id: 'zh-en-32', term: 'Eyes', definition: '眼睛', pronunciation: 'aiz', examples: ['I have two eyes.'], category: 'body', difficulty: 'beginner' },
    { id: 'zh-en-33', term: 'Ears', definition: '耳朵', pronunciation: 'eerz', examples: ['I hear with my ears.'], category: 'body', difficulty: 'beginner' },
    { id: 'zh-en-34', term: 'Hands', definition: '手', pronunciation: 'handz', examples: ['Clap your hands!'], category: 'body', difficulty: 'beginner' },
    { id: 'zh-en-35', term: 'Feet', definition: '腳', pronunciation: 'feet', examples: ['I run with my feet.'], category: 'body', difficulty: 'beginner' },
    // Greetings 打招呼
    { id: 'zh-en-36', term: 'Hello', definition: '你好', pronunciation: 'heh-LOH', examples: ['Hello! How are you?'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-en-37', term: 'Goodbye', definition: '再見', pronunciation: 'good-BYE', examples: ['Goodbye! See you!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-en-38', term: 'Thank you', definition: '謝謝', pronunciation: 'THANK yoo', examples: ['Thank you very much!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-en-39', term: 'Please', definition: '請', pronunciation: 'pleez', examples: ['Please help me.'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-en-40', term: 'Sorry', definition: '對不起', pronunciation: 'SAH-ree', examples: ['I am sorry.'], category: 'greetings', difficulty: 'beginner' },
  ],
}

export default chineseToEnglishPack
