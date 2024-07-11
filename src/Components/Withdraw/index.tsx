import { useState, useEffect } from "react";
import { Input, Select, Button, Modal } from "antd";
import { InputOTP } from "antd-input-otp";
import { usePostDataMutation } from "../../Redux/slice"; // Update the path accordingly
import * as Styled from "./Withdrawal.styled";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { selectProfile } from "../../Redux/selectors";
import { useSelector } from "react-redux";

const { Option } = Select;

interface FormProps {
  withdrawalAmount: string;
  withdrawalAddress: string;
  transactionType: string;
}

const validationSchema = Yup.object({
  withdrawalAmount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  withdrawalAddress: Yup.string().required("Address is required"),
  transactionType: Yup.string().required("Transaction type is required"),
});

const initialValues = {
  withdrawalAmount: "",
  withdrawalAddress: "",
  transactionType: "",
};

const Withdrawal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState([]);
  const [verificationError, setVerificationError] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormProps>({
    withdrawalAmount: "",
    withdrawalAddress: "",
    transactionType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [postData] = usePostDataMutation();

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setOtpSent(false);
            return prevTimer;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const sendOTP = async () => {
    try {
      // Call API to send OTP
      await postData({ url: "/otp/create", data: "", id: "" });
      setOtpSent(true);
      setTimer(30);
      setIsModalVisible(true); // Open the modal after OTP is sent
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setVerificationError("Failed to send OTP. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    try {
      // Resend OTP logic
      await sendOTP();
      setVerificationError("");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setVerificationError("Failed to resend OTP. Please try again.");
    }
  };

  const handleInputChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (values) => {
    try {
      setFormValues(values);
      await sendOTP();
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOTP();
    }
  }, [otp]);

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      setVerificationLoading(true);
      try {
        const isVerified = await verifyOTP();
        if (isVerified) {
          await submitTransaction(); // Submit transaction only if OTP is verified
          setIsModalVisible(false);
          setOtp([]); // Clear OTP input value
        } else {
          setVerificationError("Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        setVerificationError("Invalid OTP. Please try again.");
      } finally {
        setVerificationLoading(false);
      }
    } else {
      setVerificationError("Please enter the complete OTP code.");
    }
  };

  const verifyOTP = async () => {
    try {
      const datares = await postData({
        url: "/otp/verify",
        data: {
          userId: profile.id,
          otp: otp.join(""),
        },
        id: "",
      });
      return datares;
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      setVerificationError("Invalid OTP. Please try again.");
      return false;
    }
  };

  const submitTransaction = async () => {
    setIsLoading(true);
    try {
      // Submit transaction API
      await postData({
        url: "transactions",
        data: {
          amount: formValues.withdrawalAmount,
          withdrawalAddress: formValues.withdrawalAddress,
          withdrawalType: formValues.transactionType,
          transactionType: "WITHDRAWAL",
        },
        id: "",
      });
    } catch (error) {
      console.error("Error submitting transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const profile = useSelector(selectProfile);

  const getContainer = () => {
    const container = document.getElementById("app-modals");
    return container ? container : document.body;
  };

  const validateNumberInput = (event) => {
    // Allow numbers, period, backspace, delete, arrows, enter, and tab
    if (
      !(
        (event.key >= "0" && event.key <= "9") || // Allow numeric keys
        event.key === "." || // Allow period
        ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Enter", "Tab"].includes(event.key) // Allow control keys
      )
    ) {
      event.preventDefault(); // Prevent all other keys
    }
  }

  return (
    <>
      <Styled.StyledH2>Withdraw</Styled.StyledH2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <Styled.StyledCard>
              <Styled.InputWrapper>
                <label>Amount:</label>
                <Field name="withdrawalAmount">
                  {({ field }) => (
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter amount"
                      style={{
                        overflow: "hidden",
                      }}
                      onKeyDown={validateNumberInput}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="withdrawalAmount"
                  component="div"
                  className="error"
                >
                  {(msg) => (
                    <Styled.AlertMessage
                      message={msg}
                      type="error"
                    ></Styled.AlertMessage>
                  )}
                </ErrorMessage>
              </Styled.InputWrapper>
              <Styled.InputWrapper>
                <label>Address:</label>
                <Field name="withdrawalAddress">
                  {({ field }) => (
                    <Input
                      type="text"
                      {...field}
                      style={{
                        overflow: "hidden",
                      }}
                      placeholder="Enter receiver account ID"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="withdrawalAddress"
                  component="div"
                  className="error"
                >
                  {(msg) => (
                    <Styled.AlertMessage
                      message={msg}
                      type="error"
                    ></Styled.AlertMessage>
                  )}
                </ErrorMessage>
              </Styled.InputWrapper>
              <Styled.BalanceContainer>
                <div>
                  <div style={{ marginBottom: "10px" }}>Type:</div>
                  <Field name="transactionType">
                    {({ field }) => (
                      <Styled.StyledSelect
                        {...field}
                        onChange={(value) =>
                          setFieldValue("transactionType", value)
                        }
                      >
                        <Option value="">Select Transaction Type</Option>
                        <Option value="profit">Profit</Option>
                        <Option value="principal">Deposit</Option>
                      </Styled.StyledSelect>
                    )}
                  </Field>
                  <ErrorMessage
                    name="transactionType"
                    component="div"
                    className="error"
                  >
                    {(msg) => (
                      <Styled.AlertMessage
                        message={msg}
                        type="error"
                      ></Styled.AlertMessage>
                    )}
                  </ErrorMessage>
                </div>
                <div>
                  <div style={{ marginBottom: "10px" }}>My Balance:</div>
                  <Styled.Balance>{profile.profitBalance}</Styled.Balance>
                </div>
              </Styled.BalanceContainer>
            </Styled.StyledCard>

            <Styled.SubmitButtonContainer>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading}
                style={{ background: "#007AFF" }}
              >
                Submit
              </Button>
            </Styled.SubmitButtonContainer>

            {/* OTP Modal */}
          </Form>
        )}
      </Formik>
      <Modal
        title="Enter OTP"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        getContainer={getContainer}
      >
        <div>
          <InputOTP value={otp} onChange={handleInputChange} />
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              onClick={handleResendOTP}
              disabled={timer > 0}
            >
              {otpSent && timer > 0 ? `Resend OTP (${timer}s)` : "Submit OTP"}
            </Button>
          </div>
          {verificationError && (
            <div className="color-red">{verificationError}</div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Withdrawal;
