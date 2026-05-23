// ==========================================
// HÀM TIỆN ÍCH: TRỘN ĐỀ ĐÁP ÁN (SHUFFLE)
// ==========================================
function shuffleArray(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ==========================================
// 1. MATCH WORD WITH IMAGE (Xem từ chọn hình - Chỉ hiện emoji)
// ==========================================
function buildMatchImage(q) {
  const opts = shuffleArray([q.vocab, ...q.wrongs.slice(0, 3)]);
  return `
    <div class="question-text">Match this word to the correct image:</div>
    <div class="target-display-word">${q.vocab.word}</div>
    <div class="choices dynamic-grid-2">
      ${opts.map(o => `
        <button class="choice font-emoji-large" data-val="${o.word}" data-correct="${q.vocab.word}">
          ${o.emoji}
        </button>`).join('')}
    </div>
    <div id="feedback"></div>
    <button class="btn-next hidden" id="nextBtn" onclick="loadNextExercise()">Tiếp tục →</button>
  `;
}

// ==========================================
// 2. IMAGE TO WORDS (Xem hình chọn từ - Ẩn nghĩa Tiếng Việt)
// ==========================================
function buildImageToWords(q) {
  const opts = shuffleArray([q.vocab, ...q.wrongs.slice(0, 3)]);
  return `
    <div class="question-text">Look at the image and choose the correct word:</div>
    <div class="target-display-emoji">${q.vocab.emoji}</div>
    <div class="choices dynamic-grid-2">
      ${opts.map(o => `
        <button class="choice" data-val="${o.word}" data-correct="${q.vocab.word}">
          ${o.word}
        </button>`).join('')}
    </div>
    <div id="feedback"></div>
    <button class="btn-next hidden" id="nextBtn" onclick="loadNextExercise()">Tiếp tục →</button>
  `;
}

// ==========================================
// 3. VIETNAMESE TO ENGLISH (Trắc nghiệm: Chọn từ tiếng Anh)
// ==========================================
function buildViToEn(q) {
  const opts = shuffleArray([q.vocab, ...q.wrongs.slice(0, 3)]);
  return `
    <div class="question-text">Chọn từ tiếng Anh chính xác cho nghĩa sau:</div>
    <div class="target-display-word" style="color: #6c5ce7;">"${q.vocab.meaning}"</div>
    <div class="choices dynamic-grid-2">
      ${opts.map(o => `
        <button class="choice" data-val="${o.word}" data-correct="${q.vocab.word}">
          ${o.word}
        </button>`).join('')}
    </div>
    <div id="feedback"></div>
    <button class="btn-next hidden" id="nextBtn" onclick="loadNextExercise()">Tiếp tục →</button>
  `;
}

// ==========================================
// 4. ENGLISH TO VIETNAMESE (Trắc nghiệm: Chọn nghĩa tiếng Việt)
// ==========================================
function buildEnToVi(q) {
  const opts = shuffleArray([q.vocab, ...q.wrongs.slice(0, 3)]);
  return `
    <div class="question-text">Tìm nghĩa tiếng Việt phù hợp cho từ dưới đây:</div>
    <div class="target-display-word">${q.vocab.word} ${q.vocab.emoji}</div>
    <div class="choices dynamic-grid-2">
      ${opts.map(o => `
        <button class="choice" data-val="${o.meaning}" data-correct="${q.vocab.meaning}">
          ${o.meaning}
        </button>`).join('')}
    </div>
    <div id="feedback"></div>
    <button class="btn-next hidden" id="nextBtn" onclick="loadNextExercise()">Tiếp tục →</button>
  `;
}

// ==========================================
// 5. UNSCRAMBLE WORDS (Sắp xếp lại các chữ cái thành từ đúng)
// ==========================================
function buildUnscrambleWord(q) {
  const letters = shuffleArray(q.vocab.word.split(''));
  return `
    <div class="question-text">Sắp xếp các chữ cái sau thành từ tiếng Anh có nghĩa:</div>
    <div class="target-display-meaning">Ý nghĩa: ${q.vocab.meaning} ${q.vocab.emoji}</div>
    
    <!-- Ô hiển thị kết quả lắp ghép -->
    <div class="unscramble-answer-box" id="word-assembly-area"></div>
    
    <!-- Các chữ cái rời rạc để học sinh bấm chọn -->
    <div class="letters-pool">
      ${letters.map(letter => `
        <button class="letter-tile" onclick="selectLetterTile(this)" data-letter="${letter}">
          ${letter}
        </button>`).join('')}
    </div>
    
    <div class="action-row">
      <button class="btn-util" onclick="resetWordAssembly()">Làm lại 🔄</button>
      <button class="btn-primary-quiz" onclick="checkUnscrambleWord('${q.vocab.word}')">Kiểm tra kết quả</button>
    </div>
    <div id="feedback"></div>
    <button class="btn-next hidden" id="nextBtn" onclick="loadNextExercise()">Tiếp tục →</button>
  `;
}

// ==========================================
// 6. SENTENCE UNSCRAMBLE (Sắp xếp câu ví dụ mẫu)
// ==========================================
function buildUnscrambleSentence(q) {
  // Giả sử câu ví dụ lưu ở q.vocab.sentence. Ví dụ: "I love my mother"
  const rawSentence = q.vocab.sentence || `This is an example of ${q.vocab.word}`;
  const words = shuffleArray(rawSentence.split(' '));
  
  return `
    <div class="question-text">Sắp xếp các từ thành câu ví dụ hoàn chỉnh:</div>
    <div class="target-display-meaning">Từ gợi ý: <strong>${q.vocab.word}</strong> (${q.vocab.meaning})</div>
    
    <div class="unscramble-answer-box sentence-box" id="sentence-assembly-area"></div>
    
    <div class="letters-pool">
      ${words.map(w => `
        <button class="word-tile" onclick="selectWordTile(this)" data-word="${w}">
          ${w}
        </button>`).join('')}
    </div>
    
    <div class="action-row">
      <button class="btn-util" onclick="resetSentenceAssembly()">Làm lại 🔄</button>
      <button class="btn-primary-quiz" onclick="checkUnscrambleSentence('${rawSentence}')">Kiểm tra kết quả</button>
    </div>
    <div id="feedback"></div>
    <button class="btn-next hidden" id="nextBtn" onclick="loadNextExercise()">Tiếp tục →</button>
  `;
}

// ==========================================
// 7. SAVE THE FLOWER (Cứu lấy bông hoa - Hangman cải tiến 6 mạng)
// ==========================================
let flowerLives = 6;
let guessedLetters = [];

function buildSaveTheFlower(q) {
  flowerLives = 6;
  guessedLetters = [];
  
  const wordLower = q.vocab.word.toLowerCase();
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
  
  // Tạo câu đục lỗ ví dụ: "I love my m_t_h_e_r"
  const sentence = q.vocab.sentence || `This is an example of ${q.vocab.word}`;
  const modifiedSentence = sentence.replace(new RegExp(q.vocab.word, 'gi'), "_____");

  return `
    <div class="question-text">Trò chơi: Cứu lấy bông hoa! 🌸</div>
    <div class="target-display-meaning">Gợi ý ngữ cảnh: <em>"${modifiedSentence}"</em></div>
    
    <!-- Đồ họa trạng thái mạng sống của Bông hoa -->
    <div class="flower-status-box">
      <div id="flower-graphic" style="font-size: 3rem;">🌸🌸🌸🌸🌸🌸</div>
      <div class="lives-text">Số mạng còn lại: <strong id="lives-counter" style="color: #ff4757;">6</strong>/6</div>
    </div>
    
    <!-- Các ô trống của từ cần đoán -->
    <div class="hangman-display" id="hangman-word-slots">
      ${wordLower.split('').map(() => `<span class="hangman-slot">_</span>`).join('')}
    </div>
    
    <!-- Bàn phím chữ cái A-Z -->
    <div class="keyboard-grid">
      ${alphabet.map(char => `
        <button class="key-tile" data-char="${char}" onclick="guessFlowerLetter(this, '${char}', '${wordLower}')">
          ${char.toUpperCase()}
        </button>`).join('')}
    </div>
    
    <div id="feedback"></div>
    <button class="btn-next hidden" id="nextBtn" onclick="loadNextExercise()">Tiếp tục →</button>
  `;
}

// ==========================================
// 8. MATCH WORD WITH MEANING (Nối từ tiếng Anh với nghĩa Việt)
// ==========================================
function buildMatchMeaning(q) {
  const opts = shuffleArray([q.vocab, ...q.wrongs.slice(0, 3)]);
  return `
    <div class="question-text">Ghép cặp từ tiếng Anh với định nghĩa tương ứng:</div>
    <div class="target-display-word">${q.vocab.word}</div>
    <div class="choices dynamic-grid-1">
      ${opts.map(o => `
        <button class="choice" data-val="${o.meaning}" data-correct="${q.vocab.meaning}">
          ${o.meaning}
        </button>`).join('')}
    </div>
    <div id="feedback"></div>
    <button class="btn-next hidden" id="nextBtn" onclick="loadNextExercise()">Tiếp tục →</button>
  `;
}

// ==========================================
// 9. SENTENCE CLOZE TEST (Trắc nghiệm đục lỗ câu ví dụ)
// ==========================================
function buildSentenceCloze(q) {
  const opts = shuffleArray([q.vocab, ...q.wrongs.slice(0, 3)]);
  const sentence = q.vocab.sentence || `This is an example of ${q.vocab.word}.`;
  // Đục lỗ từ vựng chính trong câu
  const clozeSentence = sentence.replace(new RegExp(q.vocab.word, 'gi'), "_______");

  return `
    <div class="question-text">Chọn từ thích hợp điền vào chỗ trống câu ví dụ:</div>
    <div class="cloze-sentence-display">
      "${clozeSentence}" (${q.vocab.meaning})
    </div>
    <div class="choices dynamic-grid-2">
      ${opts.map(o => `
        <button class="choice" data-val="${o.word}" data-correct="${q.vocab.word}">
          ${o.word}
        </button>`).join('')}
    </div>
    <div id="feedback"></div>
    <button class="btn-next hidden" id="nextBtn" onclick="loadNextExercise()">Tiếp tục →</button>
  `;
}
// HÀ LẮP GHÉP TỪ (BÀI 5)
function selectLetterTile(tile) {
  if(tile.classList.contains('used')) return;
  tile.classList.add('used');
  const area = document.getElementById('word-assembly-area');
  area.innerHTML += `<span class="assembled-letter" onclick="removeLetterTile('${tile.innerText}')">${tile.innerText}</span>`;
}
function resetWordAssembly() {
  document.getElementById('word-assembly-area').innerHTML = '';
  document.querySelectorAll('.letter-tile').forEach(b => b.classList.remove('used'));
}
function checkUnscrambleWord(correctWord) {
  const userWord = document.getElementById('word-assembly-area').innerText.replace(/\s/g, '');
  const isCorrect = userWord.toLowerCase() === correctWord.toLowerCase();
  handleQuizFeedback(isCorrect, isCorrect ? "✅ Tuyệt vời! Bạn xếp chữ rất chuẩn." : "❌ Sắp xếp chưa chính xác rồi, thử lại nhé!");
}

// HÀM LẮP GHÉP CÂU (BÀI 6)
function selectWordTile(tile) {
  if(tile.classList.contains('used')) return;
  tile.classList.add('used');
  const area = document.getElementById('sentence-assembly-area');
  area.innerHTML += `<span class="assembled-word">${tile.dataset.word} </span>`;
}
function resetSentenceAssembly() {
  document.getElementById('sentence-assembly-area').innerHTML = '';
  document.querySelectorAll('.word-tile').forEach(b => b.classList.remove('used'));
}
function checkUnscrambleSentence(correctSentence) {
  const userAns = document.getElementById('sentence-assembly-area').innerText.trim();
  const isCorrect = userAns.toLowerCase() === correctSentence.trim().toLowerCase();
  handleQuizFeedback(isCorrect, isCorrect ? "✅ Xuất sắc! Câu văn hoàn toàn chính xác." : "❌ Trật tự từ chưa đúng rồi, hãy thử lại.");
}

// HÀM TRÒ CHƠI CỨU HOA (BÀI 7)
function guessFlowerLetter(btn, char, targetWord) {
  if(btn.disabled || flowerLives <= 0) return;
  btn.disabled = true;
  btn.classList.add('key-used');
  
  if(targetWord.includes(char)) {
    guessedLetters.push(char);
    // Cập nhật hiển thị ô trống
    const slots = targetWord.split('').map(c => guessedLetters.includes(c) ? c : "_");
    document.getElementById('hangman-word-slots').innerHTML = slots.map(s => `<span class="hangman-slot">${s}</span>`).join('');
    
    if(!slots.includes("_")) {
      handleQuizFeedback(true, "🎉 Chúc mừng! Bạn đã giải cứu thành công bông hoa!");
    }
  } else {
    flowerLives--;
    document.getElementById('lives-counter').innerText = flowerLives;
    // Cập nhật icon hoa rơi rụng mạng
    const flowers = "🌸".repeat(flowerLives) + "🥀".repeat(6 - flowerLives);
    document.getElementById('flower-graphic').innerText = flowers;
    
    if(flowerLives <= 0) {
      handleQuizFeedback(false, "🥀 Bông hoa đã héo úa mất rồi! Đừng nản lòng nhé.");
    }
  }
}

// HÀM XỬ LÝ FEEDBACK VÀ ĐIỀU HƯỚNG CHUNG CHO TOÀN BỘ BÀI TẬP
function handleQuizFeedback(isCorrect, message) {
  const fb = document.getElementById('feedback');
  fb.className = isCorrect ? "alert-success" : "alert-danger";
  fb.innerText = message;
  document.getElementById('nextBtn').classList.remove('hidden');
  
  // Đóng băng tất cả lựa chọn
  document.querySelectorAll('.choice, .key-tile, .letter-tile, .word-tile').forEach(b => b.style.pointerEvents = 'none');
  
  // Đồng bộ kết quả lên App State của bạn
  if(isCorrect) {
    if(typeof appState !== 'undefined') appState.score++;
  } else {
    // Ẩn cơ chế hiện đáp án đúng để học sinh ghi nhớ tự học
  }
}
