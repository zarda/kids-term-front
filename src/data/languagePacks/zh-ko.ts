import type { LanguagePackData } from '../../types/language.types'

const chineseToKoreanPack: LanguagePackData = {
  id: 'zh-ko',
  words: [
    // Animals 動物
    { id: 'zh-ko-1', term: '강아지', definition: '狗', pronunciation: 'gang-a-ji', examples: ['강아지가 귀여워요.'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-ko-2', term: '고양이', definition: '貓', pronunciation: 'go-yang-i', examples: ['고양이가 야옹해요.'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-ko-3', term: '새', definition: '鳥', pronunciation: 'sae', examples: ['새가 날아요.'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-ko-4', term: '물고기', definition: '魚', pronunciation: 'mul-go-gi', examples: ['물고기가 헤엄쳐요.'], category: 'animals', difficulty: 'beginner' },
    { id: 'zh-ko-5', term: '토끼', definition: '兔子', pronunciation: 'to-kki', examples: ['토끼가 깡충깡충!'], category: 'animals', difficulty: 'beginner' },
    // Colors 顏色
    { id: 'zh-ko-6', term: '빨강', definition: '紅色', pronunciation: 'ppal-gang', examples: ['사과는 빨강이에요.'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-ko-7', term: '파랑', definition: '藍色', pronunciation: 'pa-rang', examples: ['하늘은 파랑이에요.'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-ko-8', term: '초록', definition: '綠色', pronunciation: 'cho-rok', examples: ['풀은 초록이에요.'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-ko-9', term: '노랑', definition: '黃色', pronunciation: 'no-rang', examples: ['바나나는 노랑이에요.'], category: 'colors', difficulty: 'beginner' },
    { id: 'zh-ko-10', term: '분홍', definition: '粉紅色', pronunciation: 'bun-hong', examples: ['분홍색을 좋아해요.'], category: 'colors', difficulty: 'beginner' },
    // Numbers 數字
    { id: 'zh-ko-11', term: '하나', definition: '一', pronunciation: 'ha-na', examples: ['하나, 둘, 셋!'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-ko-12', term: '둘', definition: '二', pronunciation: 'dul', examples: ['손이 둘 있어요.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-ko-13', term: '셋', definition: '三', pronunciation: 'set', examples: ['친구가 셋 있어요.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-ko-14', term: '넷', definition: '四', pronunciation: 'net', examples: ['강아지 다리는 넷이에요.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'zh-ko-15', term: '다섯', definition: '五', pronunciation: 'da-seot', examples: ['손가락이 다섯 개예요.'], category: 'numbers', difficulty: 'beginner' },
    // Family 家人
    { id: 'zh-ko-16', term: '엄마', definition: '媽媽', pronunciation: 'eom-ma', examples: ['엄마 사랑해요.'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-ko-17', term: '아빠', definition: '爸爸', pronunciation: 'a-ppa', examples: ['아빠는 키가 커요.'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-ko-18', term: '오빠', definition: '哥哥', pronunciation: 'o-ppa', examples: ['오빠랑 놀아요.'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-ko-19', term: '언니', definition: '姊姊', pronunciation: 'eon-ni', examples: ['언니는 착해요.'], category: 'family', difficulty: 'beginner' },
    { id: 'zh-ko-20', term: '할머니', definition: '奶奶/外婆', pronunciation: 'hal-meo-ni', examples: ['할머니 댁에 가요.'], category: 'family', difficulty: 'beginner' },
    // Food 食物
    { id: 'zh-ko-21', term: '사과', definition: '蘋果', pronunciation: 'sa-gwa', examples: ['사과를 먹어요.'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-ko-22', term: '바나나', definition: '香蕉', pronunciation: 'ba-na-na', examples: ['원숭이는 바나나를 좋아해요.'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-ko-23', term: '우유', definition: '牛奶', pronunciation: 'u-yu', examples: ['우유를 마셔요.'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-ko-24', term: '케이크', definition: '蛋糕', pronunciation: 'ke-i-keu', examples: ['생일 케이크!'], category: 'food', difficulty: 'beginner' },
    { id: 'zh-ko-25', term: '아이스크림', definition: '冰淇淋', pronunciation: 'a-i-seu-keu-rim', examples: ['아이스크림 먹고 싶어요!'], category: 'food', difficulty: 'beginner' },
    // Greetings 打招呼
    { id: 'zh-ko-26', term: '안녕', definition: '你好', pronunciation: 'an-nyeong', examples: ['안녕!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-ko-27', term: '안녕히', definition: '再見', pronunciation: 'an-nyeong-hi', examples: ['안녕히, 또 봐!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-ko-28', term: '고마워', definition: '謝謝', pronunciation: 'go-ma-wo', examples: ['고마워요!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-ko-29', term: '제발', definition: '請', pronunciation: 'je-bal', examples: ['제발 도와주세요.'], category: 'greetings', difficulty: 'beginner' },
    { id: 'zh-ko-30', term: '미안해', definition: '對不起', pronunciation: 'mi-an-hae', examples: ['미안해요.'], category: 'greetings', difficulty: 'beginner' },
  ],
}

export default chineseToKoreanPack
