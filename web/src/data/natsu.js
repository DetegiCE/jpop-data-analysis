// 夏 (Summer) Dataset - 여름 데이터셋
export const natsuData = {
  name: "夏 (Summer)",
  nameKr: "여름",
  
  // 단어 빈도 (단어, 빈도, 백분율)
  wordFrequency: [
    { word: "夏", frequency: 160, percentage: 13.3 },
    { word: "海", frequency: 130, percentage: 10.8 },
    { word: "太陽", frequency: 95, percentage: 7.9 },
    { word: "熱い", frequency: 80, percentage: 6.7 },
    { word: "恋", frequency: 75, percentage: 6.3 },
    { word: "祭り", frequency: 70, percentage: 5.8 },
    { word: "花火", frequency: 65, percentage: 5.4 },
    { word: "青", frequency: 60, percentage: 5.0 },
    { word: "波", frequency: 55, percentage: 4.6 },
    { word: "夜", frequency: 50, percentage: 4.2 },
    { word: "星", frequency: 48, percentage: 4.0 },
    { word: "汗", frequency: 45, percentage: 3.8 },
    { word: "思い出", frequency: 42, percentage: 3.5 },
    { word: "輝く", frequency: 40, percentage: 3.3 },
    { word: "蝉", frequency: 38, percentage: 3.2 },
    { word: "アイス", frequency: 35, percentage: 2.9 },
    { word: "浴衣", frequency: 32, percentage: 2.7 },
    { word: "砂浜", frequency: 30, percentage: 2.5 },
    { word: "冒険", frequency: 28, percentage: 2.3 },
    { word: "永遠", frequency: 25, percentage: 2.1 }
  ],
  
  // n-gram (단어1, 단어2, 빈도)
  ngram: [
    { word1: "夏", word2: "海", frequency: 50 },
    { word1: "花火", word2: "祭り", frequency: 42 },
    { word1: "太陽", word2: "輝く", frequency: 38 },
    { word1: "恋", word2: "夏", frequency: 35 },
    { word1: "青", word2: "空", frequency: 32 },
    { word1: "波", word2: "砂浜", frequency: 28 },
    { word1: "夜", word2: "星", frequency: 25 },
    { word1: "熱い", word2: "太陽", frequency: 22 },
    { word1: "思い出", word2: "永遠", frequency: 20 },
    { word1: "蝉", word2: "夏", frequency: 18 },
    { word1: "浴衣", word2: "祭り", frequency: 16 },
    { word1: "海", word2: "波", frequency: 15 },
    { word1: "冒険", word2: "夏", frequency: 14 },
    { word1: "アイス", word2: "熱い", frequency: 12 },
    { word1: "星", word2: "輝く", frequency: 10 }
  ],
  
  // tf-idf (단어, TF-IDF, DF, IDF)
  tfidf: [
    { word: "夏", tfidf: 0.90, df: 0.70, idf: 1.29 },
    { word: "海", tfidf: 0.82, df: 0.60, idf: 1.37 },
    { word: "太陽", tfidf: 0.75, df: 0.55, idf: 1.36 },
    { word: "熱い", tfidf: 0.68, df: 0.50, idf: 1.36 },
    { word: "恋", tfidf: 0.62, df: 0.75, idf: 0.83 },
    { word: "祭り", tfidf: 0.58, df: 0.40, idf: 1.45 },
    { word: "花火", tfidf: 0.55, df: 0.35, idf: 1.57 },
    { word: "青", tfidf: 0.52, df: 0.65, idf: 0.80 },
    { word: "波", tfidf: 0.48, df: 0.45, idf: 1.07 },
    { word: "夜", tfidf: 0.45, df: 0.70, idf: 0.64 },
    { word: "星", tfidf: 0.42, df: 0.60, idf: 0.70 },
    { word: "汗", tfidf: 0.40, df: 0.30, idf: 1.33 },
    { word: "思い出", tfidf: 0.38, df: 0.80, idf: 0.48 },
    { word: "輝く", tfidf: 0.35, df: 0.55, idf: 0.64 },
    { word: "蝉", tfidf: 0.32, df: 0.25, idf: 1.28 }
  ]
};
