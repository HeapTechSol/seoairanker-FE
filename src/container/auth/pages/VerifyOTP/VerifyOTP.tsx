import Flex from "@/components/Flex";

import useVerifyOTPHandler from "@/container/auth/hooks/useVerifyOTPHandler";

import "./VerifyOTP.scss";
import { EMAIL_DELIVERY_CONFIRMATION } from "@/constant/constant";
import Button from "@/components/Button";

const VerifyOTP = () => {
  const {
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
  } = useVerifyOTPHandler();

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.clipboardData.getData("text").substring(0, 1);
    console.log("val=>", val)
    handleChange(val);
  };


  return (
    <main className="auth-container">
      <Flex vertical gap={24} align="center">
        <Flex vertical gap={12} align="center">
          <h2>Verify Your Account</h2>
          <p>{EMAIL_DELIVERY_CONFIRMATION(location?.state?.email || "")}</p>
        </Flex>
        <Flex gap={4} justify="center">
          {otp.map((digit, index) => (
            <input
              className="otp-input"
              key={index}
              value={digit}
              maxLength={1}
              onPaste={handlePaste}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              ref={(reference) =>
                (otpBoxReference.current[index] = reference as HTMLInputElement)
              }
            />
          ))}
        </Flex>
        <Button disabled={disabled} onClick={verifyOTPHandler}>
          Verify OTP
        </Button>
        <Flex align="center" justify="center" gap={25}>
          <p>Still not received OTP?</p>
          {!!(minutes || seconds) && (
            <span>
              {minutes}:{seconds}
            </span>
          )}
          <Button size="sm" disabled={!otpEnabled}>
            Reset OTP
          </Button>
        </Flex>
      </Flex>
    </main>
  );
};

export default VerifyOTP;
