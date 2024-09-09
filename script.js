let secretNumber = '';
let attempts = 0;
let numberLength = 0;
const maxAttempts = 15;  // Số lần đoán tối đa để so sánh

function startGame() {
    numberLength = parseInt(document.getElementById('length').value);
    if (isNaN(numberLength) || numberLength <= 0) {
        alert('Vui lòng nhập một số hợp lệ.');
        return;
    }

    secretNumber = generateRandomNumber(numberLength);
    attempts = 0;

    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('numberLength').innerText = numberLength;
    document.getElementById('result').innerText = '';
    document.getElementById('attempts').innerText = '';
    document.getElementById('historyList').innerHTML = '';  // Xóa lịch sử dự đoán

    // Thêm sự kiện keydown cho ô nhập độ dài
    document.getElementById('length').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();  // Ngăn chặn hành động mặc định của phím Enter
            startGame();
        }
    });

    // Thêm sự kiện keydown cho ô nhập dự đoán
    document.getElementById('guess').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();  // Ngăn chặn hành động mặc định của phím Enter
            makeGuess();
        }
    });
}

function generateRandomNumber(length) {
    let number = '';
    
    // Đảm bảo chữ số đầu tiên không phải là số 0 nếu độ dài lớn hơn 1
    if (length > 1) {
        number += Math.floor(Math.random() * 9) + 1; // Chữ số đầu tiên từ 1 đến 9
        length--; // Giảm độ dài xuống vì đã thêm một chữ số đầu tiên
    }
    
    // Tạo các chữ số tiếp theo
    for (let i = 0; i < length; i++) {
        number += Math.floor(Math.random() * 10); // Thêm các chữ số từ 0 đến 9
    }
    
    return number;
}

function makeGuess() {
    const guessInput = document.getElementById('guess');
    const guess = guessInput.value;
    if (guess.length !== numberLength) {
        alert(`Vui lòng nhập một số có độ dài ${numberLength} chữ số.`);
        return;
    }

    let correctDigit = 0;
    let correctPosition = 0;

    const secretUsed = new Array(numberLength).fill(false);
    const guessUsed = new Array(numberLength).fill(false);

    // Kiểm tra số chữ số đúng vị trí
    for (let i = 0; i < numberLength; i++) {
        if (secretNumber[i] === guess[i]) {
            correctPosition++;
            secretUsed[i] = true;
            guessUsed[i] = true;
        }
    }

    // Kiểm tra số chữ số đúng nhưng không đúng vị trí
    for (let i = 0; i < numberLength; i++) {
        if (!guessUsed[i]) {
            for (let j = 0; j < numberLength; j++) {
                if (!secretUsed[j] && guess[i] === secretNumber[j]) {
                    correctDigit++;
                    secretUsed[j] = true;
                    break;
                }
            }
        }
    }

    attempts++;

    // Cập nhật lịch sử dự đoán
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('li');
    historyItem.innerText = `Dự đoán ${attempts}: ${guess} - Chữ số đúng vị trí: ${correctPosition}, Chữ số đúng nhưng sai vị trí: ${correctDigit}`;
    historyList.appendChild(historyItem);

    if (correctPosition === numberLength) {
        // Hiển thị kết quả trò chơi với xuống dòng
        const resultText = attempts > maxAttempts 
            ? 'Bạn đã đoán nhiều lần hơn DarkV, quá non.' 
            : 'Bạn đã chơi giỏi hơn DarkV, wow thật tuyệt vời!';

        document.getElementById('result').innerText = `Chúc mừng! Bạn đã đoán đúng số: ${secretNumber}.\n${resultText}`;
        document.getElementById('attempts').innerText = `Số lần đoán: ${attempts}`;
    } else {
        document.getElementById('result').innerText = `Chữ số đúng vị trí: ${correctPosition}\nChữ số đúng nhưng sai vị trí: ${correctDigit}`;
        document.getElementById('attempts').innerText = `Số lần đoán: ${attempts}`;
    }

    // Xóa ô nhập dự đoán sau khi gửi
    guessInput.value = '';
}
