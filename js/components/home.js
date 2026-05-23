function renderHome() {
  let html = `
    <!-- Header thương hiệu phong cách mượt mà -->
    <div class="brand-header">
      <h1>Learn with Ms. Thúy ✨</h1>
      <p>Chào mừng các em đến với thế giới từ vựng tiếng Anh đầy màu sắc!</p>
    </div>
    
    <!-- Danh sách các bài học dạng Grid -->
    <div class="lesson-grid">
  `;
  
  for (let id in LESSONS_DATA) {
    const lesson = LESSONS_DATA[id];
    // Nếu dữ liệu thiếu icon, tự động lấy emoji đầu tiên của từ vựng làm icon đại diện
    const defaultIcon = lesson.vocabList[0]?.emoji || "📝";
    const displayIcon = lesson.icon || defaultIcon;

    html += `
      <div class="lesson-card" onclick="navigateTo('flashcard', '${id}')">
        <div class="lesson-icon">${displayIcon}</div>
        <h3>${lesson.title}</h3>
        <p>📊 Gồm <strong>${lesson.vocabList.length}</strong> từ vựng cốt lõi</p>
        <button class="btn-start">Khám phá ngay 🚀</button>
      </div>`;
  }
  
  html += `</div>`;
  return html;
}
