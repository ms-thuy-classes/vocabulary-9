function renderQuizContainer() {
  return `
    <div class="quiz-box">
      <div class="progress-bar-container"><div id="quiz-progress" class="progress-bar"></div></div>
      <div id="exercise-area"></div>
      <div id="mini-result-area" class="mini-result hidden"></div>
    </div>`;
}

function loadNextExercise() {
  appState.currentExerciseIndex++;
  
  // Cập nhật thanh tiến trình (Progress Bar)
  const progressPercent = (appState.currentExerciseIndex / 9) * 100;
  document.getElementById('quiz-progress').style.width = `${progressPercent}%`;

  if (appState.currentExerciseIndex > 9) {
    navigateTo('summary'); // Đã hoàn thành 9 bài -> Sang trang tổng kết
    return;
  }

  // Ẩn mini-result cũ đi
  document.getElementById('mini-result-area').classList.add('hidden');
  
  const exerciseArea = document.getElementById('exercise-area');
  const lesson = LESSONS_DATA[appState.currentLessonId];
  
  // Dựa vào số index từ 1-9 để gọi hàm render bài tập tương ứng trong file exercises.js
  let questionHTML = "";
  if (appState.currentExerciseIndex === 1) {
    questionHTML = buildMatchImage(lesson.vocabList[0]); // Ví dụ bài 1
  } else if (appState.currentExerciseIndex === 2) {
    questionHTML = buildImageToWords(lesson.vocabList[0]); // Ví dụ bài 2
  } // ... tiếp tục đến bài 9
  
  exerciseArea.innerHTML = questionHTML;
}

// Hàm hiển thị kết quả nhanh (Mini-Result) sau khi bấm chọn ở mỗi bài tập
function showMiniResult(isCorrect, message) {
  const miniResult = document.getElementById('mini-result-area');
  miniResult.classList.remove('hidden');
  
  if (isCorrect) {
    miniResult.innerHTML = `<div class="alert alert-success">${message}</div>`;
  } else {
    // Không hiện đáp án đúng để học sinh tự suy nghĩ cải thiện
    miniResult.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  }
}
