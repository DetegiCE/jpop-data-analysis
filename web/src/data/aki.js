// 秋 (Autumn) Dataset - 가을 데이터셋
export const akiData = {
  name: "秋 (Autumn)",
  nameKr: "가을",
  
  // 단어 빈도 (단어, 빈도, 백분율)
  wordFrequency: [
    { word: "秋", frequency: 145, percentage: 12.1 },
    { word: "紅葉", frequency: 120, percentage: 10.0 },
    { word: "月", frequency: 95, percentage: 7.9 },
    { word: "風", frequency: 85, percentage: 7.1 },
    { word: "寂しい", frequency: 75, percentage: 6.3 },
    { word: "落ち葉", frequency: 68, percentage: 5.7 },
    { word: "夕暮れ", frequency: 62, percentage: 5.2 },
    { word: "静か", frequency: 58, percentage: 4.8 },
    { word: "涙", frequency: 52, percentage: 4.3 },
    { word: "思い出", frequency: 48, percentage: 4.0 },
    { word: "切ない", frequency: 45, percentage: 3.8 },
    { word: "黄金", frequency: 42, percentage: 3.5 },
    { word: "収穫", frequency: 40, percentage: 3.3 },
    { word: "虫", frequency: 38, percentage: 3.2 },
    { word: "読書", frequency: 35, percentage: 2.9 },
    { word: "芸術", frequency: 32, percentage: 2.7 },
    { word: "温もり", frequency: 30, percentage: 2.5 },
    { word: "実り", frequency: 28, percentage: 2.3 },
    { word: "深い", frequency: 25, percentage: 2.1 },
    { word: "感謝", frequency: 22, percentage: 1.8 }
  ],
  
  // n-gram (단어1, 단어2, 빈도)
  ngram: [
    { word1: "秋", word2: "紅葉", frequency: 48 },
    { word1: "落ち葉", word2: "風", frequency: 40 },
    { word1: "月", word2: "夜", frequency: 35 },
    { word1: "寂しい", word2: "切ない", frequency: 32 },
    { word1: "夕暮れ", word2: "静か", frequency: 28 },
    { word1: "思い出", word2: "涙", frequency: 25 },
    { word1: "黄金", word2: "紅葉", frequency: 22 },
    { word1: "収穫", word2: "実り", frequency: 20 },
    { word1: "虫", word2: "秋", frequency: 18 },
    { word1: "読書", word2: "芸術", frequency: 15 },
    { word1: "温もり", word2: "感謝", frequency: 14 },
    { word1: "深い", word2: "秋", frequency: 12 },
    { word1: "風", word2: "静か", frequency: 10 },
    { word1: "月", word2: "静か", frequency: 9 },
    { word1: "紅葉", word2: "落ち葉", frequency: 8 }
  ],
  
  // tf-idf (단어, TF-IDF, DF, IDF)
  tfidf: [
    { word: "秋", tfidf: 0.88, df: 0.72, idf: 1.22 },
    { word: "紅葉", tfidf: 0.80, df: 0.35, idf: 2.29 },
    { word: "月", tfidf: 0.70, df: 0.80, idf: 0.88 },
    { word: "風", tfidf: 0.62, df: 0.85, idf: 0.73 },
    { word: "寂しい", tfidf: 0.58, df: 0.55, idf: 1.05 },
    { word: "落ち葉", tfidf: 0.55, df: 0.30, idf: 1.83 },
    { word: "夕暮れ", tfidf: 0.50, df: 0.45, idf: 1.11 },
    { word: "静か", tfidf: 0.48, df: 0.50, idf: 0.96 },
    { word: "涙", tfidf: 0.45, df: 0.75, idf: 0.60 },
    { word: "思い出", tfidf: 0.42, df: 0.85, idf: 0.49 },
    { word: "切ない", tfidf: 0.40, df: 0.40, idf: 1.00 },
    { word: "黄金", tfidf: 0.38, df: 0.32, idf: 1.19 },
    { word: "収穫", tfidf: 0.35, df: 0.28, idf: 1.25 },
    { word: "虫", tfidf: 0.32, df: 0.25, idf: 1.28 },
    { word: "読書", tfidf: 0.30, df: 0.35, idf: 0.86 }
  ]
};
