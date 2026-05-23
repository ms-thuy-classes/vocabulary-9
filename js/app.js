// Quản lý trạng thái ứng dụng (State)
const appState = {
  currentView: 'home',
  currentLessonId: null,
  currentExerciseIndex: 0, // Từ 1 đến 9
  score: 0,
  wrongList: []
};

// Hàm chuyển trang (Router)
function navigateTo(view, lessonId = null) {
  appState.currentView = view;
  if (lessonId) appState.currentLessonId = lessonId;
  
  const container = document.getElementById('app-content');
  
  switch(view) {
    case 'home':
      container.innerHTML = renderHome();
      break;
    case 'flashcard':
      container.innerHTML = renderFlashcard(appState.currentLessonId);
      break;
    case 'quiz':
      appState.currentExerciseIndex = 0; // Reset khi bắt đầu làm bài
      appState.score = 0;
      appState.wrongList = [];
      container.innerHTML = renderQuizContainer();
      loadNextExercise(); // Chạy bài tập đầu tiên trong chuỗi 9 bài
      break;
    case 'summary':
      container.innerHTML = renderSummary();
      break;
  }
}

// Khởi chạy ứng dụng khi load trang
window.onload = () => navigateTo('home');
