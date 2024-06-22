import Flex from "@/components/Flex";
import Button from "@/components/Button";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import { EMAIL_DELIVERY_CONFIRMATION } from "@/constant/constant";

import useVerifyOTPHandler from "@/container/auth/hooks/useVerifyOTPHandler";

import "./VerifyOTP.scss";

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
    handleChange(val, 0);
  };

  return (
    <Container width={100} boxShadow borderRadius padding={"40px 80px"} className="container-bg">
      <Flex vertical gap={24} align="center">
        <Flex vertical gap={12} align="center">
          <Typography text="Verify Your Account" type="h2" />
          <Typography
            textAlign="center"
            text={EMAIL_DELIVERY_CONFIRMATION(location.state?.email)}
          />
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
              ref={(reference) => {
                if (reference)
                  otpBoxReference.current[index] =
                    reference as HTMLInputElement;
              }}
            />
          ))}
        </Flex>
        <Button
          disabled={disabled}
          onClick={verifyOTPHandler}
          type="borderRadius"
          size="md"
        >
          Verify OTP
        </Button>
        <Flex
          align="center"
          justify="center"
          gap={25}
          className="reset-otp-control"
        >
          <Typography text="Still not received OTP?" />
          <Typography
            text={
              !!(minutes || seconds) && (
                <span>
                  {minutes}:{seconds}
                </span>
              )
            }
          />
          <Button size="sm" disabled={!otpEnabled} type="borderRadius">
            Resend OTP
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default VerifyOTP;
