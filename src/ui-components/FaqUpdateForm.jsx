/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getFaq } from "../graphql/queries";
import { updateFaq } from "../graphql/mutations";
const client = generateClient();
export default function FaqUpdateForm(props) {
  const {
    id: idProp,
    faq: faqModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    question: "",
    answer: "",
    likes: "",
    pinned: false,
  };
  const [question, setQuestion] = React.useState(initialValues.question);
  const [answer, setAnswer] = React.useState(initialValues.answer);
  const [likes, setLikes] = React.useState(initialValues.likes);
  const [pinned, setPinned] = React.useState(initialValues.pinned);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = faqRecord
      ? { ...initialValues, ...faqRecord }
      : initialValues;
    setQuestion(cleanValues.question);
    setAnswer(cleanValues.answer);
    setLikes(cleanValues.likes);
    setPinned(cleanValues.pinned);
    setErrors({});
  };
  const [faqRecord, setFaqRecord] = React.useState(faqModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getFaq.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getFaq
        : faqModelProp;
      setFaqRecord(record);
    };
    queryData();
  }, [idProp, faqModelProp]);
  React.useEffect(resetStateValues, [faqRecord]);
  const validations = {
    question: [],
    answer: [],
    likes: [],
    pinned: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          question: question ?? null,
          answer: answer ?? null,
          likes: likes ?? null,
          pinned: pinned ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateFaq.replaceAll("__typename", ""),
            variables: {
              input: {
                id: faqRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "FaqUpdateForm")}
      {...rest}
    >
      <TextField
        label="Question"
        isRequired={false}
        isReadOnly={false}
        value={question}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              question: value,
              answer,
              likes,
              pinned,
            };
            const result = onChange(modelFields);
            value = result?.question ?? value;
          }
          if (errors.question?.hasError) {
            runValidationTasks("question", value);
          }
          setQuestion(value);
        }}
        onBlur={() => runValidationTasks("question", question)}
        errorMessage={errors.question?.errorMessage}
        hasError={errors.question?.hasError}
        {...getOverrideProps(overrides, "question")}
      ></TextField>
      <TextField
        label="Answer"
        isRequired={false}
        isReadOnly={false}
        value={answer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              question,
              answer: value,
              likes,
              pinned,
            };
            const result = onChange(modelFields);
            value = result?.answer ?? value;
          }
          if (errors.answer?.hasError) {
            runValidationTasks("answer", value);
          }
          setAnswer(value);
        }}
        onBlur={() => runValidationTasks("answer", answer)}
        errorMessage={errors.answer?.errorMessage}
        hasError={errors.answer?.hasError}
        {...getOverrideProps(overrides, "answer")}
      ></TextField>
      <TextField
        label="Likes"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={likes}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              question,
              answer,
              likes: value,
              pinned,
            };
            const result = onChange(modelFields);
            value = result?.likes ?? value;
          }
          if (errors.likes?.hasError) {
            runValidationTasks("likes", value);
          }
          setLikes(value);
        }}
        onBlur={() => runValidationTasks("likes", likes)}
        errorMessage={errors.likes?.errorMessage}
        hasError={errors.likes?.hasError}
        {...getOverrideProps(overrides, "likes")}
      ></TextField>
      <SwitchField
        label="Pinned"
        defaultChecked={false}
        isDisabled={false}
        isChecked={pinned}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              question,
              answer,
              likes,
              pinned: value,
            };
            const result = onChange(modelFields);
            value = result?.pinned ?? value;
          }
          if (errors.pinned?.hasError) {
            runValidationTasks("pinned", value);
          }
          setPinned(value);
        }}
        onBlur={() => runValidationTasks("pinned", pinned)}
        errorMessage={errors.pinned?.errorMessage}
        hasError={errors.pinned?.hasError}
        {...getOverrideProps(overrides, "pinned")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || faqModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || faqModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
