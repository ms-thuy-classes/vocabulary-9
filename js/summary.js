function renderSummary() {
  const totalExercises = 9;
  const lesson = LESSONS_DATA[appState.currentLessonId];
  
  let wrongWordsHTML = appState.wrongList.map(v => `<li><strong>${v.word}</strong>: ${v.meaning}</li>`).join('');
  
  return `
    <div class="summary-card">
      <h2>🎉 Chúc mừng bạn đã hoàn thành bài đánh giá!</h2>
      <div class="score-display">Kết quả: ${appState.score} / ${totalExercises}</div>
      
      ${appState.wrongList.length > 0 ? `
        <div class="review-box">
          <h3>📌 Các từ cần lưu ý ôn tập lại:</h3>
          <ul>${wrongWordsHTML}</ul>
        </div>
      ` : `<p class="perfect-text">🌟 Tuyệt vời! Bạn không sai câu nào!</p>`}
      
      <button class="btn btn-success" onclick="navigateTo('home')">Quay về Trang Chủ</button>
    </div>`;
}
