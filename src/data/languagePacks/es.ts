import type { LanguagePackData } from '../../types/language.types'

const spanishPack: LanguagePackData = {
  id: 'en-es',
  words: [
    // Greetings
    { id: 'es-1', term: 'Hola', definition: 'Hello', pronunciation: 'OH-lah', examples: ['¡Hola! ¿Cómo estás?'], category: 'greetings', difficulty: 'beginner' },
    { id: 'es-2', term: 'Buenos días', definition: 'Good morning', pronunciation: 'BWEH-nohs DEE-ahs', examples: ['Buenos días, señor.'], category: 'greetings', difficulty: 'beginner' },
    { id: 'es-3', term: 'Buenas noches', definition: 'Good night', pronunciation: 'BWEH-nahs NOH-chehs', examples: ['Buenas noches, que duermas bien.'], category: 'greetings', difficulty: 'beginner' },
    { id: 'es-4', term: 'Adiós', definition: 'Goodbye', pronunciation: 'ah-DYOHS', examples: ['¡Adiós, hasta mañana!'], category: 'greetings', difficulty: 'beginner' },
    { id: 'es-5', term: 'Gracias', definition: 'Thank you', pronunciation: 'GRAH-syahs', examples: ['Muchas gracias por tu ayuda.'], category: 'greetings', difficulty: 'beginner' },
    { id: 'es-6', term: 'Por favor', definition: 'Please', pronunciation: 'pohr fah-BOHR', examples: ['Por favor, ayúdame.'], category: 'greetings', difficulty: 'beginner' },
    // Food
    { id: 'es-7', term: 'Agua', definition: 'Water', pronunciation: 'AH-gwah', examples: ['¿Me puede dar un vaso de agua?'], category: 'food', difficulty: 'beginner' },
    { id: 'es-8', term: 'Pan', definition: 'Bread', pronunciation: 'pahn', examples: ['El pan está fresco.'], category: 'food', difficulty: 'beginner' },
    { id: 'es-9', term: 'Manzana', definition: 'Apple', pronunciation: 'mahn-SAH-nah', examples: ['La manzana es roja.'], category: 'food', difficulty: 'beginner' },
    { id: 'es-10', term: 'Café', definition: 'Coffee', pronunciation: 'kah-FEH', examples: ['Quiero un café con leche.'], category: 'food', difficulty: 'beginner' },
    { id: 'es-11', term: 'Carne', definition: 'Meat', pronunciation: 'KAHR-neh', examples: ['No como carne.'], category: 'food', difficulty: 'beginner' },
    { id: 'es-12', term: 'Leche', definition: 'Milk', pronunciation: 'LEH-cheh', examples: ['La leche está fría.'], category: 'food', difficulty: 'beginner' },
    // Travel
    { id: 'es-13', term: 'Aeropuerto', definition: 'Airport', pronunciation: 'ah-eh-roh-PWEHR-toh', examples: ['El aeropuerto está lejos.'], category: 'travel', difficulty: 'intermediate' },
    { id: 'es-14', term: 'Hotel', definition: 'Hotel', pronunciation: 'oh-TEHL', examples: ['El hotel tiene piscina.'], category: 'travel', difficulty: 'beginner' },
    { id: 'es-15', term: 'Pasaporte', definition: 'Passport', pronunciation: 'pah-sah-POHR-teh', examples: ['Necesito mi pasaporte.'], category: 'travel', difficulty: 'intermediate' },
    { id: 'es-16', term: 'Maleta', definition: 'Suitcase', pronunciation: 'mah-LEH-tah', examples: ['Mi maleta es azul.'], category: 'travel', difficulty: 'intermediate' },
    // Numbers
    { id: 'es-17', term: 'Uno', definition: 'One', pronunciation: 'OO-noh', examples: ['Tengo uno.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'es-18', term: 'Dos', definition: 'Two', pronunciation: 'dohs', examples: ['Tengo dos hermanos.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'es-19', term: 'Tres', definition: 'Three', pronunciation: 'trehs', examples: ['Son las tres.'], category: 'numbers', difficulty: 'beginner' },
    { id: 'es-20', term: 'Diez', definition: 'Ten', pronunciation: 'dyehs', examples: ['Tengo diez años.'], category: 'numbers', difficulty: 'beginner' },
    // Colors
    { id: 'es-21', term: 'Rojo', definition: 'Red', pronunciation: 'RROH-hoh', examples: ['El carro es rojo.'], category: 'colors', difficulty: 'beginner' },
    { id: 'es-22', term: 'Azul', definition: 'Blue', pronunciation: 'ah-SOOL', examples: ['El cielo es azul.'], category: 'colors', difficulty: 'beginner' },
    { id: 'es-23', term: 'Verde', definition: 'Green', pronunciation: 'BEHR-deh', examples: ['La hierba es verde.'], category: 'colors', difficulty: 'beginner' },
    { id: 'es-24', term: 'Amarillo', definition: 'Yellow', pronunciation: 'ah-mah-REE-yoh', examples: ['El sol es amarillo.'], category: 'colors', difficulty: 'beginner' },
    // Daily
    { id: 'es-25', term: 'Casa', definition: 'House', pronunciation: 'KAH-sah', examples: ['Mi casa es grande.'], category: 'daily', difficulty: 'beginner' },
    { id: 'es-26', term: 'Trabajo', definition: 'Work', pronunciation: 'trah-BAH-hoh', examples: ['Voy al trabajo.'], category: 'daily', difficulty: 'beginner' },
    { id: 'es-27', term: 'Familia', definition: 'Family', pronunciation: 'fah-MEE-lyah', examples: ['Mi familia es grande.'], category: 'daily', difficulty: 'beginner' },
    { id: 'es-28', term: 'Amigo', definition: 'Friend', pronunciation: 'ah-MEE-goh', examples: ['Él es mi amigo.'], category: 'daily', difficulty: 'beginner' },
    // Time
    { id: 'es-29', term: 'Hoy', definition: 'Today', pronunciation: 'oy', examples: ['Hoy es lunes.'], category: 'time', difficulty: 'beginner' },
    { id: 'es-30', term: 'Mañana', definition: 'Tomorrow', pronunciation: 'mah-NYAH-nah', examples: ['Te veo mañana.'], category: 'time', difficulty: 'beginner' },
    { id: 'es-31', term: 'Ayer', definition: 'Yesterday', pronunciation: 'ah-YEHR', examples: ['Ayer fui al cine.'], category: 'time', difficulty: 'beginner' },
    // Weather
    { id: 'es-32', term: 'Sol', definition: 'Sun', pronunciation: 'sohl', examples: ['Hace sol hoy.'], category: 'weather', difficulty: 'beginner' },
    { id: 'es-33', term: 'Lluvia', definition: 'Rain', pronunciation: 'LYOO-byah', examples: ['Hay lluvia hoy.'], category: 'weather', difficulty: 'beginner' },
    { id: 'es-34', term: 'Frío', definition: 'Cold', pronunciation: 'FREE-oh', examples: ['Hace frío afuera.'], category: 'weather', difficulty: 'beginner' },
    { id: 'es-35', term: 'Calor', definition: 'Hot', pronunciation: 'kah-LOHR', examples: ['Hace mucho calor.'], category: 'weather', difficulty: 'beginner' },
  ],
}

export default spanishPack
