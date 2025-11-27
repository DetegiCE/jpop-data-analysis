// 冬 (Winter) Dataset - 겨울 데이터셋
export const fuyuData = {
  name: "冬 (Winter)",
  nameKr: "겨울",
  
  // 단어 빈도 (단어, 빈도, 백분율)
  wordFrequency: [
    { word: "冬", frequency: 155, percentage: 12.9 },
    { word: "雪", frequency: 135, percentage: 11.3 },
    { word: "寒い", frequency: 100, percentage: 8.3 },
    { word: "白", frequency: 85, percentage: 7.1 },
    { word: "クリスマス", frequency: 78, percentage: 6.5 },
    { word: "温かい", frequency: 70, percentage: 5.8 },
    { word: "恋人", frequency: 65, percentage: 5.4 },
    { word: "夜", frequency: 60, percentage: 5.0 },
    { word: "星", frequency: 55, percentage: 4.6 },
    { word: "願い", frequency: 50, percentage: 4.2 },
    { word: "光", frequency: 48, percentage: 4.0 },
    { word: "暖炉", frequency: 42, percentage: 3.5 },
    { word: "コート", frequency: 38, percentage: 3.2 },
    { word: "手袋", frequency: 35, percentage: 2.9 },
    { word: "息", frequency: 32, percentage: 2.7 },
    { word: "終わり", frequency: 30, percentage: 2.5 },
    { word: "始まり", frequency: 28, percentage: 2.3 },
    { word: "静寂", frequency: 25, percentage: 2.1 },
    { word: "祈り", frequency: 22, percentage: 1.8 },
    { word: "奇跡", frequency: 20, percentage: 1.7 }
  ],
  
  // n-gram (단어1, 단어2, 빈도)
  ngram: [
    { word1: "冬", word2: "雪", frequency: 55 },
    { word1: "クリスマス", word2: "恋人", frequency: 45 },
    { word1: "白", word2: "雪", frequency: 40 },
    { word1: "寒い", word2: "温かい", frequency: 35 },
    { word1: "夜", word2: "星", frequency: 32 },
    { word1: "願い", word2: "祈り", frequency: 28 },
    { word1: "光", word2: "星", frequency: 25 },
    { word1: "暖炉", word2: "温かい", frequency: 22 },
    { word1: "終わり", word2: "始まり", frequency: 20 },
    { word1: "手袋", word2: "コート", frequency: 18 },
    { word1: "静寂", word2: "雪", frequency: 15 },
    { word1: "息", word2: "白", frequency: 14 },
    { word1: "奇跡", word2: "願い", frequency: 12 },
    { word1: "冬", word2: "寒い", frequency: 10 },
    { word1: "クリスマス", word2: "光", frequency: 8 }
  ],
  
  // tf-idf (단어, TF-IDF, DF, IDF)
  tfidf: [
    { word: "冬", tfidf: 0.92, df: 0.68, idf: 1.35 },
    { word: "雪", tfidf: 0.85, df: 0.40, idf: 2.13 },
    { word: "寒い", tfidf: 0.75, df: 0.45, idf: 1.67 },
    { word: "白", tfidf: 0.68, df: 0.60, idf: 1.13 },
    { word: "クリスマス", tfidf: 0.65, df: 0.25, idf: 2.60 },
    { word: "温かい", tfidf: 0.58, df: 0.55, idf: 1.05 },
    { word: "恋人", tfidf: 0.52, df: 0.70, idf: 0.74 },
    { word: "夜", tfidf: 0.48, df: 0.80, idf: 0.60 },
    { word: "星", tfidf: 0.45, df: 0.75, idf: 0.60 },
    { word: "願い", tfidf: 0.42, df: 0.50, idf: 0.84 },
    { word: "光", tfidf: 0.40, df: 0.65, idf: 0.62 },
    { word: "暖炉", tfidf: 0.38, df: 0.20, idf: 1.90 },
    { word: "コート", tfidf: 0.35, df: 0.30, idf: 1.17 },
    { word: "手袋", tfidf: 0.32, df: 0.28, idf: 1.14 },
    { word: "息", tfidf: 0.30, df: 0.35, idf: 0.86 }
  ]
};
