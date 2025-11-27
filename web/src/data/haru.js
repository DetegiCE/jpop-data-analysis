// 春 (Spring) Dataset - 봄 데이터셋
export const haruData = {
  name: "春 (Spring)",
  nameKr: "봄",
  
  // 단어 빈도 (단어, 빈도, 백분율)
  wordFrequency: [
    { word: "桜", frequency: 150, percentage: 12.5 },
    { word: "春", frequency: 120, percentage: 10.0 },
    { word: "花", frequency: 100, percentage: 8.3 },
    { word: "風", frequency: 85, percentage: 7.1 },
    { word: "愛", frequency: 75, percentage: 6.3 },
    { word: "夢", frequency: 70, percentage: 5.8 },
    { word: "空", frequency: 65, percentage: 5.4 },
    { word: "光", frequency: 60, percentage: 5.0 },
    { word: "始", frequency: 55, percentage: 4.6 },
    { word: "出会い", frequency: 50, percentage: 4.2 },
    { word: "希望", frequency: 48, percentage: 4.0 },
    { word: "青空", frequency: 45, percentage: 3.8 },
    { word: "卒業", frequency: 42, percentage: 3.5 },
    { word: "新", frequency: 40, percentage: 3.3 },
    { word: "暖かい", frequency: 38, percentage: 3.2 },
    { word: "未来", frequency: 35, percentage: 2.9 },
    { word: "涙", frequency: 32, percentage: 2.7 },
    { word: "別れ", frequency: 30, percentage: 2.5 },
    { word: "思い出", frequency: 28, percentage: 2.3 },
    { word: "約束", frequency: 25, percentage: 2.1 }
  ],
  
  // n-gram (단어1, 단어2, 빈도)
  ngram: [
    { word1: "桜", word2: "花", frequency: 45 },
    { word1: "春", word2: "風", frequency: 40 },
    { word1: "愛", word2: "夢", frequency: 35 },
    { word1: "出会い", word2: "別れ", frequency: 30 },
    { word1: "青", word2: "空", frequency: 28 },
    { word1: "希望", word2: "未来", frequency: 25 },
    { word1: "桜", word2: "春", frequency: 22 },
    { word1: "花", word2: "風", frequency: 20 },
    { word1: "光", word2: "夢", frequency: 18 },
    { word1: "始", word2: "新", frequency: 16 },
    { word1: "卒業", word2: "涙", frequency: 15 },
    { word1: "思い出", word2: "約束", frequency: 14 },
    { word1: "暖かい", word2: "風", frequency: 12 },
    { word1: "愛", word2: "希望", frequency: 10 },
    { word1: "夢", word2: "未来", frequency: 9 }
  ],
  
  // tf-idf (단어, TF-IDF, DF, IDF)
  tfidf: [
    { word: "桜", tfidf: 0.85, df: 0.75, idf: 1.13 },
    { word: "春", tfidf: 0.78, df: 0.65, idf: 1.20 },
    { word: "花", tfidf: 0.72, df: 0.80, idf: 0.90 },
    { word: "風", tfidf: 0.65, df: 0.70, idf: 0.93 },
    { word: "愛", tfidf: 0.60, df: 0.85, idf: 0.71 },
    { word: "夢", tfidf: 0.55, df: 0.60, idf: 0.92 },
    { word: "空", tfidf: 0.50, df: 0.55, idf: 0.91 },
    { word: "光", tfidf: 0.48, df: 0.50, idf: 0.96 },
    { word: "始", tfidf: 0.45, df: 0.35, idf: 1.29 },
    { word: "出会い", tfidf: 0.42, df: 0.40, idf: 1.05 },
    { word: "希望", tfidf: 0.40, df: 0.45, idf: 0.89 },
    { word: "青空", tfidf: 0.38, df: 0.30, idf: 1.27 },
    { word: "卒業", tfidf: 0.35, df: 0.25, idf: 1.40 },
    { word: "新", tfidf: 0.32, df: 0.42, idf: 0.76 },
    { word: "暖かい", tfidf: 0.30, df: 0.28, idf: 1.07 }
  ]
};
