import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import { InputOTP } from "antd-input-otp";

// antd
import { Form, Steps, Button } from "antd";

// hooks
import useNavbarheight from "../../Utils/Hooks/useNavbarheight";

// components
import { FloatingInput } from "./FloatingInput/FloatingInput";
import { AntPhone } from "./AntPhone";
import { ReferralInput } from "./ReferralInput";

// styled components
import * as Styled from "./SignUp.styled";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  referral?: string;
  termsAndConditions?: string;
  phoneNumber?: string;
}

const { Step } = Steps;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  referral: "",
  phoneNumber: "",
};

const steps = [
  "Get Started",
  "Name",
  "Number",
  "Email & Username",
  "Password",
  "Referral",
  "Otp",
];

interface TransportConfig {
  secure?: boolean | 'STARTTLS';
  auth: {
    user: string;
    pass: string;
  };
}


const SignupForm = () => {
  const [otp, setOtp] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  // const [phone, setPhone] = useState<string>("");
  // const [dial, setDial] = useState<string>("");

  const navigate = useNavigate();

  const navbarheight = useNavbarheight();

  // const handleChangePhone = (dial, phone) => {
  //   setPhone(phone);
  //   setDial(dial);
  // };

  const handleLearnMoreClick = () => {
    setShowMoreInfo(!showMoreInfo); // Toggle the state
  };

  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post("/api/v1/auth/signup", values);
      nextStep();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error during sign-up:", error.response?.data);
      } else {
        console.error("Error during sign-up:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validate = (values): FormErrors => {
    const errors: FormErrors = {};

    if (currentStep === 1) {
      if (!values.firstName) {
        errors.firstName = "First name is required";
      }
      if (!values.lastName) {
        errors.lastName = "Last name is required";
      }
    } else if (currentStep === 2) {
      if (!values.phoneNumber || !values.phoneNumber.length) {
        errors.phoneNumber = "Phone number is required";
        // } else if (values.phoneNumber.length - dial.length !== 11) {
      } else if (values.phoneNumber.length <= 11) {
        // errors.phoneNumber = "Phone number must be at least 10";
        errors.phoneNumber = "Phone number must be at least 12";
      }
    } else if (currentStep === 3) {
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.username) {
        errors.username = "Username is required";
      }
    } else if (currentStep === 4) {
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "Password must have one uppercase";
      } else if (
        !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(values.password)
      ) {
        errors.password = "Password must have one special character";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    } else if (currentStep === 5) {
      // if (!values.referral) {
      //   errors.referral = 'Referral code is required';
      // }
      if (!values.termsAndConditions) {
        errors.termsAndConditions = "";
      }
    }

    return errors;
  };

  const handleOtpInput = async(value) => {
    setOtp(value);
    if (value.length === 6) {
      const otpCode = Math.floor(100000 + Math.random() * 900000);
      navigate("/signin");
    }
  };

  return (
    <Styled.StyledWrapper className="signup" navbarheight={navbarheight}>
      <Styled.MainCard title="Sign Up to join QUICKPAYUS">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form onFinish={handleSubmit}>
              <Styled.Steps
                current={currentStep}
                progressDot
                responsive={false}
              >
                {steps.slice(0, steps.length - 1).map((step) => (
                  <Step key={step} />
                ))}
              </Styled.Steps>

              <Styled.InputBox>
                {steps[currentStep] === "Get Started" && <p></p>}
                {steps[currentStep] === "Name" && (
                  <>
                    <Form.Item
                      validateStatus={
                        touched.firstName
                          ? !errors.firstName
                            ? "success"
                            : "error"
                          : ""
                      }
                      className={`${errors.firstName ? 'shake' : ''}`}
                    >
                      <Field name="firstName">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            {/* <Styled.InputLabel htmlFor="firstName" > 
                              First Name  
                            </Styled.InputLabel>
                            <Styled.InputField {...field}  
                            placeholder="First Name" />  */}
                            <FloatingInput
                              label="First Name"
                              name="firstName"
                              field={field}
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item
                      validateStatus={
                        touched.lastName
                          ? !errors.lastName
                            ? "success"
                            : "error"
                          : ""
                      }
                      className={`${errors.lastName ? 'shake' : ''}`}
                    >
                      <Field name="lastName">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            {/* <Styled.InputLabel htmlFor="lastName">
                              Last Name 
                            </Styled.InputLabel> 
                            <Styled.InputField {...field} placeholder="Last Name" /> */}
                            <FloatingInput
                              label="Last Name"
                              name="lastName"
                              field={field}
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                  </>
                )}
                {steps[currentStep] === "Number" && (
                  <Field name="phoneNumber">
                    {({ field }) => (
                      <Styled.InputWrapper>
                        <AntPhone
                          {...field}
                          handleChange={(value) =>
                            setFieldValue("phoneNumber", value)
                          }
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="color-red"
                        />
                      </Styled.InputWrapper>
                    )}
                  </Field>
                )}
                {steps[currentStep] === "Email & Username" && (
                  <>
                    <Form.Item
                      validateStatus={
                        touched.email
                          ? !errors.email
                            ? "success"
                            : "error"
                          : ""
                      }
                    >
                      <Field name="email">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <FloatingInput
                              label="Email"
                              name="email"
                              field={field}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item
                      validateStatus={
                        touched.username
                          ? !errors.username
                            ? "success"
                            : "error"
                          : ""
                      }
                    >
                      <Field name="username">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <FloatingInput
                              label="Username"
                              name="username"
                              field={field}
                            />
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                  </>
                )}
                {steps[currentStep] === "Password" && (
                  <>
                    <Form.Item
                      validateStatus={
                        touched.password
                          ? !errors.password
                            ? "success"
                            : "error"
                          : ""
                      }
                    >
                      <Field name="password">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <Styled.InputLabel htmlFor="password">
                              Password
                            </Styled.InputLabel>
                            <Styled.InputFieldPassword
                              {...field}
                              type="password"
                              placeholder="Password"
                            />
                            <PasswordStrengthBar
                              password={field.value}
                              style={{ height: "5px", borderRadius: "3px" }}
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item
                      validateStatus={
                        touched.confirmPassword
                          ? !errors.confirmPassword
                            ? "success"
                            : "error"
                          : ""
                      }
                    >
                      <Field name="confirmPassword">
                        {({ field }) => (
                          <Styled.InputWrapper>
                            <Styled.InputLabel htmlFor="confirmPassword">
                              Confirm Password
                            </Styled.InputLabel>
                            <Styled.InputFieldPassword
                              {...field}
                              type="password"
                              placeholder="Confirm Password"
                            />
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="color-red"
                            />
                          </Styled.InputWrapper>
                        )}
                      </Field>
                    </Form.Item>
                  </>
                )}
                {steps[currentStep] === "Referral" && (
                  <>
                    <Field name="referral">
                      {({ field }) => (
                        <Styled.InputWrapper>
                          <ReferralInput
                            field={field}
                            onChange={(value) =>
                              setFieldValue("referral", value)
                            }
                          />
                          <ErrorMessage
                            name="referral"
                            component="div"
                            className="color-red"
                          />
                        </Styled.InputWrapper>
                      )}
                    </Field>
                    <Field name="termsAndConditions">
                      {({ field }) => (
                        <Styled.InputWrapper>
                          <Styled.StyledCheckbox
                            checked={field.value}
                            {...field}
                          >
                            I agree with the
                            <a
                              href="#"
                              className="color-blue"
                              style={{ margin: "0 5px" }}
                            >
                              Privacy Policy
                            </a>
                            and
                            <a
                              href="#"
                              className="color-blue"
                              style={{ marginLeft: 5 }}
                            >
                              Terms of Services.
                            </a>
                          </Styled.StyledCheckbox>
                          <ErrorMessage
                            name="termsAndConditions"
                            component="div"
                            className="color-red"
                          />
                        </Styled.InputWrapper>
                      )}
                    </Field>
                  </>
                )}
                {steps[currentStep] === "Otp" && (
                  <InputOTP value={otp} onChange={handleOtpInput} />
                )}

                {steps[currentStep] !== "Otp" && (
                  <Styled.BtnGrp>
                    {currentStep > 0 && (
                      <Button onClick={prevStep} block>
                        Previous
                      </Button>
                    )}
                    <Styled.NextBtn
                      type="primary"
                      htmlType={
                        steps[currentStep] === "Referral" ? "submit" : "button"
                      }
                      onClick={
                        steps[currentStep] !== "Referral" ? nextStep : undefined
                      }
                      loading={isSubmitting}
                      className={
                        steps[currentStep] === "Get Started"
                          ? "getone"
                          : steps[currentStep] === "Referral"
                            ? "Submit"
                            : "Next"
                      }
                      disabled={Object.keys(validate(values)).some(
                        (field) => !!field
                      )}
                      block
                    >
                      {steps[currentStep] === "Get Started"
                        ? "Get Started"
                        : steps[currentStep] === "Referral"
                          ? "Submit"
                          : "Next"}
                    </Styled.NextBtn>
                  </Styled.BtnGrp>
                )}
              </Styled.InputBox>
            </Form>
          )}
        </Formik>
        <Styled.SignInWrapper>
          <p>
            <Styled.SignInBtn>
              <Styled.StyleLink to="/signin">Sign In</Styled.StyleLink>
            </Styled.SignInBtn>
            if you’re a member.
          </p>
        </Styled.SignInWrapper>

        <Styled.PrivacyTxt>
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a
          bot.
          <Styled.LearnMoreButton href="#" onClick={handleLearnMoreClick}>
            Learn more.
          </Styled.LearnMoreButton>
        </Styled.PrivacyTxt>
        <Styled.PrivacyTxt2 className={showMoreInfo ? "privacy-visible" : ""}>
          The information collected by Google reCAPTCHA is subject to the Google
          <a
            href="https://policies.google.com/privacy"
            className="color-blue"
            target="_blank"
            style={{ margin: "0 5px" }}
          >
            Privacy Policy
          </a>
          and
          <a
            href="https://policies.google.com/terms"
            className="color-blue"
            target="_blank"
            style={{ margin: "0 5px" }}
          >
            Terms of Service
          </a>
          and is used for providing, maintaining, and improving the reCAPTCHA
          service and for general security purposes (it is not used for
          personalized advertising by Google).
        </Styled.PrivacyTxt2>
      </Styled.MainCard>
    </Styled.StyledWrapper>
  );
};

export default SignupForm;
