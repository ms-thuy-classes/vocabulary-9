// Biến cục bộ để quản lý từ vựng hiện tại trong màn hình Flashcard
let currentCardIndex = 0;
let currentLessonWords = [];

function renderFlashcard(lessonId) {
  const lesson = LESSONS_DATA[lessonId];
  currentLessonWords = lesson.vocabList;
  currentCardIndex = 0; // Reset về từ đầu tiên

  return `
    <div class="flashcard-container">
      <!-- Tiêu đề bài học -->
      <div class="flashcard-header">
        <h2>${lesson.title}</h2>
        <p>Bấm vào thẻ để xem nghĩa của từ nhé!</p>
      </div>

      <!-- Khung chứa Thẻ 3D Flip -->
      <div class="flip-card-wrapper">
        <div class="flip-card" id="vocab-card" onclick="flipCard()">
          <div class="flip-card-inner" id="card-inner">
            <!-- Mặt trước: Tiếng Anh + Hình ảnh -->
            <div class="flip-card-front">
              <div class="card-emoji" id="front-emoji"></div>
              <div class="card-word" id="front-word"></div>
              <div class="hint-text">Tap to flip 🔄</div>
            </div>
            <!-- Mặt sau: Tiếng Việt -->
            <div class="flip-card-back">
              <div class="card-meaning-title">Nghĩa là:</div>
              <div class="card-meaning" id="back-meaning"></div>
              <div class="hint-text">Tap to flip 🔄</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Thanh điều hướng và Tiến trình học -->
      <div class="flashcard-controls">
        <button class="btn-nav" onclick="prevCard()">← Trước</button>
        <span class="card-indicator" id="card-indicator">1 / 1</span>
        <button class="btn-nav" onclick="nextCard()">Sau →</button>
      </div>

      <!-- Nút chuyển sang làm 9 bài tập (Ẩn định cho đến khi xem hết các từ) -->
      <div class="quiz-start-wrapper text-center">
        <button class="btn-start-quiz hidden" id="startQuizBtn" onclick="navigateTo('quiz')">
          Làm Bài Tập Đánh Giá Đố Vui 🚀
        </button>
      </div>
    </div>
  `;
}

// Hàm cập nhật nội dung hiển thị lên thẻ
function updateCard() {
  const cardInner = document.getElementById('card-inner');
  // Luôn trả thẻ về mặt trước khi chuyển từ mới
  cardInner.classList.remove('flipped');

  const currentVocab = currentLessonWords[currentCardIndex];
  
  // Nạp dữ liệu vào các mặt thẻ
  document.getElementById('front-emoji').innerText = currentVocab.emoji;
  document.getElementById('front-word').innerText = currentVocab.word;
  document.getElementById('back-meaning').innerText = currentVocab.meaning;
  
  // Cập nhật số thứ tự hiển thị (Ví dụ: 2 / 5)
  document.getElementById('card-indicator').innerText = `${currentCardIndex + 1} / ${currentLessonWords.length}`;

  // Nếu học sinh đã lật xem đến từ cuối cùng, mở khóa nút làm bài tập
  if (currentCardIndex === currentLessonWords.length - 1) {
    document.getElementById('startQuizBtn').classList.remove('hidden');
  }
}

// Hàm xử lý hiệu ứng lật thẻ
function flipCard() {
  const cardInner = document.getElementById('card-inner');
  cardInner.classList.toggle('flipped');
}

// Chuyển sang từ tiếp theo
function nextCard() {
  if (currentCardIndex < currentLessonWords.length - 1) {
    currentCardIndex++;
    updateCard();
  }
}

// Quay lại từ trước đó
function prevCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    updateCard();
  }
}

// Hook chạy ngay sau khi HTML được nạp vào DOM để hiển thị từ đầu tiên
// Trong file app.js, tại case 'flashcard', bạn nhớ gọi thêm hàm updateCard() ngay sau khi gán innerHTML nhé!
