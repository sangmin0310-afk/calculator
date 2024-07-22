// calculate 함수 정의
function calculate(firstOperand, operator, secondOperand) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            if (secondOperand === 0) {
                return '오류'; // 0으로 나누는 경우 처리
            }
            return firstOperand / secondOperand;
        case '%':
            return firstOperand % secondOperand;
        default:
            return null; // 유효하지 않은 연산자 처리
    }
}

// 로드 이벤트 리스너 등록
window.addEventListener('load', () => {
    // 모든 버튼 요소를 선택
    const buttons = document.querySelectorAll('.button');
    // 디스플레이 요소 선택
    const display = document.querySelector('.display');

    // 첫 번째 피연산자와 연산자를 저장할 변수들
    let firstOperand = null;
    let operator = null;
    let secondOperand = null;
    let waitingSecondOperand = false; // 두 번째 피연산자를 기다리는 상태

    // 클릭 이벤트 리스너 추가
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            // 숫자 버튼인 경우
            if (button.classList.contains('number')) {
                if (waitingSecondOperand) {
                    // 두 번째 피연산자 입력 중일 때, 디스플레이에 숫자 입력
                    if (display.textContent === '0' || display.textContent === firstOperand.toString()) {
                        display.textContent = buttonText;
                    } else {
                        display.textContent += buttonText;
                    }
                    secondOperand = parseFloat(display.textContent); // 두 번째 피연산자 업데이트
                } else {
                    if (display.textContent === '0' || operator !== null) {
                        // 디스플레이가 '0'일 때 또는 연산자가 입력된 상태일 때 클릭한 숫자로 변경
                        display.textContent = buttonText;
                    } else {
                        // '0'이 아닐 때는 클릭한 숫자를 뒤에 추가
                        display.textContent += buttonText;
                    }
                }
            }

            // 연산기호 버튼인 경우
            if (button.classList.contains('operator')) {
                if (firstOperand === null) {
                    // 첫 번째 피연산자 설정
                    firstOperand = parseFloat(display.textContent);
                } else if (waitingSecondOperand) {
                    // 두 번째 피연산자가 설정된 상태에서 연산기호를 누른 경우
                    secondOperand = parseFloat(display.textContent);
                    const result = calculate(firstOperand, operator, secondOperand);
                    display.textContent = result;
                    firstOperand = result;
                    secondOperand = null;
                }

                // 연산자 설정
                operator = buttonText;

                // 콘솔에 상태 출력
                console.log('firstOperand:', firstOperand);
                console.log('operator:', operator);

                // 두 번째 피연산자를 기다리는 상태로 전환
                waitingSecondOperand = true;
            }

            // 초기화 버튼인 경우
            if (button.classList.contains('function') && buttonText === 'C') {
                display.textContent = '0';
                firstOperand = null;
                operator = null;
                secondOperand = null;
                waitingSecondOperand = false;

                // 콘솔에 상태 출력
                console.log('C 버튼 클릭 후 상태:');
                console.log('firstOperand:', firstOperand);
                console.log('operator:', operator);
                console.log('secondOperand:', secondOperand);
            }

            // = 버튼인 경우
            if (button.classList.contains('function') && buttonText === '=') {
                if (firstOperand !== null && operator !== null) {
                    // 두 번째 피연산자를 디스플레이에서 가져옴
                    secondOperand = parseFloat(display.textContent);

                    // 콘솔에 두 번째 피연산자 출력
                    console.log('secondOperand:', secondOperand);
                    
                    // 계산 수행
                    const result = calculate(firstOperand, operator, secondOperand);
                    
                    // 결과를 디스플레이에 표시
                    display.textContent = result;

                    // 콘솔에 계산 결과 출력
                    console.log('계산 결과:', result);
                    
                    // 계산 이후 변수 초기화
                    firstOperand = null;
                    operator = null;
                    secondOperand = null;
                    waitingSecondOperand = false;
                }
            }
        });
    });
});
