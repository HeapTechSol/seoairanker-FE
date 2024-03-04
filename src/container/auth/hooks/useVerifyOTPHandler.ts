import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const useVerifyOTPHandler = () => {
  const location = useLocation();
  const [timer, setTimer] = useState(1 * 60); // 5 minutes in seconds
  const [otpEnabled, setOtpEnabled] = useState(false);

  const numberOfDigits = 4;
  const otpBoxReference = useRef<HTMLInputElement[]>([]);
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));

  const disabled = otp?.some((isTrue) => !isTrue);

  const handleChange = (value: string, index: number) => {
    if (Number.isNaN(Number(value))) return;
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleBackspaceAndEnter = (e: any, index: number) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const verifyOTPHandler = () => {
    try {
      console.log(Number(otp.join("")));
    } catch (error) {}
  };

  const startTimer = () => {
    const newIntervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(newIntervalId);
          setOtpEnabled(true);
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer(); // Start the timer when the component mounts
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return {
    otp,
    minutes,
    seconds,
    location,
    disabled,
    otpEnabled,
    handleChange,
    otpBoxReference,
    verifyOTPHandler,
    handleBackspaceAndEnter,
  };
};

export default useVerifyOTPHandler;
