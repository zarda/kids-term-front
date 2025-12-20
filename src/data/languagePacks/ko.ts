import type { LanguagePackData } from '../../types/language.types'

const koreanPack: LanguagePackData = {
  id: 'en-ko',
  words: [
    // Greetings
    { id: 'ko-1', term: '안녕하세요', definition: 'Hello', pronunciation: 'an-nyeong-ha-se-yo', examples: ['안녕하세요, 잘 지내세요?'], category: 'greetings', difficulty: 'beginner' },
    { id: 'ko-2', term: '좋은 아침', definition: 'Good morning', pronunciation: 'jo-eun a-chim', examples: ['좋은 아침이에요!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'ko-3', term: '안녕히 주무세요', definition: 'Good night', pronunciation: 'an-nyeong-hi ju-mu-se-yo', examples: ['안녕히 주무세요, 좋은 꿈 꾸세요.'], category: 'greetings', difficulty: 'beginner' },
    { id: 'ko-4', term: '안녕히 가세요', definition: 'Goodbye', pronunciation: 'an-nyeong-hi ga-se-yo', examples: ['안녕히 가세요!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'ko-5', term: '감사합니다', definition: 'Thank you', pronunciation: 'gam-sa-ham-ni-da', examples: ['정말 감사합니다!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'ko-6', term: '죄송합니다', definition: 'Sorry', pronunciation: 'joe-song-ham-ni-da', examples: ['죄송합니다, 늦었어요.'], category: 'greetings', difficulty: 'beginner' },
    // Food
    { id: 'ko-7', term: '물', definition: 'Water', pronunciation: 'mul', examples: ['물 주세요.'], category: 'food', difficulty: 'beginner' },
    { id: 'ko-8', term: '밥', definition: 'Rice/Meal', pronunciation: 'bap', examples: ['밥 먹었어요?'], category: 'food', difficulty: 'beginner' },
    { id: 'ko-9', term: '사과', definition: 'Apple', pronunciation: 'sa-gwa', examples: ['사과가 맛있어요.'], category: 'food', difficulty: 'beginner' },
    { id: 'ko-10', term: '커피', definition: 'Coffee', pronunciation: 'keo-pi', examples: ['커피 한 잔 주세요.'], category: 'food', difficulty: 'beginner' },
    { id: 'ko-11', term: '김치', definition: 'Kimchi', pronunciation: 'gim-chi', examples: ['김치를 좋아해요.'], category: 'food', difficulty: 'beginner' },
    { id: 'ko-12', term: '불고기', definition: 'Bulgogi', pronunciation: 'bul-go-gi', examples: ['불고기가 맛있어요.'], category: 'food', difficulty: 'beginner' },
    // Numbers
    { id: 'ko-13', term: '하나', definition: 'One', pronunciation: 'ha-na', examples: ['하나 주세요.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'ko-14', term: '둘', definition: 'Two', pronunciation: 'dul', examples: ['둘이에요.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'ko-15', term: '셋', definition: 'Three', pronunciation: 'set', examples: ['세 시예요.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'ko-16', term: '열', definition: 'Ten', pronunciation: 'yeol', examples: ['열 살이에요.'], category: 'numbers', difficulty: 'beginner' },
    // Daily
    { id: 'ko-17', term: '집', definition: 'House', pronunciation: 'jip', examples: ['집에 가요.'], category: 'daily', difficulty: 'beginner' },
    { id: 'ko-18', term: '일', definition: 'Work', pronunciation: 'il', examples: ['일하러 가요.'], category: 'daily', difficulty: 'beginner' },
    { id: 'ko-19', term: '가족', definition: 'Family', pronunciation: 'ga-jok', examples: ['가족이 중요해요.'], category: 'daily', difficulty: 'beginner' },
    { id: 'ko-20', term: '친구', definition: 'Friend', pronunciation: 'chin-gu', examples: ['그는 제 친구예요.'], category: 'daily', difficulty: 'beginner' },
    { id: 'ko-21', term: '오늘', definition: 'Today', pronunciation: 'o-neul', examples: ['오늘은 월요일이에요.'], category: 'time', difficulty: 'beginner' },
    { id: 'ko-22', term: '내일', definition: 'Tomorrow', pronunciation: 'nae-il', examples: ['내일 봐요!'], category: 'time', difficulty: 'beginner' },
    { id: 'ko-23', term: '학교', definition: 'School', pronunciation: 'hak-gyo', examples: ['학교에 가요.'], category: 'daily', difficulty: 'beginner' },
    { id: 'ko-24', term: '사랑해요', definition: 'I love you', pronunciation: 'sa-rang-hae-yo', examples: ['사랑해요!'], category: 'daily', difficulty: 'beginner' },
    { id: 'ko-25', term: '네', definition: 'Yes', pronunciation: 'ne', examples: ['네, 알겠습니다.'], category: 'greetings', difficulty: 'beginner' },
  ],
}

export default koreanPack
